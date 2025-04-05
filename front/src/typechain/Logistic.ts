/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace Logistic {
  export type AcceptedOrderStruct = {
    timestamp: BigNumberish;
    orderId: BigNumberish;
    value: BigNumberish;
  };

  export type AcceptedOrderStructOutput = [
    timestamp: bigint,
    orderId: bigint,
    value: bigint
  ] & { timestamp: bigint; orderId: bigint; value: bigint };

  export type OrderStruct = {
    orderId: BigNumberish;
    resourceId: BigNumberish;
    resourceTitle: string;
    resourceWeight: BigNumberish;
    resourcePrice: BigNumberish;
    orderedAt: BigNumberish;
    orderStatus: string;
    logisticStatus: string;
    isArbitrating: boolean;
    arbitratingBy: string;
    numberOfVotes: BigNumberish;
    arbitrationWinner: string;
  };

  export type OrderStructOutput = [
    orderId: bigint,
    resourceId: bigint,
    resourceTitle: string,
    resourceWeight: bigint,
    resourcePrice: bigint,
    orderedAt: bigint,
    orderStatus: string,
    logisticStatus: string,
    isArbitrating: boolean,
    arbitratingBy: string,
    numberOfVotes: bigint,
    arbitrationWinner: string
  ] & {
    orderId: bigint;
    resourceId: bigint;
    resourceTitle: string;
    resourceWeight: bigint;
    resourcePrice: bigint;
    orderedAt: bigint;
    orderStatus: string;
    logisticStatus: string;
    isArbitrating: boolean;
    arbitratingBy: string;
    numberOfVotes: bigint;
    arbitrationWinner: string;
  };
}

export interface LogisticInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "acceptOrder"
      | "acceptanceOperator"
      | "acceptedOrders"
      | "addOrder"
      | "allAcceptedOrders"
      | "allOrders"
      | "allVoters"
      | "bayer"
      | "beginArbitration"
      | "buy"
      | "controll"
      | "controllFailed"
      | "controllSuccess"
      | "controller"
      | "currentOrderIndex"
      | "delivered"
      | "deliveryOperator"
      | "getRoleByAdress"
      | "logisticStatus"
      | "orderAt"
      | "orderStatus"
      | "orders"
      | "owner"
      | "supportsInterface"
      | "vote"
      | "voting"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "MoneyPaidToBayer"
      | "MoneyPaidToSeller"
      | "OrderAccepted"
      | "OrderCancelled"
      | "OrderControll"
      | "OrderControllFailed"
      | "OrderControllPassed"
      | "OrderCreated"
      | "OrderDelivered"
      | "OrderPayed"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "acceptOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptanceOperator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptedOrders",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addOrder",
    values: [BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allAcceptedOrders",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "allOrders", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "allVoters",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "bayer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "beginArbitration",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "buy", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "controll",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "controllFailed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "controllSuccess",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "controller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentOrderIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "delivered",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deliveryOperator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleByAdress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "logisticStatus",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "orderAt", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "orderStatus",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "orders",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "voting",
    values: [BigNumberish, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptanceOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptedOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addOrder", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allAcceptedOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allOrders", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allVoters", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bayer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "beginArbitration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "controll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "controllFailed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "controllSuccess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "controller", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "currentOrderIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "delivered", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deliveryOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleByAdress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "logisticStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "orderAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "orderStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "orders", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voting", data: BytesLike): Result;
}

