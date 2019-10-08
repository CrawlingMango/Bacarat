import { BET_TYPE, USER } from './constants';

export const getBetTypeDisplay = (betType) => {

    switch(betType) {
        case 1:
            return BET_TYPE.PLAYER_PAIR
        case 2:
            return BET_TYPE.PLAYER
        case 3:
            return BET_TYPE.TIE
        case 4:
            return BET_TYPE.BANKER
        case 5:
            return BET_TYPE.BANKER_PAIR
        default:
            return 'NONE'
    }

}

export const randomCard = () => {
    return { 
        value: randomNumber(),
        number: 0,
        suite: 0
    };
}

export const getCardTotal = (cardVal1, cardVal2) => {
 
    var total = cardVal1 + cardVal2;

    if (total > 10) {
        total = total - 10;
    }

    if (total % 10 === 0) {
        total = 0;
    }
 
    return total;
}

export const isPlayerCloserToNine = (playerTotal, bankerTotal) => {

    const _playerTotal = Math.abs(playerTotal - 9);
    const _bankerTotal = Math.abs(bankerTotal - 9);

    if (_playerTotal < _bankerTotal) {
        return true;
    }

    return false;
}

export const getResult = (playerTotal, bankerTotal) => {    
    if (isPlayerCloserToNine(playerTotal, bankerTotal)) {
        return BET_TYPE.PLAYER;
    } else if (playerTotal === bankerTotal) {
        return BET_TYPE.TIE;
    } else {
        return BET_TYPE.BANKER;
    }
}

export const getWinner = (result, betType) => {
    return result === betType ? USER.PLAYER : USER.BANKER;
}

export const isPlayerStood = (cardTotal) => {
    return cardTotal <= 5 ? false : true;
}

export const isBankerStood = (cardTotal, isPlayerStood, pcardVal3) => {

    if (isPlayerStood) {
        
        if (cardTotal <= 5) {
            return false;
        }

    } else {

        if (cardTotal <= 2) {
            return false;
        }

        if (cardTotal === 3) {
            const arr = [1, 2, 3, 4, 5, 6, 7, 9, 0];
            if (arr.includes(pcardVal3)) {
                return false;
            }
        }

        if (cardTotal === 4) {
            const arr = [2, 3, 4, 5, 6, 7];
            if (arr.includes(pcardVal3)) {
                return false;
            }
        }

        if (cardTotal === 5) {
            const arr = [4, 5, 6, 7];
            if (arr.includes(pcardVal3)) {
                return false;
            }
        }

        if (cardTotal === 6) {
            const arr = [6, 7];
            if (arr.includes(pcardVal3)) {
                return false;
            }
        }
    }

    return true;
}

// private methods

const randomNumber = () => {
    return Math.floor(Math.random() * 10);
}