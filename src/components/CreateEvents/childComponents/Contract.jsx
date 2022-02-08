import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsFillPlusSquareFill, BsFillDashSquareFill } from "react-icons/bs";
import FormControl from '@material-ui/core/FormControl';
import { Container, Row, Col } from 'react-bootstrap';
import BlockInputs from '../../Smart/InputBlock/InputBlock';
import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
import { InputTitle } from '../../../styles/globalStyles';
import { SpanIcon } from '../styles';
import AccordDown from '../../Smart/AccordDown/AccordDown';
import CreatePayments from './CreatePayments';
import EditPayments from './EditPayments';

function Contract({ state, handleChange, requiredError, editSet, totalShow, match }) {
    const menues = useSelector((state) => state.SettingsReducer.menues);
    const [accordIsOpen, setAccordIsOpen] = useState(false);
    // const [paymentAccordIsOpen, setPaymentAccordIsOpen] = useState(false);

    const paymentReplace = useCallback((newArr) => {
        handleChange({ target: { name: 'payments', value: newArr } })
    }, [handleChange])

    const paintInputs = useCallback((name, requiredValue, title, type) => {
        return <BlockInputs title={title}
            disabled={editSet}
            onChange={handleChange}
            name={name}
            placeholder=""
            value={state[name]}
            type={type}
            require={requiredValue} />
    }, [state, handleChange, editSet]);

    const paintMenues = useCallback(() => {
        if (menues) { return Object.values(menues).map(el => { return { value: `${el.name}&&&&&${el.id}`, title: el.name } }) };
    }, [menues]);

    return <Container>
        <Row>
            {menues && <Col xs={6} className="mb-0">
                <FormControl fullWidth className="mb-3">
                    <InputTitle className="mt-3"> Menu <span>*</span></InputTitle>
                    <SelectComponent
                        maxHeight='200px'
                        disabled={editSet}
                        require={requiredError[0]}
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
                {paintInputs("cost_per_guest", requiredError[1], 'Cost per guest', "number")}
            </Col>
        </Row>

        <Row>
            {/* {menues && <Col xs={6} className="mb-3">
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
            </Col>} */}

            <Col xs={6} className="pt-2"> <FormControl fullWidth className="mt-2 mb-3">
                <InputTitle> Service fee </InputTitle>
                <SelectComponent
                    disabled={editSet}
                    value={state.serviceFee}
                    options={[
                        { value: "", title: "N/A" },
                        { value: "10 %", title: "10%" },
                        { value: "15 %", title: "15%" },
                        { value: "18 %", title: "18%" }]}
                    setValues={handleChange}
                    name="serviceFee"
                />
            </FormControl> </Col>
        </Row>

        <Row>
            <Col xs={12} className="mb-3 mt-2">
                <AccordDown onClickAS={() => { setAccordIsOpen(!accordIsOpen) }}
                    title={<h5 className="text-gray-700 fw-bolder cursor-pointer mb-0">
                        <SpanIcon className="mr-3">
                            {accordIsOpen ?
                                <BsFillDashSquareFill size={18} /> :
                                <BsFillPlusSquareFill size={18} />}
                        </SpanIcon>
                        Other Services
                    </h5>}>
                    <Row>
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
            <Col xs={12} className="mb-3 mt-2">
                {/* <AccordDown
                    onClickAS={() => { setPaymentAccordIsOpen(!paymentAccordIsOpen) }}
                    // defaultExpanded={requiredError[0] || requiredError[3] ? true : false}
                    title={<h5
                        className="text-gray-700 fw-bolder cursor-pointer mb-0"
                    >
                        <SpanIcon className="mr-3">
                            {paymentAccordIsOpen ?
                                <BsFillDashSquareFill size={18} /> :
                                <BsFillPlusSquareFill size={18} />}
                        </SpanIcon>
                        Payments
                    </h5>}> */}
                {match?.params.id ?
                    <EditPayments payments={state.payments} match={match} paymentReplace={paymentReplace} /> :
                    <CreatePayments payments={state.payments} requiredError={requiredError} paymentReplace={paymentReplace} />
                }
                {/* </AccordDown> */}
                <hr style={{ height: '0px' }} />
            </Col>
        </Row>

        {!totalShow && <> <Row className="mb-2 mt-3">
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
                    {parseInt(Number(state.payment) - (Number(state.payments[0].amount) + (state.payments[1] ? Number(state.payments[1].amount) : 0)))}
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
                    >$
                        {state.payment || '0'}
                    </div>
                </Col>
            </Row> </>}
    </Container >
}

export default memo(Contract);


// import React, { memo, useCallback, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { BsFillPlusSquareFill, BsFillDashSquareFill, BsChevronDown } from "react-icons/bs";
// import FormControl from '@material-ui/core/FormControl';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import BlockInputs from '../../Smart/InputBlock/InputBlock';
// import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
// import {  InputTitle } from '../../../styles/globalStyles';
// import { DataPicBlock, SpanIcon } from '../styles';
// import AccordDown from '../../Smart/AccordDown/AccordDown';
// import { TableCol, TableRow } from '../../Table/styles';
// import DatePicker from "react-datepicker";
// import style from '../style.module.css'

// function Contract({ state, handleChange, requiredError, editSet, totalShow, match }) {
//     const menues = useSelector((state) => state.SettingsReducer.menues);
//     const [accordIsOpen, setAccordIsOpen] = useState(false);
//     const [paymentAccordIsOpen, setPaymentAccordIsOpen] = useState(false);
//     const [addPaymentView, setAddPaymentView] = useState(false);
//     const [addPayment, setAddPayment] = useState([]);
//     const [addDeposit, setAddDeposit] = useState([]);
//     const [addPaymentInputs, setAddPaymentInputs] = useState({ type: '', date: '', amount: '' });

//     const paintInputs = useCallback((name, requiredValue, title, type) => {
//         return <BlockInputs title={title}
//             disabled={editSet}
//             onChange={handleChange}
//             name={name}
//             placeholder=""
//             value={state[name]}
//             type={type}
//             require={requiredValue} />
//     }, [state, handleChange, editSet]);

//     const paintMenues = useCallback(() => {
//         if (menues) { return Object.values(menues).map(el => { return { value: `${el.name}&&&&&${el.id}`, title: el.name } }) };
//     }, [menues]);

//     return <Container>
//         <Row>
//             {menues && <Col xs={6} className="mb-0">
//                 <FormControl fullWidth className="mb-3">
//                     <InputTitle className="mt-3"> Menu <span>*</span></InputTitle>
//                     <SelectComponent
//                         maxHeight='200px'
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

//             <Col xs={6} className="mb-3 mt-3">
//                 <InputTitle> Cost per guest <span>*</span></InputTitle>
//                 {paintInputs("cost_per_guest", requiredError[2], 'Deposit', "number")}
//             </Col>
//         </Row>

//         <Row>
//             {menues && <Col xs={6} className="mb-3">
//                 <FormControl fullWidth className="mb-3">
//                     <InputTitle className="mt-3"> Payment type <span>*</span></InputTitle>
//                     <SelectComponent
//                         disabled={editSet}
//                         require={requiredError[3]}
//                         value={state.payment_type}
//                         options={[{ title: 'Bank', value: 'bank' }, { title: 'Cash', value: 'cash' }]}
//                         setValues={handleChange}
//                         name="payment_type"
//                         title="Payment type"
//                     />
//                 </FormControl>
//             </Col>}

//             <Col xs={6} className="pt-2"> <FormControl fullWidth className="mt-2 mb-3">
//                 <InputTitle> Service fee </InputTitle>
//                 <SelectComponent
//                     disabled={editSet}
//                     value={state.serviceFee}
//                     options={[
//                         { value: "10 %", title: "10%" },
//                         { value: "15 %", title: "15%" },
//                         { value: "18 %", title: "18%" }]}
//                     setValues={handleChange}
//                     name="serviceFee"
//                 />
//             </FormControl> </Col>
//         </Row>

//         <Row>
//             <Col xs={12} className="mb-3 mt-2">
//                 <AccordDown onClickAS={() => { setAccordIsOpen(!accordIsOpen) }}
//                     title={<h5 className="text-gray-700 fw-bolder cursor-pointer mb-0">
//                     <SpanIcon className="mr-3">
//                         {accordIsOpen ?
//                             <BsFillDashSquareFill size={18} /> :
//                             <BsFillPlusSquareFill size={18} />}
//                     </SpanIcon>
//                     Other Services
//                 </h5>}>
//                     <Row>
//                         <Col xs={6}> <InputTitle className="mt-4"> Gratitude </InputTitle>
//                             {paintInputs("gratitude", null, null, "number")} </Col>
//                         <Col xs={6}> <InputTitle className="mt-4"> Lighting </InputTitle>
//                             {paintInputs("lightning", null, null, "number")} </Col>
//                         <Col xs={6}><InputTitle className="mt-4"> Security </InputTitle>
//                             {paintInputs("security", null, null, "number")}</Col>
//                         <Col xs={6}><InputTitle className="mt-4"> Cocktail hour </InputTitle>
//                             {paintInputs("cocktail_hour", null, null, "number")}</Col>
//                         <Col xs={6}> <InputTitle className="mt-4"> Ceremony </InputTitle>
//                             {paintInputs("ceremony", null, null, "number")}</Col>
//                         <Col xs={6}><InputTitle className="mt-4"> Tax </InputTitle>
//                             {paintInputs("tax", null, null, "number")}</Col>
//                         <Col xs={12}><InputTitle className="mt-4"> Other </InputTitle>
//                             {paintInputs("other", null, null, "number")}</Col>
//                     </Row>
//                 </AccordDown>
//                 <hr style={{ height: '0px' }} />
//             </Col>
//             <Col xs={12} className="mb-3 mt-2">
//                 <AccordDown onClickAS={() => { setPaymentAccordIsOpen(!paymentAccordIsOpen) }}
//                     title={<h5 className="text-gray-700 fw-bolder cursor-pointer mb-0">
//                             <SpanIcon className="mr-3">
//                                 {paymentAccordIsOpen ?
//                                     <BsFillDashSquareFill size={18} /> :
//                                     <BsFillPlusSquareFill size={18} />}
//                             </SpanIcon>
//                             Payments
//                         </h5>}>
//                     <Row>
//                         <Col xs={12} className='text-right pr-4 mb-2'>
//                             <Button
//                                 onClick={() => setAddPaymentView(true)}
//                                 variant='primary' className='pl-4 pr-4 pt-1 pb-1'
//                             >
//                                 Add Payment
//                             </Button>
//                         </Col>
//                         <Col xs={12} >
//                             <TableRow
//                                 gridCount={'20% 20% 20% 20% 18%'} className='pl-4' background='rgba(245, 248, 250, 0.5)'
//                             >
//                                 {['Payment type', 'type', 'Date', 'Amount', match?.params?.id && 'Action'].map(tit =>
//                                     <TableCol color='#469CF0' key={tit}>
//                                         {tit}
//                                     </TableCol>
//                                 )}
//                             </TableRow>
//                             {addDeposit.length ?
//                                 addDeposit.map(el => {
//                                     return <TableRow gridCount={'20% 20% 20% 20% 18%'} key={Math.random()} className='pl-4'>
//                                         <TableCol>Deposit</TableCol>
//                                         <TableCol>{el.type}</TableCol>
//                                         <TableCol>{new Date(el.date).toISOString().split('T')[0]}</TableCol>
//                                         <TableCol >{el.amount}</TableCol>
//                                         <TableCol >
//                                             <span className={style.dropdown}>
//                                                 <span className={style.dropbtn}>
//                                                     Actions
//                                                     <BsChevronDown size={14} className='ml-3' />
//                                                 </span>
//                                                 <div className={style.dropdownContent}>
//                                                     <span>Edit</span>
//                                                 </div>
//                                             </span>
//                                         </TableCol>
//                                     </TableRow>
//                                 }) :
//                                 <TableRow
//                                     gridCount='20% 20% 20% 20% 18%'
//                                     className='pl-4'
//                                 >
//                                     <TableCol style={{ position: 'relative' }}>
//                                         Deposit
//                                     </TableCol>
//                                     <TableCol style={{ position: 'relative' }}>
//                                         <SelectComponent
//                                             value={addPaymentInputs.type || 'Type'}
//                                             options={[
//                                                 { value: "cash", title: "cash" },
//                                                 { value: "check", title: "check" },
//                                             ]}
//                                             setValues={({ target }) => { setAddPaymentInputs({ ...addPaymentInputs, type: target.value }) }}
//                                             name="type"
//                                         />
//                                     </TableCol>
//                                     <TableCol>
//                                         <DataPicBlock style={{ position: 'relative' }}>
//                                             <DatePicker
//                                                 selected={addPaymentInputs['date'] || new Date()}
//                                                 onChange={(date) =>
//                                                     setAddPaymentInputs({ ...addPaymentInputs, date })}
//                                                 style={{ width: '100%' }}
//                                             />
//                                         </DataPicBlock>
//                                     </TableCol>
//                                     <TableCol >
//                                         <BlockInputs
//                                             onChange={({ target }) => { setAddPaymentInputs({ ...addPaymentInputs, amount: target.value }) }}
//                                             name="amount"
//                                             type="number"
//                                             placeholder="amount"
//                                             value={addPaymentInputs.amount}
//                                         />
//                                     </TableCol>
//                                     {match?.params?.id && <TableCol className='pl-4'>
//                                         <Button
//                                             onClick={() => {
//                                                 if (addPaymentInputs.type && addPaymentInputs.date && addPaymentInputs.amount) {
//                                                     setAddDeposit([{ ...addPaymentInputs }])
//                                                     setAddPaymentInputs({ type: '', date: '', amount: '' })
//                                                 }
//                                             }}
//                                             variant='primary' className='pl-2 pr-2 pt-1 pb-1'>save</Button>
//                                     </TableCol>}
//                                 </TableRow>}
//                             {addPayment.map(el => {
//                                 return <TableRow gridCount={'20% 20% 20% 20% 18%'} key={Math.random()} className='pl-4'>
//                                     <TableCol>Payment</TableCol>
//                                     <TableCol>{el.type}</TableCol>
//                                     <TableCol>{new Date(el.date).toISOString().split('T')[0]}</TableCol>
//                                     <TableCol >{el.amount}</TableCol>
//                                     {match?.params?.id && <TableCol >
//                                         <span className={style.dropdown}>
//                                             <span className={style.dropbtn}>
//                                                 Actions
//                                                 <BsChevronDown size={14} className='ml-3' />
//                                             </span>
//                                             <div className={style.dropdownContent}>
//                                                 <span>Edit</span>
//                                                 <span>Delete</span>
//                                             </div>
//                                         </span>
//                                     </TableCol>}
//                                 </TableRow>
//                             })}
//                             {addPaymentView && <TableRow
//                                 gridCount='20% 20% 20% 20% 18%'
//                                 className='pl-4'
//                             >
//                                 <TableCol style={{ position: 'relative' }}>
//                                     Payment
//                                 </TableCol>
//                                 <TableCol style={{ position: 'relative' }}>
//                                     <SelectComponent
//                                         value={addPaymentInputs.type || 'Type'}
//                                         options={[
//                                             { value: "cash", title: "cash" },
//                                             { value: "check", title: "check" },
//                                         ]}
//                                         setValues={({ target }) => { setAddPaymentInputs({ ...addPaymentInputs, type: target.value }) }}
//                                         name="type"
//                                     />
//                                 </TableCol>
//                                 <TableCol>
//                                     <DataPicBlock style={{ position: 'relative' }}>
//                                         <DatePicker
//                                             selected={addPaymentInputs['date'] || new Date()}
//                                             onChange={(date) =>
//                                                 setAddPaymentInputs({ ...addPaymentInputs, date })}
//                                             style={{ width: '100%' }}
//                                         />
//                                     </DataPicBlock>
//                                 </TableCol>
//                                 <TableCol >
//                                     <BlockInputs
//                                         onChange={({ target }) => { setAddPaymentInputs({ ...addPaymentInputs, amount: target.value }) }}
//                                         name="amount"
//                                         type="text"
//                                         placeholder="amount"
//                                         value={addPaymentInputs.amount}
//                                     />
//                                 </TableCol>
//                                 <TableCol className='pl-2'>
//                                     {match?.params?.id && < Button
//                                         onClick={() => {
//                                             if (addPaymentInputs.type && addPaymentInputs.amount) {
//                                                 setAddPayment([...addPayment, addPaymentInputs]);
//                                                 setAddPaymentInputs({ type: '', date: '', amount: '' });
//                                                 setAddPaymentView(false)
//                                             }
//                                         }}
//                                         variant='primary' className='pl-2 pr-2 pt-1 pb-1 mr-3'>save</Button>}
//                                     < Button
//                                         onClick={() => {
//                                             setAddPaymentInputs({ type: '', date: '', amount: '' })
//                                             setAddPaymentView(false)
//                                         }}
//                                         variant='secondary' className='pl-2 pr-2 pt-1 pb-1'>x</Button>
//                                 </TableCol>
//                             </TableRow>}
//                         </Col>
//                     </Row>
//                 </AccordDown>
//                 <hr style={{ height: '0px' }} />
//             </Col>

//             {/* <Col xs={6} className="mb-4">
//                 <InputTitle> Deposit <span>*</span></InputTitle>
//                 {paintInputs("deposit", requiredError[0], 'Deposit', 'number')}
//             </Col>

//             <Col xs={6} className="mb-4">
//                 <InputTitle> Payment </InputTitle>

//                 <BlockInputs
//                     disabled={false}
//                     onChange={handleChange}
//                     name="payment_tes"
//                     type="number"
//                     placeholder=""
//                     value={state.payment_tes}
//                 />
//             </Col> */}

//             {/* <Col xs={12} className="mb-4">
//                 <InputTitle> Balance due </InputTitle>
//                 {paintInputs("balance_due")}
//             </Col> */}

//             {/* <Col xs={12} className="mb-4">
//                 <InputTitle> Payment type <span>*</span></InputTitle>
//                 {paintInputs("payment_type", requiredError[3], 'Payment type')}
//             </Col> */}

//             {/* <Col xs={12} className="mb-4">
//                 <InputTitle> Balance received </InputTitle>
//                 {paintInputs("balanceReceived")}
//             </Col> */}
//         </Row>

//         {!totalShow && <> <Row className="mb-2 mt-3">
//             <Col xs={6}> <div className="text-left"
//                 style={{
//                     marginTop: '5px',
//                     color: '#51545D',
//                     fontFamily: 'Poppins',
//                     fontWeight: '500',
//                     fontSize: '1.15rem'
//                 }}
//             >Balance due </div></Col>
//             <Col xs={6}>
//                 <div className="text-right"
//                     style={{
//                         marginTop: '5px',
//                         color: '#51545D',
//                         fontFamily: 'Poppins',
//                         fontWeight: '500',
//                         fontSize: '1.15rem'
//                     }}
//                 >{`$ `}
//                     {isNaN(parseInt(state.payment - (Number(state.deposit) + Number(state.payment_tes)))) ? 0 : parseInt(state.payment - (Number(state.deposit) + Number(state.payment_tes)))}
//                 </div>
//             </Col>
//         </Row>

//             <Row>
//                 <Col xs={6}> <div className="text-left"
//                     style={{
//                         marginTop: '5px',
//                         color: '#51545D',
//                         fontFamily: 'Poppins',
//                         fontWeight: '500',
//                         fontSize: '1.15rem'
//                     }}
//                 >Grand total </div></Col>
//                 <Col xs={6}>
//                     <div className="text-right"
//                         style={{
//                             marginTop: '5px',
//                             color: '#51545D',
//                             fontFamily: 'Poppins',
//                             fontWeight: '500',
//                             fontSize: '1.15rem'
//                         }}
//                     >$ {state["payment"] ? parseInt(state["payment"]) : '0'} </div>
//                 </Col>
//             </Row> </>}
//     </Container >
// }

// export default memo(Contract);