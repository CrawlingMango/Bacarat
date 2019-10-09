import { getCardTotal } from '../app/common/helper';

describe('#getCardTotal()', () => {

    it ('should return correct card total', () => {

        // arrange
        const expectedResult = 2;

        // act
        const result = getCardTotal(1, 1);        

        // assert
        expect(result).toBe(expectedResult);

    })

});