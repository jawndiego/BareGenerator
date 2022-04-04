import Head from '../components/head'
import JawnFooter from '../components/Jawn-footer'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'
import { NETWORK_ID, RPC_URL } from '../utils/env-vars.ts'
import JawnAuctionSidebarTester from '../components/JawnAuctionSideBarTester'
import FrontartSculpture from '../components/frontartSculpture'




export default function Index({ data }) {
  return (
    <Web3ConfigProvider
    networkId={parseInt(NETWORK_ID)}
    rpcUrl= "https://mainnet.infura.io/v3/040b908244e941b3b051d60b1e2c9f0c"
  >
      <Head/>
      <JawnAuctionSidebarTester showConnect={true} />
      <FrontartSculpture />
      <JawnFooter/>
    </Web3ConfigProvider>
  )
};
