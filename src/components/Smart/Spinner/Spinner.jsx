import React, { memo } from 'react';
import { Spinner as BSpinner } from 'react-bootstrap';

function Spinner({width, borderWidth}) {
    // console.log(borderWidth);
    return (
        <div
            style={{
                // backgroundColor: 'rgba(255, 255, 255, 0.7)',
                width: '100%',
                // height: '100vh',
                // top: '0',
                // left: '0',
                // position: 'fixed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // zIndex: '9999'
            }}
        >
            <BSpinner
                style={{
                    width: width,
                    color: '#009EF7',
                    height: width,
                    borderWidth: borderWidth
                }}
                animation="border"
                role="status"
                size="lg"
            >
                <span className="sr-only">Loading...</span>
            </BSpinner>
        </div >
    )
}

export default memo(Spinner);