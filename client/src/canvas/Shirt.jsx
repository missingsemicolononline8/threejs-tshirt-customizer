import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from "@react-three/drei"

import state from '../store'

const Shirt = () => {

    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/tshirt_baked.glb')

    const logoTexture = useTexture(snap.logoDecal)
    const fullTexture = useTexture(snap.fullDecal)

    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

    const stateString = JSON.stringify(snap)

    return (
        <group >
            <mesh
                castShadow
                geometry={nodes[`T_Shirt_${snap.tshirtGender}`].geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}>
                {snap.isFullTexture && (
                    <Decal position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        anisotropy={10}
                        map={fullTexture}
                    />
                )}
                {snap.isLogoTexture && (
                    <Decal position={[0, 0.04, 0.18]}
                        rotation={[0, 0, 0]}
                        scale={0.20}
                        map={logoTexture}
                        anisotropy={10}
                        depthTest={false}
                        depthWrite={true}

                    />

                )}
            </mesh>
            {/* <mesh
                castShadow
                rotation={[0, 0, 3.1]}
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
                position={[-0.02, -0.7, 0]}>
                {snap.isFullTexture && (
                    <Decal position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}

            </mesh> */}
        </group>
    )
}

export default Shirt
