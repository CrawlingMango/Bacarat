import React, { useState } from 'react';

const BET_TYPE = {
    PLAYER_PAIR: 'Player Pair',
    PLAYER: 'Player',
    TIE: 'Tie',
    BANKER: 'Banker',
    BANKER_PAIR: 'Banker Pair'
}

const App = () => {

    const [money, setMoney] = useState(2000);
    const [bet, setBet] = useState(0);
    const [betType, setBetType] = useState(0);

    const handleDeal = () => {    

        // deal 2 card for player
        // deal 2 card for bankder

        alert('Deal!');
        
    };

    const handleAddBet = (val) => {        

        const totalBet = bet + val;

        if (totalBet > money) {
            alert('Insufficient Funds!');
        } else {
            setBet(currentBet => currentBet + val);
        }
    }

    const handlClearBet = () => setBet(currentBet => currentBet - currentBet);

    const handleOnSelectBetType = (e) => setBetType(getBetTypeDisplay(Number(e.target.value)));

    return (
        <div className="main">
            <h1>Bacarat</h1>
            <PlayerDetails money={money} bet={bet} betType={betType}/>
            <br></br>
            <div className="bet-type">
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="player-pair" name="bet" value="1"></input> <label htmlFor="player-pair">Player Pair</label><br></br>
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="player" name="bet" value="2"></input> <label htmlFor="player">Player</label><br></br>
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="tie" name="bet" value="3"></input> <label htmlFor="tie">Tie</label><br></br>
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="banker" name="bet" value="4"></input> <label htmlFor="banker">Banker</label><br></br>
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="banker-pair" name="bet" value="5"></input> <label htmlFor="banker-pair">Banker Pair</label><br></br>                     
            </div>
            <br></br>
            <div className="bet-amount">
                <button onClick={() => handleAddBet(1)} type="button" className="bet bet-1">1</button>
                <button onClick={() => handleAddBet(5)} type="button" className="bet bet-5">5</button>
                <button onClick={() => handleAddBet(10)} type="button" className="bet bet-10">10</button>
                <button onClick={() => handleAddBet(50)} type="button" className="bet bet-50">50</button>
                <button onClick={() => handleAddBet(100)} type="button" className="bet bet-100">100</button>
                <button onClick={() => handleAddBet(500)} type="button" className="bet bet-500">500</button>
                <button onClick={() => handleAddBet(1000)} type="button" className="bet bet-1000">1000</button>
            </div>
            <br></br>
            <div className="place-bet">
            <button className="btn-place-bet" onClick={handlClearBet} type="button">Clear Bet</button>
                <button className="btn-place-bet" onClick={handleDeal} type="button">Deal!</button>
            </div>
        </div>
    )
}

const PlayerDetails = (props) => {    
    return (
        <div className="player-details">
            <b>Player Money:</b> <span>$ {props.money}</span> <br></br>
            <b>Player Bet: </b> <span>$ {props.bet}</span> <br></br>
            <b>Bet Type: </b> <span>{props.betType}</span><br></br>
        </div>
    ) 
}

// helper

const getBetTypeDisplay = (betType) => {

    switch(betType) {
        case 1:
            return BET_TYPE.PLAYER_PAIR
        case 2:
            return BET_TYPE.PLAYER
        case 3:
            return BET_TYPE.TIE
        case 4:
            return BET_TYPE.BANKER
        case 5:
            return BET_TYPE.BANKER_PAIR
        default:
            return 'NONE'
    }

}

export default App;