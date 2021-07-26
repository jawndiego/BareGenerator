import * as THREE from 'three'
import React, {  Suspense, useState, useRef } from 'react'
import { Canvas, useFrame, createPortal } from '@react-three/fiber'
import { useGLTF, Stage, Sky, Stars, useFBO, OrbitControls, rotation, PerspectiveCamera, CameraShake, ContactShadows } from '@react-three/drei'


// NEW FORMAT CODE GENERATOR 
//MIRRORCHAR

export function ObjectListMirror(props) {
  //objectsMirror
  const objects = [
    {
      name: 'angel',
      pathname: 'angel',
      material: 'Cactus',
      position: [-1.9, 9, 8],
      scale: [22, 22, 22],
      rotation: [2, 0, .49]
    },
    {
      name: 'heem',
      pathname: 'heem',
      material: 'Cactus',
      position: [-4.1, 6, 7],
      scale: [13, 13, 13],
      rotation: [0, -2.2, 0]
    },
    {
      name: 'boxer',
      pathname: 'boxer',
      material: 'Cactus',
      position: [-5, -6, 8],
      scale: [26, 26, 26],
      rotation: [0, -4, 0],

    }
  ]
  
  const randomIndex = Math.floor(Math.random() * objects.length);
  let randomObject = objects[randomIndex];
  let { name, pathname, material, position, scale, rotation } = randomObject;
  
  const group = useRef()
  const { scene, nodes, materials } = useGLTF(`./about-pictures/${pathname}.glb`)

  console.log(pathname)

  useFrame((state) => {
    // This function runs 60 times/second, it binds this component to the render-loop.
    // On unmount this subscription is cleaned up automatically.

    // Rotate 
    const t = state.clock.getElapsedTime()

    // Make it float
    group.current.rotation.z = Math.sin(t / 12) / 5
    group.current.rotation.x = Math.cos(t) / 9
    group.current.rotation.y = Math.sin(t / 12) / 5
    group.current.position.y = 0.5 + (1 + Math.sin(t / 10)) / 5
  })
  
  return (
    <group ref={group} {...props} dispose={null} >
      <group rotation={randomObject.rotation} scale={randomObject.scale} position={randomObject.position} >
        <mesh object={scene} {...props}  
            castShadow
            receiveShadow
            geometry={nodes[pathname].geometry}
            material={materials[material]} />
      </group>
    </group>
  )
  }

//Center character 

export function ObjectListCenter(props) {

  //objects center 
  
  const objects = [
    {
      name: 'plant',
      pathname: 'planta',
      material: 'Cactus',
      position: [-12.5, 3.75, 6],
      scale: [4.2, 4.2, 4.2],
      rotation: [1.8, 0, 0.55]
    
      
    },
    {
      name: 'nopal001',
      pathname: 'nopal001',
      material: 'Cactus',
      position: [-14.5, 0, 6],
      scale: [.16, .16, .16],
      rotation: [0, 3, 0.55]
      
    },
    {
      name: 'boxcactus',
      pathname: 'boxcactus',
      material: 'boxcactus',
      position: [-12.5, 5, 6],
      scale: [8, 8, 8],
      rotation: [0, 0, 0]
      
    },
    {
      name: 'bigflower',
      pathname: 'bigflower001',
      material: 'BoxCactus.002',
      position: [-12, 3, 6],
      scale: [6, 6, 6],
      rotation: [1.8, .3, .4],
      
    },
    {
      name: 'one1',
      pathname: 'one1',
      material: 'StandardFF3300',
      position: [-12, 3, 6],
      scale: [6, 6, 6],
      rotation: [0.92, 0, 0.28],
      
    },
    {
      name: 'snake',
      pathname: 'snake',
      material: 'colorchart',
      position: [-12, -3, 6],
      scale: [6, 6, 6],
      rotation: [1.9, 0, 0],
      
    }
  ]
  
  const randomIndex = Math.floor(Math.random() * objects.length);
  let randomObject = objects[randomIndex];
  let { name, pathname, material, position, scale, rotation } = randomObject;
  
  const group = useRef()
  const { scene, nodes, materials } = useGLTF(`./about-pictures/${pathname}.glb`)

  console.log(pathname)
  useFrame((state) => {
    // This function runs 60 times/second, it binds this component to the render-loop.
    // On unmount this subscription is cleaned up automatically.

    // Rotate 
    const t = state.clock.getElapsedTime()
    

    // Make it float
    group.current.rotation.z = Math.sin(t / 90) / 5
    group.current.rotation.x = Math.cos(t) / 70
    group.current.rotation.y = Math.sin(t / 90) / 5
    group.current.position.y = 0.5 + (1 + Math.sin(t / 10)) / 5
  })
  
  return (
  
    <group ref={group} {...props} dispose={null} >
      <group rotation={randomObject.rotation} scale={randomObject.scale} position={randomObject.position} >
        <mesh object={scene} {...props}  
            castShadow
            receiveShadow
            geometry={nodes[pathname].geometry}
            material={materials[material]} />
      </group>
    </group>
  )
  }

