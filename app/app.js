import React, { useState, useEffect } from 'react';
import { getBetTypeDisplay, randomCard, getCardTotal, getResult, getWinner, playerDrawThirdCard, bankerDrawThirdCard } from './common/helper';
import PlayerDetails from './components/player-details';
import Cards from './components/cards';
import { MESSAGES, USER } from './common/constants';

const App = () => {

    const [money, setMoney] = useState(2000);
    const [bet, setBet] = useState(0);
    const [betType, setBetType] = useState(0);
    const [playerCards, setPlayerCards] = useState([0,0,0]);
    const [bankerCards, setBankerCards] = useState([0,0,0]);
    const [playerTotal, setPlayerTotal] = useState(0);
    const [bankerTotal, setBankerTotal] = useState(0);
    const [winner, setWinner] = useState('');
    const [result, setResult] = useState('');

    const handleDeal = () => {            
        
        const _newPlayerCards = [randomCard(), randomCard(), randomCard()];
        const _newBankerCards = [randomCard(), randomCard(), randomCard()];
        
        setPlayerCards(_newPlayerCards);
        setBankerCards(_newBankerCards);
        
        const _playerTotal = getCardTotal(_newPlayerCards[0], _newPlayerCards[1]);
        const _bankerTotal = getCardTotal(_newBankerCards[0], _newBankerCards[1]);

        setPlayerTotal(_playerTotal);
        setBankerTotal(_bankerTotal);

        const _result = getResult(_playerTotal, _bankerTotal);
        const _winner = getWinner(_result, betType);

        setResult(_result);
        setWinner(_winner);

        setMoney(currentMoney => {

            if (_winner === USER.PLAYER) {
                return currentMoney + bet;
            } 
            
            if (_winner === USER.BANKER) {
                return currentMoney - bet;
            }  

            return currentMoney;

        });

    };

    // useEffect(() => setPlayerTotal(currentPlayerTotal => {

    //     const total = currentPlayerTotal + getCardTotal(playerCards[0], playerCards[1]);

    //     // check if additional cards needs to be drawn;
    //     if (playerDrawThirdCard(total)) {
    //         // do something
    //     }
        
    //     return total;

    // }), [playerCards]);

    // useEffect(() => setBankerTotal(currentBankerTotal => {

    //     const total = currentBankerTotal + getCardTotal(bankerCards[0], bankerCards[1]);

    //     // check if additional cards needs to be drawn;
    //     if (bankerDrawThirdCard(total)) {
    //         // do something
    //     }

    //     return total;

    // }), [bankerCards]);

    // useEffect(() => setResult(() => {    

    //     return getResult(playerTotal, bankerTotal);

    // }), [playerTotal, bankerTotal]);

    // useEffect(() => setWinner(() => {

    //     return getWinner(result, betType);

    // }), [result]);

    // useEffect(() => setMoney(() => {

    //     console.log({winner, money, bet});

    //     if (winner === '') {
    //         return money;
    //     }

    //     if (winner === USER.PLAYER) {
    //         return money + bet;
    //     } 
        
    //     if (winner === USER.BANKER) {
    //         return money - bet;
    //     }

    // }), [winner]);

    const handleAddBet = (val) => {        

        const totalBet = bet + val;

        if (totalBet > money) {
            alert(MESSAGES.INSUFFICIENT_FUNDS);
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
            <div className="cards">
                <Cards title={'Player'} cards={playerCards} total={playerTotal}/>
                <Cards title={'Banker'} cards={bankerCards} total={bankerTotal}/>
            </div>
            <br></br>
            <div className="winner">
                <p>
                    <b>Result:</b> <span> {result}</span>
                </p>
                <p>
                    <b>Winner:</b> <span> {winner}</span>
                </p> 
            </div>
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