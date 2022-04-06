import { css } from '@emotion/react'
import { AuctionManager } from '@zoralabs/manage-auction-hooks'
import { PricingComponent } from '@zoralabs/nft-components/dist/nft-preview/PricingComponent'
import { NFTFullPage, FullComponents, } from '@zoralabs/nft-components'
import { CONTRACT_ADDRESSES } from '../utils/env-vars'
import { media } from '../styles/mixins'

export function HeroToken({token}: {token: any}) {
  return (
    // <div className='paint-1-wrapper'>
   <NFTFullPage
      contract="0x1B9EEA219DD5a1ba5f97E08956165F1220879b1b"
      id="1"
      useBetaIndexer
      initialData={token}
      // options={{ token }}
    >
   <div className='doge-nft_wrapper'>
     <PricingComponent  className="zora-fullPageDataGrid" />
         <FullComponents.BidHistory className="zora-fullPageDataGrid"/>
            <h1></h1>
            </div>
     
    </NFTFullPage>

  )
};