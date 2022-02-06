import React, { memo, useRef, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { Button, Col, Row } from 'react-bootstrap';
import config from '../../../configs.json'
import BlockInputs from '../../Smart/InputBlock/InputBlock';
import SelectComponent from '../../Smart/SelectComponent/SelectComponent';
import { DataPicBlock } from '../styles';
import style from '../style.module.css'
import { TableCol, TableRow } from '../../Table/styles';
import { useDispatch } from 'react-redux';

const EditPayments = ({ state, match }) => {
    const dispatch = useDispatch()
    let prevPayment = useRef(null)
    const [payments, setPayments] = useState([...state.payments])
    const [addPaymentsView, setAddPaymentsView] = useState(false)
    const [indexOfPay, setIndexOfPay] = useState('');
    const [addPayments, setAddPayments] = useState(
        {
            payment_type: "",
            payment_name: "payment",
            amount: '',
            payment_date: new Date().toISOString().split('T')[0]
        })

    const createUpdatePayment = (data, id = '') => {

        axios({
            method: id ? 'put' : 'post',
            url: id ? `${config["API"]}api/api/customer-payments/${id}` : `${config["API"]}api/api/customer-payments`,
            data: { ...data, event_id: match.params.id },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                !id && (setPayments(prevState => {
                    setAddPaymentsView(false)
                    setAddPayments({ payment_type: "", payment_name: "payment", amount: '', payment_date: new Date().toISOString().split('T')[0] })
                    return [...prevState,
                    {
                        id: res.data.id,
                        payment_type: res.data.payment_type,
                        payment_name: res.data.payment_name,
                        amount: res.data.amount,
                        payment_date: new Date(res.data.payment_date).toISOString().split('T')[0]
                    }]
                })

                )
                dispatch({
                    type: 'TOAST_MESSAGE', successMessage: 'payment has been ' + (id ? 'updated' : 'created'),
                })
                setIndexOfPay('')
            })
            .catch((er) => {
                console.log(er.response);
                dispatch({
                    type: 'TOAST_MESSAGE', errorMessage: 'ups!!',
                })
            })
    }
    const deletePayments = (id) => {
        axios.delete(`${config["API"]}api/api/customer-payments/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(() => {
                dispatch({
                    type: 'TOAST_MESSAGE', successMessage: 'payment has been deleted',
                })
                let newArr = [...payments].filter((el) => el.id !== id)
                setIndexOfPay('')
                setPayments(newArr)
            })
            .catch((er) => {
                console.log(er.response);
                dispatch({
                    type: 'TOAST_MESSAGE', errorMessage: 'ups!!',
                })
            })
    }
    const handleChange = (index, name, value) => {
        let newArr = [...payments]
        newArr[index][name] = value
        setPayments(newArr)
    }
    return (
        payments && <Row>
            <Col xs={12} className='text-right pr-4 mb-2'>
                <Button
                    onClick={() => setAddPaymentsView(true)}
                    variant='primary'
                    className='pl-4 pr-4 pt-1 pb-1'
                    disabled={indexOfPay || (indexOfPay === 0)}
                >
                    Add Payment
                </Button>
            </Col>
            <Col xs={12} >
                <TableRow
                    gridCount={'20% 20% 20% 20% 18%'} className='pl-4' background='rgba(245, 248, 250, 0.5)'
                >
                    {['Payment type', 'type', 'Date', 'Amount', 'Actions'].map(tit =>
                        <TableCol color='#469CF0' key={tit}>
                            {tit}
                        </TableCol>
                    )}
                </TableRow>
                {payments.map((el, i) => (
                    indexOfPay === el.id ?
                        <TableRow
                            key={el.id}
                            gridCount='20% 20% 20% 20% 18%'
                            className='pl-4'
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
                                    setValues={({ target }) => handleChange(i, 'payment_type', target.value)}
                                    name="payment_type"
                                />
                            </TableCol>
                            <TableCol>
                                <DataPicBlock style={{ position: 'relative' }}>
                                    <DatePicker
                                        selected={new Date(el.payment_date)}
                                        onChange={(date) => handleChange(i, 'payment_date', date.toISOString().split('T')[0])}
                                        style={{ width: '100%' }}
                                    />
                                </DataPicBlock>
                            </TableCol>
                            <TableCol >
                                <BlockInputs
                                    onChange={({ target }) => handleChange(i, 'amount', target.value)}
                                    name="amount"
                                    type="text"
                                    placeholder="amount"
                                    value={el.amount}
                                />
                            </TableCol>
                            <TableCol className='pl-2'>
                                < Button
                                    onClick={() => {
                                        createUpdatePayment(el, el.id)
                                    }}
                                    disabled={!el.payment_type || !el.amount}
                                    variant='primary' className='pl-2 pr-2 pt-1 pb-1 mr-3'
                                >
                                    save
                                </Button>
                                < Button
                                    onClick={() => {
                                        let newArr = [...payments]
                                        newArr[i] = prevPayment.current
                                        setPayments(newArr)
                                        setIndexOfPay('')
                                    }}
                                    variant='secondary' className='pl-2 pr-2 pt-1 pb-1'>
                                    x
                                </Button>
                            </TableCol>
                        </TableRow>
                        :
                        <TableRow gridCount={'20% 20% 20% 20% 18%'} key={el.id} className='pl-4'>
                            <TableCol>{el.payment_name}</TableCol>
                            <TableCol>{el.payment_type}</TableCol>
                            <TableCol>{new Date(el.payment_date).toISOString().split('T')[0]}</TableCol>
                            <TableCol >{el.amount}</TableCol>
                            <TableCol >
                                <span className={style.dropdown}>
                                    <span className={style.dropbtn}>
                                        Actions
                                        <BsChevronDown size={14} className='ml-3' />
                                    </span>
                                    <div className={style.dropdownContent}>
                                        <span onClick={() => {
                                            if (!indexOfPay) {
                                                prevPayment.current = { ...el }
                                                setIndexOfPay(el.id)
                                            }
                                        }}>Edit</span>
                                        {el.payment_name === 'payment' && <span onClick={() => { !indexOfPay && deletePayments(el.id) }}>Delete</span>}
                                    </div>
                                </span>
                            </TableCol>
                        </TableRow>))
                }
                {addPaymentsView && <TableRow
                    key={Math.random()}
                    gridCount='20% 20% 20% 20% 18%'
                    className='pl-4'
                >
                    <TableCol style={{ position: 'relative' }}>
                        payment
                    </TableCol>
                    <TableCol style={{ position: 'relative' }}>
                        <SelectComponent
                            value={addPayments.payment_type || 'Type'}
                            options={[
                                { value: "cash", title: "cash" },
                                { value: "bank", title: "bank" },
                            ]}
                            setValues={({ target }) => setAddPayments({ ...addPayments, 'payment_type': target.value })}
                            name="payment_type"
                        />
                    </TableCol>
                    <TableCol>
                        <DataPicBlock style={{ position: 'relative' }}>
                            <DatePicker
                                selected={new Date(addPayments.payment_date)}
                                onChange={(date) => setAddPayments({ ...addPayments, 'payment_date': date.toISOString().split('T')[0] })}
                                style={{ width: '100%' }}
                            />
                        </DataPicBlock>
                    </TableCol>
                    <TableCol >
                        <BlockInputs
                            onChange={({ target }) => setAddPayments({ ...addPayments, 'amount': target.value })}
                            name="amount"
                            type="text"
                            placeholder="amount"
                            value={addPayments.amount}
                        />
                    </TableCol>
                    <TableCol className='pl-2'>
                        < Button
                            onClick={() => createUpdatePayment(addPayments)}
                            disabled={!addPayments.payment_type || !addPayments.amount}
                            variant='primary' className='pl-2 pr-2 pt-1 pb-1 mr-3'
                        >
                            save
                        </Button>
                        < Button
                            onClick={() => {
                                setAddPayments({ payment_type: "", payment_name: "payment", amount: '', payment_date: new Date().toISOString().split('T')[0] })
                                setAddPaymentsView(false)
                            }}
                            variant='secondary' className='pl-2 pr-2 pt-1 pb-1'
                        >
                            x
                        </Button>
                    </TableCol>
                </TableRow>}
            </Col >
        </Row >
    );
};

export default memo(EditPayments);
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