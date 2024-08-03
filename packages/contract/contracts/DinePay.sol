// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

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

    constructor() {
        ownerAccount = msg.sender;
        lastReceiptId = 0;
    }

    modifier onlyOwner() {
        require(
            msg.sender == ownerAccount,
            "only the owner of the contract can execute this function"
        );
        _;
    }

    modifier onlyWithRecepts() {
        require(receipts.length > 0, "no recept registered yet");
        _;
    }

    modifier onlyWithWaiter(address _waiterAccount) {
        require(waiterAccounts.length > 0, "no waiter account registered yet");

        bool hasWaiter = false;
        for (uint256 index = 0; index < waiterAccounts.length; index++) {
            if (waiterAccounts[index] == _waiterAccount) {
                hasWaiter = true;
            }
        }

        require(hasWaiter, "waiter account not found");
        _;
    }

    function withdraw() external payable onlyOwner onlyWithRecepts {
        uint256 allWaitersDividend = getAllWaitersDividend();
        uint256 currentBalance = getBalance();

        require(
            currentBalance > allWaitersDividend,
            "current balance must be greater than the total dividend for the waiters"
        );

        (bool isSuccess, ) = (ownerAccount).call{
            value: currentBalance - allWaitersDividend
        }("");

        require(isSuccess, "failed to withdraw");
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
        uint256 waiterDividend = getWaiterDividend(_waiterAccount);
        (bool isSuccess, ) = (_waiterAccount).call{value: waiterDividend}("");

        require(isSuccess, "failed to pay waiter");
    }

    function payAllWaiters() external payable onlyOwner onlyWithRecepts {
        for (uint256 index; index < waiterAccounts.length; index++) {
            address waiterAccount = waiterAccounts[index];
            uint256 waiterDividend = getWaiterDividend(waiterAccount);
            (bool isSuccess, ) = (waiterAccount).call{value: waiterDividend}(
                ""
            );
            require(isSuccess, "failed to pay waiter");
        }
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAllWaitersDividend() private returns (uint256) {
        uint256 allWaitersDividend = 0;

        for (uint256 index; index < waiterAccounts.length; index++) {
            allWaitersDividend += getWaiterDividend(waiterAccounts[index]);
        }
        return allWaitersDividend;
    }

    function getWaiterDividend(
        address _waiterAccount
    ) private returns (uint256) {
        Receipt[] memory waiterReceipts = getReceiptsByWaiter(_waiterAccount);

        uint256 totalDividend = 0;

        for (uint256 index; index < waiterReceipts.length; index++) {
            Receipt memory receipt = waiterReceipts[index];

            if (receipt.isWithdrawn) {
                continue;
            }

            uint256 dividend = (receipt.totalAmount * receipt.tipPercentage) /
                100;
            totalDividend += dividend;
            receipt.isWithdrawn = true;
            receipts[index] = receipt;
        }

        return totalDividend;
    }

    function registerReceipt(
        address _waiterAccount,
        uint256 _tipPercentage
    ) external payable {
        require(msg.value > 0, "total amount must be greater than 0");
        require(
            _tipPercentage > 0 && _tipPercentage <= 100,
            "tip percentage must be greater than 0 and lower than or equal to 100"
        );

        lastReceiptId++;

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
        for (uint256 index = 0; index < receipts.length; index++) {
            if (receipts[index].waiterAccount == _waiterAccount) {
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
