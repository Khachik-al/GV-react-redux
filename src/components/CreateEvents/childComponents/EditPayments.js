import React, { memo, useCallback, useRef, useState } from 'react';
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

const EditPayments = ({ payments, match, paymentReplace, total }) => {
    const dispatch = useDispatch()
    let prevPayment = useRef(null)
    const [addPaymentsView, setAddPaymentsView] = useState(false)
    const [indexOfPay, setIndexOfPay] = useState('');
    const [addPayments, setAddPayments] = useState(
        {
            payment_type: "cash",
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
                if (!id) {
                    setAddPaymentsView(false)
                    setAddPayments({ payment_type: "cash", payment_name: "payment", amount: '', payment_date: new Date().toISOString().split('T')[0] })
                    let newArr = JSON.parse(JSON.stringify(payments))
                    paymentReplace([...newArr,
                    {
                        id: res.data.id,
                        payment_type: res.data.payment_type,
                        payment_name: res.data.payment_name,
                        amount: res.data.amount,
                        payment_date: new Date(res.data.payment_date).toISOString().split('T')[0]
                    }])
                }

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
                let newArr = JSON.parse(JSON.stringify(payments)).filter((el) => el.id !== id)
                setIndexOfPay('')
                paymentReplace(newArr)
            })
            .catch((er) => {
                console.log(er.response);
                dispatch({
                    type: 'TOAST_MESSAGE', errorMessage: 'ups!!',
                })
            })
    }
    const handleChange = (index, name, value) => {
        console.log(2222)
        let newArr = JSON.parse(JSON.stringify(payments))
        newArr[index][name] = value
        paymentReplace(newArr)
    }
    const addPaymentsChange = ({ target }) => {
        setAddPayments({
            ...addPayments,
            [target.name]: target.value
        })
    }
    const totalPayment = (value, i) => {
        let a = 0;
        let newArr = JSON.parse(JSON.stringify(payments))
        if (value && i !== payments.length) { newArr[i].amount = value }
        newArr.forEach((el, i) => {
            if (el.payment_name === 'payment') {
                a += Number(el.amount)
            }
        })
        return i === payments.length ? a + Number(value) : a
    }
    const balanceDue = useCallback((totalValue, deposit, payment) => {
        return parseInt(totalValue - (Number(deposit) + Number(payment)))
    }, [])
    let amountChange = (target, i) => {
        if (i !== 0) {
            if (balanceDue(total, payments[0].amount, totalPayment(target.value, i)) >= 0) {
                handleChange(i, 'amount', target.value)
            }
        } else {
            if (balanceDue(total, target.value, totalPayment()) >= 0) {
                handleChange(i, 'amount', target.value)
            }
        }
    }
    let addPaymentAmountChange = (target, i) => {
        if (balanceDue(total, payments[0].amount, totalPayment(target.value, i)) >= 0) {
            addPaymentsChange({ target: { name: target.name, value: target.value } })
        }
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
                    {['Payment type', 'Type', 'Date', 'Amount', 'Actions'].map(tit =>
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
                                    onChange={({ target }) => amountChange(target, i)}
                                    name="amount"
                                    type="number"
                                    placeholder="$"
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
                                        let newArr = JSON.parse(JSON.stringify(payments))
                                        newArr[i] = prevPayment.current
                                        paymentReplace(newArr)
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
                            setValues={addPaymentsChange}
                            name="payment_type"
                        />
                    </TableCol>
                    <TableCol>
                        <DataPicBlock style={{ position: 'relative' }}>
                            <DatePicker
                                selected={new Date(addPayments.payment_date)}
                                onChange={(date) => addPaymentsChange({ target: { 'payment_date': date.toISOString().split('T')[0] } })}
                                style={{ width: '100%' }}
                            />
                        </DataPicBlock>
                    </TableCol>
                    <TableCol >
                        <BlockInputs
                            onChange={({ target }) => addPaymentAmountChange(target, payments.length)}
                            name="amount"
                            type="number"
                            placeholder="$"
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
                                setAddPayments({ payment_type: "cash", payment_name: "payment", amount: '', payment_date: new Date().toISOString().split('T')[0] })
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
