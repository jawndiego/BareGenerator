import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import {useEthers, useTokenBalance, useEtherBalance, useContractFunction, etherBalance} from '@usedapp/core'
import { formatUnits, formatEther } from '@ethersproject/units'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


const JawnSidebar = () => {

const { activateBrowserWallet, account } = useEthers()
const etherBalance = useEtherBalance(account)
// address is 
const LUPE = '0xb48497dabaffe085801c1b063e7e54f50b833784'
const JAWN = '0xf33Cc6f3A9ac3A702aBE0e7070e22644CbdE6826'
const tokenBalanceLUPE = useTokenBalance(LUPE, account)
const tokenBalanceJAWN = useTokenBalance(JAWN, account)

  return (
   

    <div className="doge-sidebar_wrapper">
      
      <div className="doge-sidebar_inner">
    
        <div className="doge-sidebar_title">
        <a className="lozenge-button doge-sidebar_history-button" onClick={() => activateBrowserWallet()}>Connect</a>
        <Link href={'/collection'}>
            <a className="lozenge-button doge-sidebar_history-button">Collection</a>
          </Link>
          <div>
      <div>
      </div>
      <a className="lozenge-button doge-sidebar_history-button" onClick={() => activateBrowserWallet()}>Mint</a>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)} ETH</p>}
      {tokenBalanceJAWN && <p>Balance: {formatUnits(tokenBalanceJAWN, 0)} JAWN</p>}
      {tokenBalanceLUPE && <p>Balance: {formatUnits(tokenBalanceLUPE, 18)} LUPE</p>}
    
     
      
    </div>
        
          {/* <Link href={'/doge-history'}> */}
            {/* <a className="lozenge-button doge-sidebar_history-button">collection</a> */}
          {/* </Link> */}
         </div>
        
      </div>
    </div>
  )
}



export default JawnSidebar;
