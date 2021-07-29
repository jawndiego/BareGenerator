import * as THREE from 'three'
import { centerObjects, leftObjects, mirrorObjects, rightObjects } from './rawModels';
import React, {  Suspense, useState, useRef } from 'react'
import { Canvas, useFrame, createPortal } from '@react-three/fiber'
import { useGLTF, Stage, Sky, Stars, useFBO, OrbitControls, rotation, PerspectiveCamera, CameraShake, ContactShadows } from '@react-three/drei'

/**
 * 1. Choose a random object from the input objects
 * 2. Hydrate the object with scene, nodes, and materials via useGLFT
 * 3. Return the plain object combined with the hydrated fields
 */
const chooseAndHydrateObject = (objects) => {
  const randomIndex = Math.floor(Math.random() * objects.length);
  const randomObject = objects[randomIndex];
  const {materialName, pathname, position, rotation, scale} = randomObject;
  const { scene, nodes, materials } = useGLTF(`./about-pictures/${pathname}.glb`)

  const material = materials[materialName];
  const geometry = nodes[pathname].geometry;

  // console.log(pathname);

  return {
    geometry,
    material,
    position,
    rotation,
    scale,
    scene
  }
}

export function ObjectListMirror(props) {
  const randomObject = chooseAndHydrateObject(mirrorObjects);
  const group = useRef()

  useFrame((state) => {
    // This function runs 60 times/second, it binds this component to the render-loop.
    // On unmount this subscription is cleaned up automatically.

    const t = state.clock.getElapsedTime()

    // Make it float
    group.current.rotation.z = Math.sin(t / 12) / 5
    group.current.rotation.x = Math.cos(t) / 9
    group.current.rotation.y = Math.sin(t / 12) / 5
    group.current.position.y = 0.5 + (1 + Math.sin(t / 10)) / 5
  })
  
  console.log('renderMirror');
  return (
    <group ref={group} {...props} dispose={null} >
      <group rotation={randomObject.rotation} scale={randomObject.scale} position={randomObject.position} >
        <mesh object={randomObject.scene} {...props}  
            castShadow
            receiveShadow
            geometry={randomObject.geometry}
            material={randomObject.material} />
      </group>
    </group>
  )
}

export function ObjectListCenter(props) {
  const randomObject = chooseAndHydrateObject(centerObjects);
  const group = useRef()

  useFrame((state) => {
    // This function runs 60 times/second, it binds this component to the render-loop.
    // On unmount this subscription is cleaned up automatically.

    const t = state.clock.getElapsedTime()
    

    // Make it float
    group.current.rotation.z = Math.sin(t / 90) / 5
    group.current.rotation.x = Math.cos(t) / 70
    group.current.rotation.y = Math.sin(t / 90) / 5
    group.current.position.y = 0.5 + (1 + Math.sin(t / 10)) / 5
  })
  
  console.log('renderCenter');
  return (
    <group ref={group} {...props} dispose={null} >
      <group rotation={randomObject.rotation} scale={randomObject.scale} position={randomObject.position} >
        <mesh object={randomObject.scene} {...props}  
            castShadow
            receiveShadow
            geometry={randomObject.geometry}
            material={randomObject.material} />
      </group>
    </group>
  )
}

export function ObjectListRight(props) {  
  const randomObject = chooseAndHydrateObject(rightObjects);
  const group = useRef()

  console.log('renderRight');
  
  return (
    <group ref={group} {...props} dispose={null} >
      <group rotation={randomObject.rotation} scale={randomObject.scale} position={randomObject.position} >
        <mesh object={randomObject.scene} {...props}  
            castShadow
            receiveShadow
            geometry={randomObject.geometry}
            material={randomObject.material} />
      </group>
    </group>
  );
}

export function ObjectListLeft(props) {
  const randomObject = chooseAndHydrateObject(leftObjects);
  const group = useRef()

  console.log('renderLeft');

  return (
    <group ref={group} {...props} dispose={null} >
      <group rotation={randomObject.rotation} scale={randomObject.scale} position={randomObject.position} >
        <mesh object={randomObject.scene} {...props}  
            castShadow
            receiveShadow
            geometry={randomObject.geometry}
            material={randomObject.material} />
      </group>
    </group>
  )
}