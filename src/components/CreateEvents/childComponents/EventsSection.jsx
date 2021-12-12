import React, { memo, useCallback } from 'react';
// import { IconCont } from '../../Smart/InputBlock/styles';
// import { BsExclamationCircle } from "react-icons/bs";
// import { useSelector } from 'react-redux';
import { BsExclamationCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col } from 'react-bootstrap';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from "@material-ui/core/Tooltip";
import BlockInputs from '../../Smart/InputBlock/InputBlock';
import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
import { DataPicBlock } from '../styles';
import { span, InputTitle } from '../../../styles/globalStyles';

function EventsSection({ state, handleChange, requiredError, isMobile, contractState }) {

    const paintInputs = useCallback((name, requiredValue, placeholder = "",
        type = "text", disabled = false, title) => {
        return <div style={{ borderColor: '1px solid red' }}>
            <BlockInputs
                title={title}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                type={type}
                value={state[name]}
                require={requiredValue}
                disabled={disabled}
            />
        </div>

    }, [state, contractState]);

    return <Container>
        <Row>
            <Col xs={6} className="mb-4">
                <InputTitle> Event Name <span className="mr-1">*</span><Tooltip title="Specify your unique app name" placement="top">
                    <span><BsExclamationCircleFill size={15} color="grey" /></span>
                </Tooltip> </InputTitle>
                {paintInputs("name", requiredError[0], "", "text", false, "Event Name")}
            </Col>

            <Col xs={6} className="mb-4">
                <FormControl fullWidth>
                    <InputTitle> Event type </InputTitle>
                    <SelectComponent
                        value={state.type_id.split(" ")[0]}
                        options={[
                            { value: "Wedding 1", title: "Wedding" },
                            { value: "Birthday 2", title: "Birthday" },
                            { value: "Baptism 3", title: "Baptism" }
                        ]}
                        setValues={handleChange}
                        name="type_id"
                    />
                </FormControl>
            </Col>

            <Col xs={isMobile > 600 ? 4 : 6} className="mb-2">
                <InputTitle> Date <span >*</span></InputTitle>
                <DataPicBlock>
                    <DatePicker
                        selected={state['event_date']}
                        onChange={(date) =>
                            handleChange({ target: { value: date, name: 'event_date' } })}
                        style={{ width: '100%' }}
                        minDate={new Date()}
                    />
                    {requiredError[1] && <div className="fs-7 text-danger mt-2">Date Is required</div>}
                </DataPicBlock> </Col>


            <Col xs={isMobile > 600 ? 4 : 6} className="mb-2">
                <InputTitle> Start time <span className="mr-1">*</span></InputTitle>
                {paintInputs("event_start", requiredError[2], "00:00", "time", false, "Start time")}
            </Col>

            <Col xs={isMobile > 600 ? 4 : 12} className={isMobile < 600 ? "mt-3 mb-2" : "mb-2"}>
                <InputTitle> End time <span className="mr-1">*</span><Tooltip title="Specify a later time than the start time" placement="top">
                    <span><BsExclamationCircleFill size={15} color="grey" /></span></Tooltip></InputTitle>
                {paintInputs("event_end", requiredError[3], "00:00", "time", !state['event_start'], "End time")}
            </Col>


            <Col xs={12} className="mb-2 mt-3">
                <InputTitle> Number of guest expected <span>*</span></InputTitle>
                {paintInputs("guests_number", requiredError[4], "", "number", false, "Number of guest expected")}
            </Col>

            <Col xs={12}>
                <InputTitle className="mt-3"> Description </InputTitle>
                <TextareaAutosize
                    aria-label="empty textarea"
                    onChange={handleChange}
                    name={'notes'}
                    value={state['notes']}
                    style={{
                        minHeight: '60px', width: '100%', border: 'none', backgroundColor: '#EEF3F7',
                        outline: 'aliceblue', borderRadius: '0.475rem', padding: '0.75rem 1rem',
                        fontSize: '15px', fontWeight: '500', lineHeight: '1.5', color: '#5E6278'
                    }}
                />
            </Col>
        </Row>
    </Container>
}

export default memo(EventsSection);