export namespace MoneyPaidToBayerEvent {
  export type InputTuple = [
    orderId: BigNumberish,
    timestamp: BigNumberish,
    value: BigNumberish
  ];
  export type OutputTuple = [orderId: bigint, timestamp: bigint, value: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MoneyPaidToSellerEvent {
  export type InputTuple = [
    orderId: BigNumberish,
    timestamp: BigNumberish,
    value: BigNumberish
  ];
  export type OutputTuple = [orderId: bigint, timestamp: bigint, value: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OrderAcceptedEvent {
  export type InputTuple = [orderId: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [orderId: bigint, timestamp: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OrderCancelledEvent {
  export type InputTuple = [orderId: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [orderId: bigint, timestamp: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OrderControllEvent {
  export type InputTuple = [orderId: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [orderId: bigint, timestamp: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OrderControllFailedEvent {
  export type InputTuple = [orderId: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [orderId: bigint, timestamp: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OrderControllPassedEvent {
  export type InputTuple = [orderId: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [orderId: bigint, timestamp: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OrderCreatedEvent {
  export type InputTuple = [
    orderId: BigNumberish,
    resourceId: BigNumberish,
    resourceWeight: BigNumberish,
    resourcePrice: BigNumberish
  ];
  export type OutputTuple = [
    orderId: bigint,
    resourceId: bigint,
    resourceWeight: bigint,
    resourcePrice: bigint
  ];
  export interface OutputObject {
    orderId: bigint;
    resourceId: bigint;
    resourceWeight: bigint;
    resourcePrice: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OrderDeliveredEvent {
  export type InputTuple = [orderId: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [orderId: bigint, timestamp: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OrderPayedEvent {
  export type InputTuple = [orderId: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [orderId: bigint, timestamp: bigint];
  export interface OutputObject {
    orderId: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Logistic extends BaseContract {
  connect(runner?: ContractRunner | null): Logistic;
  waitForDeployment(): Promise<this>;

  interface: LogisticInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  acceptOrder: TypedContractMethod<
    [_orderId: BigNumberish],
    [void],
    "nonpayable"
  >;

  acceptanceOperator: TypedContractMethod<[], [string], "view">;

  acceptedOrders: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, bigint] & {
        timestamp: bigint;
        orderId: bigint;
        value: bigint;
      }
    ],
    "view"
  >;

  addOrder: TypedContractMethod<
    [
      _resourceId: BigNumberish,
      _resourceTitle: string,
      _resourceWeight: BigNumberish,
      _resourcePrice: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  allAcceptedOrders: TypedContractMethod<
    [],
    [Logistic.AcceptedOrderStructOutput[]],
    "view"
  >;

  allOrders: TypedContractMethod<[], [Logistic.OrderStructOutput[]], "view">;

  allVoters: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  bayer: TypedContractMethod<[], [string], "view">;

  beginArbitration: TypedContractMethod<
    [_orderId: BigNumberish, _arbitratingBy: string],
    [void],
    "nonpayable"
  >;

  buy: TypedContractMethod<[_orderId: BigNumberish], [void], "payable">;

  controll: TypedContractMethod<[_orderId: BigNumberish], [void], "nonpayable">;

  controllFailed: TypedContractMethod<
    [_orderId: BigNumberish],
    [void],
    "nonpayable"
  >;

  controllSuccess: TypedContractMethod<
    [_orderId: BigNumberish],
    [void],
    "nonpayable"
  >;

  controller: TypedContractMethod<[], [string], "view">;

  currentOrderIndex: TypedContractMethod<[], [bigint], "view">;

  delivered: TypedContractMethod<
    [_orderId: BigNumberish],
    [void],
    "nonpayable"
  >;

  deliveryOperator: TypedContractMethod<[], [string], "view">;

  getRoleByAdress: TypedContractMethod<
    [_address: AddressLike],
    [string],
    "view"
  >;

  logisticStatus: TypedContractMethod<[], [string], "view">;

  orderAt: TypedContractMethod<[], [bigint], "view">;

  orderStatus: TypedContractMethod<[], [string], "view">;

  orders: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        string,
        string,
        boolean,
        string,
        bigint,
        string
      ] & {
        orderId: bigint;
        resourceId: bigint;
        resourceTitle: string;
        resourceWeight: bigint;
        resourcePrice: bigint;
        orderedAt: bigint;
        orderStatus: string;
        logisticStatus: string;
        isArbitrating: boolean;
        arbitratingBy: string;
        numberOfVotes: bigint;
        arbitrationWinner: string;
      }
    ],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  vote: TypedContractMethod<
    [_orderId: BigNumberish, _isAccepted: boolean],
    [void],
    "nonpayable"
  >;

  voting: TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "acceptOrder"
  ): TypedContractMethod<[_orderId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "acceptanceOperator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "acceptedOrders"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, bigint] & {
        timestamp: bigint;
        orderId: bigint;
        value: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "addOrder"
  ): TypedContractMethod<
    [
      _resourceId: BigNumberish,
      _resourceTitle: string,
      _resourceWeight: BigNumberish,
      _resourcePrice: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "allAcceptedOrders"
  ): TypedContractMethod<[], [Logistic.AcceptedOrderStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "allOrders"
  ): TypedContractMethod<[], [Logistic.OrderStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "allVoters"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "bayer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "beginArbitration"
  ): TypedContractMethod<
    [_orderId: BigNumberish, _arbitratingBy: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "buy"
  ): TypedContractMethod<[_orderId: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "controll"
  ): TypedContractMethod<[_orderId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "controllFailed"
  ): TypedContractMethod<[_orderId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "controllSuccess"
  ): TypedContractMethod<[_orderId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "controller"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "currentOrderIndex"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "delivered"
  ): TypedContractMethod<[_orderId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deliveryOperator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getRoleByAdress"
  ): TypedContractMethod<[_address: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "logisticStatus"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "orderAt"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "orderStatus"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "orders"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        string,
        string,
        boolean,
        string,
        bigint,
        string
      ] & {
        orderId: bigint;
        resourceId: bigint;
        resourceTitle: string;
        resourceWeight: bigint;
        resourcePrice: bigint;
        orderedAt: bigint;
        orderStatus: string;
        logisticStatus: string;
        isArbitrating: boolean;
        arbitratingBy: string;
        numberOfVotes: bigint;
        arbitrationWinner: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "vote"
  ): TypedContractMethod<
    [_orderId: BigNumberish, _isAccepted: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "voting"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [boolean],
    "view"
  >;

  getEvent(
    key: "MoneyPaidToBayer"
  ): TypedContractEvent<
    MoneyPaidToBayerEvent.InputTuple,
    MoneyPaidToBayerEvent.OutputTuple,
    MoneyPaidToBayerEvent.OutputObject
  >;
  getEvent(
    key: "MoneyPaidToSeller"
  ): TypedContractEvent<
    MoneyPaidToSellerEvent.InputTuple,
    MoneyPaidToSellerEvent.OutputTuple,
    MoneyPaidToSellerEvent.OutputObject
  >;
  getEvent(
    key: "OrderAccepted"
  ): TypedContractEvent<
    OrderAcceptedEvent.InputTuple,
    OrderAcceptedEvent.OutputTuple,
    OrderAcceptedEvent.OutputObject
  >;
  getEvent(
    key: "OrderCancelled"
  ): TypedContractEvent<
    OrderCancelledEvent.InputTuple,
    OrderCancelledEvent.OutputTuple,
    OrderCancelledEvent.OutputObject
  >;
  getEvent(
    key: "OrderControll"
  ): TypedContractEvent<
    OrderControllEvent.InputTuple,
    OrderControllEvent.OutputTuple,
    OrderControllEvent.OutputObject
  >;
  getEvent(
    key: "OrderControllFailed"
  ): TypedContractEvent<
    OrderControllFailedEvent.InputTuple,
    OrderControllFailedEvent.OutputTuple,
    OrderControllFailedEvent.OutputObject
  >;
  getEvent(
    key: "OrderControllPassed"
  ): TypedContractEvent<
    OrderControllPassedEvent.InputTuple,
    OrderControllPassedEvent.OutputTuple,
    OrderControllPassedEvent.OutputObject
  >;
  getEvent(
    key: "OrderCreated"
  ): TypedContractEvent<
    OrderCreatedEvent.InputTuple,
    OrderCreatedEvent.OutputTuple,
    OrderCreatedEvent.OutputObject
  >;
  getEvent(
    key: "OrderDelivered"
  ): TypedContractEvent<
    OrderDeliveredEvent.InputTuple,
    OrderDeliveredEvent.OutputTuple,
    OrderDeliveredEvent.OutputObject
  >;
  getEvent(
    key: "OrderPayed"
  ): TypedContractEvent<
    OrderPayedEvent.InputTuple,
    OrderPayedEvent.OutputTuple,
    OrderPayedEvent.OutputObject
  >;

  filters: {
    "MoneyPaidToBayer(uint256,uint256,uint256)": TypedContractEvent<
      MoneyPaidToBayerEvent.InputTuple,
      MoneyPaidToBayerEvent.OutputTuple,
      MoneyPaidToBayerEvent.OutputObject
    >;
    MoneyPaidToBayer: TypedContractEvent<
      MoneyPaidToBayerEvent.InputTuple,
      MoneyPaidToBayerEvent.OutputTuple,
      MoneyPaidToBayerEvent.OutputObject
    >;

    "MoneyPaidToSeller(uint256,uint256,uint256)": TypedContractEvent<
      MoneyPaidToSellerEvent.InputTuple,
      MoneyPaidToSellerEvent.OutputTuple,
      MoneyPaidToSellerEvent.OutputObject
    >;
    MoneyPaidToSeller: TypedContractEvent<
      MoneyPaidToSellerEvent.InputTuple,
      MoneyPaidToSellerEvent.OutputTuple,
      MoneyPaidToSellerEvent.OutputObject
    >;

    "OrderAccepted(uint256,uint256)": TypedContractEvent<
      OrderAcceptedEvent.InputTuple,
      OrderAcceptedEvent.OutputTuple,
      OrderAcceptedEvent.OutputObject
    >;
    OrderAccepted: TypedContractEvent<
      OrderAcceptedEvent.InputTuple,
      OrderAcceptedEvent.OutputTuple,
      OrderAcceptedEvent.OutputObject
    >;

    "OrderCancelled(uint256,uint256)": TypedContractEvent<
      OrderCancelledEvent.InputTuple,
      OrderCancelledEvent.OutputTuple,
      OrderCancelledEvent.OutputObject
    >;
    OrderCancelled: TypedContractEvent<
      OrderCancelledEvent.InputTuple,
      OrderCancelledEvent.OutputTuple,
      OrderCancelledEvent.OutputObject
    >;

    "OrderControll(uint256,uint256)": TypedContractEvent<
      OrderControllEvent.InputTuple,
      OrderControllEvent.OutputTuple,
      OrderControllEvent.OutputObject
    >;
    OrderControll: TypedContractEvent<
      OrderControllEvent.InputTuple,
      OrderControllEvent.OutputTuple,
      OrderControllEvent.OutputObject
    >;

    "OrderControllFailed(uint256,uint256)": TypedContractEvent<
      OrderControllFailedEvent.InputTuple,
      OrderControllFailedEvent.OutputTuple,
      OrderControllFailedEvent.OutputObject
    >;
    OrderControllFailed: TypedContractEvent<
      OrderControllFailedEvent.InputTuple,
      OrderControllFailedEvent.OutputTuple,
      OrderControllFailedEvent.OutputObject
    >;

    "OrderControllPassed(uint256,uint256)": TypedContractEvent<
      OrderControllPassedEvent.InputTuple,
      OrderControllPassedEvent.OutputTuple,
      OrderControllPassedEvent.OutputObject
    >;
    OrderControllPassed: TypedContractEvent<
      OrderControllPassedEvent.InputTuple,
      OrderControllPassedEvent.OutputTuple,
      OrderControllPassedEvent.OutputObject
    >;

    "OrderCreated(uint256,uint256,uint256,uint256)": TypedContractEvent<
      OrderCreatedEvent.InputTuple,
      OrderCreatedEvent.OutputTuple,
      OrderCreatedEvent.OutputObject
    >;
    OrderCreated: TypedContractEvent<
      OrderCreatedEvent.InputTuple,
      OrderCreatedEvent.OutputTuple,
      OrderCreatedEvent.OutputObject
    >;

    "OrderDelivered(uint256,uint256)": TypedContractEvent<
      OrderDeliveredEvent.InputTuple,
      OrderDeliveredEvent.OutputTuple,
      OrderDeliveredEvent.OutputObject
    >;
    OrderDelivered: TypedContractEvent<
      OrderDeliveredEvent.InputTuple,
      OrderDeliveredEvent.OutputTuple,
      OrderDeliveredEvent.OutputObject
    >;

    "OrderPayed(uint256,uint256)": TypedContractEvent<
      OrderPayedEvent.InputTuple,
      OrderPayedEvent.OutputTuple,
      OrderPayedEvent.OutputObject
    >;
    OrderPayed: TypedContractEvent<
      OrderPayedEvent.InputTuple,
      OrderPayedEvent.OutputTuple,
      OrderPayedEvent.OutputObject
    >;
  };
}
