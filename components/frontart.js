import * as THREE from 'three'
import Roboto from '../fonts/Roboto.json';
import { centerObjects, leftObjects, mirrorObjects, rightObjects } from './data/modelData';
import React, {  Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, createPortal } from '@react-three/fiber'
import { useGLTF, Stage, Sky, useFBO, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import {CenterModel, MirrorModel, StaticModel} from './models'
import { withRouter } from 'next/router'
import { useLoader } from '@react-three/fiber'
import { DRACOLoader, GLTFLoader } from 'three-stdlib';

const [ randomCenterObject, randomLeftObject, randomMirrorObject, randomRightObject ]
  = [centerObjects, leftObjects, mirrorObjects, rightObjects].map(objectList => {
  const randomIndex = Math.floor(Math.random() * objectList.length);
  return objectList[randomIndex];;
})

// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/' );
loader.setDRACOLoader( dracoLoader );


const hydrateObject = (object) => {
  return new Promise((resolve, ) => {
    const {pathname, position, rotation, scale} = object;
    let scene, material, geometry;
      // Load a glTF resource
    loader.load(`./about-pictures/${pathname}.glb`, (gltf) => {
        material = gltf.scene.children[0].material;
        geometry = gltf.scene.children[0].geometry;
        scene = gltf.scene;
  
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        resolve({
          geometry,
          material,
          position,
          rotation,
          scale,
          scene
        })
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.log( 'An error happened' );
      }
    );
  })
}

function MagicMirror({ children, ...props }) {
  const cam = useRef()
  // useFBO creates a WebGL2 buffer for us, it's a helper from the "drei" library
  const fbo = useFBO()
  // The is a separate scene that we create, React will portal into that
  const [scene] = useState(() => new THREE.Scene())
  // Tie this component into the render-loop
  useFrame((state) => {
    // Our portal has its own camera, but we copy the originals world matrix
    cam.current.matrixWorldInverse.copy(state.camera.matrixWorldInverse)
    // Then we set the render-target to the buffer that we have created
    state.gl.setRenderTarget(fbo)
    // We render the scene into it, using the local camera that is clamped to the planes aspect ratio
    state.gl.render(scene, cam.current)
    // And flip the render-target to the default again
    state.gl.setRenderTarget(null)
  })
  return (
    <>
      <mesh {...props}>
        <planeGeometry args={[5, 10]} position={[0,10,10]} />
        {/* The "mirror" is just a boring plane, but it receives the buffer texture */}
        <meshBasicMaterial map={fbo.texture} />
      </mesh>
      <PerspectiveCamera manual ref={cam} fov={100} aspect={3 / 5} onUpdate={(c) => c.updateProjectionMatrix()} />
      {/* This is React being awesome, we portal this components children into the separate scene above */}
      {createPortal(children, scene)}
    </>
  )
}

function Lights() {
  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={3} color="red" />
      <pointLight intensity={30} position={[2, 30, 10]} color="red" />
      <pointLight intensity={6} position={[3, 1, 10]} color="blue" />
      <pointLight intensity={3} position={[3, 10, 30]} color="red" />
    </>
  )
}

function LoadingText({ modelNames }) {
  const textOptions = {
    font: new THREE.FontLoader().parse(Roboto),
    size: .3,
    height: .12
  };

  return (
    <mesh>
      <textGeometry attach='geometry' args={[`${modelNames.center}\n${modelNames.left}\n${modelNames.right}\n${modelNames.mirror}`, textOptions]} />
      <meshStandardMaterial attach='material' />
    </mesh>
  );
}

