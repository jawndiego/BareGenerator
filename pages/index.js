import Head from '../components/head'
import FrontArt from '../components/frontart'
import JawnSidebar from '../components/JawnSidebar'
import { ChainId, DAppProvider } from '@usedapp/core'

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/21acab1ef4fb416387f7391d15f5e0f7',
  },
}



export default function Index({ data }) {
  
  return (
    
    <>
    <DAppProvider config={config}>
      <Head
        title="Hi."
      />

      <JawnSidebar />

      <FrontArt />
      </DAppProvider>
     
        <div>

  
        </div>
      
     
  
      
    </>
  )
};
