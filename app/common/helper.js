import { BET_TYPE } from './constants';

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