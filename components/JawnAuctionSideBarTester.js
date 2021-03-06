import Link from 'next/link'
import React from 'react'
import { useEffect, useState, Fragment } from 'react'
import * as ethers from 'ethers'
import {useBidInteraction, AuctionManager, useManageAuction } from '@zoralabs/manage-auction-hooks'
import { PricingComponent } from '@zoralabs/nft-components/dist/nft-preview/PricingComponent'

// new imports
import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";


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
  // const { activateBrowserWallet, activate, deactivate, chainId ,} = useEthers();
  const {  chainId, library } = useWeb3Wallet();
  const { buttonAction, active, account} = useWalletButton();
  const rpcURL =  "https://mainnet.infura.io/v3/040b908244e941b3b051d60b1e2c9f0c"
  const provider = new ethers.providers.JsonRpcProvider(rpcURL);

  let walletText = '';
  if (!account) {
    walletText = `🥺 no wallet connected`
    showConnect = true
  } else if (chainId !== 1) {
    walletText = `🟥 Switch your network to mainnet`
  } else {
    walletText = `🅿️ ${account.addressShortened}`
    showConnect = false
 
  }

  let buttonText = '';
  if (!account) {
    buttonText = `connect`
  } else {
    buttonText = `disconnect`
 
  }
  // disables mint  button
  const [busy, setBusy] = useState(false)
  const [isMobile, setIsMobile] = useState();
  const [showConnectors, setShowConnectors] = useState(false);
  const [bid, setBid] = useState('');
  const auctionId = '4921'
  


  const ConnectWallet = () => {
    const { buttonAction, account, active} = useWalletButton();
    

    return (
      <div>
        <button className={["lozenge-button", "doge-sidebar_button-even", "token-button"].join(" ")} onClick={() => [buttonAction(), setShowConnectors(true)]}>
 {buttonText} </button> 
      </div>
    );
    
  };


  
  useEffect(() => {
    const mobileCheck = function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    mobileCheck() ? setIsMobile(true) : setIsMobile(false);
  })



  const ManageAuctionButton = () => {
    
    const {openBidAuction} = useManageAuction();
        return (
          <Fragment>
            <div>
    
            <button className={["lozenge-button", "token-button"].join(" ")} onClick={() => {
              openBidAuction(auctionId);
            }}> place bid </button>
      
      
            </div>
          </Fragment>
        );
  }

  // const AuctionHistoryInfo = () => {
  //   const {openBidAuction} = useManageAuction();
  //       return (
  //         <Fragment>
  //           <div>
  //             <h1></h1>
  //           </div>
  //           <button className={["lozenge-button", "doge-sidebar_button-even", "doge-sidebar_history-button"].join(" ")} onClick={() => {
  //             openBidAuction(auctionId);
  //           }}> bid </button>
  //         </Fragment>
  //       );
  // }

  return <div className="doge-sidebar_wrapper">
        <div className="doge-sidebar_inner">

          <div className="doge-sidebar_title">        
          <p>{`${
          walletText === undefined
            ? ""
            : walletText
        }`}</p>
        </div>
        {showConnect ? 
          (!showConnectors ? (
            <ConnectWallet useENSResolution />
          ) :  (
            <ConnectWallet />
          ))
        : (
          <AuctionManager >
          <ManageAuctionButton />
          <ConnectWallet />
      
        </AuctionManager>
        ) }
  </div>
 </div>



  }
  
  
  
  export default JawnSidebar;