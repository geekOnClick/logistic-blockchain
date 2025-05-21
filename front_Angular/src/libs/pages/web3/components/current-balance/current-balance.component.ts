import { Component, effect, signal, WritableSignal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Web3Service } from '../../services/web3.service';


const DEFAULT_FORM_GROUP = {
  role: [null],
  balance: [`000 ETH`],
  address: [null]
}

@Component({
  selector: 'current-balance',
  templateUrl: './current-balance.component.html',
  standalone: true,
  styleUrl: './current-balance.component.scss',
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputText,
    FloatLabel
  ],
})
export class CurrentBalanceComponent {
  public userForm$ = signal<FormGroup>(this.getInitialForm());

  private role: WritableSignal<string | null> = this.facade.role;
  private address: WritableSignal<string | null> = this.facade.address;
  private balance: WritableSignal<string | null> = this.facade.balance;

  constructor(private fb: FormBuilder, private facade: Web3Service) {

    effect(async () => {
      const role = this.role() ?? '';
      const address = this.address() ?? '';
      const balance = this.balance() ?? '';

      this.userForm$.set(this.getUpdatedForm({ role, balance, address }));
    });
  };


  private getInitialForm(): FormGroup {
    const form = this.fb.group(DEFAULT_FORM_GROUP);
    form.disable();

    return form;
  }

  private getUpdatedForm(props: { role: string, balance: string, address: string }): FormGroup {
    const { role, balance, address } = props;
    const newForm = this.fb.group({
      role: [`${role}`],
      balance: [`${balance} ETH`],
      address: [`${address}`]
    });
    newForm.disable();

    return newForm;
  }
}