//RIGHTSIDE

export function ObjectListRight(props) {

  //objectsright 
  
  const objects = [
    {
      name: 'dunkin',
      pathname: 'dunkin',
      material: 'dunkin',
      position: [-10.5, .29, 3],
      scale: [.2, .2, .2],
      rotation: [8.1, 7.8, 17.1]
    },
  
    {
      name: 'beer',
      pathname: '14043_16_oz_Beer_Bottle_v2_L1',
      material: 'Material__4',
      position: [-10.5, 0, 3],
      scale: [.36, .36, .36],
      rotation: [.03, .59, 0],
    
    }, 
    {
      name: 'yakult',
      pathname: '04_cap_Circle003',
      material: 'Yakult',
      position: [-10.5, 0, 3],
      scale: [30, 30, 30],
      rotation: [.03, .59, 0],
    
    }
  ]
  
  const randomIndex = Math.floor(Math.random() * objects.length);
  let randomObject = objects[randomIndex];
  let { name, pathname, material, position, scale, rotation } = randomObject;
  
  const group = useRef()
  const { scene, nodes, materials } = useGLTF(`./about-pictures/${pathname}.glb`);
  console.log(pathname)
  
  return (
  
    <group ref={group} {...props} dispose={null} >
      <group rotation={randomObject.rotation} scale={randomObject.scale} position={randomObject.position} >
        <mesh object={scene} {...props}  
            castShadow
            receiveShadow
            geometry={nodes[pathname].geometry}
            material={materials[material]} />
      </group>
    </group>
  )
  }

//LEFTSIDE

export function ObjectListLeft(props) {

//objectsleft objectsright, objectsmiddle objectsmirror 

const objects = [
  {
    name: 'concha',
    pathname: 'PAN_CONCHA001',
    material: 'Default OBJ.001',
    position: [-15, .29, 3],
    scale: [.36, .36, .36],
    rotation: [2, 0, 0]
  },
  {
    name: 'tortilla',
    pathname: 'TORTILLA_PLATE_OBJ001',
    material: 'tortilla',
    position: [-15, 1.5, 3],
    scale: [.25, .25, .25],
    rotation: [.03, .59, 0]
  
  },
  {
    name: 'obj0',
    pathname: 'obj0',
    material: '_Gun_GWdefault',
    position: [-15, .8, 3],
    scale: [.6, .6, .6],
    rotation: [0, 2.4, 1.75]
  
  },
  {
    name: 'pitaya',
    pathname: 'Cactus_Fig_04',
    material: 'Cactus_Fig_04_Material',
    position: [-15, 1.5, 3],
    scale: [.36, .36, .36],
    rotation: [.5, .5, 3]
  
  }
]

const randomIndex = Math.floor(Math.random() * objects.length);
let randomObject = objects[randomIndex];
let { name, pathname, material, position, scale, rotation } = randomObject;

const group = useRef()
const { scene, nodes, materials } = useGLTF(`./about-pictures/${pathname}.glb`);
console.log(pathname)

return (

  <group ref={group} {...props} dispose={null} >
    <group rotation={randomObject.rotation} scale={randomObject.scale} position={randomObject.position} >
      <mesh object={scene} {...props}  
          castShadow
          receiveShadow
          geometry={nodes[pathname].geometry}
          material={materials[material]} />
    </group>
  </group>
)
}

// Models 
