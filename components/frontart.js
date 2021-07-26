import * as THREE from 'three'
import React, {  Suspense, useState, useRef } from 'react'
import { Canvas, useFrame, createPortal } from '@react-three/fiber'
import { useGLTF, Stage, Sky, Stars, useFBO, OrbitControls, rotation, PerspectiveCamera, CameraShake, ContactShadows } from '@react-three/drei'
import {  Beer, Concha, Angel, Plant } from './models'
import {ObjectListLeft, ObjectListRight, ObjectListCenter, ObjectListMirror} from './models'





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
    
      <PerspectiveCamera manual ref={cam} fov={150} aspect={2.5 / 5} onUpdate={(c) => c.updateProjectionMatrix()} />
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
      <pointLight intensity={60} position={[2, 30, 10]} color="red" />
      <pointLight intensity={6} position={[3, 1, 10]} color="blue" />
      <pointLight intensity={3} position={[3, 10, 30]} color="red" />
    </>
  )
}

export function FrontArt() {
  console.log("FrontArt");
  const controls = useRef()
  return (
    <div className="front-page_wrapper">
    <Canvas dpr={(1,2)} camera={{ position: [0, 4, 8], fov: 50 }} gl={{ alpha: false }}>
      <Lights />
      <Suspense fallback={null}>
        <Stage controls={controls}>
          <MagicMirror position={[-13, 3.5, 0]} rotation={[0, 0, 0]}>
            <Lights />
            <Sky sunPosition={[10000, 10, 10000]} />
            <ObjectListMirror />
          </MagicMirror>
          <ObjectListRight />
          <ObjectListLeft />
          <ObjectListCenter />
          
         
        </Stage>
      </Suspense>
      <OrbitControls ref={controls} />
    </Canvas>
    </div>
  )
}

export default FrontArt