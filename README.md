# NFT Play Area

Steps involved:

1. `yarn`
2. Create .env from .env.example file and fill your data
3. `yarn compile`. This creates contract locally which can be deployed later
4. `yarn deploy`. This will create contract on the network.
5. Upload an image on pinata, get the URL, use it in `nft-metadata.json`. Update more details. This will be reflected in your NFT.
6. Upload this json file also on pinata, and copy it's URL in `scripts/mint-nft.js`.
7. Copy the contract address from step 4, put it in `scripts/mint-nft.js`
8. `yarn mint`. This will mint nft using contract created in step 4 with the image you uploaded on pinata.
