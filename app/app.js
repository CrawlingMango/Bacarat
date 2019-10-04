import React from 'react';

/**
 * after clicking deal, cards will be delt with a randome a random card
 * card will be delt
 */

class Bacarat extends React.Component {
    render() {
        return(
            <div className="main">
                <div className="player-money">
                <h5>Player Money</h5>
                    <span>$2000</span>
                </div>
                <div className="show-cards">
                    <div className="player">
                        <h5>Player Cards</h5>
                        <div className="player-cards">
                            <div className="card">1</div>
                            <div className="card">2</div>
                            <div className="card">3</div>
                        </div>
                    </div>
                    <div className="banker">
                        <h5>Banker Cards</h5>
                        <div className="banker-cards">
                            <div className="card">1</div>
                            <div className="card">2</div>
                            <div className="card">3</div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="options">
                    <input type="radio" id="player-pair" name="bet" value="1"></input> Player Pair<br></br>
                    <input type="radio" id="player" name="bet" value="2"></input> Player<br></br>
                    <input type="radio" id="tie" name="bet" value="3"></input> Tie<br></br>
                    <input type="radio" id="banker" name="bet" value="4"></input> Banker<br></br>
                    <input type="radio" id="banker-pair" name="bet" value="5"></input> Banker Pair<br></br>                    
                </div>
                <br></br>
                <div className="bets">
                    <input type="checkbox" className="bet bet-5"></input> 5<br></br>
                    <input type="checkbox" className="bet bet-10"></input> 10<br></br>
                    <input type="checkbox" className="bet bet-50"></input> 50<br></br>
                    <input type="checkbox" className="bet bet-100"></input> 100<br></br>
                    <input type="checkbox" className="bet bet-500"></input> 500<br></br>
                    <input type="checkbox" className="bet bet-1000"></input> 1000<br></br>
                </div>
                <br></br>
                <div class="place-bet">
                    <button className="btn-place-bet">Deal</button>
                </div>
            </div>
        );
    }
}

export default Bacarat;