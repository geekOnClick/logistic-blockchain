import { Component, computed, viewChild, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderProps } from '../../../../types/order';
import { ErrorMessageComponent } from "../../../../shared/error-message/error-message.component";
import { WarnMessageComponent } from "../../../../shared/warn-message/warn-message.component";
import { distinctUntilChanged, switchMap, take, tap } from 'rxjs';
import { Web3Service } from '../../services/web3.service';
import { SelectModule } from 'primeng/select';
import { Web3ContractService } from '../../services/web3-contract.service';

@Component({
  selector: 'bayer-form',
  imports: [ButtonModule, Card, FormsModule, ReactiveFormsModule, FloatLabel, InputNumberModule, SelectModule, ErrorMessageComponent, WarnMessageComponent],
  templateUrl: './bayer-form.component.html',
  standalone: true,
  styleUrl: './bayer-form.component.scss'
})
export class BayerFormComponent {
  bayerForm: FormGroup;

  public orderIds = computed(() => {
    const orders = this.orders();

    return orders?.filter((order) =>
      order.orderStatus === 'Unpaid'
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

  constructor(private fb: FormBuilder, private service: Web3ContractService, private facade: Web3Service) {
    this.bayerForm = this.fb.group({
      orderId: [null, Validators.required],
      resourcePrice: [{ value: null, disabled: true }, Validators.required]
    });

    this.watchForm();
  };

  ngOnInit() {
  }

  addUser() {
    console.log(this.bayerForm.value);
  }

  public handlePayOrder(): void {
    // покупатель может оплатить любой товар в любое время
    const orders = this.orders();
    const { orderId, resourcePrice } = this.bayerForm.getRawValue();

    const order = orders?.find((order) => order.orderId == orderId);
    if (!order) {
      this.errorMsgComponent()?.showMessage({ summary: 'No such orderId in available order list' });
      return;
    }

    if (!(order.resourcePrice == resourcePrice)) {
      this.errorMsgComponent()?.showMessage({ summary: 'Incorrect resource price' });
      return;
    }


    this.service.payOrder(BigInt(orderId), BigInt(resourcePrice))
      .pipe(
        tap((res) => {
          console.log('payOrder', res);
          this.warnMsgComponent()?.showMessage({ summary: `Waiting payment for order ${res.hash}` })
        }),
        switchMap((x) => x.wait())
      ).subscribe({
        next: () => {
          this.bayerForm.reset();
          this.service.refetchOrders();
          this.facade.refetchCurrentSignerBalance();
        },
        complete: () => setTimeout(() => this.warnMsgComponent()?.hideMessage(), 10000)
      });
  }

  private watchForm(): void {
    this.bayerForm.get('orderId')?.valueChanges
      .pipe(
        distinctUntilChanged(),
      )
      .subscribe((orderId) => {
        const resourcePrice = this.orders()?.find((order) => order.orderId == orderId)?.resourcePrice ?? null;
        this.bayerForm.get('resourcePrice')?.setValue(resourcePrice);
      })
  }
}
