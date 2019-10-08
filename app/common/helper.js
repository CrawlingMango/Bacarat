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
    return randomNumber();
}

export const getCardTotal = (card1, card2) => {
 
    var total = card1 + card2;

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
    } else {
        return BET_TYPE.BANKER;
    }

}

export const getWinner = (result, betType) => {
    return result === betType ? USER.PLAYER : USER.BANKER;
}

export const playerDrawThirdCard = (cardTotal) => {
    return false;
}

export const bankerDrawThirdCard = (cardTotal) => {
    return false;
}

// private methods

const randomNumber = () => {
    return Math.floor(Math.random() * 10);
}