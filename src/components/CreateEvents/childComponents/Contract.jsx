// import React, { memo, useCallback, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { BsFillPlusSquareFill, BsFillDashSquareFill } from "react-icons/bs";
// import FormControl from '@material-ui/core/FormControl';
// import { Container, Row, Col } from 'react-bootstrap';
// import BlockInputs from '../../Smart/InputBlock/InputBlock';
// import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
// import { span, InputTitle } from '../../../styles/globalStyles';
// import { SpanIcon } from '../styles';
// import AccordDown from '../../Smart/AccordDown/AccordDown';

// function Contract({ state, handleChange, requiredError, editSet }) {
//     const menues = useSelector((state) => state.SettingsReducer.menues);
//     const [accordIsOpen, setAccordIsOpen] = useState(false);

//     const paintInputs = useCallback((name, requiredValue, title, type) => {
//         return <BlockInputs title={title}
//             disabled={editSet}
//             onChange={handleChange}
//             name={name}
//             placeholder=""
//             value={state[name]}
//             type={type}
//             require={requiredValue} />
//     }, [state, handleChange]);

//     const paintMenues = useCallback(() => {
//         if (menues) { return Object.values(menues).map(el => { return { value: `${el.name}&&&&&${el.id}`, title: el.name } }) };
//     }, [menues]);

//     return <Container>
//         <Row>
//             {menues && <Col xs={12} className="mb-3">
//                 <FormControl fullWidth className="mt-2 mb-3">
//                     <InputTitle className="mt-3"> Menu <span>*</span></InputTitle>
//                     <SelectComponent
//                         disabled={editSet}
//                         require={requiredError[1]}
//                         value={state.menu_id.split("&&&&&")[0]}
//                         options={paintMenues()}
//                         setValues={handleChange}
//                         name="menu_id"
//                         title="Menu"
//                     />
//                 </FormControl>
//             </Col>}
//             {/* <Col xs={12}>
//                 <InputTitle> Mneu </InputTitle>
//                 {paintInputs("menu")}
//             </Col> */}
//         </Row>

//         <Row>
//             <Col xs={12} className="mb-3">
//                 <InputTitle> Cost per guest <span>*</span></InputTitle>
//                 {paintInputs("cost_per_guest", requiredError[2], 'Deposit', "number")}
//             </Col>
//         </Row>

//         <Row>
//             <Col xs={12} className="mb-3 mt-2">
//                 <AccordDown onClickAS={() => { setAccordIsOpen(!accordIsOpen) }}
//                     title={<h5 className="text-gray-700 fw-bolder cursor-pointer mb-0">
//                         <SpanIcon className="mr-3"> {accordIsOpen ? <BsFillDashSquareFill size={18} /> : <BsFillPlusSquareFill
//                             size={18} />} </SpanIcon>
//                         Other Services</h5>}>
//                     <Row>

//                         {state["payment"] && <Col xs={12}> <div className="text-right"
//                             style={{
//                                 marginTop: '5px',
//                                 color: '#51545D',
//                                 fontFamily: 'Poppins',
//                                 fontWeight: '500',
//                                 fontSize: '1.15rem'
//                             }}
//                         >Total: {state["payment"]}</div></Col>}

//                         <Col xs={6} className="pt-2"> <FormControl fullWidth className="mt-2 mb-3">
//                             <InputTitle> Service fee </InputTitle>
//                             <SelectComponent
//                                 disabled={editSet}
//                                 value={state.serviceFee}
//                                 options={[
//                                     { value: "10 %", title: "10%" },
//                                     { value: "15 %", title: "15%" },
//                                     { value: "18 %", title: "18%" }]}
//                                 setValues={handleChange}
//                                 name="serviceFee"
//                             />
//                         </FormControl> </Col>

//                         <Col xs={6}> <InputTitle className="mt-3"> Gratitude </InputTitle>
//                             {paintInputs("gratitude", null, null, "number")} </Col>
//                         <Col xs={6}> <InputTitle className="mt-4"> Lighting </InputTitle>
//                             {paintInputs("lighting", null, null, "number")} </Col>
//                         <Col xs={6}><InputTitle className="mt-4"> Security </InputTitle>
//                             {paintInputs("security", null, null, "number")}</Col>
//                         <Col xs={6}><InputTitle className="mt-4"> Cocktail hour </InputTitle>
//                             {paintInputs("cocktailHour", null, null, "number")}</Col>
//                         <Col xs={6}> <InputTitle className="mt-4"> Ceremony </InputTitle>
//                             {paintInputs("ceremony", null, null, "number")}</Col>
//                         <Col xs={6}><InputTitle className="mt-4"> Tax </InputTitle>
//                             {paintInputs("tax", null, null, "number")}</Col>
//                         <Col xs={6}><InputTitle className="mt-4"> Other </InputTitle>
//                             {paintInputs("other", null, null, "number")}</Col>
//                     </Row>
//                 </AccordDown>
//                 <hr style={{ height: '0px' }} />
//             </Col>

