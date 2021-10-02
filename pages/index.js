import Head from '../components/head'
import FrontArt from '../components/frontart'
import JawnSidebar from '../components/JawnSidebar'
import { ChainId, DAppProvider } from '@usedapp/core'

const config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://rinkeby.infura.io/v3/21acab1ef4fb416387f7391d15f5e0f7',
  },
}

export default function Index({ data }) {
  return (
    <DAppProvider>
      <Head
        title="ALGO LITE"
      />
    <img className="name-text" src="name-text.png" />
      <JawnSidebar showMint={true} showHome={false} showFaq={true} showConnect={true} />
      {/* <FrontArt /> */}
    </DAppProvider>
  )
};
