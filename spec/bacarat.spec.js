import { Bacarat, Card } from '../app/models/bacarat';
import { BET_TYPE } from '../app/common/constants';
import { Player } from '../app/models/player';
import { Banker } from '../app/models/banker';

describe('#calculateCardTotal', () => {

    it ('card total is less than ten (10)', () => {

        // arrange
        const game = new Bacarat();
        const cards = [new Card(1, 1,), new Card(1, 1)];
        const expectedResult = 2;

        // act
        var result = game.calculateCardTotal(cards);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('card total is equal to ten (10)', () => {

        // arrange
        const game = new Bacarat();
        const cards = [new Card(1, 7,), new Card(1, 3)];
        const expectedResult = 0;

        // act
        var result = game.calculateCardTotal(cards);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('card total is greater than ten (10)', () => {

        // arrange
        const game = new Bacarat();
        const cards = [new Card(1, 7,), new Card(1, 7)];
        const expectedResult = 4;

        // act
        var result = game.calculateCardTotal(cards);

        // assert
        expect(result).toBe(expectedResult);

    });

});

describe('#isStood', () => {

    it ('player card stood should return true', () => {

        // arrange
        const [card1, card2] = [new Card(1, 3,), new Card(1,5)];
        const game = new Bacarat();

        // act
        const result = game.isStood(card1, card2);

        // assert
        expect(result).toBeTruthy();

    });

    it ('player card not stood should return false', () => {

        // arrange
        const [card1, card2] = [new Card(1, 8,), new Card(1,5)];
        const game = new Bacarat();

        // act
        const result = game.isStood(card1, card2);

        // assert
        expect(result).toBeFalsy();

    });

    it ('banker card stood should return return true', () => {

        // arrange
        const [bCard1, bCard2, pCard3] = [new Card(1, 3), new Card(1, 3), new Card(1, 5)];
        const game = new Bacarat();

        // act
        const result = game.isBankerStood(bCard1, bCard2, pCard3);

        // assert
        expect(result).toBeTruthy();

    });

    it ('banker card not stood should return return false', () => {

        // arrange
        const [bCard1, bCard2, pCard3] = [new Card(1, 3), new Card(1, 3), new Card(1, 6)];
        const game = new Bacarat();

        // act
        const result = game.isBankerStood(bCard1, bCard2, pCard3);

        // assert
        expect(result).toBeFalsy();

    });
});

describe('#getResult', () => {

    it ('player is closer to nine, result equals player', () => {

        // arrange
        const pCards = [new Card(1, 9,), new Card(1, 10)];
        const bCards = [new Card(1, 8,), new Card(1, 10)];
        const game = new Bacarat();
        
        const expectedResult = [BET_TYPE.PLAYER];

        // act
        const result = game.getResult(pCards, bCards);

        // assert
        expect(result).toEqual(expectedResult);
    });

    it ('banker is closer to nine, result equals banker', () => {

        // arrange
        const pCards = [new Card(1, 8,), new Card(1, 10)];
        const bCards = [new Card(1, 9,), new Card(1, 10)];
        const game = new Bacarat();
        
        const expectedResult = [BET_TYPE.BANKER];

        // act
        const result = game.getResult(pCards, bCards);

        // assert
        expect(result).toEqual(expectedResult);

    });

    it ('player equals banker, result equals tie', () => {

        // arrange
        const pCards = [new Card(1, 7,), new Card(1, 10)];
        const bCards = [new Card(1, 7,), new Card(1, 10)];
        const game = new Bacarat();
        
        const expectedResult = [BET_TYPE.TIE];

        // act
        const result = game.getResult(pCards, bCards);

        // assert
        expect(result).toEqual(expectedResult);

    });

    it ('player equals banker, player has pair, result equals tie and player pair', () => {

        // arrange
        const pCards = [new Card(1, 7,), new Card(1, 7)];
        const bCards = [new Card(1, 4,), new Card(1, 10)];
        const game = new Bacarat();
        
        const expectedResult = [BET_TYPE.TIE, BET_TYPE.PLAYER_PAIR];

        // act
        const result = game.getResult(pCards, bCards);

        // assert
        expect(result).toEqual(expectedResult);

    });

    it ('player equals banker, banker has pair, result equals tie and banker pair', () => {

        // arrange
        const pCards = [new Card(1, 4,), new Card(1, 10)];
        const bCards = [new Card(1, 7,), new Card(1, 7)];
        const game = new Bacarat();
        
        const expectedResult = [BET_TYPE.TIE, BET_TYPE.BANKER_PAIR];

        // act
        const result = game.getResult(pCards, bCards);

        // assert
        expect(result).toEqual(expectedResult);

    });

});

describe('#getWinner', () => {

    it ('result is player, player placed bet on player, player wins', () => {

        // arrange
        const result = [BET_TYPE.PLAYER];
        const selectedResult = BET_TYPE.PLAYER;
        const game = new Bacarat();

        const expectedResult = BET_TYPE.PLAYER;

        // act
        const _result = game.getWinner(result, selectedResult);

        // assert
        expect(_result).toBe(expectedResult);

    });

    it ('result is banker, player placed bet on player, banker wins', () => {

        // arrange
        const result = [BET_TYPE.BANKER];
        const selectedResult = BET_TYPE.PLAYER;
        const game = new Bacarat();

        const expectedResult = BET_TYPE.BANKER;

        // act
        const _result = game.getWinner(result, selectedResult);

        // assert
        expect(_result).toBe(expectedResult);

    })

});

describe('#Card', () => {

    it ('card value is less than 10 return normal value', () => {

        // arrange
        const card = new Card(1, 1);
        const expectedResult = 1;

        // act
        const result = card.value;

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('card value is more than 10 return zero (0)', () => {

        // arrange
        const card = new Card(1, 11);
        const expectedResult = 0;

        // act
        const result = card.value;

        // assert
        expect(result).toBe(expectedResult);

    });

});

describe('#deal', () => {

    it ('after deal, player and banker should have some cards', () => {

        // arrange
        const player = new Player(2000);
        const banker = new Banker();

        const game = new Bacarat(player, banker);

        // act
        game.start();

        // assert
        expect(game.banker.cards.length).toBeGreaterThan(0);
        expect(game.player.cards.length).toBeGreaterThan(0);
    });

    it ('after deal, winner should not be empty', () => {

        // arrange
        const player = new Player(2000);
        const banker = new Banker();

        const game = new Bacarat(player, banker);

        // act
        game.start();

        const result = game.winner;

        // assert
        expect(result).not.toEqual('');
    });

    it ('after deal, result should not be empty', () => {

        // arrange
        const player = new Player(2000);
        const banker = new Banker();

        const game = new Bacarat(player, banker);

        // act
        game.start();

        const result = game.result;

        // assert
        expect(result).not.toEqual([]);
    });

});

describe('#doesCardsHavePair', () => {

    it ('cards have pairs, return true', () => {

        // arrange
        const game = new Bacarat();

        // act
        const result = game.doesCardsHavePair([{ value: 0, number: 1, suite: 0},{ value: 0, number: 1, suite: 0},{ value: 0, number: 0, suite: 0}]);
        
        // assert
        expect(result).toBeTruthy();

    });

    it ('cards does not have pairs, return false', () => {

        // arrange
        const game = new Bacarat();

        // act
        const result = game.doesCardsHavePair([{ value: 0, number: 1, suite: 0},{ value: 0, number: 2, suite: 0},{ value: 0, number: 3, suite: 0}]);
        
        // assert
        expect(result).toBeFalsy();

    });

});