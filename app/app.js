import React from 'react';
import { Player } from './models/player';
import { Banker } from './models/banker';

const App = () => {    

    const INIT_MONEY = 2000;

    const player = new Player(INIT_MONEY);
    const banker = new Banker();

    const handleDeal = () => {

        const game = new Bacarat(player, banker);

        game.deal();

        const winner = game.winner();
        const result = game.result();

        if (winner == 'player') {
            player.increaseMoney(player.bet);
        } else {
            player.decreaseMoney(player.bet);
        }                

    }

    const handleIncreaseBet = (amount) => {

        player.increaseBet(amount);

    }

    return (
        <div className="main">
                <h1>Bacarat</h1>
        </div>
    )
}

export default App;