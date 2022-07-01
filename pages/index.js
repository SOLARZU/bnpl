import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import * as Web3 from 'web3'
import { OpenSeaPort, Network, OpenSeaSDK } from 'opensea-js'
import Web3ProviderEngine from 'web3-provider-engine';
import {MnemonicWalletSubprovider,RPCSubprovider} from "@0x/subproviders";
import HDWalletProvider from "@truffle/hdwallet-provider"
export default function Home() {
  const [values, setValues] = useState({ tokenAddress: "", tokenId: "" });
  const tokenId = values.tokenId;
  const tokenAddress = values.tokenAddress;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const accountAddress= process.env.NEXT_PUBLIC_OWNER_ADDRESS;
  const providerUrl= process.env.NEXT_PUBLIC_INFURA_URL;
  const OSAPIKey = '';

  let provider = new HDWalletProvider({
        privateKeys: [
            PRIVATE_KEY
        ],
        providerOrUrl: providerUrl
    });
  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Rinkeby,
    apiKey: ""
  }, (arg) => console.log(arg))
  const createBuyOrder = async () => {
    // const balanceOfWETH = await seaport.getTokenBalance({
    //   accountAddress:"0x625B892f34ACA436e1525e5405A8fb81eC5cc04d",
    //   tokenAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab"
    // })
    // console.log(balanceOfWETH)
		await seaport.createBuyOrder({
      asset: {
        tokenId,
        tokenAddress
      },
      accountAddress,
      startAmount: 0.001,
      paymentTokenAddress:"0xc778417E063141139Fce010982780140Aa0cD5Ab",
    })
    // const order = await seaport.api.getOrder({ side: "ask", asset_contract_address: tokenAddress,
    // token_id: tokenId,protocol:"seaport" })
    // console.log(order)
    // await this.props.openseaSDK.fulfillOrder({
    //   order,
    //   accountAddress, // The address of your wallet, which will sign the transaction
    //   recipientAddress // The address of the recipient, i.e. the wallet you're purchasing on behalf of
    // })

		alert("Created Buy Order Successful");
	};
  return (
    <div className={styles.container}>
      <Head>
        <title>BNPL</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-24 mt-10">
            <div className="flex items-center flex-col gap-5">
                <div className="text-xl">OpenSea buy order</div>
                <input type="text" placeholder="Nft address" className="p-3" id="nft_address" onChange={(e)=> setValues({...values,tokenAddress : e.target.value})}></input>
                <input type="number" placeholder="Token Id" className="p-3" id="token_id" onChange={(e)=> setValues({...values,tokenId : e.target.value})}></input>
                <button className="p-4 rounded-xl bg-green-300" onClick = {createBuyOrder}>Create buy order</button>
            </div>
      </div>
    </div>
  )
}
