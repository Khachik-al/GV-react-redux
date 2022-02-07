import React, { useCallback, memo } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Container, Row, Col } from 'react-bootstrap';

// import FormLabel from '@material-ui/core/FormLabel';

function RadioGro({ title, value, name, values, onChange }) {

    const getValues = useCallback(() => {
        return values.map((el, i) => {
            return <Col xs={6} key={i}><FormControlLabel value={el.value} control={<Radio />} label={el.label} /></Col>
        })
    }, [values, value])

    return (
        <FormControl component="fieldset">
            {/* {title && <FormLabel component="legend">{title}</FormLabel>} */}
            <RadioGroup
                aria-label="gender"
                value={value}
                onChange={onChange}
                name={name}
            >
                <Container className="p-0" style={{width: '100%'}}>
                    <Row>
                        {getValues()}
                    </Row>
                </Container>
                {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
            </RadioGroup>
        </FormControl>
    );
}

export default memo(RadioGro)