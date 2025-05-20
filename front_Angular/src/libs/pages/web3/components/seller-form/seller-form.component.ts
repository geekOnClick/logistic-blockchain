import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Web3ContractService } from '../../services/web3-contract.service';
import { TxsToOwner } from '../../../../types/txs-to-owner';
import { DateFormatPipe } from "../../../../shared/pipes/date.pipe";

@Component({
  selector: 'seller-form',
  imports: [ButtonModule, TableModule, DateFormatPipe],
  templateUrl: './seller-form.component.html',
  standalone: true,
  styleUrl: './seller-form.component.scss'
})
export class SellerFormComponent {
  public acceptedOrders = signal<TxsToOwner[]>([]);

  constructor(private service: Web3ContractService) {
    this.service.getAllAcceptedOrders().subscribe((orders) => this.acceptedOrders.set(orders));
  };
}
