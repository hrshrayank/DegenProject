import React, { useState,useEffect, useRef, } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import JsonData from './text.json'
import "./Stake.css"
import Web3Modal from "web3modal";
import { Contract, providers, utils } from "ethers";

import truncateEthAddress from 'truncate-eth-address'

export const Stake = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const web3ModalRef = useRef();

  const Leaderboard =JsonData.slice(0,10);
  const DisplayData=Leaderboard.map(
    (info)=>{
        return(
            <Tr>
                <Td>{`${truncateEthAddress(info.HolderAddress)}`}</Td>
                <Td>{info.Quantity}</Td>
                <Td>{info.PendingBalanceUpdate}</Td>
            </Tr>
        )
    }
  )
  const datas= (JsonData.filter(d => d.HolderAddress == account))
  console.log(account)
  const BalanceData=datas.map(
    (info)=>{
        return(
          <>
        <h1>Hi </h1>
       <p>{info.HolderAddress}</p> 
       <p>Yow own {info.Quantity} Diverse NFT</p> 
       </>
       
        )
    }
  )
 
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };
  const getProviderOrSigner = async () => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const accounts = await web3Provider.listAccounts();
    if (accounts) setAccount(accounts[0]);
    setProvider(provider);
    return web3Provider;
  };
  const disconnect = async () => {
  
    await web3ModalRef.current.clearCachedProvider();
    window.localStorage.clear();
    setWalletConnected(false);
    setAccount();
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    
    }
  }, [walletConnected]);
  


  return (
    <div id="box">
      
    <div id="subbox">
     {!account && (<p>Connect your wallet to check your holdings</p>)}

    {!account && (
            <button id="button" onClick={connectWallet}>Connect Wallet</button>
          ) }
    </div>
    {walletConnected &&BalanceData}
    <h1>Leaderboard</h1>
    <Table id="customers">
    <Thead>
      <Tr>
        <Th>Address</Th>
        <Th>Total Diverse Owned</Th>
        <Th>Allocated Fanverse Token %</Th>
      </Tr>
    </Thead>
    <Tbody>
        {DisplayData}
      </Tbody>
  </Table>
  <div id='images'>
    <img src='https://i.imgur.com/PvXyh5j.png' alt='image-1'/>
    <img src='https://i.imgur.com/gfCutrG.png' alt='image-2'/>

  </div>
  </div>
  )
}

