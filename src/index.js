import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom'
import './characterSheet.css'
import page1 from './data/Page1.png'
import Niman from './data/Niman.png'
import Healer from './data/Healer.png'
import { MenuItem, Button, Dialog, DialogTitle, DialogContent, FormControlLabel, Checkbox, Box, TextField, Select } from "@mui/material"
//import page2 from './data/Page2.png'

function CharacterSheet() {
    const [brawn, updateBrawn] = useState(0)
    const [agility, updateAgility] = useState(0)
    const [intellect, updateIntellect] = useState(0)
    const [cunning, updateCunning] = useState(0)
    const [willpower, updateWillpower] = useState(0)
    const [presence, updatePresence] = useState(0)
    const [name, updateName] = useState('')
    const [species, updateSpecies] = useState('')
    const [career, updateCareer] = useState('')
    const [specialization, updateSpecialization] = useState([])

    const speciesList = ['Cerean', 'Human', 'Kel Dor', 'Mirialan', 'Nautolan', 'Togruta', 'Twi\'lek', 'Zabrak']
    const careerList = ['Consular', 'Guardian', 'Mystic', 'Seeker', 'Sentinel', 'Warrior']
    const speclist = ['Healer','Niman Disciple']
    const specimages = {'Healer':Healer,'Niman Disciple':Niman}
    
    useEffect(() => {determineCharacteristics()}, [species]);

    function determineCharacteristics() {
        const characteristicUpdaters = [updateBrawn, updateAgility, updateIntellect, updateCunning, updateWillpower, updatePresence]
        for (let update of characteristicUpdaters) {
            let baseStat = 2
            if (species === 'Cerean') {
                if (update === updateAgility) {
                    baseStat = 1} 
                if (update === updateIntellect) {
                    baseStat = 3}
            } if (species === 'Kel Dor') {
                if (update === updateBrawn) {
                    baseStat = 1} 
                if (update === updateWillpower) {
                    baseStat = 3}
            } if (species === 'Mirialan') {
                if (update === updateAgility) {
                    baseStat = 3}
                if (update === updateCunning) {
                    baseStat = 1}                
            } if (species === 'Nautolan') {
                if (update === updateWillpower) {
                    baseStat = 1}
                if (update === updateBrawn) {
                    baseStat = 3}
            } if (species === 'Togruta') {
                if (update === updateBrawn) {
                    baseStat = 1}
                if (update === updateCunning) {
                    baseStat = 3} 
            } if (species === 'Twi\'lek') {
                if (update === updateBrawn) {
                    baseStat = 1}
                if (update === updatePresence) {
                    baseStat = 3}
            } if (species === 'Zabrak') {
                if (update === updatePresence) {
                    baseStat = 1}
                if (update === updateWillpower) {
                    baseStat = 3}
            }
            update(baseStat)
        }
    }
    
    function handleSpeciesSelect(choice){
        updateSpecies(choice)
    }

    function updateCharacteristic(stat, updateStat) {
        const newStat = stat + 1
        updateStat(newStat)
        return stat
    }

    function handleUpdateSpecialization(event) {
        const selectedOption = event.target.value
        const isChecked = event.target.checked
        let updatedList = []

        if (isChecked) {
            updatedList = [...specialization, selectedOption]
        } else {
            updatedList = specialization.filter((option) => (option) !== selectedOption)
        }
        updateSpecialization(updatedList)
    }

    return(
        <div className="character-sheet">
            <div className="page-container">
                <img src={page1} alt="Sheet" className="page-image" />
                <button className="text-overlay submit" onClick = {() => console.log(name)}>Save</button>
                <div className="text-overlay name"> <TextField variant = "standard" onChange = {(event) => updateName(event.target.value)} /></div>
                <div className="text-overlay species"><Dropdown value={species} options={speciesList} onChange= {(event) => handleSpeciesSelect(event.target.value)} /></div>
                <div className="text-overlay career"><Dropdown value={career} options={careerList} onChange= {(event) => updateCareer(event.target.value)} /></div>
                <div className="text-overlay specializations"><CheckboxPopup value={specialization} options={speclist} onChange= {(event) => handleUpdateSpecialization(event)} /></div>
                <div className="text-overlay force-rating">1</div>
                <div className="text-overlay brawn" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(brawn, updateBrawn)}>{brawn}</div>
                <div className="text-overlay agility" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(agility, updateAgility)}>{agility}</div>
                <div className="text-overlay intellect" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(intellect, updateIntellect)}>{intellect}</div>
                <div className="text-overlay cunning" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(cunning, updateCunning)}>{cunning}</div>
                <div className="text-overlay willpower" style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(willpower, updateWillpower)}>{willpower}</div>
                <div className="text-overlay presence"style={{ userSelect: "none" }} onClick = {() => updateCharacteristic(presence, updatePresence)}>{presence}</div> 
                <div className="specialization-container">{specialization.map((spec => (<img key={spec} src={specimages[spec]} alt={spec} className="specialization-image" />)))} </div>
            </div>
        </div>
    )
}

function CheckboxPopup({value, options, onChange}) {
    const [open, setOpen] = useState(false)
    const [previous, setPrevious] = useState(value)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = (event) => {
        if (previous.includes(event.target.value)) {
            return
        }
        onChange(event)
    }
    const display = value.join(", ")

    return (
        <div>
          <Button variant="standard" onClick={handleOpen}>
            {display ? display : "Add Specialization"}
            </Button>
    
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select Options</DialogTitle>
            <DialogContent>
              {options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      value={option}
                      checked={value.includes(option)}
                      onChange={handleChange}
                    />
                  }
                  label={option}
                />
              ))}
            </DialogContent>
          </Dialog>
        </div>
      )   
}
function Dropdown({value, options, onChange}) {
    return (
        <Box sx={{ minWidth: 120 }}>
        <Select value={value} onChange={onChange} variant="standard">
        {options.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>))}
        </Select>
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