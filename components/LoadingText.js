import * as THREE from 'three'
import React from 'react'
import Roboto from '../fonts/Roboto.json';

const LoadingText = ({ modelNames }) => {
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

export default LoadingText;