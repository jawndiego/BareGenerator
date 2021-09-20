import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { DRACOLoader, GLTFLoader } from 'three-stdlib';

// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/' );
loader.setDRACOLoader( dracoLoader );


const hydrateObject = async (object) => {
  const {pathname, position, rotation, scale} = object;
  let scene, material, geometry;
    // Load a glTF resource
  const gltf = await loader.loadAsync(`./about-pictures/${pathname}.glb`);
  material = gltf.scene.children[0].material;
  geometry = gltf.scene.children[0].geometry;
  scene = gltf.scene;

  gltf.scene; // THREE.Group
  gltf.scenes; // Array<THREE.Group>
  gltf.cameras; // Array<THREE.Camera>
  gltf.asset; // Object

  return {
    geometry,
    material,
    position,
    rotation,
    scale,
    scene
  }
}
  

export function MirrorModel({ object }) {
  const group = useRef()

  useFrame((state) => {
    // This function runs 60 times/second, it binds this component to the render-loop.
    // On unmount this subscription is cleaned up automatically.

    const t = state.clock.getElapsedTime()

    // Make it float
    if (group && group.current && group.current.rotation) {
      group.current.rotation.z = Math.sin(t / 12) / 5
      group.current.rotation.x = Math.cos(t) / 9
      group.current.rotation.y = Math.sin(t / 12) / 5
      group.current.position.y = 0.5 + (1 + Math.sin(t / 10)) / 5
    }
  })
  
  return <StaticModel object={object} group={group} />;
}

export function CenterModel({ object }) {
  const group = useRef()

  useFrame((state) => {
    // This function runs 60 times/second, it binds this component to the render-loop.
    // On unmount this subscription is cleaned up automatically.
    const t = state.clock.getElapsedTime()
    
    // Make it float
    if (group && group.current && group.current.rotation) {
      group.current.rotation.z = Math.sin(t / 90) / 5
      group.current.rotation.x = Math.cos(t) / 70
      group.current.rotation.y = Math.sin(t / 90) / 5
      group.current.position.y = 0.5 + (1 + Math.sin(t / 10)) / 5
    }
  })
  
  return <StaticModel object={object} group={group} />;
}

export function StaticModel({ object, group }) {
  const [model, setModel] = useState(null);
  const { pathname, materialName } = object;
  // let gltf;
  // if (gltfsObject[pathname]) {
  //   gltf = gltfsObject[pathname];
  // } else {
  //   console.log('fetch', pathname);
  //   gltf = useGLTF(`./about-pictures/${pathname}.glb`);
  //   gltfsObject[pathname] = gltf;
  // }

  useEffect(async () => {
    const load = async () => {
      const model = await hydrateObject(object);
      setModel(model)
    }

    load();
  }, [])

  if (!model) return <boxGeometry />;

  const hydratedObject = model;

  return model ? (
    <group ref={group} dispose={null} >
      <group rotation={hydratedObject.rotation} scale={hydratedObject.scale} position={hydratedObject.position} >
        <mesh hydratedObject={hydratedObject.scene}  
          castShadow
          receiveShadow
          geometry={hydratedObject.geometry}
          material={hydratedObject.material} />
      </group>
    </group>
  ) : <boxGeometry />;
};