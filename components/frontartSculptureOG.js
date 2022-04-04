
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { React, Suspense, useRef, useState, useMemo } from 'react'
import { useGLTF, OrbitControls, rotation, ContactShadows, CameraShake } from '@react-three/drei'
// import { DRACOLoader, GLTFLoader } from 'three-stdlib';

// const loader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( './' );
// loader.setDRACOLoader( dracoLoader );


function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/about-pictures/JUGSYJINNS.glb')


//   return {
//     ...object,
//     material,
//     geometry,
//     scene
//   }
// }
return (
  <group ref={group} {...props} dispose={null}>
    <group
      position={[0.25, 0.48, -0.04]}
      rotation={[2.3, 1.19, -0.89]}
      scale={[2.15, 2.15, 2.15]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_1.geometry}
        material={materials["colorchart.004"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_2.geometry}
        material={materials.money}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_3.geometry}
        material={materials.wire_135110008}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_4.geometry}
        material={materials.Bottom}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_5.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_6.geometry}
        material={materials["colorchart.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_7.geometry}
        material={materials.Standard737373}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_8.geometry}
        material={materials["colorchart.002"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_9.geometry}
        material={materials["Cactus.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_10.geometry}
        material={materials["anime-blush-clip-art-png-17"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star_11.geometry}
        material={materials.texture_0}
      />
    </group>
  </group>
);
}
// useGLTF.preload('/about-pictures/JUGSYJINNS.glb')

const JawnHead = () => {


  const controls = useRef()
  return (
    <div className="front-page_wrapper">
       <div className='doge-bg'>
   <h1>title:JDR-1</h1> 
   <h1>file: JUGSYJINNS.GLB</h1> 
    <h1>cast: bread, heem, sadflower, star, snake</h1> 
   <h1></h1>
   <h1>object descriptions:</h1>
   <h1>lot 38, scanned folk art society jug, acquired at Ledbetter Auctions sometime on March 19, 2022 in gibsonville, nc. </h1>
   <h1>jug signed at the bottom of piece s.o BH (look)</h1>
   <h1>de quien son las [x] que viven afuera del firmamento?</h1>
   <h1>o ➝ 0</h1>
   <h1>contextualizado por jawn diego reyes</h1>
   </div>
      <Canvas
      dpr={(1,2)}
      camera={{ position: [20, 5, -4], fov: 44.5 }}
      gl={{ alpha: true }}
      // style={{border: '1px solid black', width: '500px', height: '500px'}}
      >
        <pointLight position={[10, 10, 10]} />
        <ambientLight args={['red']} position={[1, 0, 10]}  intensity={0.2} />
        <ambientLight position={[1, -4, 5]}  intensity={0.5} />
        <ambientLight position={[1, 5, 5]}  intensity={0.25} />
        <spotLight position={[0, 0, -1]}intensity={.3}  />
        {/* <spotLight position={[0, 5, -1]}intensity={1.2}  /> */}
        <ContactShadows />
        <Suspense fallback={null}>
        {/* <Preload /> */}
        </Suspense>
        <OrbitControls ref={controls} />

          </Canvas>

    </div>
  )
}

export default JawnHead;
