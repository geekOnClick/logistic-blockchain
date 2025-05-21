import { ChangeDetectorRef, Component, signal, viewChild } from '@angular/core';
import { NgIf } from '@angular/common';

import { DeliveryOperatorFormComponent } from './components/delivery-operator-form/delivery-operator-form.component';
import { AcceptanceOperatorFormComponent } from './components/acceptance-operator-form/acceptance-operator-form.component';
import { ApplyArbitrationFormComponent } from './components/apply-arbitration-form/apply-arbitration-form.component';
import { BayerFormComponent } from './components/bayer-form/bayer-form.component';
import { Role } from '../../../libs/types/role';
import { ConnectWalletComponent } from './components/connect-wallet/connect-wallet.component';

import { WinRefService } from './services/win-ref.service';

import { filter, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ErrorMessageComponent } from '../../../libs/shared/error-message/error-message.component';

import { Web3Service } from './services/web3.service';
import { CONTRACT_ADDRESS, HARDHAT_NETWORK_ERROR } from './config/web3.config';
import { ControllerFormComponent } from "./components/controller-form/controller-form.component";
import { SellerFormComponent } from "./components/seller-form/seller-form.component";
import { OrderTableComponent } from "./components/order-table/order-table.component";
import { AccordionModule } from 'primeng/accordion';
import { WarnMessageComponent } from "../../shared/warn-message/warn-message.component";

import { CurrentBalanceComponent } from './components/current-balance/current-balance.component';
import { Web3ContractService } from './services/web3-contract.service';

@Component({
    selector: 'web3',
    imports: [
        NgIf,
        CurrentBalanceComponent,
        DeliveryOperatorFormComponent,
        AcceptanceOperatorFormComponent,
        ApplyArbitrationFormComponent,
        BayerFormComponent,
        ConnectWalletComponent,
        ErrorMessageComponent,
        ControllerFormComponent,
        SellerFormComponent,
        OrderTableComponent,
        AccordionModule,
        WarnMessageComponent
    ],
    providers: [WinRefService, Web3Service, Web3ContractService],
    templateUrl: './web3.component.html',
    standalone: true,
    styleUrl: './web3.component.scss',
})
export class Web3Component {
    public Role = Role;

    public readonly isAuth = signal<boolean>(true);

    private ethereum;
    private readonly _destroy$ = new Subject<void>();
    private readonly destroy$ = this._destroy$.asObservable();

    private errorMsgComponent = viewChild<ErrorMessageComponent>(
        ErrorMessageComponent,
    );
    private warnMsgComponent = viewChild<WarnMessageComponent>(
        WarnMessageComponent,
    );

    constructor(private winRef: WinRefService, public web3Service: Web3Service) {
        this.ethereum = winRef.window.ethereum;
    }

    // работа с аккаунтами на метамаск
    public connectWallet(): void {
        if (!this.ethereum) {
            this.setNetworkError('Metamask is not detected');
            return;
        }

        this.checkAndUpdateAccount();
        this.web3Service.watchAccountChanged();
        this.web3Service.watchChainChanged();
    }


    public setNetworkError(summary: string): void {
        this.errorMsgComponent()?.showMessage({
            summary,
        });
    }

    private checkAndUpdateAccount(): void {
        this.web3Service.getHardhatNetworkId()
            .pipe(
                take(1),
                filter((isHardhatNetworkId) => {
                    if (!isHardhatNetworkId) {
                        this.setNetworkError(HARDHAT_NETWORK_ERROR);
                    }
                    return true;
                }),
                switchMap(() => this.web3Service.selectAccount()),
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: (selectedAccount) => {
                    console.log('selectedAccount', selectedAccount)
                    this.web3Service.updateCurrentConnection(selectedAccount);
                },
            });
    }

}
