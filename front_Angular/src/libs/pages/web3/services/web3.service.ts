import { DestroyRef, effect, Injectable, OnDestroy, signal, WritableSignal } from "@angular/core";
import { WinRefService } from "./win-ref.service";
import { combineLatest, EMPTY, from, map, Observable, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { CONTRACT_ADDRESS, HARDHAT_NETWORK_ID } from "../config/web3.config";
import { ContractTransactionResponse, ethers } from "ethers";
import { Logistic__factory } from "../../../../typechain";
import { CurrentConnectionProps } from "../../../types/connection";
import { Role } from "../../../types/role";

import { OrderProps } from "../../../types/order";
import { Web3ContractService } from "./web3-contract.service";
import { Web3ConnectionService } from "./web3-connection.service";

@Injectable({ providedIn: 'root' })
export class Web3Service implements OnDestroy {
    public currentConnection = this.connectionService.currentConnection;
    public role = signal<string | null>(null);
    public balance = signal<string | null>(null);
    public address = signal<string | null>(null);


    private ethereum;
    private readonly _destroy$ = new Subject<void>();
    private readonly destroy$ = this._destroy$.asObservable();

    constructor(private destroyRef: DestroyRef, private winRef: WinRefService, private contractService: Web3ContractService, private connectionService: Web3ConnectionService) {
        this.ethereum = winRef.window.ethereum;

        effect(() => {
            const connection = this.currentConnection();
            this.getCurrentSignerData();
            this.contractService.setContract(connection);

        });
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public getHardhatNetworkId(): Observable<boolean> {
        return this.connectionService.getHardhatNetworkId();
    }

    public updateCurrentConnection(account: string): void {
        this.connectionService.updateCurrentConnection(account).then(() => this.setSignerRole());
    }

    public get currentBalance(): WritableSignal<string | null> {
        return this.balance;
    }

    public get currentAddress(): WritableSignal<string | null> {
        return this.address;
    }

    public get currentRole(): WritableSignal<string | null> {
        return this.role;
    }

    public resetState(): void {
        this.connectionService.resetState();
    }

    public selectAccount(): Observable<string> {
        return from(<string>this.ethereum.request({ method: 'eth_requestAccounts' }))
            .pipe(
                map(([accounts]) => accounts)
            );
    }

    public watchAccountChanged(): void {
        this.connectionService.watchAccountChanged();
    }

    public watchChainChanged(): void {
        this.connectionService.watchChainChanged();
    }

    public getOrders(): Observable<OrderProps[]> {
        return this.contractService.getOrders();
    }

    public addOrder(order: OrderProps): Observable<ContractTransactionResponse> {
        return this.contractService.addOrder(order);
    }

    public getCurrentSignerData(): void {
        const currentConnection = this.currentConnection();

        if (!currentConnection) {
            return;
        }

        combineLatest([
            this.getCurrentRole(currentConnection),
            this.getCurrentBalance(currentConnection),
            this.getCurrentAddress(currentConnection)
        ]).pipe(take(1), takeUntil(this.destroy$))
            .subscribe()
    }

    public refetchCurrentSignerBalance(): void {
        const currentConnection = this.currentConnection();

        if (!currentConnection) {
            return;
        }

        this.getCurrentBalance(currentConnection).pipe(take(1), tap((balance) => this.setBalance(String(balance))), takeUntil(this.destroy$)).subscribe();
    }


    private getCurrentBalance(currentConnection: CurrentConnectionProps): Observable<string> {
        const { signer, provider } = currentConnection;

        if (!signer || !provider) {
            throw new Error('Нет подписчика или провайдера');
        }

        return from(provider.getBlockNumber())
            .pipe(
                switchMap((blockNumber) => {
                    return provider.getBalance(signer?.address, blockNumber)
                }),
                map((balance) => balance.toString()),
                tap((balance) => this.setBalance(balance))
            )
    }

    private getCurrentRole(currentConnection: CurrentConnectionProps): Observable<string> {
        const { signer, contract } = currentConnection;

        if (!signer || !contract) {
            throw new Error('Нет подписчика или провайдера');
        }

        return from(signer.getAddress() ?? EMPTY)
            .pipe(
                switchMap((address) => contract.getRoleByAdress(address) ?? EMPTY),
                tap((role) => this.setRole(role))
            );
    }

    private getCurrentAddress(currentConnection: CurrentConnectionProps): Observable<string> {
        const { signer } = currentConnection;

        if (!signer) {
            throw new Error('Нет подписчика');
        }

        return from(signer.getAddress() ?? EMPTY).pipe(tap((address) => this.setAddress(address)));
    }

    private setSignerRole(): void {
        from(this.currentConnection()?.signer?.getAddress() ?? EMPTY)
            .pipe(
                switchMap((address) => this.currentConnection()?.contract?.getRoleByAdress(address) ?? EMPTY),
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: (role) => {
                    role && this.setRole(role);
                }
            });
    }

    private setRole(role: string): void {
        const newRole = role in Role ? role : null;
        this.role.set(newRole);
    }

    private setAddress(address: string | null): void {
        this.address.set(address);
    }

    private setBalance(balance: string | null): void {
        this.balance.set(balance);
    }
}