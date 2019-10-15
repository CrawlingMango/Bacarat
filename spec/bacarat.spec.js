import { Bacarat, Card } from '../app/models/bacarat';
import { BET_TYPE } from '../app/common/constants';

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

describe('#doesCardsHavePair', () => {

    it ('cards have pair it should return true', () => {

        // arrange

        // act

        // assert

    });

    it ('card dont have pair it should return false', () => {
        
        // arrange

        // act

        // assert

    });

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

})