/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { DinePay, DinePayInterface } from "../DinePay";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AllReceiptsAlreadyWithdrawnError",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedPayWaiterError",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedWithdrawError",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientBalanceError",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAmountError",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPercentageError",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwnerError",
    type: "error",
  },
  {
    inputs: [],
    name: "ReceiptNotFoundError",
    type: "error",
  },
  {
    inputs: [],
    name: "WaiterAccountNotFoundError",
    type: "error",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReceipts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "customerAccount",
            type: "address",
          },
          {
            internalType: "address",
            name: "waiterAccount",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "totalAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tipPercentage",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isWithdrawn",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct DinePay.Receipt[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_waiterAccount",
        type: "address",
      },
    ],
    name: "getReceiptsByWaiter",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "customerAccount",
            type: "address",
          },
          {
            internalType: "address",
            name: "waiterAccount",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "totalAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tipPercentage",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isWithdrawn",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct DinePay.Receipt[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_waiterAccount",
        type: "address",
      },
    ],
    name: "getWaiterDividend",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payAllWaiters",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_waiterAccount",
        type: "address",
      },
    ],
    name: "payWaiter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_receiptId",
        type: "uint256",
      },
    ],
    name: "payWaiterReceipt",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_waiterAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tipPercentage",
        type: "uint256",
      },
    ],
    name: "registerReceipt",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008081905550611fd5806100686000396000f3fe6080604052600436106100865760003560e01c8063785975221161005957806378597522146100e65780638a62b28f1461011157806392e63a931461012d578063c87539e214610149578063da90635a1461018657610086565b806312065fe01461008b5780633ccfd60b146100b65780635bac83ca146100c05780636c5d7644146100ca575b600080fd5b34801561009757600080fd5b506100a06101c3565b6040516100ad9190611a9e565b60405180910390f35b6100be6101cb565b005b6100c86103c3565b005b6100e460048036038101906100df9190611b1c565b61063c565b005b3480156100f257600080fd5b506100fb6108c9565b6040516101089190611cbf565b60405180910390f35b61012b60048036038101906101269190611d0d565b610a17565b005b61014760048036038101906101429190611d4d565b610c7d565b005b34801561015557600080fd5b50610170600480360381019061016b9190611b1c565b6110c4565b60405161017d9190611cbf565b60405180910390f35b34801561019257600080fd5b506101ad60048036038101906101a89190611b1c565b6114c5565b6040516101ba9190611a9e565b60405180910390f35b600047905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610252576040517f74a2152700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060038054905003610291576040517ff994174e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600061029b611693565b905060006102a76101c3565b905060008114806102b757508181105b156102ee576040517f384d3c5900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1683836103359190611da9565b60405161034190611e0e565b60006040518083038185875af1925050503d806000811461037e576040519150601f19603f3d011682016040523d82523d6000602084013e610383565b606091505b50509050806103be576040517f16afd56f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461044a576040517f74a2152700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060038054905003610489576040517ff994174e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006001905060005b6003805490508110156104ec57600381815481106104b3576104b2611e23565b5b906000526020600020906007020160050160009054906101000a900460ff166104df57600091506104ec565b8080600101915050610492565b508015610525576040517fc9ff52f500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b6002805490508110156106385760006002828154811061054b5761054a611e23565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600061058382611713565b905060008273ffffffffffffffffffffffffffffffffffffffff16826040516105ab90611e0e565b60006040518083038185875af1925050503d80600081146105e8576040519150601f19603f3d011682016040523d82523d6000602084013e6105ed565b606091505b5050905080610628576040517fa379c46100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050508080600101915050610528565b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106c3576040517f74a2152700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060038054905003610702576040517ff994174e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600060028054905003610742576040517f53f5bf0300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b6002805490508110156107da578273ffffffffffffffffffffffffffffffffffffffff166002828154811061077e5761077d611e23565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036107cd57600191506107da565b8080600101915050610746565b5080610812576040517f53f5bf0300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600061081d84611713565b905060008473ffffffffffffffffffffffffffffffffffffffff168260405161084590611e0e565b60006040518083038185875af1925050503d8060008114610882576040519150601f19603f3d011682016040523d82523d6000602084013e610887565b606091505b50509050806108c2576040517fa379c46100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050505050565b60606003805480602002602001604051908101604052809291908181526020016000905b82821015610a0e57838290600052602060002090600702016040518060e0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff16151515158152602001600682015481525050815260200190600101906108ed565b50505050905090565b60003403610a51576040517f7a8d642800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600081111580610a615750606481115b15610a98576040517f42732e3700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60036040518060e0016040528060005481526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1681526020013481526020018381526020016000151581526020014281525090806001815401808255809150506001900390600052602060002090600702016000909190919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff02191690831515021790555060c0820151816006015550506002829080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600080815480929190610c7490611e52565b91905055505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d04576040517f74a2152700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060038054905003610d43576040517ff994174e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b60038054905081101561108e57600060038281548110610d6957610d68611e23565b5b90600052602060002090600702016040518060e0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff1615151515815260200160068201548152505090508260038381548110610e8857610e87611e23565b5b90600052602060002090600702016000015403611080576000606482608001518360600151610eb79190611e9a565b610ec19190611f0b565b90506000826040015173ffffffffffffffffffffffffffffffffffffffff1682604051610eed90611e0e565b60006040518083038185875af1925050503d8060008114610f2a576040519150601f19603f3d011682016040523d82523d6000602084013e610f2f565b606091505b5050905080610f6a576040517fa379c46100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018360a00190151590811515815250508260038581548110610f9057610f8f611e23565b5b90600052602060002090600702016000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff02191690831515021790555060c08201518160060155905050505050506110c1565b508080600101915050610d46565b506040517ff994174e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b606081600060028054905003611106576040517f53f5bf0300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b60028054905081101561119e578273ffffffffffffffffffffffffffffffffffffffff166002828154811061114257611141611e23565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603611191576001915061119e565b808060010191505061110a565b50806111d6576040517f53f5bf0300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060038054905003611215576040517ff994174e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b6003805490508110156112ba578573ffffffffffffffffffffffffffffffffffffffff166003828154811061125157611250611e23565b5b906000526020600020906007020160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036112ad5781806112a990611e52565b9250505b8080600101915050611219565b5060008167ffffffffffffffff8111156112d7576112d6611f3c565b5b60405190808252806020026020018201604052801561131057816020015b6112fd611a1a565b8152602001906001900390816112f55790505b5090506000805b6003805490508110156114b75760006003828154811061133a57611339611e23565b5b90600052602060002090600702016040518060e0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff1615151515815260200160068201548152505090508873ffffffffffffffffffffffffffffffffffffffff16816040015173ffffffffffffffffffffffffffffffffffffffff16036114a9578084848151811061148f5761148e611e23565b5b602002602001018190525082806114a590611e52565b9350505b508080600101915050611317565b508195505050505050919050565b6000806000905060005b600380549050811015611689576000600382815481106114f2576114f1611e23565b5b90600052602060002090600702016040518060e0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff1615151515815260200160068201548152505090508060a001518061163c57508473ffffffffffffffffffffffffffffffffffffffff16816040015173ffffffffffffffffffffffffffffffffffffffff1614155b15611647575061167c565b600060648260800151836060015161165f9190611e9a565b6116699190611f0b565b905080846116779190611f6b565b935050505b80806001019150506114cf565b5080915050919050565b6000806000905060005b60028054905081101561170b576116f1600282815481106116c1576116c0611e23565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611713565b826116fc9190611f6b565b9150808060010191505061169d565b508091505090565b6000806000905060005b600380549050811015611a10576000600382815481106117405761173f611e23565b5b90600052602060002090600702016040518060e0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff1615151515815260200160068201548152505090508060a001518061188a57508473ffffffffffffffffffffffffffffffffffffffff16816040015173ffffffffffffffffffffffffffffffffffffffff1614155b156118955750611a03565b600060648083608001516118a99190611f6b565b83606001516118b89190611f0b565b6118c29190611e9a565b9050600060648360800151836118d89190611e9a565b6118e29190611f0b565b905080856118f09190611f6b565b945060018360a0019015159081151581525050826003858154811061191857611917611e23565b5b90600052602060002090600702016000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff02191690831515021790555060c082015181600601559050505050505b808060010191505061171d565b5080915050919050565b6040518060e0016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600015158152602001600081525090565b6000819050919050565b611a9881611a85565b82525050565b6000602082019050611ab36000830184611a8f565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611ae982611abe565b9050919050565b611af981611ade565b8114611b0457600080fd5b50565b600081359050611b1681611af0565b92915050565b600060208284031215611b3257611b31611ab9565b5b6000611b4084828501611b07565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611b7e81611a85565b82525050565b611b8d81611ade565b82525050565b60008115159050919050565b611ba881611b93565b82525050565b60e082016000820151611bc46000850182611b75565b506020820151611bd76020850182611b84565b506040820151611bea6040850182611b84565b506060820151611bfd6060850182611b75565b506080820151611c106080850182611b75565b5060a0820151611c2360a0850182611b9f565b5060c0820151611c3660c0850182611b75565b50505050565b6000611c488383611bae565b60e08301905092915050565b6000602082019050919050565b6000611c6c82611b49565b611c768185611b54565b9350611c8183611b65565b8060005b83811015611cb2578151611c998882611c3c565b9750611ca483611c54565b925050600181019050611c85565b5085935050505092915050565b60006020820190508181036000830152611cd98184611c61565b905092915050565b611cea81611a85565b8114611cf557600080fd5b50565b600081359050611d0781611ce1565b92915050565b60008060408385031215611d2457611d23611ab9565b5b6000611d3285828601611b07565b9250506020611d4385828601611cf8565b9150509250929050565b600060208284031215611d6357611d62611ab9565b5b6000611d7184828501611cf8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611db482611a85565b9150611dbf83611a85565b9250828203905081811115611dd757611dd6611d7a565b5b92915050565b600081905092915050565b50565b6000611df8600083611ddd565b9150611e0382611de8565b600082019050919050565b6000611e1982611deb565b9150819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000611e5d82611a85565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611e8f57611e8e611d7a565b5b600182019050919050565b6000611ea582611a85565b9150611eb083611a85565b9250828202611ebe81611a85565b91508282048414831517611ed557611ed4611d7a565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611f1682611a85565b9150611f2183611a85565b925082611f3157611f30611edc565b5b828204905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000611f7682611a85565b9150611f8183611a85565b9250828201905080821115611f9957611f98611d7a565b5b9291505056fea2646970667358221220b448318afd265f46e31dc9f791919c865eb527945d2053fab4d24c426e09ae6864736f6c63430008180033";

type DinePayConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DinePayConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DinePay__factory extends ContractFactory {
  constructor(...args: DinePayConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      DinePay & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): DinePay__factory {
    return super.connect(runner) as DinePay__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DinePayInterface {
    return new Interface(_abi) as DinePayInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): DinePay {
    return new Contract(address, _abi, runner) as unknown as DinePay;
  }
}
