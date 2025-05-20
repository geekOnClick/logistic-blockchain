import { Injectable, signal, WritableSignal } from "@angular/core";
import { CurrentConnectionProps } from "../../../types/connection";
import { EMPTY, from, map, Observable, of, take, tap } from "rxjs";
import { Logistic } from "../../../../typechain";
import { OrderProps } from "../../../types/order";
import { ContractTransactionResponse } from "ethers";
import { TxsToOwner } from "../../../types/txs-to-owner";

@Injectable()
export class Web3ContractService {
    private contract = signal<Logistic | null>(
        null,
    );

    private orders = signal<OrderProps[] | null>(
        null,
    );


    public setContract(connection: CurrentConnectionProps | null): void {
        this.contract.set(connection?.contract ?? null);
        this.refetchOrders();
    }

    public failContract(orderId: number): Observable<ContractTransactionResponse> {
        const contract = this.contract();

        if (!contract) {
            return EMPTY;
        }

        return from(contract.controllFailed(orderId));
    }

    public controllSuccess(orderId: number): Observable<ContractTransactionResponse> {
        const contract = this.contract();

        if (!contract) {
            return EMPTY;
        }

        return from(contract.controllSuccess(orderId));
    }

    public addTx(role: string): void {

    }

    public get orderList(): WritableSignal<OrderProps[] | null> {
        return this.orders;
    }

    public getOrders(): Observable<OrderProps[]> {
        const contract = this.contract();

        if (!contract) {
            return of([]);
        }
        return from(contract.allOrders()).pipe(map((orders) => this.mapOrders(orders)), tap((orders) => this.orders.set(orders)));
    }

    public getAllAcceptedOrders(): Observable<TxsToOwner[]> {
        const contract = this.contract();

        if (!contract) {
            return of([]);
        }
        return from(contract.allAcceptedOrders()).pipe(
            map((orders) => orders.map((order) => ({
                orderId: order.orderId,
                timestamp: order.timestamp,
                value: order.value
            }))),
            tap((orders) => console.log('allAcceptedOrders', orders)));
    }

    public addOrder(order: OrderProps): Observable<ContractTransactionResponse> {
        const contract = this.contract();

        if (!contract) {
            return EMPTY;
        }

        const { resourceId, resourceTitle, resourceWeight, resourcePrice } = order;

        return from(contract.addOrder(
            BigInt(resourceId),
            resourceTitle,
            BigInt(resourceWeight),
            BigInt(resourcePrice)
        ));
    }

    public payOrder(orderId: bigint, resourcePrice: bigint): Observable<ContractTransactionResponse> {
        const contract = this.contract();

        if (!contract) {
            return EMPTY;
        }

        return from(contract.buy(orderId, { value: resourcePrice }));
    }

    public acceptOrder(orderId: bigint): Observable<ContractTransactionResponse> {
        const contract = this.contract();

        if (!contract) {
            return EMPTY;
        }

        return from(contract.acceptOrder(orderId)).pipe(tap((x) => console.log('acceptOrder', x)))

    }

    public controllFailed(orderId: bigint): Observable<ContractTransactionResponse> {
        const contract = this.contract();

        if (!contract) {
            return EMPTY;
        }

        return from(contract.controllFailed(orderId)).pipe(tap((x) => console.log('acceptOrder', x)))

    }

    public refetchOrders(): void {
        const contract = this.contract();

        if (!contract) {
            return;
        }
        from(contract.allOrders()).pipe(take(1), map((orders) => this.mapOrders(orders)), tap((orders) => this.orders.set(orders))).subscribe();
    }

    public beginArbitration(orderId: bigint, role: string): Observable<ContractTransactionResponse> {
        const contract = this.contract();

        if (!contract) {
            return EMPTY;
        }
        return from(contract.beginArbitration(orderId, role)).pipe(tap((x) => console.log('beginArbitration', x)))

    }

    private mapOrders(orders: Logistic.OrderStructOutput[]): OrderProps[] {
        return orders.map((order) => ({
            orderId: order.orderId,
            resourceId: order.resourceId,
            resourceTitle: order.resourceTitle,
            resourceWeight: order.resourceWeight,
            resourcePrice: order.resourcePrice,
            orderedAt: order.orderedAt,
            orderStatus: order.orderStatus,
            logisticStatus: order.logisticStatus,
            isArbitrating: order.isArbitrating,
            arbitratingBy: order.arbitratingBy,
            numberOfVotes: order.numberOfVotes,
            arbitrationWinner: order.arbitrationWinner
        }))
    }

}