import { BET_TYPE, USER } from "../common/constants";
import { getBetTypeDisplay } from "../common/helper";

export class Bacarat {

    constructor(player, banker) {
        this._player = player;
        this._banker = banker;
    }

    get player() {
        return this._player;
    }

    get banker() {
        return this._banker;
    }

    get winner () {
        return this.getWinner(this.result, getBetTypeDisplay(this._player.selectedResult));
    }

    get result () {
        return this.getResult(this._player.cards, this._banker.cards);
    }

    start() {

        const shoe = new Shoe();

        shoe.shuffle();

        // draw card for player
        const pCard1 = shoe.drawCard();
        const pCard2 = shoe.drawCard();
        
        this._player.addCard(pCard1);
        this._player.addCard(pCard2);

        // draw card for banker
        const bCard1 = shoe.drawCard();
        const bCard2 = shoe.drawCard();

        this._banker.addCard(bCard1);
        this._banker.addCard(bCard2);

        this.drawThirdCard(shoe);
    }

    drawThirdCard(shoe) {

        const isPlayerStood = this.isStood(this._player.cards[0], this._player.cards[1]);        
        
        if (isPlayerStood) {
            
            const isBankerStood = this.isStood(this._banker.cards[0], this._banker.cards[1]);

            if (!isBankerStood) {

                this._banker.addCard(shoe.drawCard());
            }
            
        } else {            

            const pCard3 = shoe.drawCard();

            this._player.addCard(pCard3);

            const bCard1 = this._banker.cards[0];
            const bCard2 = this._banker.cards[1];

            const isBankerStood = this.isBankerStood(bCard1, bCard2, pCard3);

            if (!isBankerStood) {

                this._banker.addCard(shoe.drawCard());
            }
        }

    }

    // helper methods

    getWinner (result, selectedResult) {

        if (result.includes(selectedResult)) {
            return USER.PLAYER;
        } else {
            return USER.BANKER;
        }

    }

    getResult (pCards, bCards) {

        const result = [];

        const playerTotal = this.calculateCardTotal(pCards);
        const bankerTotal = this.calculateCardTotal(bCards);

        const _playerDistanceFromNine = Math.abs(playerTotal - 9);
        const _bankerDistanceFromNine = Math.abs(bankerTotal - 9);

        // if player closer to 9
        if (_playerDistanceFromNine < _bankerDistanceFromNine) {
            result.push(BET_TYPE.PLAYER);
        } else if (_playerDistanceFromNine > _bankerDistanceFromNine) {
            result.push(BET_TYPE.BANKER);
        } else {
            result.push(BET_TYPE.TIE);
        }

        if (this.doesCardsHavePair(pCards)) {            
            result.push(BET_TYPE.PLAYER_PAIR);
        }
        
        if (this.doesCardsHavePair(bCards)) {
            result.push(BET_TYPE.BANKER_PAIR);
        }

        return result;

    }

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

        const arr = cards.map(c => c.number);

        return arr.some(a => {

            const filteredArr = arr.filter(b => b === a);
            const l = filteredArr.length;

            return l > 1;

        });
    }        
}

export class Shoe {
    
    constructor(cards) {
        this._cards = cards;
        this._deck = [
            new Card(1, 1),
            new Card(1, 2),
            new Card(1, 3),
            new Card(1, 4),
            new Card(1, 5),
            new Card(1, 6),
            new Card(1, 7),
            new Card(1, 8),
            new Card(1, 9),
            new Card(1, 10),
            new Card(1, 11),
            new Card(1, 12),
            new Card(2, 13),
            new Card(2, 1),
            new Card(2, 2),
            new Card(2, 3),
            new Card(2, 4),
            new Card(2, 5),
            new Card(2, 6),
            new Card(2, 7),
            new Card(2, 8),
            new Card(2, 9),
            new Card(2, 10),
            new Card(2, 11),
            new Card(2, 12),
            new Card(2, 13),
            new Card(2, 13),
            new Card(3, 1),
            new Card(3, 2),
            new Card(3, 3),
            new Card(3, 4),
            new Card(3, 5),
            new Card(3, 6),
            new Card(3, 7),
            new Card(3, 8),
            new Card(3, 9),
            new Card(3, 10),
            new Card(3, 11),
            new Card(3, 12),
            new Card(3, 13),
            new Card(2, 13),
            new Card(4, 1),
            new Card(4, 2),
            new Card(4, 3),
            new Card(4, 4),
            new Card(4, 5),
            new Card(4, 6),
            new Card(4, 7),
            new Card(4, 8),
            new Card(4, 9),
            new Card(4, 10),
            new Card(4, 11),
            new Card(4, 12),
            new Card(4, 13)
        ]
    }

    get deck() {
        return this._deck;
    }

    drawCard() {
        return this._deck.shift();
    }

    shuffle() {
        // shuffles the cards
        this._deck = this.shuffleArray(this._deck);
    }

    // helper

    shuffleArray(arr) {

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;

    }

}

export class Card { 
    constructor(suite, number) {
        this._suite = suite;
        this._number = number;
    }

    get suite() {
        return this._suite;
    }

    get number () {
        return this._number;
    }

    get value () {
        return this._number >= 10 ? 0 : this._number;
    }
}