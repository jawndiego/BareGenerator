import Head from '../components/head'
import JawnFooter from '../components/Jawn-footer'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'
import { AuctionManager } from '@zoralabs/manage-auction-hooks'
import { NFTFullPage } from '@zoralabs/nft-components'
import { NETWORK_ID, RPC_URL } from '../utils/env-vars.ts'
import JawnAuctionSidebarTester from '../components/JawnAuctionSideBarTester'
import { MediaConfiguration } from '@zoralabs/nft-components'
import FrontartSculpture from '../components/frontartSculpture'
import { BidList } from '../components/BidList.tsx'
import { PricingComponent } from '@zoralabs/nft-components/dist/nft-preview/PricingComponent'
import { HeroToken } from '../components/HeroToken.tsx'
// import { tokens } from 'degen/dist/types/tokens'


export default function Index() {
let tokens = [''];
  return (
    <Web3ConfigProvider
    networkId={parseInt(NETWORK_ID)}
    rpcUrl= "https://mainnet.infura.io/v3/040b908244e941b3b051d60b1e2c9f0c">
    <MediaConfiguration>
      <Head/>
      <JawnAuctionSidebarTester showConnect={true}/>
      
      <FrontartSculpture />
<div className ="doge-sidebar_bidHistory">
<HeroToken token={tokens}/> 

 </div>
      <JawnFooter/>
      </MediaConfiguration>
    </Web3ConfigProvider>
  )
};
