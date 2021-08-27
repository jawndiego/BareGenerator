const fs = require('fs');
const { centerObjects, mirrorObjects, leftObjects, rightObjects } = require('../components/data/modelData');


const writeRandom = (count) => {
    if (count >= 10) return;
    const centerObject = centerObjects[Math.floor(Math.random() * centerObjects.length)]
    const mirrorObject = mirrorObjects[Math.floor(Math.random() * mirrorObjects.length)]
    const leftObject = leftObjects[Math.floor(Math.random() * leftObjects.length)]
    const rightObject = rightObjects[Math.floor(Math.random() * rightObjects.length)]
    
    const metadata = {
      properties: {
        'center object': centerObject.name,
        'left object': leftObject.name,
        'right object': rightObject.name,
        'mirror object': mirrorObject.name
      },
      description: "Llego con las manos llenas, aqui te ofrezco halgo light.",
      name: "ALGO-LIGHT",
      animation_url: `https://ydqscsnqm2fxb7ocgaxbgt2rbin2yp25chlwzlhj4gn7zfr24e6q.arweave.net/wOEhSbBmi3D9wjAuE09RChusP10R12ys6eGb_JY64T0/index.html?mirror=${mirrorObject.name}&center=${centerObject.name}&right=${rightObject.name}&left=${leftObject.name}`,
      image: "https://ipfs.io/ipfs/bafybeidymgdkiijmglr535fsagpkxp37bskkjy5swb2jkwspvreifh7th4",
    }
    
    fs.writeFile(`./metadata/metadata/${count}.json`, JSON.stringify(metadata), (e) => console.log(e));
    writeRandom(count + 1);
}

writeRandom(0);