import React, { memo, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Modal from '../../Smart/Modal/Modal';
import { DataPicBlock } from '../styles';
import BlockInputs from '../../Smart/InputBlock/InputBlock';
import { span, InputTitle } from '../../../styles/globalStyles';

function CustomerInfo({ state, handleChange, requiredError, disabledAll, modalActive, closeModal, getButtEditMod, createActive }) {

    const paintInputs = useCallback((name, requiredValue, title, type, placeholder) => {
        return <BlockInputs
            onChange={handleChange}
            name={name} placeholder=""
            title={title}
            placeholder={placeholder}
            disabled={modalActive ? false : disabledAll}
            type={type}
            value={state[name]} require={requiredValue} />
    }, [state, modalActive]);

    const paintMain = () => {
        return <Container>
            <Row className="mb-4">
                <Col xs={12}>
                    <InputTitle>Full Name <span>*</span> </InputTitle>
                    {paintInputs("fullName", requiredError[0], 'Full Name')}
                </Col>
                {/* <Col xs={6}>
                    <InputTitle>Last name<span>*</span> </InputTitle>
                    {paintInputs("lastName", requiredError[1], 'Last name')}
                </Col> */}
            </Row>

            {(modalActive || createActive) && <> <Row className="mb-4">
                <Col xs={12}>
                    <InputTitle>Home Address <span>*</span></InputTitle>
                    {paintInputs("address", requiredError[1], 'Home Address')}
                </Col>
            </Row>

                <Row className="mb-4">
                    <Col xs={4}>
                        <InputTitle>Home Phone <span>*</span></InputTitle>
                        {paintInputs("phone_number", requiredError[2], 'Home phone', 'tel')}
                    </Col>
                    <Col xs={4}>
                        <InputTitle>Alternate Phone </InputTitle>
                        {paintInputs("alt_phone_number", null, null, 'tel')}
                    </Col>
                    <Col xs={4}>
                        <InputTitle>Email <span>*</span></InputTitle>
                        {paintInputs("email", requiredError[3], 'Email address', 'email')}
                    </Col>
                </Row>

                <Row className="mb-4">

                    <Col xs={4}>
                        <InputTitle>DL# <span>*</span></InputTitle>
                        {paintInputs("dl_number", requiredError[4], 'DL number', 'text', 'TS15ZC5685512')}
                    </Col>
                    <Col xs={4}>
                        <InputTitle> DL expiration date <span >*</span></InputTitle>
                        <DataPicBlock>
                            <DatePicker
                                selected={state['dl_expire_date']}
                                onChange={(date) =>
                                    handleChange({ target: { value: date, name: 'dl_expire_date' } })}
                                style={{ width: '100%' }}
                                minDate={new Date()}
                            />
                            {requiredError[5] && <div className="fs-7 text-danger mt-2">Date Is required</div>}
                        </DataPicBlock>
                    </Col>
                    <Col xs={4}>
                        <InputTitle>Number of Guests Expected <span>*</span></InputTitle>
                        {paintInputs("guests_number", requiredError[6], 'Number is required', 'number', '')}
                    </Col>
                </Row> </>}
        </Container>
    }

    return (modalActive ? <Modal getButtons={getButtEditMod} title="Edit Customer" handleOpen={closeModal}>
        <div className="pl-3 pr-3">
            {paintMain()}
        </div>
    </Modal> : paintMain())
}

export default memo(CustomerInfo);
// import React, { memo, useCallback } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import DatePicker from "react-datepicker";
// import Modal from '../../Smart/Modal/Modal';
// import { DataPicBlock } from '../styles';
// import BlockInputs from '../../Smart/InputBlock/InputBlock';
// import { span, InputTitle } from '../../../styles/globalStyles';

// function CustomerInfo({ state, handleChange, requiredError, disabledAll, modalActive, closeModal, getButtEditMod, createActive }) {

//     const paintInputs = useCallback((name, requiredValue, title, type, placeholder) => {
//         return <BlockInputs
//             onChange={handleChange}
//             name={name} placeholder=""
//             title={title}
//             placeholder={placeholder}
//             disabled={modalActive ? false : disabledAll}
//             type={type}
//             value={state[name]} require={requiredValue} />
//     }, [state, modalActive]);

//     const paintMain = () => {
//         return <Container>
//             <Row className="mb-4">
//                 <Col xs={6}>
//                     <InputTitle>First name<span>*</span> </InputTitle>
//                     {paintInputs("firstName", requiredError[0], 'First name')}
//                 </Col>
//                 <Col xs={6}>
//                     <InputTitle>Last name<span>*</span> </InputTitle>
//                     {paintInputs("lastName", requiredError[1], 'Last name')}
//                 </Col>
//             </Row>

//             {(modalActive || createActive) && <> <Row className="mb-4">
//                 <Col xs={12}>
//                     <InputTitle>Home Address <span>*</span></InputTitle>
//                     {paintInputs("address", requiredError[2], 'Home Address')}
//                 </Col>
//             </Row>

//                 <Row className="mb-4">
//                     <Col xs={12}>
//                         <InputTitle>Email address <span>*</span></InputTitle>
//                         {paintInputs("email", requiredError[3], 'Email address', 'email')}
//                     </Col>
//                 </Row>

//                 <Row className="mb-4">
//                     <Col xs={6}>
//                         <InputTitle>Phone number <span>*</span></InputTitle>
//                         {paintInputs("phone_number", requiredError[4], 'Alt phone', 'tel')}
//                     </Col>
//                     <Col xs={6}>
//                         <InputTitle>Alt phone </InputTitle>
//                         {paintInputs("alt_phone_number", null, null, 'tel')}
//                     </Col>
//                 </Row>

//                 <Row className="mb-4">
//                     <Col xs={6}>
//                         <InputTitle> DL expiration data <span >*</span></InputTitle>
//                         <DataPicBlock>
//                             <DatePicker
//                                 selected={state['dl_expire_date']}
//                                 onChange={(date) =>
//                                     handleChange({ target: { value: date, name: 'dl_expire_date' } })}
//                                 style={{ width: '100%' }}
//                                 minDate={new Date()}
//                             />
//                             {requiredError[6] && <div className="fs-7 text-danger mt-2">Date Is required</div>}
//                         </DataPicBlock>
//                     </Col>

//                     <Col xs={6}>
//                         <InputTitle>DL number <span>*</span></InputTitle>
//                         {paintInputs("dl_number", requiredError[5], 'DL number', 'text', 'TS15ZC5685512')}
//                     </Col>
//                 </Row> </>}
//         </Container>
//     }

//     return (modalActive ? <Modal getButtons={getButtEditMod} title="Edit Customer" handleOpen={closeModal}>
//         <div className="pl-3 pr-3">
//             {paintMain()}
//         </div>
//     </Modal> : paintMain())
// }

// export default memo(CustomerInfo);