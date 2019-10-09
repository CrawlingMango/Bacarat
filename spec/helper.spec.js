import { 
    getCardTotal,
    isPlayerCloserToNine,
    getResult,
    getWinner,
    isPlayerStood,
    isBankerStood
} from '../app/common/helper';
import { BET_TYPE, USER } from '../app/common/constants';

describe('#getCardTotal()', () => {

    it ('total card is less than 10', () => {

        // arrange
        const expectedResult = 2;

        // act
        const result = getCardTotal(1, 1);        

        // assert
        expect(result).toBe(expectedResult);

    })

    it ('total card is less than 10', () => {

        // arrange
        const expectedResult = 4;

        // act
        const result = getCardTotal(2, 2);        

        // assert
        expect(result).toBe(expectedResult);

    })

    it ('total card is less more than 10', () => {

        // arrange
        const expectedResult = 8;

        // act
        const result = getCardTotal(9, 9);        

        // assert
        expect(result).toBe(expectedResult);

    })

});

describe('#isPlayerCloserToNine()', () => {

    it('player is closer to 9 return true', () => {

        // arrange
        const expectedResult = true;

        // act
        const result = isPlayerCloserToNine(9, 1);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('banker is closer to 9 return false', () => {

        // arrange
        const expectedResult = false;

        // act
        const result = isPlayerCloserToNine(1, 9);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('player and banker is equal return false', () => {

        // arrange
        const expectedResult = false;

        // act
        const result = isPlayerCloserToNine(9, 9);

        // assert
        expect(result).toBe(expectedResult);

    });    

});

describe('#getResult()', () => {

    it ('result should be player', () => {

        // arrange
        const expectedResult = BET_TYPE.PLAYER;

        // act
        const result = getResult(9, 1)
        
        // assert
        expect(result).toBe(expectedResult);

    });

    it ('result should be tie', () => {

        // arrange
        const expectedResult = BET_TYPE.TIE;

        // act
        const result = getResult(9, 9)
        
        // assert
        expect(result).toBe(expectedResult);

    });

    it ('result should be banker', () => {

        // arrange
        const expectedResult = BET_TYPE.BANKER;

        // act
        const result = getResult(1, 9)
        
        // assert
        expect(result).toBe(expectedResult);

    });

});

describe('#getWinner()', () => {

    it ('player bet equals result winner should be player', () => {

        // arrange
        const expectedResult = USER.PLAYER;

        // act
        const result = getWinner(BET_TYPE.PLAYER, BET_TYPE.PLAYER);
        
        // assert
        expect(result).toBe(expectedResult);

    });

    it ('player bet not equal to result winner should be player', () => {

        // arrange
        const expectedResult = USER.BANKER;

        // act
        const result = getWinner(BET_TYPE.PLAYER, BET_TYPE.BANKER);
        
        // assert
        expect(result).toBe(expectedResult);

    });

});

describe('#isPlayerStood()', () => {

    it('player cards stand', () => {

        // arrange
        const expectedResult = true;
        
        // act
        const result = isPlayerStood(6);

        // assert
        expect(result).toBe(expectedResult);

    });

    it('player cards stand', () => {

        // arrange
        const expectedResult = true;
        
        // act
        const result = isPlayerStood(9);

        // assert
        expect(result).toBe(expectedResult);

    });

    it('player cards stand', () => {

        // arrange
        const expectedResult = true;
        
        // act
        const result = isPlayerStood(8);

        // assert
        expect(result).toBe(expectedResult);

    });

    it('player cards not stand', () => {

        // arrange
        const expectedResult = false;
        
        // act
        const result = isPlayerStood(4);

        // assert
        expect(result).toBe(expectedResult);

    });

    it('player cards not stand', () => {

        // arrange
        const expectedResult = false;
        
        // act
        const result = isPlayerStood(0);

        // assert
        expect(result).toBe(expectedResult);

    });

    it('player cards not stand', () => {

        // arrange
        const expectedResult = false;
        
        // act
        const result = isPlayerStood(5);

        // assert
        expect(result).toBe(expectedResult);

    });
});

describe('#isBankerStood()', () => {

    it ('if player stand and card total > 5', () => {

        // arranage
        const expectedResult = true;

        // act
        const result = isBankerStood(6, true, 0);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player stand and card total <= 5', () => {

        // arranage
        const expectedResult = false;

        // act
        const result = isBankerStood(5, true, 0);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total <= 2', () => {

        // arranage
        const expectedResult = false;

        // act
        const result = isBankerStood(2, false, 0);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 3', () => {

        // arranage
        const expectedResult = false;

        // act
        const result = isBankerStood(3, false, 1);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 3 and player 3rd card not valid', () => {

        // arranage
        const expectedResult = true;

        // act
        const result = isBankerStood(3, false, 8);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 4', () => {

        // arranage
        const expectedResult = false;

        // act
        const result = isBankerStood(4, false, 2);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 4 and player 3rd card not valid', () => {

        // arranage
        const expectedResult = true;

        // act
        const result = isBankerStood(4, false, 8);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 5', () => {

        // arranage
        const expectedResult = false;

        // act
        const result = isBankerStood(5, false, 4);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 5 and player 3rd card not valid', () => {

        // arranage
        const expectedResult = true;

        // act
        const result = isBankerStood(5, false, 8);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 6', () => {

        // arranage
        const expectedResult = false;

        // act
        const result = isBankerStood(6, false, 6);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 6 and player 3rd card not valid', () => {

        // arranage
        const expectedResult = true;

        // act
        const result = isBankerStood(6, false, 8);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 7', () => {

        // arranage
        const expectedResult = true;

        // act
        const result = isBankerStood(7, false, 6);

        // assert
        expect(result).toBe(expectedResult);

    });

    it ('if player not stand and card total === 8', () => {

        // arranage
        const expectedResult = true;

        // act
        const result = isBankerStood(8, false, 6);

        // assert
        expect(result).toBe(expectedResult);

    });

});