import { Component } from '@angular/core';

import { WinRefService } from './win-ref.service';
import { RouterOutlet } from '@angular/router';


// НЕ ЗАБЫТЬ МЕНЯТЬ АДРЕС КОНТРАКТА
const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const HARDHAT_NETWORK_ID = '0x539';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  providers: [{ provide: WinRefService, useClass: WinRefService }],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
