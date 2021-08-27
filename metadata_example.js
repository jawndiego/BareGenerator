const fs = require('fs');

const metadata = {
  properties: {
    'center object': 'star',
    'left object': 'weed',
  },
  description: "Llego con las manos llenas, aqui te ofrezco halgo light.",
  name: "ALGO-LIGHT",
  image: "https://ipfs.io/ipfs/bafybeidymgdkiijmglr535fsagpkxp37bskkjy5swb2jkwspvreifh7th4",
  animation_url: "https://lucky-wood-6745.on.fleek.co/",
}

fs.writeFile('metadata.json', JSON.stringify(metadata), (e) => console.log(e));