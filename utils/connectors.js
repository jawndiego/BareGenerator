import { InjectedConnector } from '@web3-react/injected-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const POLLING_INTERVAL = 12000
const RPC_URL = 'https://mainnet.infura.io/v3/21acab1ef4fb416387f7391d15f5e0f7';

const injected = new InjectedConnector({ supportedChainIds: [1] })

const ledger = new LedgerConnector({ chainId: 1, url: RPC_URL, pollingInterval: POLLING_INTERVAL })

const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URL,
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: 'elledao@protonmail.com',
  manifestAppUrl: 'https://algolite.art'
});

const walletConnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URL,
  },
  qrcode: true
})

export default {
  injected,
  ledger,
  trezor,
  walletConnect
}