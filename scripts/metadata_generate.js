const fs = require('fs');
const { centerObjects, mirrorObjects, leftObjects, rightObjects } = require('../components/data/modelData');

const open = require('open');

let count = 1;
let centerObject, mirrorObject, leftObject, rightObject;

centerObjects.forEach(co => {
  centerObject = co;
  mirrorObjects.forEach(mo => {
    mirrorObject = mo;
    leftObjects.forEach(lo => {
      leftObject = lo;
      rightObjects.forEach(ro => {
        rightObject = ro;
        const siteUrl = `https://tgatxjzujk2ddwqke6qmpqi3hw6fr2kjbt5x4lghj7mzj6fztigq.arweave.net/mYE7pzRKtDHaCiegx8EbPbxY6UkM-34sx0_ZlPi5mg0/index.html?mirror=${mirrorObject.name}&center=${centerObject.name}&right=${rightObject.name}&left=${leftObject.name}`;
        const metadata = {
          properties: {
            'center object': centerObject.name,
            'left object': leftObject.name,
            'right object': rightObject.name,
            'mirror object': mirrorObject.name
          },
          description: "Llego con las manos llenas, aqui te ofrezco halgo light.",
          name: "ALGO-LIGHT",
          animation_url: siteUrl,
          image: `https://bijm75ajnf2py2a25uz2vmqziujorhpck7kfk72ipynl4fgv72aa.arweave.net/ChLP9AlpdPxoGu0zqrIZRRLoneJX1FV_SH4avhTV_oA/${count}.png`
        }
        
        try {
          if (!fs.existsSync(`/Users/jonathanreis/Downloads/${count}.png`)) {
            console.log(count);
            var url = `${siteUrl}&count=${count}`;
            open(url);
          }
        }

        fs.writeFileSync(`./metadata/metadata/${count}.json`, JSON.stringify(metadata, null, 2), (e) => console.log(e));
        count++;
      })
    })
  })
})