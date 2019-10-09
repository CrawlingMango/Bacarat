import React from 'react';
import { getSuiteDisplay, getNumberDisplay } from '../common/helper';

const Cards = (props) => {
    return (
        <div>
            <div className="points">
                <b>{props.title} Cards</b> <br></br>
                <b>Total:</b> { props.total } <br></br>    
            </div>     
            <div className="card">
                {props.cards[0].value} |  { getNumberDisplay(props.cards[0].number)} of  { getSuiteDisplay(props.cards[0].suite)}
            </div>
            <div className="card">
                {props.cards[1].value} | {getNumberDisplay(props.cards[1].number)} of  { getSuiteDisplay(props.cards[1].suite)} 
            </div>
            { 
                !props.isStood ? 
                  <div className="card mt-5">
                    Draw third Card! <br></br>
                    {props.cards[2].value} | {getNumberDisplay(props.cards[2].number)} of  { getSuiteDisplay(props.cards[2].suite)}
                  </div> : null
            }    
        </div>
    )
}

export default Cards;