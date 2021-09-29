import React from 'react';
import JawnSidebar from '../components/JawnSidebar'

export default function Index({ data }) {
  return (
    <>
      <JawnSidebar showMint={false} showHome={true} showFaq={false}  showConnect={false}/>
      <div className="doge-home_wrapper">
        <h1>
          faq
        </h1>
        <h2>What is ALGO LITE?</h2>
        <p>
          ALGO LITE is an NFT project that shows four characters in various combinations. This project consists of one “Master” and 2400 “Prints”.
        </p>
        <h2>What is a master?</h2>
        <p>
          When we talk about the “Master” we are referring to token id 0. It is a composite that renders a new combination upon a page refresh. All combinations are possible.
        </p>
        <p>
          You can check out the “Master” <a href="https://ytb2lxrcxes562ouis445edr2qa2h3t7s7bwirtjrekkiwlr32rq.arweave.net/xMOl3iK5Jd9p1ES5zpBx1AGj7n-Xw2RGaYkUpFlx3qM/index.html">media</a> and <a href="https://buo7dhteahrnurg7h3oysx3ldezloaopronrtnyssqfbvqsamqfa.arweave.net/DR3xnmQB4tpE3z7diV9rGTK3Ac-Lmxm3EpQKGsJAZAo/0.json">metadata</a>.
        </p>
        <p>
          The master is fractionalized into ALGLTMSTR tokens. You can see the fractionalized vault <a href="https://fractional.art/vaults/0xfd8d7dbecd5c083dde2b828f96be5d16d1188235">here</a>.
        </p>
        <p>
          And of course, on <a href="https://opensea.io/assets/0x5c685a3ebc751f36b2123c25f5c464d3b9964afc/0">Opensea</a>.
        </p>
        <h2>What is a Print?</h2>
        <p>
          When we say “print”, we are not referring to a physical print. We define “print” as a 1/1/2400 NFT that contains one randomized but unchanging combination. 
        </p>
        <h2>How many combinations are there?</h2>
        <p>
          There are 2400 possible combinations.
        </p>
        <h2>Where are the contracts?</h2>
        <p><a href="https://github.com/iainnash/algo-light-contracts">Github</a></p>
        <p><a href="https://etherscan.io/address/0x5c685a3ebc751f36b2123c25f5c464d3b9964afc">Etherscan</a></p>
        <h2>How much ALGLTMSTR or prints are retained by the team:</h2>
        <p>0. If we want ownership over the master or any prints, we’ll have to buy like everyone else.</p>
        <h2>Tokenomics</h2>
        <p>
          The launch comes in phases and is kicked off by the auction of the “Master”.
        </p>
        <img src="GRID_TING.png" className="doge-home_pic"/>
        <p>
          In the first phase, we fractionalized the “Master” to 800 ALGLTMSTR tokens. 600 ALGLTMSTR have been reserved and are being auctioned off on Copper.
        </p>
        <p>
          After the auction, each ALGLTMSTR token is redeemable for a 1/1/2400 ALGO LITE “print” 200 will be used to create a LP. The redemption period lasts 1 week.
        </p>
        <img src="redeem.png" className="doge-home_pic" />
        <p>
          At the end of the week, all redeemed ALGLTMSTR will be redistributed back to ALGLTMSTR holders. 
        </p>
        <p>
          In the second phase, we will open 1800 for public sale at .1 ETH. This style feels familiar: you can press the mint button to get a random 1/1/2400 from the collection. Any unredeemed prints from the 600 reserve will be made available for public sale. 
        </p>
        <h2>Timeline</h2>
        <p><b>September 27</b>: Copper FLA begins for 600 ALGLTMSTR</p>
        <p><b>September 30</b>: FLA ends</p>
        <p><b>October 1</b>: ALGLTMSTR ↔ Print redemption begins with 600 prints reserved.</p>
        <p><b>October 2</b>: Public sale of prints begins. 0.1 ETH = 1 print.</p>
        <p><b>October 8</b>: ALGLTMSTR ↔ Print redemption ends. Unredeemed prints are released to public. Redeemed ALGLTMSTR are redistributed proportionally to ALGLTMSTR holders.</p>
        <div className="logos-box">
          <a href="https://twitter.com/elelcasa"><img className="logo-pic" src="el.png" height="50px"/></a>
          <a href="https://news.feltzine.us/"><img classname="logo-pic" src="felt.png" height="50px"/></a>
        </div>
      </div>
    </>
  )
};
