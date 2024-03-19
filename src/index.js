import React from "react";
import ReactDOM from 'react-dom';
import './characterSheet.css'
import page1 from './Page1.png'
import page2 from './data/Page2.png'

const CharacterSheet = () => {
    return(
        <div className="character-sheet">
            <div className="page-container">
                <img src={page1} alt="Sheet" className="page-image" />
                <div className="text-overlay name">Larrel Kent</div>
                <div className="text-overlay species">Human</div>
                <div className="text-overlay career">Consular</div>
                <div className="text-overlay specializations">Healer</div>
                <div className="text-overlay force-rating">1</div>
                <div className="text-overlay brawn">2</div>
                <div className="text-overlay agility">2</div>
                <div className="text-overlay intellect">2</div>
                <div className="text-overlay cunning">2</div>
                <div className="text-overlay willpower">2</div>
                <div className="text-overlay presence">2</div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
      <CharacterSheet />
    </React.StrictMode>,
    document.getElementById('root')
  );

export default CharacterSheet()