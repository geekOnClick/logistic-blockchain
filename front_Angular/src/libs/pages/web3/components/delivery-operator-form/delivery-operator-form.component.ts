import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { Web3Service } from '../../services/web3.service';
import { take } from 'rxjs';
import { DELIVETY_OPERATOR_FORM_DEFAULT_CONFIG } from './config';
import { Web3ContractService } from '../../services/web3-contract.service';

@Component({
  selector: 'delivery-operator-form',
  imports: [ButtonModule, Card, FormsModule, ReactiveFormsModule, InputText, FloatLabel, InputNumberModule],
  templateUrl: './delivery-operator-form.component.html',
  standalone: true,
  styleUrl: './delivery-operator-form.component.scss'
})
export class DeliveryOperatorFormComponent {
  public deliveryOperatorForm: FormGroup = this.fb.group(DELIVETY_OPERATOR_FORM_DEFAULT_CONFIG);

  constructor(private fb: FormBuilder, private facade: Web3Service, private service: Web3ContractService) { };

  public handleAddOrder(): void {
    this.facade.addOrder(this.deliveryOperatorForm.getRawValue())
      .pipe(
        take(1)
      ).subscribe({
        next: () => this.deliveryOperatorForm.reset(),
        // при перезапросе списка сразу после получения результата,
        // список не успевает обновиться. setTimeout - обход нежелательного поведения
        complete: () => setTimeout(() => this.service.refetchOrders(), 1000)
      });
  }
}
