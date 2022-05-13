require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Get the contract address after your run deploy
const contractAddress = "0x01a6e34f0ec0645e6399ed2913315236d2fce996";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    maxPriorityFeePerGas: 2999999987,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
  );

  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

// This is the url you got from pinate for uploading nft-metadata.json
mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmRBVkzxSFURzhyx8okC5gxRmChr55arYsjTpGFVzMu2L2",
);
