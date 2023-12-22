import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes, TshirtTabs, FilterTabStates } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { AIPicker, ColorPicker, Tab, CustomButton, FilePicker } from '../components/'



const Customizer = () => {
    const snap = useSnapshot(state);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState(null);
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false
    })
    const [activeTshirtTab, setActiveTshirtTab] = useState('maleShirt');

    const handleMouseLeave = () => {
        setActiveEditorTab(null);
    }

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker />
            case 'filepicker':
                return <FilePicker file={file} setFile={setFile} readFile={readFile} />
            case 'aipicker':
                return <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
            default:
                return null
        }
    }

    const toggleFilters = (tabName) => {

        state[FilterTabStates[tabName]] = !state[FilterTabStates[tabName]]

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })

    }

    const toggleActiveFilters = () => {
        for (const key in activeFilterTab) {
            if (activeFilterTab[key]) {
                state[FilterTabStates[key]] = !state[FilterTabStates[key]]
            }
        }
    }

    const toggleTshirt = (tabName) => {



        switch (tabName) {
            case 'femaleShirt':
                state.tshirtGender = 'female';
                break;

            case 'maleShirt':
                state.tshirtGender = 'male';
                break;
        }

        toggleActiveFilters()
        setTimeout(() => {
            toggleActiveFilters()
        }, 10);

        setActiveTshirtTab(tabName)
    }

    const handleDecal = (type, fileData) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = fileData;

        if (!activeFilterTab[decalType.filterTab]) {

            toggleFilters(decalType.filterTab)
        }

    }

    const readFile = (type) => {
        reader(file).then((result) => {
            handleDecal(type, result);
        })
    }

    const handleSubmit = async (type) => {
        if (prompt === '') {
            alert("Please enter a prompt");
            return
        }

        try {
            setGeneratingImg(true);
            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    prompt
                })

            })
            const data = await response.json();
            handleDecal(type, `data:image/png;base64,${data.photo}`)

        }
        catch (error) {
            alert(error)
        }

        finally {
            setGeneratingImg(false)
        }
    }
    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => !tab.disabled && setActiveEditorTab(tab.name)}
                                    />
                                ))}
                                <div className="absolute left-full ml-3" onMouseLeave={handleMouseLeave}>
                                    {generateTabContent()}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                        <CustomButton type="filled" title="Go Back" handleClick={() => state.intro = true} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
                    </motion.div>
                    <motion.div className='filtertabs-container' {...slideAnimation('up')} >
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isToggleTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => toggleFilters(tab.name)}
                            />
                        ))}
                    </motion.div>
                    <motion.div key="custom" className='absolute top-0 right-0' {...slideAnimation('right')}>
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {TshirtTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        isToggleTab
                                        isActiveTab={activeTshirtTab === tab.name}
                                        handleClick={() => toggleTshirt(tab.name)}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer
