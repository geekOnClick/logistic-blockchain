import { Component, computed, effect, input, OnDestroy, signal, viewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentConnectionProps } from '../../../../types/connection';
import { EMPTY, from, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BigNumberish, ContractTransactionReceipt } from 'ethers';
import { WarnMessageComponent } from '../../../../shared/warn-message/warn-message.component';
import { OrderProps } from '../../../../types/order';
import { DateFormatPipe } from '../../../../shared/pipes/date.pipe';
import { ErrorMessageComponent } from "../../../../shared/error-message/error-message.component";
import { Web3ContractService } from '../../services/web3-contract.service';

type TestProduct = {
  id: number;
  name: string;
}

@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
  standalone: true,
  styleUrl: './order-table.component.scss',
  imports: [
    NgIf,
    DateFormatPipe,
    CardModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    WarnMessageComponent,
    ErrorMessageComponent
  ],
})
export class OrderTableComponent implements OnDestroy {
  products!: TestProduct[];

  public currentConnection = input<CurrentConnectionProps | null>();
  public role = input<string | null>();

  public orders = this.service.orderList;

  public contract = computed(() => {
    const currentConnection = this.currentConnection();
    return currentConnection?.contract;
  });

  public selectedOrder = signal<OrderProps | null>(null);

  private warnMsgComponent = viewChild<WarnMessageComponent>(
    WarnMessageComponent,
  );
  private errMsgComponent = viewChild<ErrorMessageComponent>(
    ErrorMessageComponent,
  );

  private readonly _destroy$ = new Subject<void>();
  private readonly destroy$ = this._destroy$.asObservable();

  constructor(private service: Web3ContractService) {
    this.service.getOrders().pipe(takeUntil(this.destroy$)).subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public isBtnDisabled(order: OrderProps): boolean {
    switch (this.role()) {
      case 'controller':
        return !(order.logisticStatus === 'Transit' && order.orderStatus === 'PaidOnContract');
      case 'acceptanceOperator':
        return !(order.logisticStatus === 'TransitAfterControll' && order.orderStatus === 'PaidOnContract');
      default:
        return false;
    }
  }

  public handleOrder(order: OrderProps): void {
    this.selectedOrder.set(order);
    const { orderId } = this.selectedOrder() ?? {};

    if (orderId === null || orderId === undefined) {
      return;
    }

    this.addTx(orderId).subscribe({
      next: () => {
        setTimeout(() => this.warnMsgComponent()?.hideMessage(), 10000);
        this.service.refetchOrders();
      },
      error: (e) => {
        this.errMsgComponent()?.showMessage(e.details ?? `Error in ${this.constructor.name}`);
      }
    })
  }


  private addTx(orderId: BigNumberish): Observable<ContractTransactionReceipt | null> {
    const contract = this.contract();

    if (!contract) {
      console.error(`No contract is passed in ${this.constructor.name}`);
      return EMPTY;
    }
    const addTx$ = this.role() === 'controller' ? from(contract.controll(orderId)) : from(contract.delivered(orderId));

    return addTx$.pipe(
      tap((transaction) => {
        this.warnMsgComponent()?.showMessage({
          summary: `Waiting for transaction ${transaction.hash}...`
        })
      }),
      switchMap((x) => x.wait()))
  }
}
