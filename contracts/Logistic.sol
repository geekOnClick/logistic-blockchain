// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC165.sol";
contract Logistic is ERC165 {
    // На будущее развитие:
    // 1. Добавить функцию вывода средств в случае не поставки/споров и тд
    // 2. Добавить функцию позволяющую добавлять новые адреса в массив адресов по ролям и для всех кто в массиве выводить соответствующий фронт
    // 3. Добавить в структуру заказа адрес продавца (массив продавцов) куда выводить средства после поставки
    // 4. Добавить функции контролеру не пропускать товар, оператору приемки не принимать товар
    // 5. Хранение логов событий изменения в блокчейне
    // 6. Добавить мультсайн (3 из 5 нод) для автоматического определения куда выводить деньги

    // Ether.js и солидити не умеют корректно передавать enum (передает bigint вместо строки, что не удобно). Поэтому используем строки
    // enum OrderStatus {
    //     PaidOnContract,
    //     PaidOnSeller,
    //     Unpaid,
    //     Refund
    // }
    // enum LogisticStatus {
    //     Created,
    //     Transit,
    //     Control,
    //     Delivered,
    //     Accepted,
    //     Cancelled
    // }

    struct Order {
        uint256 orderId;
        uint256 resourceId;
        string resourceTitle;
        uint256 resourceWeight;
        uint256 resourcePrice;
        uint256 orderedAt;
        string orderStatus;
        string logisticStatus;
    }

    Order[] public orders;

    uint256 public currentOrderIndex;
    uint256 public orderAt;
    string public orderStatus;
    string public logisticStatus;

    /// @notice Роль продавца
    address public owner;
    /// @notice Роль покупателя
    address public bayer;
    /// @notice Роль оператора поставки
    address public deliveryOperator;
    /// @notice Роль контролера
    address public controller;
    /// @notice Роль оператора приемки
    address public acceptanceOperator;

    event OrderCreated(uint256 indexed orderId, uint256 indexed resourceId, uint256 resourceWeight, uint256 resourcePrice);
    event OrderPayed(uint256 indexed orderId, uint256 indexed timestamp);
    event OrderControll(uint256 indexed orderId, uint256 indexed timestamp);
    event OrderControllPassed(uint256 indexed orderId, uint256 indexed timestamp);
    event OrderDelivered(uint256 indexed orderId, uint256 indexed timestamp);
    event OrderAccepted(uint256 indexed orderId, uint256 indexed timestamp);
    event OrderCancelled(uint256 indexed orderId, uint256 indexed timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner!");
        _;
    }
    modifier onlyBayer() {
        require(msg.sender == bayer, "not a bayer!");
        _;
    }
    modifier onlyController() {
        require(msg.sender == controller, "not a controller!");
        _;
    }
    modifier onlyDeliveryOperator() {
        require(msg.sender == deliveryOperator, "not a delivery Operator!");
        _;
    }
    modifier onlyAcceptanceOperator() {
        require(msg.sender == acceptanceOperator, "not an acceptance Operator!");
        _;
    }

    constructor(address _owner, address _bayer, address _deliveryOperator, address _controller, address _acceptanceOperator) {
        owner = _owner;
        bayer = _bayer;
        deliveryOperator = _deliveryOperator;
        controller = _controller;
        acceptanceOperator = _acceptanceOperator;
    }
    
    /// Создание заказа оператором поставки
    function addOrder(uint256 _resourceId, string calldata _resourceTitle, uint256 _resourceWeight, uint256 _resourcePrice) external onlyDeliveryOperator {
        orders.push(
            Order({
                orderId: currentOrderIndex,
                resourceId: _resourceId,
                resourceTitle: _resourceTitle,
                resourceWeight: _resourceWeight,
                resourcePrice: _resourcePrice,
                orderedAt: block.timestamp,
                orderStatus: 'Unpaid',
                logisticStatus: 'Created'
            })
         );
        emit OrderCreated(currentOrderIndex, _resourceId, _resourceWeight, _resourcePrice);

        orderAt = block.timestamp;
        orderStatus = 'Unpaid';
        logisticStatus = 'Created';

        currentOrderIndex++;

    }
    /// Перевод средств на контракт
    function buy(uint256 _orderId) external payable {
        Order storage resourseToBuy = orders[_orderId];

        require(msg.value == resourseToBuy.resourcePrice, "invalid price");

        resourseToBuy.orderStatus = 'PaidOnContract';
        resourseToBuy.logisticStatus = 'Transit';

        emit OrderPayed(_orderId, block.timestamp);
    }
    /// Контроль логистики
    function controll(uint256 _orderId) external onlyController {
        Order storage resourseToControll = orders[_orderId];

        resourseToControll.logisticStatus = 'Control';

        emit OrderControll(_orderId, block.timestamp);
    }
    function controllSuccess(uint256 _orderId) external onlyController {
        Order storage resourseToControll = orders[_orderId];

        resourseToControll.logisticStatus = 'Transit';

        emit OrderControllPassed(_orderId, block.timestamp);
    }
    /// Прием товара
    function delivered(uint256 _orderId) external onlyAcceptanceOperator {
        Order storage resourseToAccept = orders[_orderId];

        resourseToAccept.logisticStatus = 'Delivered';

        emit OrderDelivered(_orderId, block.timestamp);
    }
    function acceptOrder(uint256 _orderId) external onlyAcceptanceOperator {
        Order storage resourseToAccept = orders[_orderId];

        resourseToAccept.logisticStatus = 'Accepted';

        withdraw(_orderId);
    }
    /// внутренний метод на вывод средств владельцу контракта
    function withdraw(uint256 _orderId) internal {
        Order storage order = orders[_orderId];
        
        uint256 balance = address(this).balance;
        require(balance > 0, "Not enought money");

        payable(owner).transfer(balance);
        emit OrderAccepted(_orderId, block.timestamp);

        order.orderStatus = 'PaidOnSeller';
    }
    /// внешний метод на вывод средств покупателю
    function withdrawToBayer(uint256 _orderId) external onlyBayer {
        Order storage order = orders[_orderId];
        
        uint256 balance = address(this).balance;
        uint256 resourcePrice = order.resourcePrice;

        require(balance >= resourcePrice, "Not enought money");

        payable(bayer).transfer(resourcePrice);
        emit OrderCancelled(_orderId, block.timestamp);

        order.orderStatus = 'Refund';
        order.logisticStatus = 'Cancelled';
    }

    /// функция возвращающая роль по адресу
    function getRoleByAdress(address _address) external view returns (string memory role) {
        if(_address == owner) {
            return 'Seller';
        }
        if(_address == bayer) {
            return 'Bayer';
        }
        if(_address == deliveryOperator) {
            return 'deliveryOperator';
        }
        if(_address == controller) {
            return 'controller';
        }
        if(_address == acceptanceOperator) {
            return 'acceptanceOperator';
        }

        return '';
    }
    /// функция для получения всех заказов на фронте
    function allOrders() external view returns (Order[] memory) {
        uint totalOrders = orders.length;
        Order[] memory orderList = new Order[](totalOrders);

        for (uint256 i=0; i < totalOrders; ++i) {
            orderList[i] = orders[i];
        }

        return orderList;
    }

    // если просто пришли деньги на контракт
    receive() external payable {
        revert('Please use the buy function to purchase albums');
    }

    fallback() external {}

}