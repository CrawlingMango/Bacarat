import React from 'react';

const PlayerDetails = (props) => {    
    return (
        <div className="player-details">
            <b>Player Money:</b> <span>$ {props.money}</span> <br></br>
            <b>Player Bet: </b> <span>$ {props.bet}</span> <br></br>
            <b>Bet Type: </b> <span>{props.betType}</span><br></br>
        </div>
    ) 
}

export default PlayerDetails;