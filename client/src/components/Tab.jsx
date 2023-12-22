import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store/index'

const Tab = ({ tab, isToggleTab, isActiveTab, handleClick }) => {
    const snap = useSnapshot(state);



    let styles = isToggleTab && isActiveTab ? { backgroundColor: snap.color, opacity: 0.5 } : { backgroundColor: "transparent", opacity: 1 };
    styles = tab.disabled ? { ...styles, filter: "grayscale(1)" } : styles


    return (
        <div key={tab.name} className={`tab-btn ${isToggleTab ? 'rounded-full glassmorphism' : 'rounded-4'}`} onClick={handleClick} style={styles}>
            <img src={tab.icon} alt={tab.name} className={`${isToggleTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"}`} />
        </div>
    )
}

export default Tab
