import { Component, computed, effect, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { Checkbox } from 'primeng/checkbox';
import { Web3ContractService } from '../../services/web3-contract.service';
import { CONTROLLER_DEFAULT_FORM_CONFIG } from './config';
import { SelectModule } from 'primeng/select';
import { ErrorMessageComponent } from "../../../../shared/error-message/error-message.component";
import { WarnMessageComponent } from "../../../../shared/warn-message/warn-message.component";
import { Observable, switchMap, tap } from 'rxjs';
import { ContractTransactionReceipt } from 'ethers';

@Component({
  selector: 'controller-form',
  imports: [ButtonModule, Card, FormsModule, ReactiveFormsModule, FloatLabel, InputNumberModule, Checkbox, SelectModule, ErrorMessageComponent, WarnMessageComponent],
  templateUrl: './controller-form.component.html',
  standalone: true,
  styleUrl: './controller-form.component.scss'
})
export class ControllerFormComponent {
  public controllerForm: FormGroup = this.fb.group(CONTROLLER_DEFAULT_FORM_CONFIG);
  public orderIds = computed(() => {
    const orders = this.orders();
    return orders?.filter((order) =>
      order.logisticStatus === 'Control'
    )?.map((order) => {
      return order.orderId.toString()
    }) ?? [];
  });

  private orders = this.service.orderList;

  private errorMsgComponent = viewChild<ErrorMessageComponent>(
    ErrorMessageComponent,
  );
  private warnMsgComponent = viewChild<WarnMessageComponent>(
    WarnMessageComponent,
  );

  constructor(private fb: FormBuilder, private service: Web3ContractService) {
    effect(() => {
      const orders = this.orders();
    })
  };

  public handleMakeDecision(): void {
    console.log('makeDecision', this.controllerForm.value);

    const { orderId, isDocumentsCorrect, isNoViolations } = this.controllerForm.value;
    const order = this.orders()?.find((order) => order.orderId == orderId);
    console.log('order', order);

    if (!order) {
      this.errorMsgComponent()?.showMessage({ summary: 'Not correct order ID' });
      return;
    }


    this.makeDecision(!isDocumentsCorrect || !isNoViolations, orderId)
      .subscribe({
        next: () => {
          this.controllerForm.reset();
          this.service.refetchOrders();
        },
        error: (e) => {
          console.log('ERRRRR', e);
          this.errorMsgComponent()?.showMessage(e.details ?? `Error in ${this.constructor.name}`);
        },
        complete: () => setTimeout(() => this.warnMsgComponent()?.hideMessage(), 10000)
      });

  }

  private makeDecision(isFaled: boolean, orderId: number): Observable<ContractTransactionReceipt | null> {
    if (isFaled) {
      // Проверка отклонила ордер
      return this.service.failContract(orderId).pipe(
        tap((controlTx) => {
          console.log('failContract', controlTx);
          this.warnMsgComponent()?.showMessage({
            summary: `Waiting for transaction ${controlTx.hash}...`
          })
        }),
        switchMap((x) => x.wait()))
    } else {
      // Успешный сценарий
      return this.service.controllSuccess(orderId).pipe(
        tap((controlTx) => {
          console.log('failContract', controlTx);
          this.warnMsgComponent()?.showMessage({
            summary: `Waiting for transaction ${controlTx.hash}...`
          })
        }),
        switchMap((x) => x.wait()))
    }
  }
}
