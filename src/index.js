import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import './characterSheet.css'
import page1 from './Page1.png'
//import page2 from './data/Page2.png'

function CharacterSheet() {
    const [brawn, updateBrawn] = useState(1)
    const [agility, updateAgility] = useState(1)
    const [intellect, updateIntellect] = useState(1)
    const [cunning, updateCunning] = useState(1)
    const [willpower, updateWillpower] = useState(1)
    const [presence, updatePresence] = useState(1)

    function updateCharacteristic(stat, updateStat) {
        const newStat = stat + 1
        updateStat(newStat)
        return stat
    }
    return(
        <div className="character-sheet">
            <div className="page-container">
                <img src={page1} alt="Sheet" className="page-image" />
                <button className="text-overlay submit" onClick = {() => console.log('click')}>Save</button>
                <div className="text-overlay name">{BasicText('')}</div>
                <div className="text-overlay species">{BasicText('')}</div>
                <div className="text-overlay career">{BasicText('')}</div>
                <div className="text-overlay specializations">{BasicText('')}</div>
                <div className="text-overlay force-rating">1</div>
                <div className="text-overlay brawn" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(brawn, updateBrawn)}>{brawn}</div>
                <div className="text-overlay agility" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(agility, updateAgility)}>{agility}</div>
                <div className="text-overlay intellect" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(intellect, updateIntellect)}>{intellect}</div>
                <div className="text-overlay cunning" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(cunning, updateCunning)}>{cunning}</div>
                <div className="text-overlay willpower" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(willpower, updateWillpower)}>{willpower}</div>
                <div className="text-overlay presence"style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(presence, updatePresence)}>{presence}</div> 
            </div>
        </div>
    )
}
function BasicButton(input_text) {
    return (
    <Button variant="contained">{input_text}</Button>
    )
}
function BasicText(input_text) {
    return (
        <Box
        component = 'form'
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
        <TextField id="standard-basic" label= {input_text} variant="standard" />
    </Box>
    )
}
ReactDOM.render(
    <React.StrictMode>
      <CharacterSheet />
    </React.StrictMode>,
    document.getElementById('root')
  );

export default CharacterSheet