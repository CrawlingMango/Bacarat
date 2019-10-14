export class Player {    

    constructor(money) {
        this._money = money;
        this._bet = 0;
        this._selectedResult = 0;
        this._cards = [];
    }    

    increaseMoney (amount) {
        this._money += amount;
    }

    decreaseMoney (amount) {
        this._money -= amount;
    }

    increaseBet (amount) {
        this._bet += amount;        
    }

    decreaseBet (amount) {
        this._bet -= amount;
    }

    get money ()  {
        return this._money;
    }

    get bet () {
        return this._bet;
    }

    get selectedResult () {
        return this._selectedResult;
    }

    set selectedResult (result) {
        this._selectedResult = result;
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

}