//             <Col xs={12} className="mb-4">
//                 <InputTitle> Deposit <span>*</span></InputTitle>
//                 {paintInputs("deposit", requiredError[0], 'Deposit', 'number')}
//             </Col>

//             <Col xs={12} className="mb-4">
//                 <InputTitle> Payment </InputTitle>

//                 <BlockInputs
//                     disabled={true}
//                     // onChange={handleChange}
//                     name="payment"
//                     placeholder=""
//                     value={state["payment"]}
//                 />
//             </Col>

//             <Col xs={12} className="mb-4">
//                 <InputTitle> Balance due </InputTitle>
//                 {paintInputs("balance_due")}
//             </Col>

//             <Col xs={12} className="mb-4">
//                 <InputTitle> Payment type <span>*</span></InputTitle>
//                 {paintInputs("payment_type", requiredError[3], 'Payment type')}
//             </Col>

//             {/* <Col xs={12} className="mb-4">
//                 <InputTitle> Balance received </InputTitle>
//                 {paintInputs("balanceReceived")}
//             </Col> */}
//         </Row>
//     </Container >
// }

// export default memo(Contract);
























import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsFillPlusSquareFill, BsFillDashSquareFill } from "react-icons/bs";
import FormControl from '@material-ui/core/FormControl';
import { Container, Row, Col } from 'react-bootstrap';
import BlockInputs from '../../Smart/InputBlock/InputBlock';
import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
import { span, InputTitle } from '../../../styles/globalStyles';
import { SpanIcon } from '../styles';
import AccordDown from '../../Smart/AccordDown/AccordDown';

