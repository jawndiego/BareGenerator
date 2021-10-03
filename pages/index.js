import Head from '../components/head'
import FrontArt from '../components/frontart'
import JawnSidebar from '../components/JawnSidebar'
import { DAppProvider } from '@usedapp/core'

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
