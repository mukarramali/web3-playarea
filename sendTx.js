async function main() {
  require("dotenv").config();
  const { API_URL, PRIVATE_KEY, ADDRESS } = process.env;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(API_URL);
  const myAddress = ADDRESS;

  const nonce = await web3.eth.getTransactionCount(myAddress, "latest"); // nonce starts counting from 0

  const transaction = {
    to: "0x31B98D14007bDEe637298086988A0bBd31184523", // faucet address to return eth
    value: 100,
    gas: 30000,
    maxPriorityFeePerGas: 1000000108,
    nonce: nonce,
    message: "This is a test contract",
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY,
  );

  web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    function (error, hash) {
      if (!error) {
        console.log(
          "🎉 The hash of your transaction is: ",
          hash,
          "\n Check Alchemy's Mempool to view the status of your transaction!",
        );
      } else {
        console.log(
          "❗Something went wrong while submitting your transaction:",
          error,
        );
      }
    },
  );
}

main();
