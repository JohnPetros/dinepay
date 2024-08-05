// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DinePay {
    struct Receipt {
        uint256 id;
        address customerAccount;
        address waiterAccount;
        uint256 totalAmount;
        uint256 tipPercentage;
        bool isWithdrawn;
        uint createdAt;
    }
    uint256 lastReceiptId;
    address ownerAccount;
    address[] waiterAccounts;
    Receipt[] receipts;

    error NotOwnerError();
    error ReceiptNotFoundError();
    error WaiterAccountNotFoundError();
    error AllReceiptsAlreadyWithdrawnError();
    error InsufficientBalanceError();
    error FailedWithdrawError();
    error FailedPayWaiterError();
    error InvalidPercentageError();
    error InvalidAmountError();

    constructor() {
        ownerAccount = msg.sender;
        lastReceiptId = 0;
    }

    modifier onlyOwner() {
        if (msg.sender != ownerAccount) {
            revert NotOwnerError();
        }
        _;
    }

    modifier onlyWithRecepts() {
        if (receipts.length == 0) revert ReceiptNotFoundError();
        _;
    }

    modifier onlyWithWaiter(address _waiterAccount) {
        address[] memory _waiterAccounts = waiterAccounts;

        if (_waiterAccounts.length == 0) revert WaiterAccountNotFoundError();

        bool hasWaiter = false;
        for (uint256 index = 0; index < _waiterAccounts.length; index++) {
            if (_waiterAccounts[index] == _waiterAccount) {
                hasWaiter = true;
                break;
            }
        }

        if (!hasWaiter) revert WaiterAccountNotFoundError();
        _;
    }

    function withdraw() external payable onlyOwner onlyWithRecepts {
        uint256 allWaitersDividend = getAllWaitersDividend();
        uint256 currentBalance = getBalance();

        if (currentBalance == 0 || currentBalance < allWaitersDividend) {
            revert InsufficientBalanceError();
        }

        (bool isSuccess, ) = (ownerAccount).call{
            value: currentBalance - allWaitersDividend
        }("");

        if (!isSuccess) revert FailedWithdrawError();
    }

    function payWaiterReceipt(
        uint256 _receiptId
    ) external payable onlyOwner onlyWithRecepts {
        Receipt[] memory _receipts = receipts;

        for (uint256 index = 0; index < _receipts.length; index++) {
            Receipt memory receipt = _receipts[index];

            if (_receipts[index].id == _receiptId) {
                uint256 dividend = (receipt.totalAmount *
                    receipt.tipPercentage) / 100;

                (bool isSuccess, ) = (receipt.waiterAccount).call{
                    value: dividend
                }("");

                if (!isSuccess) revert FailedPayWaiterError();

                receipt.isWithdrawn = true;
                receipts[index] = receipt;
                return;
            }
        }
        revert ReceiptNotFoundError();
    }

    function payWaiter(
        address _waiterAccount
    )
        external
        payable
        onlyOwner
        onlyWithRecepts
        onlyWithWaiter(_waiterAccount)
    {
        uint256 waiterDividend = withdrawWaiterDividend(_waiterAccount);
        (bool isSuccess, ) = (_waiterAccount).call{value: waiterDividend}("");

        if (!isSuccess) revert FailedPayWaiterError();
    }

    function payAllWaiters() external payable onlyOwner onlyWithRecepts {
        bool areAllReceiptsWithdrawn = true;
        Receipt[] memory _receipts = receipts;

        for (uint256 index; index < _receipts.length; index++) {
            if (!_receipts[index].isWithdrawn) {
                areAllReceiptsWithdrawn = false;
                break;
            }
        }

        if (areAllReceiptsWithdrawn) {
            revert AllReceiptsAlreadyWithdrawnError();
        }

        address[] memory _waiterAccounts = waiterAccounts;

        for (uint256 index; index < _waiterAccounts.length; index++) {
            address waiterAccount = _waiterAccounts[index];
            uint256 waiterDividend = withdrawWaiterDividend(waiterAccount);
            (bool isSuccess, ) = (waiterAccount).call{value: waiterDividend}(
                ""
            );
            if (!isSuccess) revert FailedPayWaiterError();
        }
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAllWaitersDividend() private returns (uint256) {
        uint256 allWaitersDividend = 0;
        address[] memory _waiterAccounts = waiterAccounts;

        for (uint256 index; index < _waiterAccounts.length; index++) {
            allWaitersDividend += withdrawWaiterDividend(
                _waiterAccounts[index]
            );
        }
        return allWaitersDividend;
    }

    function withdrawWaiterDividend(
        address _waiterAccount
    ) private returns (uint256) {
        uint256 totalDividend = 0;
        Receipt[] storage _receipts = receipts;

        for (uint256 index; index < _receipts.length; index++) {
            Receipt memory receipt = _receipts[index];

            if (
                receipt.isWithdrawn || receipt.waiterAccount != _waiterAccount
            ) {
                continue;
            }

            uint256 billAmount = (receipt.totalAmount /
                (receipt.tipPercentage + 100)) * 100;

            uint256 dividend = (billAmount * receipt.tipPercentage) / 100;

            totalDividend += dividend;
            receipt.isWithdrawn = true;
            _receipts[index] = receipt;
        }

        receipts = _receipts;

        return totalDividend;
    }

    function getWaiterDividend(
        address _waiterAccount
    ) public view returns (uint256) {
        uint256 totalDividend = 0;
        Receipt[] memory _receipts = receipts;

        for (uint256 index; index < _receipts.length; index++) {
            Receipt memory receipt = _receipts[index];

            if (
                receipt.isWithdrawn || receipt.waiterAccount != _waiterAccount
            ) {
                continue;
            }

            uint256 dividend = (receipt.totalAmount * receipt.tipPercentage) /
                100;

            totalDividend += dividend;
        }

        return totalDividend;
    }

    function registerReceipt(
        address _waiterAccount,
        uint256 _tipPercentage
    ) external payable {
        if (msg.value == 0) {
            revert InvalidAmountError();
        }

        if (_tipPercentage <= 0 || _tipPercentage > 100) {
            revert InvalidPercentageError();
        }

        receipts.push(
            Receipt({
                id: lastReceiptId,
                waiterAccount: _waiterAccount,
                customerAccount: msg.sender,
                totalAmount: msg.value,
                tipPercentage: _tipPercentage,
                isWithdrawn: false,
                createdAt: block.timestamp
            })
        );
        waiterAccounts.push(_waiterAccount);
        lastReceiptId++;
    }

    function getReceipts() external view returns (Receipt[] memory) {
        return receipts;
    }

    function getReceiptsByWaiter(
        address _waiterAccount
    )
        public
        view
        onlyWithWaiter(_waiterAccount)
        onlyWithRecepts
        returns (Receipt[] memory)
    {
        uint256 waiterReceiptsCount = 0;
        Receipt[] memory _receipts = receipts;

        for (uint256 index = 0; index < _receipts.length; index++) {
            if (_receipts[index].waiterAccount == _waiterAccount) {
                waiterReceiptsCount++;
            }
        }

        Receipt[] memory waiterReceipts = new Receipt[](waiterReceiptsCount);

        uint256 waiterReceiptsIndex = 0;
        for (uint256 index = 0; index < receipts.length; index++) {
            Receipt memory receipt = receipts[index];

            if (receipt.waiterAccount == _waiterAccount) {
                waiterReceipts[waiterReceiptsIndex] = receipt;
                waiterReceiptsIndex++;
            }
        }

        return waiterReceipts;
    }
}
