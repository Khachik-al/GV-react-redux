import React, { memo } from 'react';
import { TableCol, TableRow } from '../../Table/styles';
import DatePicker from "react-datepicker";
import BlockInputs from '../../Smart/InputBlock/InputBlock';
import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
import { DataPicBlock } from '../styles';
import { Button, Col, Row } from 'react-bootstrap';

const Payments = ({ state, addPayment, paymentRemove, paymentChange }) => {
    return (
        <Row>
            <Col xs={12} className='text-right pr-4 mb-2'>
                <Button
                    onClick={() => addPayment({
                        "payment_type": "",
                        "payment_name": "payment",
                        "amount": '',
                        "payment_date": new Date()
                    })}
                    variant='primary'
                    className='pl-4 pr-4 pt-1 pb-1'
                    disabled={state.payments.length === 2}
                >
                    Add Payment
                </Button>
            </Col>
            <Col xs={12} >
                <TableRow
                    gridCount={'21% 25% 25% 25%'} className='pl-4' background='rgba(245, 248, 250, 0.5)'
                >
                    {['Payment type', 'type', 'Date', 'Amount'].map(tit =>
                        <TableCol color='#469CF0' key={tit}>
                            {tit}
                        </TableCol>
                    )}
                </TableRow>
                
                {state.payments.map((el, i) =>
                    <TableRow
                        gridCount='21% 25% 25% 21% 5%'
                        className='pl-4'
                        key={i}
                    >
                        <TableCol style={{ position: 'relative' }}>
                            {el.payment_name}
                        </TableCol>
                        <TableCol style={{ position: 'relative' }}>
                            <SelectComponent
                                value={el.payment_type || 'Type'}
                                options={[
                                    { value: "cash", title: "cash" },
                                    { value: "bank", title: "bank" },
                                ]}
                                setValues={({ target }) => { paymentChange(i, 'payment_type', target.value) }}
                                name="type"
                            />
                        </TableCol>
                        <TableCol>
                            <DataPicBlock style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={new Date(el.payment_date)}
                                    onChange={(date) => paymentChange(i, 'payment_date', date.toISOString().slice(0, 10))}
                                    style={{ width: '100%' }}
                                />
                            </DataPicBlock>
                        </TableCol>
                        <TableCol >
                            <BlockInputs
                                onChange={({ target }) => { paymentChange(i, 'amount', target.value) }}
                                name="amount"
                                type="number"
                                placeholder="amount"
                                value={el.amount}
                            />
                        </TableCol>
                        {el.payment_name === 'payment' && <TableCol>
                            < Button
                                onClick={paymentRemove}
                                variant='secondary' className='pl-2 pr-2 pt-1 pb-1'>x</Button>
                        </TableCol>}
                    </TableRow>)}
            </Col>
        </Row>
    );
};

export default memo(Payments);
// import React, { memo, useState } from 'react';
// import { BsChevronDown } from 'react-icons/bs';
// import { TableCol, TableRow } from '../../Table/styles';
// import DatePicker from "react-datepicker";
// import style from '../style.module.css'
// import BlockInputs from '../../Smart/InputBlock/InputBlock';
// import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
// import { DataPicBlock } from '../styles';
// import { Button } from 'react-bootstrap';

