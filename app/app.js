import React, { useState } from 'react';
import { Player } from './models/player';
import { Banker } from './models/banker';
import { USER, MESSAGES } from './common/constants';
import { Bacarat, Shoe } from './models/bacarat';
import Histories from './components/histories';
import Cards from './components/cards';

const App = () => {    

    const INIT_MONEY = 2000;
    const STR_EMPTY = '';

    const [playerMoney, setPlayerMoney] = useState(INIT_MONEY);
    const [playerBet, setPlayerBet] = useState(0);
    const [playerCards, setPlayerCards] = useState([{ value: 0, number: 0, suite: 0},{ value: 0, number: 0, suite: 0},{ value: 0, number: 0, suite: 0}]);
    const [playerCardsTotal, setPlayerCardsTotal] = useState(0);
    const [playerBetType, setPlayerBetType] = useState(0);

    const [bankerCards, setBankerCards] = useState([{ value: 0, number: 0, suite: 0},{ value: 0, number: 0, suite: 0},{ value: 0, number: 0, suite: 0}]);
    const [bankerCardsTotal, setBankerCardsTotal] = useState(0);

    const [winner, setWinner] = useState(STR_EMPTY);
    const [result, setResult] = useState(STR_EMPTY);  
    const [histories, setHistories] = useState([]);  

    const handleDeal = () => {

        if (playerBetType === 0) {
            alert('Please select Bet type');
            return;
        }

        const player = new Player(INIT_MONEY);
        const banker = new Banker();

        player.selectedResult = playerBetType;
        player.increaseBet = playerBetType;

        const game = new Bacarat(player, banker);

        game.start();

        render(game.player.cards, game.banker.cards);            

        const winner = game.winner;
        const result = game.result;

        setWinner(winner);
        setResult(result.join(' + '));    

        if (winner === USER.PLAYER) {
            setPlayerMoney(currentMoney => currentMoney + playerBet);
        } else {
            setPlayerMoney(currentMoney => currentMoney - playerBet);
        }

        setHistories(currentHistory => {

            const _key = currentHistory.length > 0 ? currentHistory.length + 1 : 1;
            const _pl = winner === USER.PLAYER ? '+' + playerBet : '-' + playerBet;
            const _resultDisplay = result[0];

            const newHistory = {key: _key, pl: _pl, result: _resultDisplay};
            const newHistories = [...currentHistory, newHistory];

            return newHistories;

        });
    }

    const handleIncreaseBet = (amount) => {

        const totalBet = playerBet + amount;        

        if (totalBet > playerMoney) {
            alert(MESSAGES.INSUFFICIENT_FUNDS);
        } else {
            setPlayerBet(currentPlayerBet => currentPlayerBet + amount);
        }
    }

    const handleClearBet = () => {

        setPlayerBet(0);

    }

    const render = (playerCards, bankerCards) => {

        const game = new Bacarat();

        setPlayerCards(playerCards);
        setBankerCards(bankerCards);

        setPlayerCardsTotal(game.calculateCardTotal(playerCards));
        setBankerCardsTotal(game.calculateCardTotal(bankerCards));

    }

    const handleReset = () => {

        setPlayerMoney(INIT_MONEY);
        setPlayerBet(0);
        setPlayerCardsTotal([{ value: 0, number: 0, suite: 0},{ value: 0, number: 0, suite: 0},{ value: 0, number: 0, suite: 0}]);
        setBankerCards([{ value: 0, number: 0, suite: 0},{ value: 0, number: 0, suite: 0},{ value: 0, number: 0, suite: 0}]);
        setPlayerCardsTotal(0);
        setBankerCardsTotal(0);
    }

    const handleOnSelectBetType = (e) => (setPlayerBetType(Number(e.target.value)));

    return (
        <div className="main">
            <div className="header">
                <h1>Bacarat</h1>
                <h3>Player Money: {playerMoney}</h3>   
            </div>
            <div className="message">
                <b>Winner:</b> {winner} <br></br>
                <b>Result:</b> {result} <br></br>
            </div>
            <div className="card-table my-5">
                <Cards
                    playerCardsTotal={playerCardsTotal}
                    playerCards={playerCards}
                    bankerCardsTotal={bankerCardsTotal}
                    bankerCards={bankerCards}>
                </Cards>
            </div>
            <div className="bet-type my-5">
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="player-pair" name="bet" value="1"></input> <label htmlFor="player-pair">Player Pair</label><br></br>
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="player" name="bet" value="2"></input> <label htmlFor="player">Player</label><br></br>
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="tie" name="bet" value="3"></input> <label htmlFor="tie">Tie</label><br></br>
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="banker" name="bet" value="4"></input> <label htmlFor="banker">Banker</label><br></br>
                <input type="radio" onChange={(e) => handleOnSelectBetType(e)} id="banker-pair" name="bet" value="5"></input> <label htmlFor="banker-pair">Banker Pair</label><br></br>
            </div>
            <div className="bet-total my-5">
                <h3>Bet: {playerBet}</h3>
            </div>
            <div className="bet-amount my-5">
                <button type="button" onClick={() => handleIncreaseBet(1)} className="bet bet-1">1</button>
                <button type="button" onClick={() => handleIncreaseBet(5)} className="bet bet-5">5</button>
                <button type="button" onClick={() => handleIncreaseBet(10)} className="bet bet-10">10</button>
                <button type="button" onClick={() => handleIncreaseBet(50)} className="bet bet-50">50</button>
                <button type="button" onClick={() => handleIncreaseBet(100)} className="bet bet-100">100</button>
                <button type="button" onClick={() => handleIncreaseBet(500)} className="bet bet-500">500</button>
                <button type="button" onClick={() => handleIncreaseBet(1000)} className="bet bet-1000">1000</button>
            </div>
            <div className="btn-group my-5">
                <button className="btn-reset"     onClick={() => handleReset()}    type="button">Reset</button>
                <button className="btn-clear-bet" onClick={() => handleClearBet()} type="button">Clear Bet</button>
                <button className="btn-place-bet" onClick={() => handleDeal()}     type="button">Deal!</button>
            </div>   
            <div className="history">
                <Histories histories={histories} />
            </div>         
        </div>
    )
}

export default App;