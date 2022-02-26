import React, { useCallback, useState, useEffect } from 'react';
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { connect, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Contract from '../../components/CreateEvents/childComponents/Contract';
import CustomerInfo from '../../components/CreateEvents/childComponents/CustomerInfo';
import EventsSection from '../../components/CreateEvents/childComponents/EventsSection';
import RadioGro from '../../components/Smart/Radio/Radio';
import Spinner from '../../components/Smart/Spinner/Spinner';
import { GridMain, SectionsBlock, SectionsTitle, FixedBlock, UpdateButton } from './styles';
import { TableCol, TextWithBack } from '../../components/Table/styles';
import { Main } from '../../styles/globalStyles';
import { getEvent, editEvent, createCustomer } from '../Events/actions';
import { getMenu } from '../Settings/actions';

function EventsEdit({ isMobile, data, getEvent, match, getMenu, editEvent, createCustomer }) {

    const [state, setState] = useState(null);
    const [customerState, setCustomerState] = useState(null);
    const [contractState, setContractState] = useState({});
    const dispatch = useDispatch();
    const [requiredValues, setRequiredValues] = useState([false, false]);
    const [requiredCustomerValues, setRequiredCustomerValues] = useState([false, false, false, false, false, false, false]);
    const [requiredContract, setRequiredContract] = useState([false, false, false, false]);
    const [modalActive, closeModal] = useState(false);
    const [loadStart, setLoadStart] = useState(false);

    const totalPayment = useCallback(() => {
        if (!contractState.payments) return
        let a = 0;
        contractState.payments.forEach((el, i) => {
            if (el.payment_name === 'payment') {
                a += Number(el.amount)
            }
        })
        return a
    }, [contractState.payments])
    const balanceDue = useCallback(() => {
        return contractState.payments?.length && parseInt(contractState.payment - (Number(contractState.payments[0].amount) + Number(totalPayment())))
    }, [contractState.payments, contractState.payment, totalPayment])
    const onUpdate = useCallback(() => {
        let cloneReqArray = [...requiredValues];
        let cloneReqCon = [...requiredContract];

        ['name', 'event_date', 'event_start', 'guests_number']
            .forEach((el, i) => {
                state[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true;
            });
        ['menu_id', 'cost_per_guest'].forEach((el, i) => {
            contractState[el] ? cloneReqCon[i] = false : cloneReqCon[i] = true;
        });
        if (cloneReqArray.includes(true) || cloneReqCon.includes(true)) {
            setRequiredValues(cloneReqArray);
            setRequiredContract(cloneReqCon);
        } else {
            setLoadStart(true);
            editEvent({
                customer_id: state.customer_id,
                name: state.name,
                guests_number: state.guests_number,
                type_id: state.type_id.split(" ")[1],
                // menu_id: state.menu_id.split("&&&&&")[1],
                event_date: state.event_date.toISOString().slice(0, 10),
                // event_end: state.event_end + ':00',
                event_start: state.event_start + ':00',
                // notes: state.notes,
                status_id: state.status_id,
                contract: {
                    ...contractState,
                    balance_due: contractState.balance_due,
                    cost_per_guest: contractState.cost_per_guest,
                    created_at: contractState.created_at,
                    deposit: contractState.deposit,
                    id: contractState.id,
                    payment: contractState.payment_tes,
                    payment_type: contractState.payment_type,
                    grand_total: contractState.payment,
                    updated_at: contractState.updated_at,
                    service_fee: contractState.hasOwnProperty('serviceFee') ? Number(contractState.serviceFee.split(' ')[0]) : 0,
                    menu_id: contractState.menu_id.split("&&&&&")[1],
                    services: {
                        "lightning": contractState.hasOwnProperty('lightning') ? contractState.lightning : "",
                        "other": contractState.hasOwnProperty('other') ? contractState.other : "",
                        "ceremony": contractState.hasOwnProperty('ceremony') ? contractState.ceremony : "",
                        "cocktail_hour": contractState.hasOwnProperty('cocktail_hour') ? contractState.cocktail_hour : "",
                        "gratitude": contractState.hasOwnProperty('gratitude') ? contractState.gratitude : "",
                        "security": contractState.hasOwnProperty('security') ? contractState.security : "",
                        "tax": contractState.hasOwnProperty('tax') ? contractState.tax : "",
                    }
                }
            }, match.params.id, setLoadStart);
            setRequiredValues([false, false, false, false, false, false, false, false, false]);
            setRequiredContract([false, false, false, false]);
        }

    }, [state, contractState, editEvent, match.params.id, requiredContract, requiredValues]);

    const closeEditCust = useCallback(() => {
        closeModal(false);
        setCustomerState({
            fullName: data.customer.full_name,
            email: data.customer.email,
            address: data.customer.address,
            phone_number: data.customer.phone_number,
            alt_phone_number: data.customer.alt_phone_number,
            dl_number: data.customer.dl_number,
            customer_id: data.customer.id,
            dl_expire_date: new Date(data.customer.dl_expire_date),
        });
        setRequiredCustomerValues([false, false, false, false, false, false, false])
    }, [data])

    const getButtEditMod = useCallback(() => {
        return <Row>
            <Col xs={12} className="text-right">
                <button
                    type="button"
                    onClick={closeEditCust}
                    className="btn btn-light me-3"
                    data-kt-stepper-action="previous"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    data-kt-stepper-action="next"
                    onClick={() => {
                        let cloneReqArray = [...requiredCustomerValues];
                        ['fullName', 'address', 'phone_number', 'email', 'dl_number', 'dl_expire_date'].forEach((el, i) => {
                            customerState[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true;
                        });
                        if (cloneReqArray.includes(true)) {
                            setRequiredCustomerValues(cloneReqArray);
                        } else {
                            createCustomer({
                                full_name: customerState.fullName,
                                email: customerState.email,
                                address: customerState.address,
                                phone_number: customerState.phone_number,
                                alt_phone_number: customerState.alt_phone_number,
                                dl_number: customerState.dl_number,
                                // id: data.customer.id,
                                dl_expire_date: new Date(customerState.dl_expire_date),
                                guests_number: customerState.guests_number,
                            }, customerState.customer_id, closeModal);
                            setRequiredCustomerValues([false, false, false, false, false, false, false]);
                        }
                    }}
                >
                    Save
                </button>
            </Col>
        </Row>
    }, [customerState, requiredCustomerValues, closeEditCust, createCustomer]);


    const contractHandleChange = useCallback(({ target }) => {

        setRequiredContract(prevState => {
            let cloneReqCon = [...prevState];
            ['menu_id', 'cost_per_guest'].forEach((el, i) => {
                if (target.name === el) {
                    target.value ? cloneReqCon[i] = false : cloneReqCon[i] = true;
                }
            });
            return cloneReqCon
        });
        let newTotal = 0;

        ['gratitude', 'lightning', 'security', 'cocktail_hour', 'ceremony', 'tax', 'other'].forEach((el) => {
            if (el == [target.name]) {/* eslint-disable-line */
                newTotal = newTotal + Number(target.value);
            }
            else {
                newTotal = newTotal + Number(contractState[el] ? contractState[el] : 0);
            }
        });


        if (target.name == 'cost_per_guest') {/* eslint-disable-line */
            newTotal = newTotal + Number(target.value) * Number(state.guests_number);
        }
        else {
            newTotal = newTotal + contractState.cost_per_guest * Number(state.guests_number);
        }

        if (target.name == 'serviceFee' && !isNaN(Number(target.value.split(" ")[0]))) {/* eslint-disable-line */
            let proc = Number(target.value.split(" ")[0]);
            newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;
        } else {
            if (contractState.serviceFee && !isNaN(Number(contractState.serviceFee))) {
                let proc = Number(contractState.serviceFee.split(" ")[0]);
                // newTotal = newTotal ? newTotal + newTotal / proc : 0;
                newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;

            }
        }

        setContractState({
            ...contractState,
            [target.name]: target.value,
            payment: newTotal
        });

    }, [contractState, state]);

    const eventsSectHand = ({ target }) => {

        setRequiredValues(prevState => {
            let cloneReqArray = [...prevState];
            ['name', 'event_date', 'event_start', 'guests_number']
                .forEach((el, i) => {
                    if (target.name === el) {
                        target.value ? cloneReqArray[i] = false : cloneReqArray[i] = true;
                    }
                });
            return cloneReqArray
        })
        if (target.name === 'guests_number') {

            let newTotal = 0;

            ['gratitude', 'lightning', 'security', 'cocktail_hour', 'ceremony', 'tax', 'other'].forEach((el) => {
                newTotal = newTotal + Number(contractState[el] ? contractState[el] : 0)
            });

            if (contractState.cost_per_guest) {
                newTotal = newTotal + Number(contractState.cost_per_guest ? contractState.cost_per_guest : 0) * Number(target.value ? target.value : 0);
            }

            if (contractState.serviceFee) {
                let proc = Number(contractState.serviceFee.split(" ")[0]);
                newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;
            }

            setContractState({ ...contractState, payment: newTotal, balance_due: Number(newTotal) - Number(contractState.deposit) })
            setState({ ...state, [target.name]: target.value })
        }
        else {
            setState({ ...state, [target.name]: target.value })

            // setEventsState({ ...eventsState, [target.name]: target.value })
        }
    }

    useEffect(() => {
        getEvent(match.params.id);
        getMenu();
        return () => {
            dispatch({
                type: 'GET_EVENT',
                payload: null
            })
        }
    }, []);/* eslint-disable-line */
    console.log(data)
    useEffect(() => {
        if (data && data.contract) {
            let total = Number(data.guests_number) * Number(data.contract?.cost_per_guest);

            let newDate = {
                menu_id: `${data.contract.menu.name}&&&&&${data.contract.menu.id}`,
                balance_due: data.contract.balance_due,
                cost_per_guest: data.contract.cost_per_guest,
                created_at: data.contract.created_at,
                deposit: data.contract.deposit,
                id: data.contract.id,
                // payment: total,
                payment_tes: data.contract.payment,
                payment_type: data.contract.payment_type,
                updated_at: data.contract.updated_at,
                serviceFee: data.contract.service_fee ? `${data.contract.service_fee} %` : '',
                payments: data.payments
            }

            if (data.contract.services && data.contract.services.length) {
                data.contract.services.forEach((el, i, arr) => {
                    newDate[el.name] = arr[i].cost;
                    total = Number(total) + Number(arr[i].cost)
                })
            };

            if (data.contract.service_fee) {
                total = Number(total) + ((Number(total) * Number(data.contract.service_fee)) / 100);
            }

            setState({
                name: data.name,
                type_id: `${data.type.name} ${data.type.id}`,
                date_created: new Date(data.created_at),
                event_date: new Date(data.event_date),
                // event_end: data.event_end.slice(0, 5),
                event_start: data.event_start.slice(0, 5),
                guests_number: data.guests_number,
                id: data.id,
                updated_at: data.updated_at,
                // notes: data.notes,
                customer_id: data.customer.id,
                status_id: data.status.id.toString(),
            });

            setContractState({
                ...newDate,
                payment: total,
            });


            console.log(data);

            setCustomerState({
                fullName: data.customer.full_name,
                email: data.customer.email,
                address: data.customer.address,
                phone_number: data.customer.phone_number,
                alt_phone_number: data.customer.alt_phone_number,
                dl_number: data.customer.dl_number,
                customer_id: data.customer.id,
                dl_expire_date: new Date(data.customer.dl_expire_date),
                guests_number: data.guests_number,
            });
        }
    }, [data]);/* eslint-disable-line */


    return state && <Main className="pb-4">
        <div className="pb-4">
            <GridMain> <div className={isMobile > 600 ? "pr-4 pt-3" : "pl-0 pr-0 pt-3"}>
                <SectionsBlock>
                    <Container>
                        <Row>
                            <Col>
                                <SectionsTitle className="mb-4 pl-2">Event</SectionsTitle>
                            </Col>
                        </Row>
                    </Container>

                    <EventsSection
                        requiredError={requiredValues}
                        state={state}
                        contractState={contractState}
                        handleChange={eventsSectHand}
                        // handleChange={({ target }) => {
                        //     setState({ ...state, [target.name]: target.value })
                        // }}
                        isMobile={isMobile}
                    />

                </SectionsBlock>
                <SectionsBlock>
                    <Container>
                        <Row>
                            <Col xs={8}>
                                <SectionsTitle className="mb-4 pl-2">Customer Info</SectionsTitle>
                            </Col>
                            <Col xs={4} className="text-right"><AiFillEdit className="cursorPointer" size={15} onClick={() => { closeModal(true) }} /></Col>
                        </Row>
                    </Container>
                    <CustomerInfo
                        requiredError={requiredCustomerValues}
                        state={customerState}
                        disabledAll={true}
                        handleChange={({ target }) => {
                            setRequiredCustomerValues(prevState => {
                                let cloneReqCon = [...prevState];
                                ['fullName', 'address', 'phone_number', 'email', 'dl_number', 'dl_expire_date'].forEach((el, i) => {
                                    if (target.name === el) {
                                        target.value ? cloneReqCon[i] = false : cloneReqCon[i] = true;
                                    }
                                });
                                return cloneReqCon
                            })
                            setCustomerState({ ...customerState, [target.name]: target.value })
                        }}
                        modalActive={modalActive} closeModal={closeEditCust} getButtEditMod={getButtEditMod} createActive={false}
                    />
                </SectionsBlock>

                <SectionsBlock>
                    <Container>
                        <Row>
                            <Col>
                                <SectionsTitle className="mb-4 pl-2">Contract</SectionsTitle>
                            </Col>
                        </Row>
                    </Container>
                    <Contract
                        requiredError={requiredContract}
                        state={contractState}
                        handleChange={contractHandleChange}
                        totalShow={true}
                        match={match}
                    />
                </SectionsBlock>
            </div>

                <div className={isMobile > 900 ? 'pr-3 pl-3 pb-3 pt-3 text-left' : 'pt-3 text-left'}>
                    <FixedBlock>
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <div className="text-right"
                                        style={{
                                            color: 'white',
                                            fontFamily: 'Poppins',
                                            fontWeight: '500',
                                            fontSize: '12px',
                                        }}
                                    >
                                        <span
                                            style={{ padding: '5px 10px', borderRadius: '5px', fontWeight: 600, background: '#009EF7', cursor: 'pointer' }}>
                                            <a style={{ textDecoration: 'none', color: 'white' }} href={`http://188.225.57.14/api/api/customer-events/agreement-download/${state.id}`} target='_blank' rel='noopener noreferrer'>Export</a>
                                            <span style={{ color: '#f8dfe7' }}><BsFileEarmarkPdfFill size={15} /></span>
                                        </span>
                                    </div></Col>
                            </Row>
                            <Row
                                className="pt-2">
                                <Col xs={12} className="mb-4">
                                    <RadioGro
                                        title="Status"
                                        name="status_id"
                                        value={state.status_id}
                                        onChange={({ target }) => { setState({ ...state, [target.name]: target.value }) }}
                                        values={[{
                                            value: '1',
                                            label: <TableCol color='#A1A5BE'>
                                                <TextWithBack color='#50CD89'
                                                    backColor='#E8FFF3'
                                                >booked</TextWithBack>
                                            </TableCol>
                                        }, {
                                            value: '2', label:
                                                <TableCol color='#A1A5BE'>
                                                    <TextWithBack color='#FFC700'
                                                        backColor='#FFF8DD'
                                                    >pending</TextWithBack>
                                                </TableCol>
                                        },
                                        {
                                            value: '3', label: <TableCol color='#A1A5BE'>
                                                <TextWithBack color='#5f67cf'
                                                    backColor='#d9e8fc'
                                                >completed</TextWithBack>
                                            </TableCol>
                                        },
                                        {
                                            value: '4', label: <TableCol color='#A1A5BE'>
                                                <TextWithBack color='#F1416C'
                                                    backColor='#f8dfe7'
                                                >canceled</TextWithBack>
                                            </TableCol>
                                        }
                                        ]}
                                    />
                                </Col>

                                <Col xs={6}> <div className="text-left"
                                    style={{
                                        marginTop: '5px',
                                        color: '#51545D',
                                        fontFamily: 'Poppins',
                                        fontWeight: '500',
                                        fontSize: '1.15rem'
                                    }}
                                >Deposit</div></Col>
                                <Col xs={6}>
                                    <div className="text-right"
                                        style={{
                                            marginTop: '5px',
                                            color: '#51545D',
                                            fontFamily: 'Poppins',
                                            fontWeight: '500',
                                            fontSize: '1.15rem'
                                        }}
                                    >$ {contractState.payments?.length ? parseInt(contractState.payments[0]?.amount) : '0'}</div>
                                </Col>

                                <Col xs={6}> <div className="text-left"
                                    style={{
                                        marginTop: '5px',
                                        color: '#51545D',
                                        fontFamily: 'Poppins',
                                        fontWeight: '500',
                                        fontSize: '1.15rem'
                                    }}
                                >Payment</div></Col>
                                <Col xs={6}>
                                    <div className="text-right"
                                        style={{
                                            marginTop: '5px',
                                            color: '#51545D',
                                            fontFamily: 'Poppins',
                                            fontWeight: '500',
                                            fontSize: '1.15rem'
                                        }}
                                    >$ {totalPayment()}</div>
                                </Col>


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
                                    >$ {balanceDue()}</div>
                                </Col>


                                <Col xs={6} className="mb-4"> <div className="text-left"
                                    style={{
                                        marginTop: '5px',
                                        color: '#51545D',
                                        fontFamily: 'Poppins',
                                        fontWeight: '500',
                                        fontSize: '1.15rem'
                                    }}
                                >Grand total </div></Col>
                                <Col xs={6} className="mb-4">
                                    <div className="text-right"
                                        style={{
                                            marginTop: '5px',
                                            color: '#51545D',
                                            fontFamily: 'Poppins',
                                            fontWeight: '500',
                                            fontSize: '1.15rem'
                                        }}
                                    >$ {contractState["payment"] ? parseInt(contractState["payment"]) : '0'} </div>
                                </Col>
                                {/* <Col xs={isMobile > 650 ? 12 : 6} className={isMobile > 600 ? "text-left mb-2" : "text-center mb-2"}>
                                    <CompletedButton
                                        color={data.status.id === 1 ? '#FFC700' : data.status.id === 2 ? '#50CD89' : '#F1416C'}
                                        backColor={data.status.id === 1 ? '#FFF8DD' : data.status.id === 2 ? '#E8FFF3' : '#FFF5F8'}
                                    >{data.status.name}</CompletedButton>
                                </Col>
                                 */}
                                <Col xs={isMobile > 900 ? 12 : 6} className={isMobile > 600 ? "text-left mt-4" : "text-center mt-4"}>
                                    {loadStart ? <Spinner width="2.15em" borderWidth="0.20em" /> : <UpdateButton onClick={onUpdate}>Update</UpdateButton>}
                                </Col>
                            </Row>
                        </Container>
                    </FixedBlock>
                </div>
            </GridMain>
        </div>
    </Main>
};


const mapStateToProps = (state) => {
    return {
        data: state.EditEventReducer.data,
        isMobile: state.AppReducer.screenSize
    };
};

const mapDispatchToProps = {
    getEvent,
    getMenu,
    editEvent,
    createCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsEdit);
// import React, { useCallback, useState, useEffect } from 'react';
// import { AiFillEdit } from "react-icons/ai";
// import { connect, useDispatch } from 'react-redux';
// import { Container, Row, Col } from 'react-bootstrap';
// import Contract from '../../components/CreateEvents/childComponents/Contract';
// import CustomerInfo from '../../components/CreateEvents/childComponents/CustomerInfo';
// import EventsSection from '../../components/CreateEvents/childComponents/EventsSection';
// import RadioGro from '../../components/Smart/Radio/Radio';
// import Spinner from '../../components/Smart/Spinner/Spinner';
// import { GridMain, SectionsBlock, SectionsTitle, FixedBlock, UpdateButton } from './styles';
// import { TableCol, TextWithBack } from '../../components/Table/styles';
// import { Main } from '../../styles/globalStyles';
// import { getEvent, editEvent, createCustomer } from '../Events/actions';
// import { getMenu } from '../Settings/actions';

// function EventsEdit({ isMobile, data, getEvent, match, getMenu, editEvent, createCustomer }) {

//     const [state, setState] = useState(null);
//     const [customerState, setCustomerState] = useState(null);
//     const [contractState, setContractState] = useState(null);
//     const dispatch = useDispatch();
//     const [requiredValues, setRequiredValues] = useState([false, false, false, false, false]);
//     const [requiredCustomerValues, setRequiredCustomerValues] = useState([false, false, false, false, false, false, false]);
//     const [requiredContract, setRequiredContract] = useState([false, false, false, false]);
//     const [modalActive, closeModal] = useState(false);
//     const [loadStart, setLoadStart] = useState(false);

//     const onUpdate = useCallback(() => {
//         let cloneReqArray = [...requiredValues];
//         let cloneReqCon = [...requiredContract];

//         ['name', 'event_date', 'event_start', 'event_end', 'guests_number'].map((el, i) => {
//             state[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true;
//         });

//         ['deposit', 'menu_id', 'cost_per_guest', 'payment_type'].map((el, i) => {
//             contractState[el] ? cloneReqCon[i] = false : cloneReqCon[i] = true;
//         });

//         if (cloneReqArray.includes(true) || cloneReqCon.includes(true)) {
//             setRequiredValues(cloneReqArray);
//             setRequiredContract(cloneReqCon);
//         } else {
//             setLoadStart(true);
//             editEvent({
//                 customer_id: state.customer_id,
//                 name: state.name,
//                 guests_number: state.guests_number,
//                 type_id: state.type_id.split(" ")[1],
//                 // menu_id: state.menu_id.split("&&&&&")[1],
//                 event_date: state.event_date.toISOString().slice(0, 10),
//                 event_end: state.event_end + ':00',
//                 event_start: state.event_start + ':00',
//                 notes: state.notes,
//                 status_id: state.status_id,
//                 contract: {
//                     ...contractState,
//                     balance_due: contractState.balance_due,
//                     cost_per_guest: contractState.cost_per_guest,
//                     created_at: contractState.created_at,
//                     deposit: contractState.deposit,
//                     id: contractState.id,
//                     payment: contractState.payment_tes,
//                     payment_type: contractState.payment_type,
//                     grand_total: contractState.payment,
//                     updated_at: contractState.updated_at,
//                     service_fee: contractState.hasOwnProperty('serviceFee') ? Number(contractState.serviceFee.split(' ')[0]) : 0,
//                     menu_id: contractState.menu_id.split("&&&&&")[1],
//                     services: {
//                         "lightning": contractState.hasOwnProperty('lightning') ? contractState.lightning : "",
//                         "other": contractState.hasOwnProperty('other') ? contractState.other : "",
//                         "ceremony": contractState.hasOwnProperty('ceremony') ? contractState.ceremony : "",
//                         "cocktail_hour": contractState.hasOwnProperty('cocktail_hour') ? contractState.cocktail_hour : "",
//                         "gratitude": contractState.hasOwnProperty('gratitude') ? contractState.gratitude : "",
//                         "security": contractState.hasOwnProperty('security') ? contractState.security : "",
//                         "tax": contractState.hasOwnProperty('tax') ? contractState.tax : "",
//                     }
//                 }
//             }, match.params.id, setLoadStart);
//             setRequiredValues([false, false, false, false, false, false, false, false, false]);
//             setRequiredContract([false, false, false, false]);
//         }

//     }, [state, contractState]);

//     const closeEditCust = useCallback(() => {
//         closeModal(false);
//         setCustomerState({
//             firstName: data.customer.full_name.split(" ")[0],
//             lastName: data.customer.full_name.split(" ")[1],
//             email: data.customer.email,
//             address: data.customer.address,
//             phone_number: data.customer.phone_number,
//             alt_phone_number: data.customer.alt_phone_number,
//             dl_number: data.customer.dl_number,
//             customer_id: data.customer.id,
//             dl_expire_date: new Date(data.customer.dl_expire_date),
//         });
//         setRequiredCustomerValues([false, false, false, false, false, false, false])
//     }, [data])

//     const getButtEditMod = useCallback(() => {
//         return <Row>
//             <Col xs={12} className="text-right">
//                 <button type="button"
//                     onClick={closeEditCust}
//                     className="btn btn-light me-3" data-kt-stepper-action="previous">
//                     Cancel</button>

//                 <button type="button" className="btn btn-primary"
//                     data-kt-stepper-action="next"
//                     onClick={() => {

//                         let cloneReqArray = [...requiredCustomerValues];
//                         ['firstName', 'lastName', 'address', 'email', 'phone_number', 'dl_number', 'dl_expire_date'].map((el, i) => {
//                             customerState[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true;
//                         });


//                         if (cloneReqArray.includes(true)) {
//                             setRequiredCustomerValues(cloneReqArray);
//                         } else {
//                             createCustomer({
//                                 full_name: `${customerState.firstName} ${customerState.lastName}`,
//                                 // firstName: data.customer.full_name.split(" ")[0],
//                                 // lastName: data.customer.full_name.split(" ")[1],
//                                 email: customerState.email,
//                                 address: customerState.address,
//                                 phone_number: customerState.phone_number,
//                                 alt_phone_number: customerState.alt_phone_number,
//                                 dl_number: customerState.dl_number,
//                                 // id: data.customer.id,
//                                 dl_expire_date: new Date(customerState.dl_expire_date),
//                             }, customerState.customer_id, closeModal);
//                             setRequiredCustomerValues([false, false, false, false, false, false, false]);
//                         }
//                     }}
//                 >
//                     Save
//                 </button>
//             </Col>
//         </Row>
//     }, [customerState, requiredCustomerValues]);


//     const contractHandleChange = useCallback(({ target }) => {
//         let newTotal = 0;

//         ['gratitude', 'lightning', 'security', 'cocktail_hour', 'ceremony', 'tax', 'other'].forEach((el) => {
//             if (el == [target.name]) {
//                 newTotal = newTotal + Number(target.value);
//             }
//             else {
//                 newTotal = newTotal + Number(contractState[el] ? contractState[el] : 0);
//             }
//         });


//         if (target.name == 'cost_per_guest') {
//             newTotal = newTotal + Number(target.value) * Number(state.guests_number);
//         }
//         else {
//             newTotal = newTotal + contractState.cost_per_guest * Number(state.guests_number);
//         }


//         if (target.name == 'serviceFee') {

//             let proc = Number(target.value.split(" ")[0]);
//             newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;

//         } else {
//             if (contractState.serviceFee) {
//                 let proc = Number(contractState.serviceFee.split(" ")[0]);
//                 // newTotal = newTotal ? newTotal + newTotal / proc : 0;
//                 newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;

//             }
//         }

//         setContractState({
//             ...contractState,
//             [target.name]: target.value,
//             payment: newTotal
//         });

//     }, [contractState]);

//     const eventsSectHand = ({ target }) => {
//         if (target.name === 'guests_number') {

//             let newTotal = 0;

//             ['gratitude', 'lightning', 'security', 'cocktail_hour', 'ceremony', 'tax', 'other'].forEach((el) => {
//                 newTotal = newTotal + Number(contractState[el] ? contractState[el] : 0)
//             });

//             if (contractState.cost_per_guest) {
//                 newTotal = newTotal + Number(contractState.cost_per_guest ? contractState.cost_per_guest : 0) * Number(target.value ? target.value : 0);
//             }

//             if (contractState.serviceFee) {
//                 let proc = Number(contractState.serviceFee.split(" ")[0]);
//                 newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;
//             }

//             setContractState({ ...contractState, payment: newTotal, balance_due: Number(newTotal) - Number(contractState.deposit) })
//             setState({ ...state, [target.name]: target.value })
//         }
//         else {
//             setState({ ...state, [target.name]: target.value })

//             // setEventsState({ ...eventsState, [target.name]: target.value })
//         }
//     }

//     useEffect(() => {
//         getEvent(match.params.id);
//         getMenu();
//         return () => {
//             dispatch({
//                 type: 'GET_EVENT',
//                 payload: null
//             })
//         }
//     }, []);

//     useEffect(() => {
//         if (data) {


//             let total = Number(data.guests_number) * Number(data.contract.cost_per_guest);

//             let newDate = {
//                 menu_id: `${data.contract.menu.name}&&&&&${data.contract.menu.id}`,
//                 balance_due: data.contract.balance_due,
//                 cost_per_guest: data.contract.cost_per_guest,
//                 created_at: data.contract.created_at,
//                 deposit: data.contract.deposit,
//                 id: data.contract.id,
//                 // payment: total,
//                 payment_tes: data.contract.payment,
//                 payment_type: data.contract.payment_type,
//                 updated_at: data.contract.updated_at,
//                 serviceFee: data.contract.service_fee ? `${data.contract.service_fee} %` : '',
//             }

//             if (data.contract.services && data.contract.services.length) {
//                 data.contract.services.forEach((el, i, arr) => {
//                     newDate[el.name] = arr[i].cost;
//                     total = Number(total) + Number(arr[i].cost)
//                 })
//             };

//             if (data.contract.service_fee) {
//                 total = Number(total) + ((Number(total) * Number(data.contract.service_fee)) / 100);
//             }

//             setState({
//                 name: data.name,
//                 type_id: `${data.type.name} ${data.type.id}`,
//                 created_at: data.created_at,
//                 event_date: new Date(data.event_date),
//                 event_end: data.event_end.slice(0, 5),
//                 event_start: data.event_start.slice(0, 5),
//                 guests_number: data.guests_number,
//                 id: data.id,
//                 updated_at: data.updated_at,
//                 notes: data.notes,
//                 customer_id: data.customer.id,
//                 status_id: data.status.id.toString(),
//             });

//             setContractState({
//                 ...newDate,
//                 payment: total,
//             });


//             console.log(data);

//             setCustomerState({
//                 firstName: data.customer.full_name.split(" ")[0],
//                 lastName: data.customer.full_name.split(" ")[1],
//                 email: data.customer.email,
//                 address: data.customer.address,
//                 phone_number: data.customer.phone_number,
//                 alt_phone_number: data.customer.alt_phone_number,
//                 dl_number: data.customer.dl_number,
//                 customer_id: data.customer.id,
//                 dl_expire_date: new Date(data.customer.dl_expire_date),
//             });
//         }
//     }, [data]);


//     return state && <Main className="pb-4">
//         <div className="p-3 pb-4">
//             <GridMain> <div className={isMobile > 600 ? "pl-4 pr-4 pt-3" : "pl-0 pr-0 pt-3"}>
//                 <SectionsBlock>
//                     <Container>
//                         <Row>
//                             <Col>
//                                 <SectionsTitle className="mb-4 pl-2">Event</SectionsTitle>
//                             </Col>
//                         </Row>
//                     </Container>

//                     <EventsSection requiredError={requiredValues} state={state} contractState={contractState}
//                         handleChange={eventsSectHand}


//                         // handleChange={({ target }) => {
//                         //     setState({ ...state, [target.name]: target.value })
//                         // }}
//                         isMobile={isMobile} />

//                 </SectionsBlock>
//                 <SectionsBlock>
//                     <Container>
//                         <Row>
//                             <Col xs={8}>
//                                 <SectionsTitle className="mb-4 pl-2">Customer Info</SectionsTitle>
//                             </Col>
//                             <Col xs={4} className="text-right"><AiFillEdit className="cursorPointer" size={15} onClick={() => { closeModal(true) }} /></Col>
//                         </Row>
//                     </Container>
//                     <CustomerInfo requiredError={requiredCustomerValues} state={customerState} disabledAll={true}
//                         handleChange={({ target }) => { setCustomerState({ ...customerState, [target.name]: target.value }) }}
//                         modalActive={modalActive} closeModal={closeEditCust} getButtEditMod={getButtEditMod} createActive={false}
//                     />
//                 </SectionsBlock>

//                 <SectionsBlock>
//                     <Container>
//                         <Row>
//                             <Col>
//                                 <SectionsTitle className="mb-4 pl-2">Contract</SectionsTitle>
//                             </Col>
//                         </Row>
//                     </Container>
//                     <Contract requiredError={requiredContract} state={contractState}
//                         handleChange={contractHandleChange} totalShow={true} />
//                 </SectionsBlock>
//             </div>

//                 <div className={isMobile > 900 ? 'pr-3 pl-3 pb-3 pt-3 text-left' : 'pt-3 text-left'}>
//                     <FixedBlock>
//                         <Container>
//                             <Row className="pt-2">
//                                 <Col xs={12} className="mb-4">
//                                     <RadioGro
//                                         title="Status"
//                                         name="status_id"
//                                         value={state.status_id}
//                                         onChange={({ target }) => { setState({ ...state, [target.name]: target.value }) }}
//                                         values={[{
//                                             value: '1',
//                                             label: <TableCol color='#A1A5BE'>
//                                                 <TextWithBack color='#FFC700'
//                                                     backColor='#FFF8DD'
//                                                 >booked</TextWithBack>
//                                             </TableCol>
//                                         }, {
//                                             value: '2', label:
//                                                 <TableCol color='#A1A5BE'>
//                                                     <TextWithBack color='#50CD89'
//                                                         backColor='#E8FFF3'
//                                                     >pending</TextWithBack>
//                                                 </TableCol>
//                                         },
//                                         {
//                                             value: '3', label: <TableCol color='#A1A5BE'>
//                                                 <TextWithBack color='#F1416C'
//                                                     backColor='#FFF5F8'
//                                                 >completed</TextWithBack>
//                                             </TableCol>
//                                         },
//                                         {
//                                             value: '4', label: <TableCol color='#A1A5BE'>
//                                                 <TextWithBack color='#ff0040'
//                                                     backColor='#fff5f899'
//                                                 >canceled</TextWithBack>
//                                             </TableCol>
//                                         }
//                                         ]}
//                                     />
//                                 </Col>

//                                 <Col xs={6}> <div className="text-left"
//                                     style={{
//                                         marginTop: '5px',
//                                         color: '#51545D',
//                                         fontFamily: 'Poppins',
//                                         fontWeight: '500',
//                                         fontSize: '1.15rem'
//                                     }}
//                                 >Deposit</div></Col>
//                                 <Col xs={6}>
//                                     <div className="text-right"
//                                         style={{
//                                             marginTop: '5px',
//                                             color: '#51545D',
//                                             fontFamily: 'Poppins',
//                                             fontWeight: '500',
//                                             fontSize: '1.15rem'
//                                         }}
//                                     >$ {parseInt(contractState.deposit ? contractState.deposit : 0)}</div>
//                                 </Col>

//                                 <Col xs={6}> <div className="text-left"
//                                     style={{
//                                         marginTop: '5px',
//                                         color: '#51545D',
//                                         fontFamily: 'Poppins',
//                                         fontWeight: '500',
//                                         fontSize: '1.15rem'
//                                     }}
//                                 >Payment</div></Col>
//                                 <Col xs={6}>
//                                     <div className="text-right"
//                                         style={{
//                                             marginTop: '5px',
//                                             color: '#51545D',
//                                             fontFamily: 'Poppins',
//                                             fontWeight: '500',
//                                             fontSize: '1.15rem'
//                                         }}
//                                     >$ {contractState["payment_tes"] ? parseInt(contractState["payment_tes"]) : '0'}</div>
//                                 </Col>


//                                 <Col xs={6}> <div className="text-left"
//                                     style={{
//                                         marginTop: '5px',
//                                         color: '#51545D',
//                                         fontFamily: 'Poppins',
//                                         fontWeight: '500',
//                                         fontSize: '1.15rem'
//                                     }}
//                                 >Balance due </div></Col>
//                                 <Col xs={6}>
//                                     <div className="text-right"
//                                         style={{
//                                             marginTop: '5px',
//                                             color: '#51545D',
//                                             fontFamily: 'Poppins',
//                                             fontWeight: '500',
//                                             fontSize: '1.15rem'
//                                         }}
//                                     >$
//                                         {/* {parseInt(state.payment - (Number(state.deposit) + Number(state.payment_tes)))} */}
//                                         {parseInt(contractState.payment - (Number(contractState.deposit) + Number(contractState.payment_tes)))}</div>
//                                 </Col>


//                                 <Col xs={6} className="mb-4"> <div className="text-left"
//                                     style={{
//                                         marginTop: '5px',
//                                         color: '#51545D',
//                                         fontFamily: 'Poppins',
//                                         fontWeight: '500',
//                                         fontSize: '1.15rem'
//                                     }}
//                                 >Grand total </div></Col>
//                                 <Col xs={6} className="mb-4">
//                                     <div className="text-right"
//                                         style={{
//                                             marginTop: '5px',
//                                             color: '#51545D',
//                                             fontFamily: 'Poppins',
//                                             fontWeight: '500',
//                                             fontSize: '1.15rem'
//                                         }}
//                                     >$ {contractState["payment"] ? parseInt(contractState["payment"]) : '0'} </div>
//                                 </Col>
//                                 {/* <Col xs={isMobile > 650 ? 12 : 6} className={isMobile > 600 ? "text-left mb-2" : "text-center mb-2"}>
//                                     <CompletedButton
//                                         color={data.status.id === 1 ? '#FFC700' : data.status.id === 2 ? '#50CD89' : '#F1416C'}
//                                         backColor={data.status.id === 1 ? '#FFF8DD' : data.status.id === 2 ? '#E8FFF3' : '#FFF5F8'}
//                                     >{data.status.name}</CompletedButton>
//                                 </Col>
//                                  */}
//                                 <Col xs={isMobile > 900 ? 12 : 6} className={isMobile > 600 ? "text-left mt-4" : "text-center mt-4"}>
//                                     {loadStart ? <Spinner width="2.15em" borderWidth="0.20em" /> : <UpdateButton onClick={onUpdate}>Update</UpdateButton>}
//                                 </Col>
//                             </Row>
//                         </Container>
//                     </FixedBlock>
//                 </div>
//             </GridMain>
//         </div>
//     </Main>
// };


// const mapStateToProps = (state) => {
//     return {
//         data: state.EditEventReducer.data,
//         isMobile: state.AppReducer.screenSize
//     };
// };

// const mapDispatchToProps = {
//     getEvent,
//     getMenu,
//     editEvent,
//     createCustomer
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EventsEdit);