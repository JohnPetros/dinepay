<h1 align="center">
  DinePay 🍽️ 
</h1>

<div align="center">
   <a href="https://github.com/JohnPetros">
    <img alt="Made by JohnPetros" src="https://img.shields.io/badge/made%20by-JohnPetros-blueviolet">
   </a>
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JohnPetros/dinepay">
   <a href="https://github.com/JohnPetros/dinepay/commits/main">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JohnPetros/dinepay">
   </a>
  </a>
   </a>
   <a href="https://github.com/JohnPetros/dinepay/blob/main/LICENSE.md">
    <img alt="GitHub License" src="https://img.shields.io/github/license/JohnPetros/dinepay">
   </a>
    <img alt="Stargazers" src="https://img.shields.io/github/stars/JohnPetros/dinepay?style=social">
</div>
<br>

## 🖥️ About the project

**DinePay** is a dapp, a web application that leverages blockchain's technology to provide features that required extra **security** and **immutability**.

In this case, DinePay allows customers to calculate, pay in [Ether](https://www.researchgate.net/publication/369869912_Ethereum_Introduction_Expectation_and_Implementation), register bills and tips in the blockchain of [Ethereum](https://ethereum.org/en/). Plus, the restaurant's owner can search out of all these receipts, tranfer the amount for the respecitve waiter of a specific receipt or even pay all waiters at once, besides withdrawing the total amount that belongs to the restaurant itself. 

The goal of developing this project was to learn the basic of smarta contract development in [Solidity language](https://soliditylang.org/), also the main concepts of [Web 3](https://hbr.org/2022/05/what-is-web3) in general.

Lastly, The design of the project is based on the [Tip calculator app](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX) from [Frontend Mentor](https://www.frontendmentor.io/), a free online platform where you can enhance you frontend development skills.


### ⏹️ Demonstração

<!-- <table align="center">
  <tr>
    <td align="center">
    <span>Tip calculator<br/><br/></span>
    <img src="documentation/images/home-page.png" alt="Página inicial" height="420"  />
    </td>
  </tr>
  <tr>
    <td align="center">
    <span>Receipts explorer<br/><br/></span>
    <img src="documentation/images/details-page.png" alt="Página de detalhes" height="500" />
    </td>
  </tr>
</table> -->

---

## ✨ Features

### Tip calculator

- [x] Should receive from the customer: bill, tip percentage  and number of people that can share the total amount with the customer
- [x] Should caculate the amount of the bill by person and total 
- [x] Should caculate the amount of the tip by person and total 
- [x] Should allow use to choose default percentages for the tip (5%, 10%, 15%, 25%, 50%) or any other custom value
- [x] Should allow user pay the receipt (bill + tip) with ETH using Metamask wallet, registering on it both their and account and the waiter account
- [x] Should disable the whole app for any user who do not have the Metamask extension installed on their browser

### Receipts Explorer

- [x] Should list all receipts registered in DinePay
- [x] Should allow only the restaurant owner's account to tranfer ETH to him/her or to any waiter account
- [x] Should allow the owner to transfer the dividend in ETH for a single receipt to a specific waiter's account
- [x] Should allow the owner to transfer the dividend in ETH for a all receipts to a specific waiter's account
- [x] Should allow the owner withdraw the amount that are not dividend for the waiters

---

## ⚙️ Archtecture

### 🛠️ Technologies, tool e external services

This project was developed using the technolgies bellow:

- **[Solidity](https://soliditylang.org/)** for programming the smart contract

- **[Hardhat](https://hardhat.org/)** for facilicating the tests, build and deploy of the smart contract

- **[React](https://react.dev/)** for building the UI with JavaScript

- **[TailwindCSS](https://tailwindcss.com/)** for styling the React components with CSS

- **[Headless UI](https://headlessui.com/)** for provide fully accessible UI components

- **[Vite](https://vitejs.dev/)** for compiling the React application code

- **[Infura](https://www.infura.io/)** - for serving the RPC node for deployment of the smart contract 

- **[Sepolia](https://sepolia.etherscan.io/)** - for serving the blockchain network for testing the smart contract in n enviroment quite similiar to Etheruem's blockchain 

- **[Turborepo](https://turbo.build/)** - for optimizing the development in multiple projects in a mono repo

> For more details on the projects dependencies like specific versions check out the [package.json file](https://github.com/JohnPetros/dinepay/blob/main/package.json)

---

## 🚀 How to run the application

### 🔧 Prerequisitives


- [Git](https://git-scm.com/) for manipulating Git repositories.
- [Nodejs](https://www.python.org/) for installing the dependencies and runnning the application (using [npm](https://www.w3schools.com/python/python_pip.asp), [yarn](https://yarnpkg.com/)).

> Also it is good to have a code editor like [VSCode](https://code.visualstudio.com/).

### 📟 Running the application

```bash

# Clone this repository
git clone https://github.com/JohnPetros/dinepay.git

# Access the project folder
cd dinepay

# Install the dependencies
npm install

# Run the aplication in development mode
npm run dev

```

> Probably the application will be running on http://localhost:5173

### 📟 Running the tests

```bash

npm run test

```

---

## 💪 How to contribute

```bash

# Fork this repository
$ git clone https://github.com/JohnPetros/dinepay.git

# Create a branch for your feature
$ git checkout -b my-feature

# Commit your changes
$ git commit -m ' ✨feat: my feature'

# Push your branch
$ git push origin my-feature

```

> You should replace 'my-feature' wuth your feature's name that you adding

> You can also open a [new issue](https://github.com/JohnPetros/dinepay/issues) reporting some problem, question or sugestion about the project. I will really be glad to help and improve this prject as well 

---

## 📝 Licence

This application is under MIT licence. See the [licence file](LICENSE) to obtain more details about it

---

<p align="center">
  Made with 💜 by John Petros 👋🏻
</p>
