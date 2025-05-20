import { Component, computed, viewChild, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { Checkbox } from 'primeng/checkbox';
import { Web3ContractService } from '../../services/web3-contract.service';
import { Observable, switchMap, tap } from 'rxjs';
import { ContractTransactionResponse } from 'ethers';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { WarnMessageComponent } from '../../../../shared/warn-message/warn-message.component';
import { OrderProps } from '../../../../types/order';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'acceptance-operator-form',
  imports: [ButtonModule, Card, FormsModule, ReactiveFormsModule, SelectModule, FloatLabel, InputNumberModule, Checkbox, ErrorMessageComponent, WarnMessageComponent],
  templateUrl: './acceptance-operator-form.component.html',
  standalone: true,
  styleUrl: './acceptance-operator-form.component.scss'
})
export class AcceptanceOperatorFormComponent {
  public acceptanceOperatorForm: FormGroup;

  public orderIds = computed(() => {
    const orders = this.orders();

    return orders?.filter((order) =>
      order.orderStatus === 'PaidOnContract' && order.logisticStatus === 'Delivered'
    )?.map((order) => {
      return order.orderId.toString()
    }) ?? [];
  });

  private orders: WritableSignal<OrderProps[] | null> = this.service.orderList;

  private errorMsgComponent = viewChild<ErrorMessageComponent>(
    ErrorMessageComponent,
  );
  private warnMsgComponent = viewChild<WarnMessageComponent>(
    WarnMessageComponent,
  );

  constructor(private fb: FormBuilder, private service: Web3ContractService) {
    this.acceptanceOperatorForm = this.fb.group({
      orderId: [null, Validators.required],
      cargoNotDamaged: [false],
      resourceWeight: [null, Validators.required]
    })
  };

  public handleMakeDecision(): void {
    const makeDesicion$ = this.getDecisionObservable();
    makeDesicion$.pipe(
      tap((tx) => {
        this.warnMsgComponent()?.showMessage({
          summary: `Waiting for transaction ${tx.hash}...`
        })
      }),
      switchMap((x) => x.wait()))
      .subscribe({
        next: () => {
          this.acceptanceOperatorForm.reset();
          this.service.refetchOrders();
        },
        error: (e) => {
          this.errorMsgComponent()?.showMessage(e.details ?? `Error in ${this.constructor.name}`);
        },
        complete: () => setTimeout(() => this.warnMsgComponent()?.hideMessage(), 10000)
      });
  }

  private getDecisionObservable(): Observable<ContractTransactionResponse> {
    const { orderId, cargoNotDamaged, resourceWeight } = this.acceptanceOperatorForm.value;

    if (cargoNotDamaged && resourceWeight) {
      return this.service.acceptOrder(BigInt(orderId));
    } else {
      return this.service.controllFailed(BigInt(orderId));
    }
  }
}
