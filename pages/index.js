import Head from '../components/head'
import FrontArt from '../components/frontart'
import JawnSidebar from '../components/JawnSidebar'
import { ChainId, DAppProvider } from '@usedapp/core'

import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://rinkeby.infura.io/v3/21acab1ef4fb416387f7391d15f5e0f7',
  },
}

const walletConnect = new WalletConnectConnector({
  rpc: config,
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
})

export default function Index({ data }) {
  return (
    <DAppProvider>
      <Head
        title="ALGO LITE"
      />
    <img className="name-text" src="name-text.png" />
      <JawnSidebar walletConnect={walletConnect} showMint={true} showHome={false} showFaq={true} showConnect={true} />
      <FrontArt />
    </DAppProvider>
  )
};
