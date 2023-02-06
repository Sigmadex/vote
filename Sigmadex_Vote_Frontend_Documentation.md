## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/`  

## Setting up Metamask

Download metamask extenstion from https://metamask.io/
After installation, it'll take you to a window to set a password. Select the option to import wallet from seed phrase and set a password.
Use the mnemonic from the ganache instance.
A localhost blockchain would be added in the list of networks. Change the port number to 7545. Set the chain id as 1337.
Then you'll see, metamask will ask your permission to connect all the 10 accounts to the webapp.
Initially only the first account would be connected. Click on add account, then the second account would be added, then third and so on.

## How to Use

Log in with Metamask account (ensure you are in Goerli testnet).
Vote app handles three scenarios:
-If you haven't voted before but are eligible, select an option and press Cast Vote.
-If you have voted before, you will be unable to vote again and will see vote results.
-If you haven't voted before and are ineligible, options and Cast Vote button will be disabled.
Only chairperson can set proposals, enable voters to be eligible, and start and end vote procedures.