import React, { useState, useEffect } from 'react'
import "./HighScores.css"
import { useTable } from 'react-table'

function HighScores() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('scores')) {
            setScores(JSON.parse(localStorage.getItem('scores')));
        }

    }, [])

    /* Old renderScores function
    const renderScores = () => {
        return scores.map(score => { return <td>{score.name}: {score.score}</td> });
    }

    */

    const data = React.useMemo(
        () => scores,
        [scores]
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name', // accessor is the "key" in the data
            },
            {
                Header: 'Score',
                accessor: 'score',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    const clearScores = () => {
        setScores([]);
        localStorage.setItem('scores', "[]");
    }

    return (
        <div>
            <h1>High Scores</h1>
            <button onClick={clearScores}>Clear Scores</button>
            <table {...getTableProps()} style={{ border: 'solid 1px blue', width: '50%', margin: 'auto' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: 'solid 3px red',
                                        background: 'aliceblue',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '10px',
                                                border: 'solid 1px gray',
                                                background: 'blue',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default HighScores
