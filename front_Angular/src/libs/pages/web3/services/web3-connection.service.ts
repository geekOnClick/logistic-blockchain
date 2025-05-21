import { DestroyRef, effect, Injectable, signal } from "@angular/core";
import { WinRefService } from "./win-ref.service";
import { from, map, Observable, tap } from "rxjs";
import { CONTRACT_ADDRESS, HARDHAT_NETWORK_ID } from "../config/web3.config";
import { ethers } from "ethers";
import { Logistic__factory } from "../../../../typechain";
import { CurrentConnectionProps } from "../../../types/connection";

@Injectable({ providedIn: 'root' })
export class Web3ConnectionService {
    public currentConnection = signal<CurrentConnectionProps | null>(
        null,
    );

    private ethereum;

    constructor(private destroyRef: DestroyRef, private winRef: WinRefService) {
        this.ethereum = winRef.window.ethereum;

        effect(() => {
            const connection = this.currentConnection();
        });
    }

    public getHardhatNetworkId(): Observable<boolean> {
        return from(this.ethereum.request({ method: 'eth_chainId' })).pipe(
            tap((isHardhatNetworkId) => console.log('HardhatNetworkId', isHardhatNetworkId)),
            map((chosenChainId) => chosenChainId === HARDHAT_NETWORK_ID),
        );
    }

    public updateCurrentConnection(account: string): Promise<void> {
        if (!this.ethereum) {
            return new Promise(resolve => resolve());
        }
        const provider = new ethers.BrowserProvider(this.ethereum);
        return provider.getSigner(account).then((signer) => {
            const newCurrentConnection = {
                provider,
                signer,
                contract: Logistic__factory.connect(CONTRACT_ADDRESS as string, signer),
            } as CurrentConnectionProps;

            this.setCurrentConnection(newCurrentConnection);
            // this.setSignerRole();
        });
    }

    public resetState(): void {
        this.setCurrentConnection(null);
    }

    public selectAccount(): Observable<string> {
        return from(<string>this.ethereum.request({ method: 'eth_requestAccounts' }))
            .pipe(
                tap((t) => console.log('eth_requestAccounts', t)),
                map(([accounts]) => accounts)
            );
    }

    public watchAccountChanged(): void {
        this.ethereum.on(
            'accountsChanged',
            async ([newAccount]: [newAccount: string]) => {
                if (!newAccount) {
                    return this.resetState();
                }
                this.updateCurrentConnection(newAccount);
            },
        );
    }

    public watchChainChanged(): void {
        this.ethereum.on('chainChanged', async () => {
            this.resetState();
        });
    }


    public setCurrentConnection(connection: CurrentConnectionProps | null): void {
        this.currentConnection.set(connection);
    }
}