import { Card } from '../app/models/bacarat';
import { Player } from '../app/models/player';

describe('#Player', () => {

    it ('player should initially have zero (0) bet', () => {

        // arrange
        const player = new Player(2000);
        const expectedResult = 0;

        // act
        const result = player.bet;

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('player should initially have 2000 bet', () => {

        // arrange
        const player = new Player(2000);
        const expectedResult = 2000;

        // act
        const result = player.money;

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('player should initially have 0 cards', () => {

        // arrange
        const player = new Player(2000);
        const expectedResult = [];

        // act
        const result = player.cards;

        // assert
        expect(result).toEqual(expectedResult);

    });

    it ('player should initially have 0 selected result', () => {

        // arrange
        const player = new Player(2000);
        const expectedResult = 0;

        // act
        const result = player.selectedResult;

        // assert
        expect(result).toEqual(expectedResult);

    });

    it ('player should increase money', () => {

        // arrange
        const player = new Player(2000);
        const expectedResult = 2500;

        // act

        player.increaseMoney(500);

        const result = player.money;
        
        // assert
        expect(result).toEqual(expectedResult);

    });

    it ('player should decrease money', () => {

        // arrange
        const player = new Player(2000);
        const expectedResult = 1500;

        // act

        player.decreaseMoney(500);

        const result = player.money;
        
        // assert
        expect(result).toEqual(expectedResult);

    });

    it ('player should be able to add card to array', () => {

        // arrange
        const player = new Player(2000);
        const expectedResult = 1;

        // act

        player.addCard(new Card(1, 1));

        const result = player.cards;
        
        // assert
        expect(result.length).toEqual(expectedResult);

    });
});