function Contract({ state, handleChange, requiredError, editSet, totalShow }) {
    const menues = useSelector((state) => state.SettingsReducer.menues);
    const [accordIsOpen, setAccordIsOpen] = useState(false);

    const paintInputs = useCallback((name, requiredValue, title, type) => {
        return <BlockInputs title={title}
            disabled={editSet}
            onChange={handleChange}
            name={name}
            placeholder=""
            value={state[name]}
            type={type}
            require={requiredValue} />
    }, [state, handleChange]);

    const paintMenues = useCallback(() => {
        if (menues) { return Object.values(menues).map(el => { return { value: `${el.name}&&&&&${el.id}`, title: el.name } }) };
    }, [menues]);

    return <Container>
        <Row>
            {menues && <Col xs={6} className="mb-0">
                <FormControl fullWidth className="mb-3">
                    <InputTitle className="mt-3"> Menu <span>*</span></InputTitle>
                    <SelectComponent
                        disabled={editSet}
                        require={requiredError[1]}
                        value={state.menu_id.split("&&&&&")[0]}
                        options={paintMenues()}
                        setValues={handleChange}
                        name="menu_id"
                        title="Menu"
                    />
                </FormControl>
            </Col>}

            <Col xs={6} className="mb-3 mt-3">
                <InputTitle> Cost per guest <span>*</span></InputTitle>
                {paintInputs("cost_per_guest", requiredError[2], 'Deposit', "number")}
            </Col>
        </Row>

        <Row>
            {menues && <Col xs={6} className="mb-3">
                <FormControl fullWidth className="mb-3">
                    <InputTitle className="mt-3"> Payment type <span>*</span></InputTitle>
                    <SelectComponent
                        disabled={editSet}
                        require={requiredError[3]}
                        value={state.payment_type}
                        options={[{ title: 'Bank', value: 'bank' }, { title: 'Cash', value: 'cash' }]}
                        setValues={handleChange}
                        name="payment_type"
                        title="Payment type"
                    />
                </FormControl>
            </Col>}

            {/* <Col xs={12} className="mb-4">
                <InputTitle> Payment type <span>*</span></InputTitle>
                {paintInputs("payment_type", requiredError[3], 'Payment type')}
            </Col> */}

            <Col xs={6} className="pt-2"> <FormControl fullWidth className="mt-2 mb-3">
                <InputTitle> Service fee </InputTitle>
                <SelectComponent
                    disabled={editSet}
                    value={state.serviceFee}
                    options={[
                        // { value: "0 %", title: "0%" },
                        { value: "10 %", title: "10%" },
                        { value: "15 %", title: "15%" },
                        { value: "18 %", title: "18%" }]}
                    setValues={handleChange}
                    name="serviceFee"
                />
            </FormControl> </Col>
        </Row>

        {/* <Row>
            <Col xs={12} className="mb-3">
                <InputTitle> Cost per guest <span>*</span></InputTitle>
                {paintInputs("cost_per_guest", requiredError[2], 'Deposit', "number")}
            </Col>
        </Row> */}

        <Row>
            <Col xs={12} className="mb-3 mt-2">
                <AccordDown onClickAS={() => { setAccordIsOpen(!accordIsOpen) }}
                    title={<h5 className="text-gray-700 fw-bolder cursor-pointer mb-0">
                        <SpanIcon className="mr-3"> {accordIsOpen ? <BsFillDashSquareFill size={18} /> : <BsFillPlusSquareFill
                            size={18} />} </SpanIcon>
                        Other Services</h5>}>
                    <Row>

                        {/* {state["payment"] && <Col xs={12}> <div className="text-right"
                            style={{
                                marginTop: '5px',
                                color: '#51545D',
                                fontFamily: 'Poppins',
                                fontWeight: '500',
                                fontSize: '1.15rem'
                            }}
                        >Total: {state["payment"]}</div></Col>} */}






                        {/* <Col xs={6} className="pt-2"> <FormControl fullWidth className="mt-2 mb-3">
                            <InputTitle> Service fee </InputTitle>
                            <SelectComponent
                                disabled={editSet}
                                value={state.serviceFee}
                                options={[
                                    { value: "10 %", title: "10%" },
                                    { value: "15 %", title: "15%" },
                                    { value: "18 %", title: "18%" }]}
                                setValues={handleChange}
                                name="serviceFee"
                            />
                        </FormControl> </Col> */}

                        <Col xs={6}> <InputTitle className="mt-4"> Gratitude </InputTitle>
                            {paintInputs("gratitude", null, null, "number")} </Col>
                        <Col xs={6}> <InputTitle className="mt-4"> Lighting </InputTitle>
                            {paintInputs("lightning", null, null, "number")} </Col>
                        <Col xs={6}><InputTitle className="mt-4"> Security </InputTitle>
                            {paintInputs("security", null, null, "number")}</Col>
                        <Col xs={6}><InputTitle className="mt-4"> Cocktail hour </InputTitle>
                            {paintInputs("cocktail_hour", null, null, "number")}</Col>
                        <Col xs={6}> <InputTitle className="mt-4"> Ceremony </InputTitle>
                            {paintInputs("ceremony", null, null, "number")}</Col>
                        <Col xs={6}><InputTitle className="mt-4"> Tax </InputTitle>
                            {paintInputs("tax", null, null, "number")}</Col>
                        <Col xs={12}><InputTitle className="mt-4"> Other </InputTitle>
                            {paintInputs("other", null, null, "number")}</Col>
                    </Row>
                </AccordDown>
                <hr style={{ height: '0px' }} />
            </Col>

            <Col xs={6} className="mb-4">
                <InputTitle> Deposit <span>*</span></InputTitle>
                {paintInputs("deposit", requiredError[0], 'Deposit', 'number')}
            </Col>

            <Col xs={6} className="mb-4">
                <InputTitle> Payment </InputTitle>

                <BlockInputs
                    disabled={false}
                    onChange={handleChange}
                    name="payment_tes"
                    type="number"
                    placeholder=""
                    value={state.payment_tes}
                />
            </Col>

            {/* <Col xs={12} className="mb-4">
                <InputTitle> Balance due </InputTitle>
                {paintInputs("balance_due")}
            </Col> */}

            {/* <Col xs={12} className="mb-4">
                <InputTitle> Payment type <span>*</span></InputTitle>
                {paintInputs("payment_type", requiredError[3], 'Payment type')}
            </Col> */}

            {/* <Col xs={12} className="mb-4">
                <InputTitle> Balance received </InputTitle>
                {paintInputs("balanceReceived")}
            </Col> */}
        </Row>

        {!totalShow && <> <Row className="mb-2">
            <Col xs={6}> <div className="text-left"
                style={{
                    marginTop: '5px',
                    color: '#51545D',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    fontSize: '1.15rem'
                }}
            >Balance due </div></Col>
            <Col xs={6}>
                <div className="text-right"
                    style={{
                        marginTop: '5px',
                        color: '#51545D',
                        fontFamily: 'Poppins',
                        fontWeight: '500',
                        fontSize: '1.15rem'
                    }}
                >{`$ `}
                    {isNaN(parseInt(state.payment - (Number(state.deposit) + Number(state.payment_tes)))) ? 0 : parseInt(state.payment - (Number(state.deposit) + Number(state.payment_tes)))}
                </div>
            </Col>
        </Row>




            <Row>
                <Col xs={6}> <div className="text-left"
                    style={{
                        marginTop: '5px',
                        color: '#51545D',
                        fontFamily: 'Poppins',
                        fontWeight: '500',
                        fontSize: '1.15rem'
                    }}
                >Grand total </div></Col>
                <Col xs={6}>
                    <div className="text-right"
                        style={{
                            marginTop: '5px',
                            color: '#51545D',
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            fontSize: '1.15rem'
                        }}
                    >$ {state["payment"] ? parseInt(state["payment"]) : '0'} </div>
                </Col>
            </Row> </>}
    </Container >
}

export default memo(Contract);