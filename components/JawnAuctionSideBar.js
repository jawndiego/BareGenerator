import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'
import {useEthers, useTokenBalance, useEtherBalance, useContractFunction, etherBalance, useCall} from '@usedapp/core'
import { formatUnits, formatEther } from '@ethersproject/units'
import * as ethers from 'ethers'
import { Contract } from '@ethersproject/contracts'
import salesAbi from './abis/algolite-sale.json';
import connectors from '../utils/connectors';
import { AuctionHouse } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
// import readReserve from './hooks/index.tsx'
import { __createBinding } from 'tslib'


const CONTRACTS_MAINNET = {
  AUCTION_CONTRACT: '0x5f7072e1fa7c01dfac7cf54289621afaad2184d0',
  TOKEN_CONTRACT: '0x1B9EEA219DD5a1ba5f97E08956165F1220879b1b'
}

const rpcURL = "https://mainnet.infura.io/v3/040b908244e941b3b051d60b1e2c9f0c"
const provider = new ethers.providers.JsonRpcProvider(rpcURL);
const wallet = Wallet.createRandom()
wallet = wallet.connect(provider)
// things inside the SIDEBAR 

const JawnSidebar = ({showConnect, showHome, showFaq, showMint}) => {

  const Contracts = CONTRACTS_MAINNET;

  // check for mobile, show connect button, enable chain info, show etherbalance 
  const [isMobile, setIsMobile] = useState();
  const [showConnectors, setShowConnectors] = useState(false);
  const { activateBrowserWallet, activate, deactivate, account, chainId , library} = useEthers();
  
// declare contract info 
const bidInterface = new ethers.utils.Interface(salesAbi)
const _tokenContract = '0x1B9EEA219DD5a1ba5f97E08956165F1220879b1b'
const auctionID = '4921';
const contract = new Contract(Contracts.AUCTION_CONTRACT, bidInterface, library)

// creating Wallet and instantiating AuctionHouse 




const [busy, setBusy] = useState(false)


  // walletconnection 

  let walletText = '';
  if (!account) {
    walletText = `🟥 No wallet connected`
  } else if (chainId !== 1) {
    walletText = `🟥 Switch your network to mainnet`
  } else {
    walletText = `🟩 Connected ${account}`
    showConnect = false
  }

  const connectToWallet = (connector) => {
    activate(connectors[connector])
  }

  useEffect(() => {
    const mobileCheck = function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    mobileCheck() ? setIsMobile(true) : setIsMobile(false);
  })

  // handleBIDbutton

  // const handleMintButtonClick = async () => {
  //   if (algltMasterMode) {
  //     setBusy(true);
  //     const allowance = await algltmstrContract.allowance(account, Contracts.SALES);
  //     let tokenApproved = allowance.gte(ethers.BigNumber.from(String(10**18)));
  //     if (!tokenApproved) {
  //       await approveAlgltmstrFunction.send(Contracts.SALES, ethers.constants.MaxUint256);
  //       tokenApproved = true;
  //     }
  //     purchaseWithALGLTFunction.send(quantity, { gasLimit: ethers.utils.hexlify(240000 + quantity * 80000) })
  //     setBusy(false);
  //   } else {
  //     purchaseWithETHFunction.send({value: ethers.utils.parseEther('0.1'), gasLimit: ethers.utils.hexlify(210000) });
  //   }
  // }

  // MY SHIT 



const auctionHouse = new AuctionHouse(wallet, 1)



const [amount, setAmount] = useState('') 


  const handleBidButtonClick = async () => {  
    if (amount) {
     
      await auctionHouse.createBid(auctionID, amount, {value: ethers.utils.parseEther(amount), gasLimit: ethers.utils.hexlify(210000) });

    }
    setBusy(false);
  }


//   async function submitBid() {

//     const createBid = useContractFunction({
//       abi: contract,
//       address: tokenContract,
//       method: "createBid",
//       args: [],
//     })  ?? [];
//     setBusy[false]  
//     if (amount) {
//       await createBid.createBi(tokenID, amount);
//     setBusy(true);
//   }
//   setBusy(false)
// }

return <div className="doge-sidebar_wrapper">
      <div className="doge-sidebar_inner">
        <div className="doge-sidebar_title"></div>
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
        {showConnect ? 
          (!showConnectors ? (
            <button
              className="lozenge-button doge-sidebar_button-odd doge-sidebar_history-button"
              onClick={() => setShowConnectors(true)}
            >
              Connect
            </button>
          ) : (
            <div className="doge-sidebar_wallet-choose">
              <button className={["lozenge-button", "token-button"].join(" ")} onClick={() => connectToWallet('injected')}>Injected (Metamask, etc)</button>
              <button className={["lozenge-button", "token-button"].join(" ")} onClick={() => connectToWallet('walletConnect')}>WalletConnect</button>
            </div>
          ))
        : null }
        {/* // bidding  */}
    <p> Bid Amount</p>
    <input value= {amount} onChange={event => setAmount(event.target.value)} />
    <button onClick={handleBidButtonClick} disabled={busy}>Submit Bid</button>
    <div> <p>Reserveinfo: </p></div>

    
</div>
</div>
}



export default JawnSidebar;