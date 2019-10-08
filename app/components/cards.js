import React from 'react';

const Cards = (props) => {
    return (
        <div>
            <div className="points">
                <b>{props.title} Cards</b> <br></br>
                <b>Total:</b> { props.total } <br></br>    
            </div>     
            <div className="card">
                {props.cards[0]}
            </div>
            <div className="card">
                {props.cards[1]}
            </div>
            {/* <div className="card">
                {playerCards[2]}
            </div> */}          
        </div>
    )
}

export default Cards;