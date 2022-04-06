import { css } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { useBidAggregate, BidAggregateType } from '../hooks/useBidAggregate'
import { useENSAddress } from '@zoralabs/nft-hooks'
import { media } from '../styles/mixins'
import { HeroToken } from '../components/HeroToken'

const PREFIX_ADDRESS = "0x";
function BidTableRow({
  bidder,
  amount,
}: {
  bidder: string,
  amount: string,
}) {
  return (
    <>
      <tr css={css`
        display: none;
        ${media.tablet`
          display: table-row;
        `}
      `}>
        {/* <td>{token}</td> */}
        <td>{bidder}</td>
        <td>{amount}</td>
      </tr>
      <div css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: var(small--lg)
        text-align: center;
        padding-bottom: var(--space-sm);
        &:last-of-type {
          padding-bottom: 0;
        }
        ${media.tablet`
          display: none;
        `}
      `}>
        {/* <span>{token}</span> */}
        <span>{bidder}</span>
        <span>{amount}</span>
      </div>
    </>
  )
}

function BidInfo({bid}: {bid: BidAggregateType}) {
  const ens = useENSAddress(bid.bidder);

  useEffect(() => {console.log('ENS', ens)}, [ens])

  const trimmedETHAddress = useMemo(() => {
    try {
      const addressFirst = bid.bidder.slice(0, 4 + PREFIX_ADDRESS.length);
      const addressLast = bid.bidder.slice(bid.bidder.length - 4);
      return `${addressFirst}...${addressLast}`
    } catch (err) {
      return bid.bidder
    }
  },[bid])

  if (ens.data) {
    return (
      <BidTableRow 
        bidder={ens.data}
        amount={bid.amount}
      />
    )
  } else {
    return (
      <BidTableRow 
        bidder={trimmedETHAddress}
        amount={bid.amount}
      />
    )
  }
}

export function BidList({tokens}: {tokens?: any[]}) {
  const allBids = useBidAggregate(tokens)
  useEffect(() => { console.log('ALL BIDS', allBids) }, [allBids])

  return (
    <div className ="doge-sidebar_bidList">

      <div className='doge-sidebar_ui'>
        <table css={css`
          width: 100%;
          display: none;
          ${media.tablet`
            display: table;
          `}
          td {
            padding: 0px;
            text-align: right;
            width: calc(100% / 3);
          }
          tr {
            text-align: right;
          }
        `}>
          <tr>
            <td>Bidder</td>
        
            <p>Amount</p>
            </tr>
          {allBids.map((bid: any) =>
            <BidInfo bid={bid} key={bid.tx}/>
          )}
        </table>
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            ${media.tablet`
              display: none;
            `}
          `}
        >
          <div css={css`
            * {
              font-family: var(--display-font)!important;
            }
            font-size: var(--text-03);
            padding-bottom: var(--space-md);
            text-shadow: var(--funky-text-shadow);
            display: flex;
            width: 100%;
            justify-content: space-between;
          `}
          >
            <span>Bidder</span>
            <span>Amount</span>
          </div>
          {allBids.map((bid: any) =>
            <BidInfo bid={bid} key={bid.tx}/>
          )}
        </div>
      </div>
      </div>
  )
};