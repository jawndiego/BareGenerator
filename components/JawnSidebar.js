import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'
import {useEthers, useTokenBalance, useEtherBalance, useContractFunction, etherBalance} from '@usedapp/core'
import { formatUnits, formatEther } from '@ethersproject/units'
import * as ethers from 'ethers'
import { Contract } from '@ethersproject/contracts'
import salesAbi from './abis/algolite-sale';
import algltlmstrAbi from './abis/algltmstr';

const CONTRACTS_RINKEBY = {
  SALES: '0xfdD3f7140FEb3759385b7603844aeE2cA0042295',
  ALGLTMSTR: '0x8E96C323E039f68FA5Ed5f50A06E7B385Ff3f6bE'
}

const CONTRACTS_MAINNET = {
  SALES: '0xa051e1117c6942c94cad161cfab8fae37757783f',
  ALGLTMSTR: '0xfd8d7dbecd5c083dde2b828f96be5d16d1188235'
}

const JawnSidebar = ({showConnect, showHome, showFaq, showMint}) => {
  const Contracts = CONTRACTS_MAINNET;
  const { activateBrowserWallet, deactivate, account, chainId , library} = useEthers();
  // connected wallet balance for ETH, JAWN (erc721), and LUPE(erc20) balances
  const etherBalance = useEtherBalance(account) / (10**18);
  const tokenBalanceALGLTMSTR = useTokenBalance(Contracts.ALGLTMSTR, account) / (10**18);
  // Creating a new Contract ERC 721 interface
  const mintbaseInterface = new ethers.utils.Interface(salesAbi.rinkeby)

  const algltmstrContract = new Contract(Contracts.ALGLTMSTR, algltlmstrAbi.rinkeby, library);
  const salesContract = new Contract(Contracts.SALES, salesAbi.rinkeby, library);

  // approve algltlmstr spending
  const approveAlgltmstrFunction = useContractFunction(algltmstrContract, 'approve', { transactionName: 'Approve' })
  const readAlgltmastrAllowanceFunction = useContractFunction(algltmstrContract, 'allowance')

  // mint 
  const purchaseWithALGLTFunction = useContractFunction(salesContract, 'purchaseWithTokens', { transactionName: 'Purchase With Tokens' })
  const purchaseWithETHFunction = useContractFunction(salesContract, 'purchase', { transactionName: 'Purchase' });

  // disables mint button
  const [busy, setBusy] = useState(false)

  const [mintingToken, setMintingToken] = useState('ALGLTMSTR');
  const algltMasterMode = mintingToken === 'ALGLTMSTR';
  const [quantity, setQuantity] = useState(1);
  const [salesInfo, setSalesInfo] = useState();

  let walletText = '';
  if (!account) {
    walletText = `🟥 No wallet connected`
  } else if (chainId !== 1) {
    walletText = `🟥 Switch your network to mainnet`
  } else {
    walletText = `🟩 ${account}`
  }

  
  useEffect(() => {
    const fetchSalesInfo = async () => {
      if (salesInfo) {
        return;
      }
      try {
        const [numberPublicSale, numberSoldPublic, numberPrivateSale, numberSoldPrivate] = (await salesContract.saleInfo()).map(Number);
        setSalesInfo({numberPublicSale, numberSoldPublic, numberPrivateSale, numberSoldPrivate})
      } catch {
      }  
    }
    fetchSalesInfo();
  }, [algltmstrContract])
  
  const handleMintButtonClick = async () => {
    if (algltMasterMode) {
      setBusy(true);
      const allowance = await algltmstrContract.allowance(account, Contracts.SALES);
      let tokenApproved = allowance.gte(ethers.BigNumber.from(String(10**18)));
      if (!tokenApproved) {
        await approveAlgltmstrFunction.send(Contracts.SALES, ethers.constants.MaxUint256);
        tokenApproved = true;
      }
      purchaseWithALGLTFunction.send(quantity, { gasLimit: ethers.utils.hexlify(240000 + quantity * 80000) })
      setBusy(false);
    } else {
      purchaseWithETHFunction.send({value: ethers.utils.parseEther('0.1')});
    }
  }

  const mintingDisabled = busy || !salesInfo || salesInfo.numberSoldPrivate >= salesInfo.numberPrivateSale;
console.log(salesInfo);

  return (   
    <div className="doge-sidebar_wrapper">
      <div className="doge-sidebar_inner">
        <div className="doge-sidebar_title">
          {walletText}
        </div>
        {showHome ? <Link href={'/'}>
          <div
            className={["lozenge-button", "doge-sidebar_button-even", "doge-sidebar_history-button"].join(" ")}
          >
            Home
          </div>
        </Link> : null }
        {showConnect ? <button
          className="lozenge-button doge-sidebar_button-odd doge-sidebar_history-button"
          onClick={activateBrowserWallet}
        >
          Connect
        </button> : null}
        {/* <div
          className={["lozenge-button", "doge-sidebar_button-even", "doge-sidebar_history-button", "doge-sidebar_button-disabled"].join(" ")}
        >
          Collection
        </div> */}
        {showFaq ? <Link href={'faq'}>
          <div
            className={["lozenge-button", "doge-sidebar_button-even", "doge-sidebar_history-button"].join(" ")}
          >
            FAQ
          </div>
        </Link> : null }
        <Link href={'https://copperlaunch.com/auctions/0x13C7d3B51C304ADD517c40a39D8a85B0cdea605f'}>
          <div
            className={["lozenge-button", "doge-sidebar_button-odd", "doge-sidebar_history-button"].join(" ")}
          >
            Auction
          </div>
        </Link>
        <hr className="doge-sidebar_divider" />
        <div className="doge-sidebar_token-choose">
          <button className={["lozenge-button", "token-button", algltMasterMode && "token-button-selected"].join(" ")} onClick={() => setMintingToken('ALGLTMSTR')}>ALGLTMSTR</button>
          <button disabled className={["lozenge-button", "token-button", !algltMasterMode && "token-button-selected", "token-button-disabled"].join(" ")} onClick={() => setMintingToken('ETH')}>ETH</button>
        </div>
        <div className="doge-sidebar_input-wrapper">
          {algltMasterMode ? [<div>{`quantity:`}</div>, <input type="number" min="1" max={tokenBalanceALGLTMSTR || 0} step="1" className="doge-sidebar_input" value={quantity} onChange={event => setQuantity(event.target.value)} />] : null}
        </div>
        {tokenBalanceALGLTMSTR < quantity ? <div className="error-text">
          ALGLTMSTR balance is too low
        </div> : null}
        {showMint ? <button
          className={["lozenge-button", !mintingDisabled && "doge-sidebar_history-button", "doge-sidebar_mint-button", mintingDisabled && "button-disabled"].join(" ")}
          onClick={handleMintButtonClick}
          disabled={mintingDisabled}
        >
          {busy ? `Approving...` : `Mint`}
        </button> : null}
        {salesInfo ? <div>
          {`${salesInfo.numberSoldPrivate} / ${salesInfo.numberPrivateSale} sold via ALGLT redemption`}
        </div> : null}
        <div>
          {algltMasterMode ? `balance: ${tokenBalanceALGLTMSTR} ALGLTMSTR` : `Balance: ${etherBalance} ETH`}
        </div>
      </div>
    </div>
  )
}



export default JawnSidebar;