// const Payments = ({ state, match }) => {
//     const [addPaymentView, setAddPaymentView] = useState(false);
//     const [addPayment, setAddPayment] = useState([]);
//     const [addDeposit, setAddDeposit] = useState([]);
//     const [addPaymentInputs, setAddPaymentInputs] = useState({ type: '', date: '', amount: '' });
//     console.log(state);
//     return (
//         <div>
//             {state.payments.length ?
//                 state.payments.map(el => {
//                     return <TableRow gridCount={'20% 20% 20% 20% 18%'} key={Math.random()} className='pl-4'>
//                         <TableCol>{el.payment_name}</TableCol>
//                         <TableCol>{el.payment_type}</TableCol>
//                         <TableCol>{new Date(el.payment_date).toISOString().split('T')[0]}</TableCol>
//                         <TableCol >{el.amount}</TableCol>
//                         <TableCol >
//                             <span className={style.dropdown}>
//                                 <span className={style.dropbtn}>
//                                     Actions
//                                     <BsChevronDown size={14} className='ml-3' />
//                                 </span>
//                                 <div className={style.dropdownContent}>
//                                     <span>Edit</span>
//                                 </div>
//                             </span>
//                         </TableCol>
//                     </TableRow>
//                 }) :
//                 <TableRow
//                     gridCount='20% 20% 20% 20% 18%'
//                     className='pl-4'
//                 >
//                     <TableCol style={{ position: 'relative' }}>
//                         Deposit
//                     </TableCol>
//                     <TableCol style={{ position: 'relative' }}>
//                         <SelectComponent
//                             value={addPaymentInputs.type || 'Type'}
//                             options={[
//                                 { value: "cash", title: "cash" },
//                                 { value: "check", title: "check" },
//                             ]}
//                             setValues={({ target }) => { setAddPaymentInputs({ ...addPaymentInputs, type: target.value }) }}
//                             name="type"
//                         />
//                     </TableCol>
//                     <TableCol>
//                         <DataPicBlock style={{ position: 'relative' }}>
//                             <DatePicker
//                                 selected={addPaymentInputs['date'] || new Date()}
//                                 onChange={(date) =>
//                                     setAddPaymentInputs({ ...addPaymentInputs, date })}
//                                 style={{ width: '100%' }}
//                             />
//                         </DataPicBlock>
//                     </TableCol>
//                     <TableCol >
//                         <BlockInputs
//                             onChange={({ target }) => { setAddPaymentInputs({ ...addPaymentInputs, amount: target.value }) }}
//                             name="amount"
//                             type="number"
//                             placeholder="amount"
//                             value={addPaymentInputs.amount}
//                         />
//                     </TableCol>
//                     {match?.params?.id && <TableCol className='pl-4'>
//                         <Button
//                             onClick={() => {
//                                 if (addPaymentInputs.type && addPaymentInputs.date && addPaymentInputs.amount) {
//                                     setAddDeposit([{ ...addPaymentInputs }])
//                                     setAddPaymentInputs({ type: '', date: '', amount: '' })
//                                 }
//                             }}
//                             variant='primary' className='pl-2 pr-2 pt-1 pb-1'>save</Button>
//                     </TableCol>}
//                 </TableRow>}
//             {/* {state.payments.map(el => {
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
//                             })} */}
//             {addPaymentView && <TableRow
//                 gridCount='20% 20% 20% 20% 18%'
//                 className='pl-4'
//             >
//                 <TableCol style={{ position: 'relative' }}>
//                     Payment
//                 </TableCol>
//                 <TableCol style={{ position: 'relative' }}>
//                     <SelectComponent
//                         value={addPaymentInputs.type || 'Type'}
//                         options={[
//                             { value: "cash", title: "cash" },
//                             { value: "check", title: "check" },
//                         ]}
//                         setValues={({ target }) => { setAddPaymentInputs({ ...addPaymentInputs, type: target.value }) }}
//                         name="type"
//                     />
//                 </TableCol>
//                 <TableCol>
//                     <DataPicBlock style={{ position: 'relative' }}>
//                         <DatePicker
//                             selected={addPaymentInputs['date'] || new Date()}
//                             onChange={(date) =>
//                                 setAddPaymentInputs({ ...addPaymentInputs, date })}
//                             style={{ width: '100%' }}
//                         />
//                     </DataPicBlock>
//                 </TableCol>
//                 <TableCol >
//                     <BlockInputs
//                         onChange={({ target }) => { setAddPaymentInputs({ ...addPaymentInputs, amount: target.value }) }}
//                         name="amount"
//                         type="text"
//                         placeholder="amount"
//                         value={addPaymentInputs.amount}
//                     />
//                 </TableCol>
//                 <TableCol className='pl-2'>
//                     {match?.params?.id && < Button
//                         onClick={() => {
//                             if (addPaymentInputs.type && addPaymentInputs.amount) {
//                                 setAddPayment([...addPayment, addPaymentInputs]);
//                                 setAddPaymentInputs({ type: '', date: '', amount: '' });
//                                 setAddPaymentView(false)
//                             }
//                         }}
//                         variant='primary' className='pl-2 pr-2 pt-1 pb-1 mr-3'>save</Button>}
//                     < Button
//                         onClick={() => {
//                             setAddPaymentInputs({ type: '', date: '', amount: '' })
//                             setAddPaymentView(false)
//                         }}
//                         variant='secondary' className='pl-2 pr-2 pt-1 pb-1'>x</Button>
//                 </TableCol>
//             </TableRow>}
//         </div>
//     );
// };

// export default memo(Payments);