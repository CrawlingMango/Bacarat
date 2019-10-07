import React, { useState } from 'react';

const App = () => {

    const [money, setMoney] = useState(2000);
    const [bet, setBet] = useState(0);

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

    const handlClearBet = () => {
        setBet(currentBet => currentBet - currentBet);
    }

    return (
        <div className="main">
            <h1>Bacarat</h1>
            <div className="player-details">
                <b>Player Money:</b> <span>$ {money}</span> <br></br>
                <b>Player Bet: </b> <span>$ {bet}</span> <br></br>
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
    );
};

export default App;