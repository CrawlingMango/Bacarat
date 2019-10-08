import React, { useState } from 'react';
import { getBetTypeDisplay } from './common/helper';
import PlayerDetails from './components/player-details';

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

export default App;