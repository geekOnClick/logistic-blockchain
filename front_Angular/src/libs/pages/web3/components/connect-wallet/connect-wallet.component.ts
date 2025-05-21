import { Component, EventEmitter, Output } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'connect-wallet',
  imports: [Button],
  templateUrl: './connect-wallet.component.html',
  styleUrl: './connect-wallet.component.scss',
  standalone: true,
})
export class ConnectWalletComponent {
  @Output()
  public connectWalletEmited =
    new EventEmitter<void>();


  public connectWallet(): void {
    this.connectWalletEmited.emit();
  }
}
