import React from 'react';

const Cards = (props) => {
    return (
        <div>
            <h4>{props.title} Cards</h4>
            <div className="card">
                {props.cards[0]}
            </div>
            <div className="card">
                {props.cards[1]}
            </div>
            {/* <div className="card">
                {playerCards[2]}
            </div> */}
            <div className="points">
                <span><b>Total:</b> { props.total }</span>    
            </div>               
        </div>
    )
}

export default Cards;