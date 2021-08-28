import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import {useEthers, useTokenBalance, useEtherBalance, useContractFunction, etherBalance} from '@usedapp/core'
import { formatUnits, formatEther } from '@ethersproject/units'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


const JawnSidebar = () => {

const { activateBrowserWallet, account } = useEthers()
// connected wallet balance for ETH, JAWN (erc721), and LUPE(erc20) balances
const etherBalance = useEtherBalance(account)
const LUPE = '0xb48497dabaffe085801c1b063e7e54f50b833784'
const JAWN = '0xf33Cc6f3A9ac3A702aBE0e7070e22644CbdE6826'
const tokenBalanceLUPE = useTokenBalance(LUPE, account)
const tokenBalanceJAWN = useTokenBalance(JAWN, account)
// ask for mint inputs 
const [to, setTo] = useState('')
const [uri, setURI] = useState('')
// Creating a new Contract ERC 721 interface
const mintbaseInterface = new utils.Interface(["function mintBase(address to, string uri) returns (uint256)"])
const contract = new Contract(JAWN, mintbaseInterface)
// mint 
const mintBaseContractFunction = useContractFunction(contract, 'mintBase')
// disables mint button
const [busy, setBusy] = useState(false)
// only allow minting if balance of Jawn is greater than or equal to 1 
const [eligible] = useState(false)

async function AllowMinting() {
  setBusy(true)
  if (!to && !uri) {
    return (
      window.alert("Fill Out Fields")
    )
  }
  else if ( tokenBalanceJAWN >= 2.1 )
  {
    mintBaseContractFunction.send(to, uri).then(() => setBusy(false))
  }
else {
  return (
   window.alert("not enough JAWN")
  
  )
    } 
}

  return (   

    <div className="doge-sidebar_wrapper">
      
      <div className="doge-sidebar_inner">
    
        <div className="doge-sidebar_title">
          {/* connects wallet */}
        <a className="lozenge-button doge-sidebar_history-button" onClick={() => activateBrowserWallet()}>Connect</a>
        <Link href={'/collection'}>
            <a className="lozenge-button doge-sidebar_history-button">Collection</a>
          </Link>
          <div>
      <div>
      </div>
      <a className="lozenge-button doge-sidebar_history-button" onClick={AllowMinting} disabled={eligible, busy}>Mint</a>
       {/* queriestoken balance stuff hard coded  */}
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)} ETH</p>}
      {tokenBalanceJAWN && <p>Balance: {formatUnits(tokenBalanceJAWN, 0)} JAWN</p>}
      {tokenBalanceLUPE && <p>Balance: {formatUnits(tokenBalanceLUPE, 18)} LUPE</p>}
      {/* required fields to make contract call at mintbase*/}
      <p>to Who?</p>
      <input value={to} onChange={event => setTo(event.target.value)}/>
      <p>enterURI:</p>
      <input value={uri} onChange={event => setURI(event.target.value)}/>
     
      
    </div>
        
         </div>
        
      </div>
    </div>
  )
}



export default JawnSidebar;
