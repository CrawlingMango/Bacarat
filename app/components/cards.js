import React from 'react';

const Cards = (props) => {
    return (
        <div>
            <div className="points">
                <b>{props.title} Cards</b> <br></br>
                <b>Total:</b> { props.total } <br></br>    
            </div>     
            <div className="card">
                {props.cards[0].value}
            </div>
            <div className="card">
                {props.cards[1].value}
            </div>
            { 
                !props.isStood ? 
                  <div className="card">
                    {props.cards[2].value} <span> Draw third Card! </span>
                  </div> : null
            }    
        </div>
    )
}

export default Cards;