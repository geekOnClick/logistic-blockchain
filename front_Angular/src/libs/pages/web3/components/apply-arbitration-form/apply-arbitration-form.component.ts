import { Component, computed, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { Web3ContractService } from '../../services/web3-contract.service';
import { Web3Service } from '../../services/web3.service';
import { switchMap, tap } from 'rxjs';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { WarnMessageComponent } from '../../../../shared/warn-message/warn-message.component';

@Component({
  selector: 'apply-arbitration-form',
  imports: [ButtonModule, Card, FormsModule, ReactiveFormsModule, FloatLabel, SelectModule, ErrorMessageComponent, WarnMessageComponent],
  templateUrl: './apply-arbitration-form.component.html',
  standalone: true,
  styleUrl: './apply-arbitration-form.component.scss'
})
export class ApplyArbitrationFormComponent {
  public applyArbitrationForm: FormGroup;
  public orders = this.service.orderList;
  public role = this.facade.role;

  public orderIds = computed(() => {
    const orders = this.orders();

    return orders?.filter((order) =>
      order.orderStatus === 'PaidOnSeller' || order.orderStatus === 'PaidOnContract'
    )?.map((order) => {
      return order.orderId.toString()
    }) ?? [];
  });

  private errorMsgComponent = viewChild<ErrorMessageComponent>(
    ErrorMessageComponent,
  );
  private warnMsgComponent = viewChild<WarnMessageComponent>(
    WarnMessageComponent,
  );

  constructor(private fb: FormBuilder, private facade: Web3Service, private service: Web3ContractService) {
    this.applyArbitrationForm = this.fb.group({
      orderId: [null, Validators.required],
    })
  };

  public handleRefund(): void {
    const role = this.role();

    if (!role) {
      return;
    }

    const { orderId } = this.applyArbitrationForm.value;

    this.service.beginArbitration(BigInt(orderId), role)
      .pipe(
        tap((res) => {
          console.log('payOrder', res);
          this.warnMsgComponent()?.showMessage({ summary: `Waiting arbitration for order ${res.hash}` })
        }),
        switchMap((x) => x.wait())
      ).subscribe({
        next: () => {
          this.applyArbitrationForm.reset();
          this.service.refetchOrders();
          // this.facade.refetchCurrentSignerBalance();
        },
        complete: () => setTimeout(() => this.warnMsgComponent()?.hideMessage(), 10000)
      });
  }

}
