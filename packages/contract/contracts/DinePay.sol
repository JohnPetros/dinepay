// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DinePay {
    struct Receipt {
        uint256 bill;
        uint256 tipPercentage;
        uint256 numberOfPeople;
        address customerAccount;
    }

    mapping(address => Receipt) public receipts;

    function registerReceipt(
        address _waiterAccount,
        uint256 _bill,
        uint256 _tipPercentage,
        uint256 _numberOfPeople
    ) external {
        receipts[_waiterAccount] = Receipt({
            bill: _bill,
            tipPercentage: _tipPercentage,
            numberOfPeople: _numberOfPeople,
            customerAccount: msg.sender
        });
    }

    function getReceiptByWaiter(
        address _waiterAccount
    ) external view returns (Receipt memory) {
        return receipts[_waiterAccount];
    }
}
