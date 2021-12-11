import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';

function Lines({ datasets, width, height, radius = 3, yValue = false, yGridValue = false, xFontSize = 0, labelsSize }) {
    return <Line
        data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'],
            datasets: datasets
        }}
        width={width}
        height={height}
        options={{
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: radius
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: xFontSize,
                        }
                    },
                    grid: {
                        display: false
                    },
                    display: true
                },
                y: {
                    ticks: {
                        font: {
                            size: 10,
                        }
                    },
                    grid: {
                        display: yGridValue
                    },
                    display: yValue
                },
            },

            plugins: {
                legend: {
                    display: labelsSize ? true : false,
                    labels: {
                        boxWidth: 10,
                        font: {
                            size: labelsSize,
                        },
                    },
                    align: 'end',
                },
            }
        }}
    />
};

export default memo(Lines);