export class Banker {

    constructor() {
        this._cards = [];
    }

    get cards () {
        return this._cards;
    }

    addCard(card) {
        this._cards.push(card);
    }

    removeAllCards() {
        this._cards = [];
    }

    drawCard () {

        const arrSuite = [1, 2, 3, 4];
        const arrNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        const _suite = arrSuite[Math.floor(Math.random() * arrSuite.length)];
        const _number = arrNumber[Math.floor(Math.random() * 13)];  

        return new Card(_suite, _number);
    }
    
}