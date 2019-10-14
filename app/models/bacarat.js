import { BET_TYPE, USER } from "../common/constants";

export class Bacarat {

    constructor(player, banker) {
        this._player = player;
        this._banker = banker;
    }

    deal() {

        // draw card for player
        const pCard1 = this._banker.drawCard();
        const pCard2 = this._banker.drawCard();
        
        this._player.addCard(pCard1);
        this._player.addCard(pCard2);

        // draw card for banker
        const bCard1 = this._banker.drawCard();
        const bCard2 = this._banker.drawCard();

        this._banker.addCard(bCard1);
        this._banker.addCard(bCard2);

        const isPlayerStood = this.isStood(pCard1, pCard2);

        if (isPlayerStood) {
            
            const isBankerStood = this.isStood(bCard1, bCard2);

            if (!isBankerStood) {
                this._banker.addCard(this._banker.drawCard());
            }
            
        } else {

            const pCard3 = this._banker.drawCard();

            this._player.addCard(pCard3);

            const bCard1 = this._banker.cards[0];
            const bCard2 = this._banker.cards[1];

            const isBankerStood = this.isBankerStood(bCard1, bCard2, pCard3);

            if (!isBankerStood) {
                this._banker.addCard(this._banker.drawCard());
            }
        }
    }

    get winner () {
        // return player or banker
        if (this.result.includes(this._player.selectedResult)) {
            return USER.PLAYER;
        } else {
            return USER.BANKER;
        }
    }

    get result () {
        
        // return tie, banker, player

        const result = [];

        const playerTotal = this.calculateCardTotal(this._player.cards);
        const bankerTotal = this.calculateCardTotal(this._banker.cards);

        // if player closer to 9
        result.push(BET_TYPE.PLAYER);

        // if player < banker total
        result.push(BET_TYPE.BANKER);

        // if player == banker total
        result.push(BET_TYPE.TIE);
        
        // if player have pair
        result.push(BET_TYPE.PLAYER_PAIR);

        // if banker have pair
        result.push(BET_TYPE.BANKER_PAIR);

        return result;
    }

    // private methods

    isStood(card1, card2) {
        const cardTotal = this.calculateCardTotal([card1, card2]);
        return cardTotal <= 5 ? false : true;
    }  

    isBankerStood(bCard1, bCard2, pCard3) {

        const cardTotal = this.calculateCardTotal([bCard1, bCard2]);

        if (cardTotal <= 2) {
            return false;
        }

        if (cardTotal === 3) {
            const arr = [1, 2, 3, 4, 5, 6, 7, 9, 0];
            if (arr.includes(pCard3.value)) {
                return false;
            }
        }

        if (cardTotal === 3) {
            const arr = [1, 2, 3, 4, 5, 6, 7, 9, 0];
            if (arr.includes(pCard3.value)) {
                return false;
            }
        }

        if (cardTotal === 4) {
            const arr = [2, 3, 4, 5, 6, 7];
            if (arr.includes(pCard3.value)) {
                return false;
            }
        }

        if (cardTotal === 5) {
            const arr = [4, 5, 6, 7];
            if (arr.includes(pCard3.value)) {
                return false;
            }
        }

        if (cardTotal === 6) {
            const arr = [6, 7];
            if (arr.includes(pCard3.value)) {
                return false;
            }
        }

        return true;

    }

    calculateCardTotal(cards) {
        var total = cards.map(c => c.value).reduce((total, val) => total + val);

        if (total > 10) {
            total = total - 10;
        }

        if (total % 10 === 0) {
            total = 0;
        }

        return total;

    }

    doesCardsHavePair(cards) {
        // return true or false
    }
        
}

export class Card { 
    constructor(suite, number) {
        this._suite = suite;
        this._number = number;
    }

    get value () {
        return this._number >= 10 ? 0 : this._number;
    }
}