const Models = ({ modelsPlain }) => {
  const { centerObjectPlain, leftObjectPlain, rightObjectPlain, mirrorObjectPlain } = modelsPlain;

  const [centerObject, setCenterObject] = useState();
  const [leftObject, setLeftObject] = useState();
  const [rightObject, setRightObject] = useState();
  const [mirrorObject, setMirrorObject] = useState();

  // console.log("1 Models");
  // console.log(2, [centerObjectPlain, leftObjectPlain, mirrorObjectPlain, rightObjectPlain]);
  // const pathnames = [centerObjectPlain, leftObjectPlain, mirrorObjectPlain, rightObjectPlain].map(obj => {
  //   console.log(3, 'map', obj);
  //   return obj.pathname
  // })
  // console.log(4, pathnames);

  // [centerObjectPlain, leftObjectPlain, mirrorObjectPlain, rightObjectPlain].forEach(object => {
  //   console.log(5, 'forEach');
  //   console.log(5, object);
  //   // return hydrateObject(object)
  // });

  // console.log('center')
  // const centerObject = await hydrateObject(centerObjectPlain);
  // console.log(centerObject);
  // console.log('left')
  // const leftObject = await hydrateObject(leftObjectPlain);
  // console.log('mirror')
  // const mirrorObject = await hydrateObject(mirrorObjectPlain);
  // console.log('right')
  // const rightObject = await hydrateObject(rightObjectPlain);
  useEffect(() => {
    Promise.all([hydrateObject(centerObjectPlain), hydrateObject(leftObjectPlain), hydrateObject(rightObjectPlain), hydrateObject(mirrorObjectPlain)]).then(
      ([center, left, right, mirror]) => {
        setCenterObject(center);
        setLeftObject(left);
        setRightObject(right);
        setMirrorObject(mirror);
      }
    )
    // hydrateObject(centerObjectPlain).then(obj => {setCenterObject(obj)})
    // hydrateObject(leftObjectPlain).then(obj => {setLeftObject(obj)})
    // hydrateObject(rightObjectPlain).then(obj => {setRightObject(obj)})
    // hydrateObject(mirrorObjectPlain).then(obj => {setMirrorObject(obj)})
  }, [])
  
  console.log(centerObject);

  // const [ centerObject, leftObject, mirrorObject, rightObject ]
  // = [centerObjectPlain, leftObjectPlain, mirrorObjectPlain, rightObjectPlain].map(object => {
  //   console.log(object);
  //   return hydrateObject(object)
  // });



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
  ) : null
}

export function FrontArt({ router }) {
  const [what, setWhat] = useState(1);
  const { asPath } = router;
  const queryString = asPath.slice(2);
  const queryPairs = queryString.split('&');
  const query = queryPairs.reduce((object, pair) => {
    const [key, value] = pair.split('=');
    return {...object, [key]: value}
  }, {})
  const controls = useRef()

  let centerObjectPlain, leftObjectPlain, rightObjectPlain, mirrorObjectPlain;

  centerObjectPlain = query.center ? centerObjects.filter(object => object.name === query.center)[0] : randomCenterObject;
  leftObjectPlain = query.left ? leftObjects.filter(object => object.name === query.left)[0]: randomLeftObject;
  rightObjectPlain = query.right ? rightObjects.filter(object => object.name === query.right)[0]: randomRightObject;
  mirrorObjectPlain = query.mirror ? mirrorObjects.filter(object => object.name === query.mirror)[0]: randomMirrorObject;

  return (
    <div className="front-page_wrapper" onClick={()=> {setWhat(what+1)}}>
    <Canvas dpr={(1,2)} camera={{ position: [0, 4, 8], fov: 44.5 }} gl={{ alpha: false }}>
      <Lights />
      <Suspense fallback={
        <LoadingText modelNames={{ center: centerObjectPlain.name, left: leftObjectPlain.name, right: rightObjectPlain.name, mirror: mirrorObjectPlain.name }} />
      }>
        <Stage controls={controls} >
          <Models modelsPlain={{ centerObjectPlain, leftObjectPlain, mirrorObjectPlain, rightObjectPlain }} />
        </Stage>
      </Suspense>
      <OrbitControls ref={controls} />
    </Canvas>
    </div>
  )
}

export default withRouter(FrontArt)