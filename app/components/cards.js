import React from 'react';
import { getSuiteDisplay, getNumberDisplay } from '../common/helper';

const Cards = (props) => {
    return (
        <div>
            <h3>Player:<span>{props.playerCardsTotal}</span></h3>
            <div className="player my-5">
                <div className="card"><b>{props.playerCards[0].value}</b> |  { getNumberDisplay(props.playerCards[0].number)} of  { getSuiteDisplay(props.playerCards[0].suite)}</div>
                <div className="card"><b>{props.playerCards[1].value}</b> |  { getNumberDisplay(props.playerCards[1].number)} of  { getSuiteDisplay(props.playerCards[1].suite)}</div>
                {
                    props.playerCards.length > 2 ?
                    <div className="card"><b>{props.playerCards[2].value}</b> |  { getNumberDisplay(props.playerCards[2].number)} of  { getSuiteDisplay(props.playerCards[2].suite)}</div>
                    : null
                }
            </div>
            <h3>Banker:<span>{props.bankerCardsTotal}</span></h3>
            <div className="banker my-5">
                <div className="card"><b>{props.bankerCards[0].value}</b> |  { getNumberDisplay(props.bankerCards[0].number)} of  { getSuiteDisplay(props.bankerCards[0].suite)}</div>
                <div className="card"><b>{props.bankerCards[1].value}</b> |  { getNumberDisplay(props.bankerCards[1].number)} of  { getSuiteDisplay(props.bankerCards[1].suite)}</div>
                {
                    props.bankerCards.length > 2 ?
                    <div className="card"><b>{props.bankerCards[2].value}</b> |  { getNumberDisplay(props.bankerCards[2].number)} of  { getSuiteDisplay(props.bankerCards[2].suite)}</div>
                    : null
                }
            </div>
        </div>
    )
}

export default Cards;