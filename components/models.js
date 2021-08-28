import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function MirrorModel({ object }) {
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
  
  return <StaticModel object={object} group={group} />;
}

export function CenterModel({ object }) {
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
  
  return <StaticModel object={object} group={group} />;
}

export function StaticModel({ object, group }) {  
  return (
    <group ref={group} dispose={null} >
      <group rotation={object.rotation} scale={object.scale} position={object.position} >
        <mesh object={object.scene}  
          castShadow
          receiveShadow
          geometry={object.geometry}
          material={object.material} />
      </group>
    </group>
  );
};