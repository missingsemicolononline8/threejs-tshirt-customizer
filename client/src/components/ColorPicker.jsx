import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'


const ColorPicker = () => {
    const snap = useSnapshot(state);
    return (

        <SketchPicker color={snap.color} onChange={(color) => state.color = color.hex} />

    )
}

export default ColorPicker
