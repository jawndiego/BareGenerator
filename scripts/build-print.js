var fs = require('fs');
const fse = require('fs-extra');
const execSync = require('child_process').execSync;
const { mirrorObjects, centerObjects, rightObjects, leftObjects } = require('../components/data/modelData')

const models = {
  mirror: 'angel',
  center: 'plant',
  right: 'dunkin',
  left: 'concha'
};

/**
 * Remove temporary directory if it already exists, then create a fresh one
 */
const tempDir = './tmp';

if (fs.existsSync(tempDir)){
  fs.rmSync(tempDir, { recursive: true });
}

fs.mkdirSync(tempDir);

/**
 * Copy all the relevant directories and files from ./ to ./tmp
 */

const srcDirs = [
  './components',
  './fonts',
  './node_modules',
  './pages',
  './public',
  './scss',
  './globals.json',
  './next.config.js',
  './package-lock.json',
  './package.json',
  './postcss.config.js'
];
                              
// srcDirs.forEach(srcDir => {
//   fse.copySync(srcDir, `${tempDir}/${srcDir}`);
// });

if (fs.existsSync('output')){
  fs.rmSync('output', { recursive: true });
}
fs.mkdirSync(`output`);

// for (const modelPosition in models) {
//   fse.appendFile(`${tempDir}/public/about-pictures/${models[modelPosition]}`, '', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   })
// }

let currentMirrorObject, currentCenterObject, currentRightObject, currentLeftObject;

mirrorObjects.forEach(mirrorObject => {
  centerObjects.forEach(centerObject => {
    rightObjects.forEach(rightObject => {
      leftObjects.forEach(leftObject => {
        const count = `${mirrorObject.name}-${centerObject.name}-${leftObject.name}-${rightObject.name}-`;
        console.log('one');
        /**
         * Make subdirectory for this version
         */

        fs.mkdirSync(`${tempDir}/${count}`);

        srcDirs.forEach(srcDir => {
          fse.copySync(srcDir, `${tempDir}/${count}/${srcDir}`);
        });

        console.log('two');

        /**
         * Remove ./tmp/public/about-pictures, make it fresh, and fill it with only the models we need
         */

        fs.rmSync(`${tempDir}/${count}/public/about-pictures`, { recursive: true });
        fs.mkdirSync(`${tempDir}/${count}/public/about-pictures`);

        console.log('three');

        const mirrorString = `export const mirrorObjects = [${JSON.stringify(mirrorObject)}]\n\n`;
        const centerString = `export const centerObjects = [${JSON.stringify(centerObject)}]\n\n`;
        const rightString = `export const rightObjects = [${JSON.stringify(rightObject)}]\n\n`;
        const leftString = `export const leftObjects = [${JSON.stringify(leftObject)}]\n\n`;
        const fullString = mirrorString + centerString + rightString + leftString;

        // Remove components/data/modelData.js, make it fresh, fill it with what we need

        // fs.readdirSync(`${tempDir}/${count}/components/data`).forEach(file => {
        //   console.log(count);
        //   console.log(file);
        // });

        fs.rmSync(`${tempDir}/${count}/components/data`, { recursive: true });
        fs.mkdirSync(`${tempDir}/${count}/components/data`);

        console.log('four');

        fs.appendFileSync(`${tempDir}/${count}/components/data/modelData.js`, fullString, function (err) {
          if (err) throw err;
          console.log('Saved!');
        })

        // [mirrorObject, centerObject, rightObject, leftObject].forEach(model => {
          // fse.copySync(`./public/about-pictures/${model.pathname}.glb`, `${tempDir}/${count}/public/about-pictures/${model.pathname}.glb`);
        // });
        fse.copySync(`./public/about-pictures/${mirrorObject.pathname}.glb`, `${tempDir}/${count}/public/about-pictures/${mirrorObject.pathname}.glb`);
        fse.copySync(`./public/about-pictures/${centerObject.pathname}.glb`, `${tempDir}/${count}/public/about-pictures/${centerObject.pathname}.glb`);
        fse.copySync(`./public/about-pictures/${leftObject.pathname}.glb`, `${tempDir}/${count}/public/about-pictures/${leftObject.pathname}.glb`);
        fse.copySync(`./public/about-pictures/${rightObject.pathname}.glb`, `${tempDir}/${count}/public/about-pictures/${rightObject.pathname}.glb`);


        console.log('five', count);

        execSync(`cd ${tempDir}/${count} && npm run build && npm run export`)

        console.log('six', count);

        fs.mkdirSync(`output/${count}`);
        fse.copySync(`${tempDir}/${count}/out`, `output/${count}`);
      })
    })
  })
});
