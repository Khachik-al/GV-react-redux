import React, { memo, useCallback, useState } from 'react';
import { TableCol, TableRow } from '../../Table/styles';
import DatePicker from "react-datepicker";
import BlockInputs from '../../Smart/InputBlock/InputBlock';
import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
import { DataPicBlock, DollarIconBlock, InputWithDollar } from '../styles';
import { Button, Col, Row } from 'react-bootstrap';
import { BiDollar } from 'react-icons/bi';

const Payments = ({ payments, paymentReplace, requiredError, total }) => {
    const [required, setRequired] = useState({ deposit: false, payment: false })
    const paymentChange = (index, name, value) => {
        let newArr = JSON.parse(JSON.stringify(payments))
        newArr[index][name] = value
        paymentReplace(newArr)
    }
    const paymentAdd = () => {
        let newArr = [...payments, {
            "payment_type": "cash",
            "payment_name": "payment",
            "amount": '',
            "payment_date": new Date().toISOString().slice(0, 10)
        }]
        paymentReplace(newArr)
    }
    const paymentRemove = () => {
        let newArr = JSON.parse(JSON.stringify(payments))
        newArr.pop()
        paymentReplace(newArr)
    }
    const balanceDue = useCallback((totalValue, deposit, payment) => {
        return parseInt(totalValue - (Number(deposit) + Number(payment)))
    }, [])
    let amountChange = (target, i) => {
        if (!!payments[1]) {
            !!target.value && target.value != 0 ? setRequired({ ...required, payment: false }) : setRequired({ ...required, payment: true })
            if (balanceDue(total, payments[0].amount, target.value) >= 0) {
                paymentChange(i, 'amount', target.value)
            }
        } else {
            !!target.value && target.value != 0 ? setRequired({ ...required, deposit: false }) : setRequired({ ...required, deposit: true })
            if (balanceDue(total, target.value, 0) >= 0) {
                paymentChange(i, 'amount', target.value)
            }
        }
    }
    return (
        <Row>
            <Col xs={12} className='text-right pr-4 mb-2'>
                <Button
                    onClick={paymentAdd}
                    variant='primary'
                    className='pl-4 pr-4 pt-1 pb-1'
                    disabled={payments.length === 2}
                >
                    Add Payment
                </Button>
            </Col>
            <Col xs={12} >
                <TableRow
                    gridCount={'21% 25% 25% 25%'} className='pl-4' background='rgba(245, 248, 250, 0.5)'
                >
                    {['Payment type', 'Type', 'Date', 'Amount'].map(tit =>
                        <TableCol color='#469CF0' key={tit}>
                            {tit}
                        </TableCol>
                    )}
                </TableRow>

                {payments.map((el, i) =>
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
                        <TableCol>
                            <InputWithDollar>
                                <BlockInputs
                                    title='amount'
                                    onChange={({ target }) => amountChange(target, i)}
                                    name="amount"
                                    type="number"
                                    value={el.amount}
                                    borderColor={el.payment_name === 'payment' ? requiredError[3] || required.payment : requiredError[2] || required.deposit}
                                />
                                <DollarIconBlock><BiDollar size={18} color='#5E6278' /></DollarIconBlock>
                            </InputWithDollar>
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

// const Payments = ({  match }) => {
//     const [addPaymentView, setAddPaymentView] = useState(false);
//     const [addPayment, setAddPayment] = useState([]);
//     const [addDeposit, setAddDeposit] = useState([]);
//     const [addPaymentInputs, setAddPaymentInputs] = useState({ type: '', date: '', amount: '' });
//     console.log(;
//     return (
//         <div>
//             {payments.length ?
//                 payments.map(el => {
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
//             {/* {payments.map(el => {
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