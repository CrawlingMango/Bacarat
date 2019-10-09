import React from 'react';

const Histories = (props) => {

    const listHistories = () => {

        return Array.from(props.histories).map(h => {
                            
            return (
                <tr key={h.key}>  
                    <td>{h.key}</td>
                    <td>{h.pl}</td>
                    <td>{h.result}</td>
                </tr>
            )                        
        })
    }

    return (
        <table>
        <thead>
            <tr>
                <th>#</th>
                <th>P/L</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            { listHistories() }
        </tbody>
    </table>
    );
}

export default Histories;