import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';

function PaintListForView({ lists, state, screenSize }) {

    return lists.map((el) => {
        return <Row className="mb-7" key={el.name}> <Col className="mb-0" xs={screenSize > 830 ? 4 : 12}>
            <label className="col-xs-12 fw-bold text-muted">
                {el.title}
            </label>
        </Col>
            <Col xs={screenSize > 830 ? 8 : 12}>
                <span className="fw-bolder fs-6 text-gray-800">
                    {state[el.name] ? state[el.name] : 'Is null'}
                </span>
            </Col>
        </Row>
    })
}

export default memo(PaintListForView);