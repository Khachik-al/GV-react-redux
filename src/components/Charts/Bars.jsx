import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';

function Bars() {
    return <Bar
        data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'First Text',
                data: [44, 62, 74, 52, 19, 42, 80, 91, 65, 56, 41, 56],
                backgroundColor: [
                    '#27ACF7'
                ],
                borderColor: [
                    '#27ACF7'
                ],
                borderWidth: 1
            },
            {
                label: 'Second Text',
                data: [34, 52, 44, 22, 89, 32, 50, 81, 55, 46, 81, 66],
                backgroundColor: [
                    '#E8EAF1'
                ],
                borderColor: [
                    '#E8EAF1'
                ],
                borderWidth: 1
            }
            ]
        }}
        width={100}
        height={150}
        options={{
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 10,
                        }
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 10,
                        }
                    },
                    grid: {
                        display: true
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 10
                        }
                    },
                    align: 'end'
                },
            }
        }}
    />
}

export default memo(Bars);