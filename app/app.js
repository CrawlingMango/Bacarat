import React, { useState } from 'react';
import { getBetTypeDisplay, randomCard, getCardTotal, getResult, getWinner, isPlayerStood, isBankerStood } from './common/helper';
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
    const [playerStood, setIsPlayerStood] = useState(true);
    const [bankerStood, setIsBankerStood] = useState(true);

    const handleDeal = () => {            
        
        setIsPlayerStood(true);
        setIsPlayerStood(true);

        const _newPlayerCards = [randomCard(), randomCard(), randomCard()];
        const _newBankerCards = [randomCard(), randomCard(), randomCard()];
        
        setPlayerCards(_newPlayerCards);
        setBankerCards(_newBankerCards);
        
        const _playerTotal = getCardTotalPlayer(_newPlayerCards[0], _newPlayerCards[1], _newPlayerCards[2]);

        const _isPlayerStood = isPlayerStood(getCardTotal(_newPlayerCards[0], _newPlayerCards[1]));

        const _bankerTotal = getCardTotalBanker(_newBankerCards[0], _newBankerCards[1], _newBankerCards[2], _isPlayerStood);

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

    const handleOnSelectBetType = (e) => setBetType(getBetTypeDisplay(Number(e.target.value)));

    const handleClearBet = () => setBet(currentBet => currentBet - currentBet);

    const handleReset = () => reset();

    const handleAddBet = (val) => {        

        const totalBet = bet + val;

        if (totalBet > money) {
            alert(MESSAGES.INSUFFICIENT_FUNDS);
        } else {
            setBet(currentBet => currentBet + val);
        }
    }

    const getCardTotalPlayer = (card1, card2, card3) => {

        let total = getCardTotal(card1, card2);

        if (!isPlayerStood(total)) {
            setIsPlayerStood(false);
            total = getCardTotal(total, card3);
        }

        return total;
    }

    const getCardTotalBanker = (card1, card2, card3, isPlayerStood) => {

        let total = getCardTotal(card1, card2);

        console.log({isPlayerStood});

        if (isPlayerStood) {
            // implement rules as the player
            if (!isBankerStood(total)) {
                setIsBankerStood(false);
                total = getCardTotal(total, card3);
            }
        }

        return total;
    }

    const reset = () => {
        setBet(0);
        setMoney(2000);
        setBetType(0);
        setPlayerCards([0, 0, 0]);
        setBankerCards([0, 0, 0]);
        setPlayerTotal(0);
        setBankerTotal(0);
        setWinner('');
        setResult('');
        setIsPlayerStood(true);
        setIsPlayerStood(true);
    }

    return (
        <div className="main">
            <h1>Bacarat</h1>
                <PlayerDetails money={money} bet={bet} betType={betType}/>
            <br></br>
            <div className="cards">
                <Cards title={'Player'} cards={playerCards} total={playerTotal} isStood={playerStood}/>
                <Cards title={'Banker'} cards={bankerCards} total={bankerTotal} isStood={bankerStood}/>
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
                <button className="btn-reset" onClick={handleReset} type="button">Reset</button>
                <button className="btn-clear-bet" onClick={handleClearBet} type="button">Clear Bet</button>
                <button className="btn-place-bet" onClick={handleDeal} type="button">Deal!</button>
            </div>
        </div>
    )
}

export default App;