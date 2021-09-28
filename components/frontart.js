import React, {  Suspense, useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, Sky, OrbitControls } from '@react-three/drei'
import {CenterModel, MirrorModel, StaticModel} from './models'
import { withRouter } from 'next/router'
import { DRACOLoader, GLTFLoader } from 'three-stdlib';

import Lights from './Lights';
import LoadingText from './LoadingText';
import MagicMirror from './MagicMirror';
import { centerObjects, leftObjects, mirrorObjects, rightObjects } from './data/modelData';

// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './' );
loader.setDRACOLoader( dracoLoader );

const hydrateObject = async (object) => {
  const {pathname, position, rotation, scale} = object;
  let scene, material, geometry;
    // Load a glTF resource
  const gltf = await loader.loadAsync(`./about-pictures/${pathname}.glb`);
  material = gltf.scene.children[0].material;
  geometry = gltf.scene.children[0].geometry;
  scene = gltf.scene;

  return {
    ...object,
    material,
    geometry,
    scene
  }
}

const getRandomObjects = () => {
  const [ center, left, mirror, right ]
    = [centerObjects, leftObjects, mirrorObjects, rightObjects].map(objectList => {
    const randomIndex = Math.floor(Math.random() * objectList.length);
    return objectList[randomIndex];;
  })

  return { center, left, mirror, right };
};

const chooseObjectsFromQuery = (query, randomObjects) => {
  const centerObjectPlain = query.center ? centerObjects.filter(object => object.name === query.center)[0] : randomObjects.center;
  const leftObjectPlain = query.left ? leftObjects.filter(object => object.name === query.left)[0]: randomObjects.left;
  const rightObjectPlain = query.right ? rightObjects.filter(object => object.name === query.right)[0]: randomObjects.right;
  const mirrorObjectPlain = query.mirror ? mirrorObjects.filter(object => object.name === query.mirror)[0]: randomObjects.mirror;

  return { centerObjectPlain, leftObjectPlain, rightObjectPlain, mirrorObjectPlain };
}

const Models = ({ modelsPlain }) => {
  const { centerObject, leftObject, rightObject, mirrorObject } = modelsPlain;
  
  return (centerObject && leftObject && rightObject && mirrorObject) ? (
    <>
      <MagicMirror position={[-13, 3.5, 0]} rotation={[0, 0, 0]}>
        <Lights />
        <Sky sunPosition={[10000, 10, 10000]} />
        <MirrorModel object={mirrorObject} />
      </MagicMirror>
      <StaticModel object={rightObject} />
      <StaticModel object={leftObject} />
      <CenterModel object={centerObject} />
    </>
  ) : null;
}

export function FrontArt({ router }) {
  let query = {};
  const { asPath } = router;
  const pathArray = asPath.split('?')
  if (pathArray.length === 2) {
    const queryString = pathArray[1];
    const queryPairs = queryString.split('&');
    query = queryPairs.reduce((object, pair) => {
      const [key, value] = pair.split('=');
      return {...object, [key]: value}
    }, {})
  }
  const controls = useRef()
  
  const [objects, setObjects] = useState({});
  const [objectsPlain, setObjectsPlain] = useState({});

  const loadAndSetObjects = (objects) => {
    const { centerObjectPlain, leftObjectPlain, rightObjectPlain, mirrorObjectPlain } = objects;
    Promise.all([hydrateObject(centerObjectPlain), hydrateObject(leftObjectPlain), hydrateObject(rightObjectPlain), hydrateObject(mirrorObjectPlain)]).then(
      ([center, left, right, mirror]) => {
        setObjects({ center, left, right, mirror })
      }
    )
  }

  const selectRandomObjectsAndSetPlain = () => {
    const randomObjects = getRandomObjects();
    setObjectsPlain(chooseObjectsFromQuery(query, randomObjects));
  }

  useEffect(() => {
    selectRandomObjectsAndSetPlain();
  }, [])

  useEffect(() => {
    console.log(objectsPlain);
    objectsPlain.centerObjectPlain && loadAndSetObjects(objectsPlain);
  }, [objectsPlain])

  return (
    <div className="front-page_wrapper">
      <Canvas
      dpr={(1,2)}
      camera={{ position: [0, 4, 8], fov: 44.5 }}
      gl={{ alpha: false }}
      // style={{border: '1px solid black', width: '500px', height: '500px'}}
      >
      <Lights />
      <Suspense fallback={
        objectsPlain.centerObjectPlain ? <LoadingText modelNames={{ center: objectsPlain.centerObjectPlain.name, left: objectsPlain.leftObjectPlain.name, right: objectsPlain.rightObjectPlain.name, mirror: objectsPlain.mirrorObjectPlain.name }} /> : null
      }>
        <Stage controls={controls} >
        <Models modelsPlain={{ centerObject: objects.center, leftObject: objects.left, mirrorObject: objects.mirror, rightObject: objects.right }} />
        </Stage>
      </Suspense>
      <OrbitControls ref={controls} />
      </Canvas>
      <button className="lozenge-button refresh-button" onClick={selectRandomObjectsAndSetPlain}>Refresh</button>
    </div>
  )
}

export default withRouter(FrontArt)