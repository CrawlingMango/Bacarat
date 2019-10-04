import React from 'react';

class Bacarat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'Deal!',
            money: 2000,
            bet: 0,
            batType: 0,
            player: {
                cards: [0,0,0]
            },
            banker: {
                cards: [0,0,0],
            },
            winner: ''
        };        
    }

    randomNumber = () => {
        return Math.floor(Math.random() * 10)
    }

    isPlayerWin = (playerPoints, bankerPoints) => {
        return playerPoints < bankerPoints ? true : false;
    }

    addMoneyToPlayer = () => {
        this.setState({
            money: this.state.money + this.state.bet
        })
    }

    subtractMoneyToPlayer = () => {
        this.setState({
            money: this.state.money - this.state.bet
        })
    }

    playerWins = () => {
        this.setState({ winner: 'Player wins!' });
        this.addMoneyToPlayer();
    }

    bankerWins = () => {
        this.setState({ winner: 'Banker wins!' });
        this.subtractMoneyToPlayer();
    }

    getTotalCardValue = (card1, card2) => {

        var result = 0;

        var result = card1 + card2;

        if (result % 10 === 0) {
            result = 0;
        } else if (result > 10) {
            result = result - 10;
        }

        return result;
    }

    handleOnClickDeal = () => {

        // display 2 random banker cards
        this.setState({
            player: {
                cards: [this.randomNumber(), this.randomNumber(), 0]  
            },
            banker: {
                cards: [this.randomNumber(), this.randomNumber(), 0]
            }
        }) 

        // check if player or banker wins
        const playerTotalCardValue = this.getTotalCardValue(this.state.player.cards[0], this.state.player.cards[1]);
        const bankerTotalCardValue = this.getTotalCardValue(this.state.banker.cards[0], this.state.banker.cards[1]);

        const playerPointsDiff = Math.abs(playerTotalCardValue - 9);
        const bankerPointsDiff = Math.abs(bankerTotalCardValue - 9);

        if (this.state.batType === 2) {
            // bet on player
            if (this.isPlayerWin(playerPointsDiff, bankerPointsDiff)) {
                this.playerWins();
            }
            else if (!this.isPlayerWin(playerPointsDiff, bankerPointsDiff)) {
                this.bankerWins();
            }
        } else if (this.state.batType === 3) {
            // bet that player and banker points will be tied
            if (playerPointsDiff === bankerPointsDiff) {
                this.playerWins();
            } else {
                this.bankerWins();
            }
        } else if (this.state.batType === 4) {
            // bet on banker
            if (this.isPlayerWin(playerPointsDiff, bankerPointsDiff)) {
                this.bankerWins();
            }
            else if (!this.isPlayerWin(playerPointsDiff, bankerPointsDiff)) {
                this.playerWins();
            }
        } else if (this.state.batType === 1) {
            if (this.state.player.cards[0] === this.state.player.cards[1]) {
                this.playerWins();
            } else {
                this.bankerWins();
            }
        } else if (this.state.batType === 5) {
            if (this.state.banker.cards[0] === this.state.banker.cards[1]) {
                this.playerWins();
            } else {
                this.bankerWins();
            }
        }
        else {
            // show error no bet type selected
        }
    }

    handleAddMoney = () => {
        const _money = this.state.money;
        this.setState({
            money: _money + 1
        })
    }

    handleOnCheckBet = (e) => {

        const isChecked = e.target.checked;
        const amount = Number(e.target.value);
        const _currentBet = this.state.bet;

        if (isChecked) {
            this.setState({
                bet: _currentBet + amount
            });
        } else {
            this.setState({
                bet: _currentBet - amount
            });
        }
    }

    handleOnSelectBetType = (e) => {
        this.setState({
            batType: Number(e.target.value)
        })
    }

    render() {
        return(
            <div className="main">
                <div className="player-money">
                    <b>Player Money</b> <span>${this.state.money}</span><br></br>
                    <b>Player Bet</b> <span>${this.state.bet}</span><br></br>
                    <p>{this.state.winner}</p>
                </div>
                <div className="show-cards">
                    <div className="player">
                        <h5>Player Cards</h5>
                        <div className="player-cards">
                            <div className="card">{this.state.player.cards[0]}</div>
                            <div className="card">{this.state.player.cards[1]}</div>
                            {/* <div className="card">{this.state.player.cards[2]}</div> */}
                        </div>
                    </div>
                    <div className="banker">
                        <h5>Banker Cards</h5>
                        <div className="banker-cards">
                            <div className="card">{this.state.banker.cards[0]}</div>
                            <div className="card">{this.state.banker.cards[1]}</div>
                            {/* <div className="card">{this.state.banker.cards[2]}</div> */}
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="options">
                    <input type="radio" onChange={this.handleOnSelectBetType} id="player-pair" name="bet" value="1"></input> Player Pair<br></br>
                    <input type="radio" onChange={this.handleOnSelectBetType} id="player" name="bet" value="2"></input> Player<br></br>
                    <input type="radio" onChange={this.handleOnSelectBetType} id="tie" name="bet" value="3"></input> Tie<br></br>
                    <input type="radio" onChange={this.handleOnSelectBetType} id="banker" name="bet" value="4"></input> Banker<br></br>
                    <input type="radio" onChange={this.handleOnSelectBetType} id="banker-pair" name="bet" value="5"></input> Banker Pair<br></br>                    
                </div>
                <br></br>
                <div className="bets">
                    <input name="amount" type="checkbox" className="bet bet-5" value="5" onChange={this.handleOnCheckBet}></input> 5<br></br>
                    <input name="amount" type="checkbox" className="bet bet-10" value="10" onChange={this.handleOnCheckBet}></input> 10<br></br>
                    <input name="amount" type="checkbox" className="bet bet-50" value="50" onChange={this.handleOnCheckBet}></input> 50<br></br>
                    <input name="amount" type="checkbox" className="bet bet-100" value="100" onChange={this.handleOnCheckBet}></input> 100<br></br>
                    <input name="amount" type="checkbox" className="bet bet-500" value="500" onChange={this.handleOnCheckBet}></input> 500<br></br>
                    <input name="amount" type="checkbox" className="bet bet-1000" value="1000" onChange={this.handleOnCheckBet}></input> 1000<br></br>
                </div>
                <br></br>
                <div className="place-bet">
                    <button className="btn-place-bet" type="button" onClick={this.handleOnClickDeal}>{this.state.message}</button>
                </div>
            </div>
        );
    }
}

export default Bacarat;