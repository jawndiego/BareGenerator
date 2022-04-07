
import { React, Suspense, useRef, useState, useMemo } from 'react'



// function Model(props) {
//   const group = useRef()
//   const { nodes, materials } = useGLTF('/about-pictures/JUGSYJINNS.glb')


// //   return {
// //     ...object,
// //     material,
// //     geometry,
// //     scene
// //   }
// // }
// return (
//   <group ref={group} {...props} dispose={null}>
//     <group
//       position={[0.25, 0.48, -0.04]}
//       rotation={[2.3, 1.19, -0.89]}
//       scale={[2.15, 2.15, 2.15]}
//     >
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_1.geometry}
//         material={materials["colorchart.004"]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_2.geometry}
//         material={materials.money}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_3.geometry}
//         material={materials.wire_135110008}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_4.geometry}
//         material={materials.Bottom}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_5.geometry}
//         material={materials["Material.001"]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_6.geometry}
//         material={materials["colorchart.001"]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_7.geometry}
//         material={materials.Standard737373}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_8.geometry}
//         material={materials["colorchart.002"]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_9.geometry}
//         material={materials["Cactus.001"]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_10.geometry}
//         material={materials["anime-blush-clip-art-png-17"]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.star_11.geometry}
//         material={materials.texture_0}
//       />
//     </group>
//   </group>
// );
// }
// useGLTF.preload('/about-pictures/JUGSYJINNS.glb')

const JawnHead = () => {


  // const controls = useRef()
  return (
    <div className="front-page_wrapper">
       <div className='doge-bg'>
   <h1>title:JDR-1</h1> 
   <h1>file: JUGSYJINNS.GLB</h1> 
    <h1>cast: bread, heem, sadflower, star, snake</h1> 
   <h1></h1>
   <h1>object descriptions:</h1>
   <h1>lot 38, scanned folk art society jug, acquired at Ledbetter Auctions sometime on March 19, 2022 in gibsonville, nc. </h1>
   <h1>jug signed by billy ray hussey</h1>
   <h1>de quien son las [x] que viven afuera del firmamento?</h1>
   <h1>o ➝ 0</h1>
   <h1>contextualizado por jawn diego reyes</h1>
   </div>
   <div >
   <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<model-viewer class="front-page_wrapper" seamless-poster="./poster.webp" bounds="tight" enable-pan src="./about-pictures/JUGSYJINNS.glb" camera-controls environment-image="neutral" shadow-intensity="1" exposure="0.61"  camera-orbit="81.57deg 81.84deg auto">

</model-viewer>

</div>


    </div>
  )
}

export default JawnHead;
