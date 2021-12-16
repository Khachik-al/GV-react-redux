// import React, { memo, useState, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios'
// import config from '../../configs.json';
// import { AiOutlineClose } from "react-icons/ai";
// import { BsCheckLg, BsArrowRight, BsArrowLeft } from "react-icons/bs";
// import { Container, Row, Col } from 'react-bootstrap';
// import Dialog from '@material-ui/core/Dialog';
// import { Main, RowHeader, RowBody, BodySectionsCol, BodyValuesCol, NumberBlock, TextBlock } from './styles';
// import Spinner from '../Smart/Spinner/Spinner';
// import EventsSection from './childComponents/EventsSection';
// import CustomerInfo from './childComponents/CustomerInfo';
// import Contract from './childComponents/Contract';
// import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

// function CreateEvents({ onClose, isMobile, createEvent, setPage, pending_create }) {

//     const dispatch = useDispatch();
//     const createCustomerLoad = useSelector((state) => state.EventsReducer.pending_create_customer);
//     const createEventLoad = useSelector((state) => state.EventsReducer.pending_create);
//     const [activeSection, setActiveSection] = useState(0);
//     const [requiredEvents, setRequiredEvents] = useState([false, false, false, false, false]);
//     const [eventsState, setEventsState] = useState({
//         name: '',
//         guests_number: '',
//         type_id: 'Wedding 1',
//         event_date: '',
//         event_start: '',
//         event_end: '',
//         notes: ''
//     });

//     const [customerRequired, setCustomerRequired] = useState([false, false, false, false, false, false, false]);
//     const [customerInfo, setCustomerInfo] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         address: '',
//         phone_number: '',
//         alt_phone_number: '',
//         dl_number: '',
//         dl_expire_date: ''
//     });

//     const [contractRequired, setContractRequired] = useState([false, false, false, false]);
//     const [contractState, setContractState] = useState({
//         cost_per_guest: "",
//         deposit: "",
//         payment: "",
//         payment_tes: "",
//         balance_due: null,
//         payment_type: "",
//         menu_id: "",
//         serviceFee: "",
//         gratitude: "",
//         security: "",
//         ceremony: "",
//         tax: "",
//         other: "",
//     });

//     const paintSectionsNumber = useCallback(() => {
//         return <Container>
//             {isMobile > 600 ? ['Event', 'Customer info', 'Contract'].map((sect, i) => {
//                 return <Row key={sect} className="pl-3">
//                     <Col xs={4}>
//                         <NumberBlock className="mb-4" backgroundColor={activeSection === i ? '#009ef7' : '#f1faff'}
//                             color={activeSection === i ? '#F1FAFF' : '#009EF7'}>
//                             {activeSection === 1 ? i === 0 ? <BsCheckLg size={15} /> : i + 1 :
//                                 activeSection === 0 ? i + 1 : i === 0 || i === 1 ? <BsCheckLg size={15} /> : i + 1}
//                         </NumberBlock>
//                     </Col>

//                     <Col xs={8}>
//                         <TextBlock color={activeSection === i || activeSection > i ? '#7E8299' : '#3F4254'}>
//                             {sect}
//                         </TextBlock>
//                     </Col>
//                 </Row>
//             }) : <Row className="mb-4"> {['Event', 'Customer info', 'Contract'].map((sect, i) => {
//                 return <Col xs={4} className="text-center p-0">
//                     <NumberBlock backgroundColor={activeSection === i ? '#009EF7' : '#F1FAFF'}
//                         color={activeSection === i ? '#F1FAFF' : '#009EF7'}>
//                         {activeSection === 1 ? i === 0 ? <BsCheckLg size={15} /> : i + 1 :
//                             activeSection === 0 ? i + 1 : i === 0 || i === 1 ? <BsCheckLg size={15} /> : i + 1}
//                     </NumberBlock>
//                     <TextBlock color={activeSection === i || activeSection > i ? '#A1A5B7' : '#3F4254'}>
//                         {sect}
//                     </TextBlock>
//                 </Col>
//             })}</Row>
//             }
//         </Container >
//     }, [activeSection]);

//     const contractHandleChange = useCallback(({ target }) => {
//         let newTotal = 0;

//         ['gratitude', 'lightning', 'security', 'cocktail_hour', 'ceremony', 'tax', 'other'].forEach((el) => {
//             if (el == [target.name]) {
//                 newTotal = newTotal + Number(target.value);
//             }
//             else {
//                 newTotal = newTotal + Number(contractState[el] ? contractState[el] : 0)
//             }
//         });

//         if (target.name == 'cost_per_guest') {
//             newTotal = newTotal + Number(target.value) * Number(eventsState.guests_number);
//         }
//         else {
//             newTotal = newTotal + contractState.cost_per_guest * Number(eventsState.guests_number);
//         }

//         if (target.name == 'serviceFee') {
//             let proc = Number(target.value.split(" ")[0]);
//             newTotal = newTotal ? newTotal + ((newTotal*proc)/100) : 0;
//         } else {
//             if (contractState.serviceFee) {
//                 let proc = Number(contractState.serviceFee.split(" ")[0]);
//                 newTotal = newTotal ? newTotal + ((newTotal*proc)/100) : 0;
//             }
//         }

//         setContractState({
//             ...contractState,
//             [target.name]: target.value,
//             payment: newTotal
//         });

//     }, [contractState]);

//     const paintSectionsComponent = useCallback(() => {
//         switch (activeSection) {
//             case 0: return <EventsSection requiredError={requiredEvents} state={eventsState} isMobile={isMobile}
//                 handleChange={({ target }) => {
//                     if (target.name === 'guests_number') {

//                         let newTotal = 0;

//                         ['gratitude', 'lightning', 'security', 'cocktail_hour', 'ceremony', 'tax', 'other'].forEach((el) => {
//                             newTotal = newTotal + Number(contractState[el] ? contractState[el] : 0)
//                         });

//                         if (contractState.cost_per_guest) {
//                             newTotal = newTotal + Number(contractState.cost_per_guest ? contractState.cost_per_guest : 1) * Number(target.value ? target.value : 0);
//                         }

//                         if (contractState.serviceFee) {
//                             let proc = Number(contractState.serviceFee.split(" ")[0]);
//                             newTotal = newTotal ? newTotal + ((newTotal*proc)/100) : 0;
//                         }

//                         setEventsState({ ...eventsState, [target.name]: target.value })
//                         setContractState({ ...contractState, payment: newTotal, balance_due: Number(newTotal) - Number(contractState.deposit) })
//                     }
//                     else {
//                         setEventsState({ ...eventsState, [target.name]: target.value })
//                     }
//                 }
//                 }
//             />;
//             case 1: return <CustomerInfo requiredError={customerRequired} state={customerInfo}
//                 disabledAll={contractState.hasOwnProperty('customer_id')} createActive={true}
//                 handleChange={({ target }) => { setCustomerInfo({ ...customerInfo, [target.name]: target.value }) }} />;
//             case 2: return <Contract requiredError={contractRequired} state={contractState}
//                 handleChange={contractHandleChange} />;
//         }
//     }, [activeSection, eventsState, customerInfo, contractState, requiredEvents, customerRequired, contractRequired]);

//     const changeSection = useCallback((backOrCon) => {
//         if (backOrCon) {
//             if (activeSection === 0) {
//                 let cloneReqArray = [...requiredEvents];

//                 ['name', 'event_date', 'event_start', 'event_end', 'guests_number'].map((el, i) => {
//                     eventsState[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true;
//                 });

//                 if (cloneReqArray.includes(true)) {
//                     setRequiredEvents(cloneReqArray);
//                 } else {
//                     setActiveSection(activeSection + 1);
//                 }
//             }
//             else {
//                 let cloneReqArray = [...customerRequired];
//                 ['firstName', 'lastName', 'address', 'email',
//                     'phone_number', 'dl_number', 'dl_expire_date'].forEach((el, i) => customerInfo[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true);
//                 if (cloneReqArray.includes(true)) {
//                     setCustomerRequired(cloneReqArray);
//                 } else {

//                     if (contractState.hasOwnProperty('customer_id')) {
//                         setActiveSection(activeSection + 1);
//                     } else {
//                         dispatch({ type: 'PENDING_CREATE_CUSTOMER', payload: true });
//                         axios.post(`${config["API"]}api/api/customers`,
//                             {
//                                 full_name: customerInfo.firstName + ' ' + customerInfo.lastName,
//                                 email: customerInfo.email,
//                                 address: customerInfo.address,
//                                 phone_number: customerInfo.phone_number,
//                                 alt_phone_number: customerInfo.alt_phone_number,
//                                 dl_number: customerInfo.dl_number,
//                                 dl_expire_date: customerInfo.dl_expire_date
//                             },
//                             {
//                                 headers: {
//                                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                                 }
//                             }
//                         ).then(res => {
//                             setContractState({
//                                 ...contractState,
//                                 customer_id: res.data.id
//                             })
//                             setActiveSection(activeSection + 1);

//                             dispatch({
//                                 type: 'TOAST_MESSAGE',
//                                 successMessage: `${res.data.full_name} has been created`,
//                                 errorMessage: null
//                             })
//                             dispatch({ type: 'PENDING_CREATE_CUSTOMER', payload: false })
//                         }).catch(er => {
//                             dispatch({
//                                 type: 'TOAST_MESSAGE',
//                                 successMessage: null,
//                                 errorMessage: er.response.data.errors[Object.keys(er.response.data.errors)[0]][0]
//                             })
//                             dispatch({ type: 'PENDING_CREATE_CUSTOMER', payload: false })
//                         })
//                     }
//                 }
//             }
//         }
//         else {
//             setActiveSection(activeSection - 1);
//             if (activeSection === 1) {
//                 setRequiredEvents([false, false, false]);
//             }
//             if (activeSection === 2) {
//                 setCustomerRequired([false, false]);
//             }
//             if (activeSection === 2) {
//                 setContractRequired([false, false]);
//             }
//         }
//     }, [activeSection, eventsState, customerInfo, contractState]);

//     const createEvenet = useCallback(() => {
//         let cloneContractRequired = [...contractRequired];
//         contractState.deposit ? cloneContractRequired[0] = false : cloneContractRequired[0] = true;
//         contractState.menu_id ? cloneContractRequired[1] = false : cloneContractRequired[1] = true;
//         contractState.cost_per_guest ? cloneContractRequired[2] = false : cloneContractRequired[2] = true;
//         contractState.payment_type ? cloneContractRequired[3] = false : cloneContractRequired[3] = true;

//         if (cloneContractRequired.includes(true)) {
//             setContractRequired(cloneContractRequired);
//         }
//         else {
//             dispatch({ type: 'PENDING_CREATE_EVENT', payload: true });
//             createEvent({
//                 ...eventsState,
//                 notes: eventsState.notes,
//                 customer_id: contractState.customer_id,
//                 event_date: eventsState.event_date.toISOString().slice(0, 10),
//                 type_id: eventsState.type_id.split(" ")[1],
//                 event_end: eventsState.event_end + ':00',
//                 event_start: eventsState.event_start + ':00',
//                 contract: {
//                     // ...contractState, 
//                     cost_per_guest: contractState.cost_per_guest,
//                     deposit: contractState.deposit,
//                     payment: contractState.payment_tes,
//                     balance_due: contractState.balance_due,
//                     payment_type: contractState.payment_type,
//                     grand_total: contractState.payment,
//                     menu_id: contractState.menu_id.split("&&&&&")[1],
//                     service_fee: contractState.serviceFee ? Number(contractState.serviceFee.split(" ")[0]) : 0,
//                     services: {
//                         lightning: contractState.lightning,
//                         cocktail_hour: contractState.cocktail_hour,
//                         other: contractState.other,
//                         gratitude: contractState.gratitude,
//                         security: contractState.security,
//                         ceremony: contractState.ceremony,
//                         tax: contractState.tax
//                     },
//                 }
//             }, onClose, setPage);
//         }
//     }, [contractState, contractRequired, eventsState]);

//     return <Dialog
//         fullWidth={true}
//         maxWidth="md"
//         open={true}
//         onClose={() => { onClose(false) }}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//     >
//         <DialogTitle>
//             <RowHeader>
//                 <h3 className="pt-1 pb-1">Create Event</h3>
//                 <div className="pt-0 pb-0"> <AiOutlineClose size={20} onClick={() => { onClose(false) }} className="cursorPointer" /> </div>
//             </RowHeader>
//         </DialogTitle>
//         <DialogContent>
//             <Main>
//                 <RowBody>
//                     <BodySectionsCol>
//                         {paintSectionsNumber()}
//                     </BodySectionsCol>

//                     <BodyValuesCol>
//                         {paintSectionsComponent()}
//                     </BodyValuesCol>
//                 </RowBody>
//             </Main>
//         </DialogContent>
//         <DialogActions>
//             <Container className="mt-4 mb-4">
//                 <Row>
//                     <Col xs={6} className="text-left">
//                         {activeSection !== 0 &&
//                             <button type="button"
//                                 onClick={() => {
//                                     changeSection('');
//                                 }}
//                                 class={`btn ${isMobile > 650 ? 'btn-lg' : ''} btn-light-primary me-3`} data-kt-stepper-action="previous">
//                                 <BsArrowLeft className="mr-1" />
//                                 Back</button>
//                         }</Col>

//                     <Col xs={6} className="text-right">{
//                         activeSection === 0 ? <button type="button" class={`btn ${isMobile > 650 ? 'btn-lg' : ''} btn-primary`}
//                             data-kt-stepper-action="next"
//                             onClick={activeSection === 2 ? createEvenet : changeSection}>
//                             {activeSection === 2 ? 'Submit' : 'Continue'} <BsArrowRight className="ml-1" />
//                         </button> : createCustomerLoad || createEventLoad ? <Spinner width="2em" borderWidth="0.25em" /> :
//                             <button type="button" class={`btn ${isMobile > 650 ? 'btn-lg' : ''} btn-primary`}
//                                 data-kt-stepper-action="next"
//                                 onClick={activeSection === 2 ? createEvenet : changeSection}>
//                                 {activeSection === 2 ? 'Submit' : 'Continue'} <BsArrowRight className="ml-1" />
//                             </button>
//                     }
//                     </Col>
//                 </Row>
//             </Container>
//         </DialogActions>

//     </Dialog >
// }

// export default memo(CreateEvents);



import React, { memo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import config from '../../configs.json';
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg, BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import { Main, RowHeader, RowBody, BodySectionsCol, BodyValuesCol, NumberBlock, TextBlock } from './styles';
import Spinner from '../Smart/Spinner/Spinner';
import EventsSection from './childComponents/EventsSection';
import CustomerInfo from './childComponents/CustomerInfo';
import Contract from './childComponents/Contract';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

function CreateEvents({ onClose, isMobile, createEvent, setPage, pending_create }) {

    const dispatch = useDispatch();
    const createCustomerLoad = useSelector((state) => state.EventsReducer.pending_create_customer);
    const createEventLoad = useSelector((state) => state.EventsReducer.pending_create);
    const [activeSection, setActiveSection] = useState(0);
    const [requiredEvents, setRequiredEvents] = useState([false, false, false, false, false]);
    const [eventsState, setEventsState] = useState({
        name: '',
        guests_number: '',
        type_id: 'Wedding 1',
        event_date: '',
        event_start: '',
        event_end: '',
        notes: ''
    });

    const [customerRequired, setCustomerRequired] = useState([false, false, false, false, false, false, false]);
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone_number: '',
        alt_phone_number: '',
        dl_number: '',
        dl_expire_date: ''
    });

    const [contractRequired, setContractRequired] = useState([false, false, false, false]);
    const [contractState, setContractState] = useState({
        cost_per_guest: "",
        deposit: "",
        payment: "",
        payment_tes: "",
        balance_due: null,
        payment_type: "",
        menu_id: "",
        serviceFee: "",
        gratitude: "",
        security: "",
        ceremony: "",
        tax: "",
        other: "",
    });

    const paintSectionsNumber = useCallback(() => {
        return <Container style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <Row style={{ border: '1px solid rgba(70, 156, 240, 0.3)', borderRadius: '7px' }}>
                {['Event', 'Customer info', 'Contract'].map((sect, i) => {
                    return <Col xs={isMobile > 600 ? 4 : 12} className='p-0' style={{ backgroundColor: `${activeSection === i ? '#E6F1FD' : ''}`, borderRadius: '7px' }}>
                        <div class="stepper stepper-links d-flex flex-column" id="kt_create_account_stepper">
                            <div class="stepper-nav">
                                <div class={`stepper-item ${activeSection === i ? 'current' : i < activeSection ? 'completed' : ''}`} data-kt-stepper-element="nav">
                                    <h3 class="stepper-title">{sect}</h3>
                                </div>
                            </div>
                        </div>
                    </Col>
                })}

            </Row>
            {/* {isMobile > 600 ? ['Event', 'Customer info', 'Contract'].map((sect, i) => {
            //     return <Row key={sect} className="pl-3">
            //         <Col xs={4}>
            //             <NumberBlock className="mb-4" backgroundColor={activeSection === i ? '#009ef7' : '#f1faff'}
            //                 color={activeSection === i ? '#F1FAFF' : '#009EF7'}>
            //                 {activeSection === 1 ? i === 0 ? <BsCheckLg size={15} /> : i + 1 : 
            //                     activeSection === 0 ? i + 1 : i === 0 || i === 1 ? <BsCheckLg size={15} /> : i + 1}
            //             </NumberBlock>
            //         </Col>

            //         <Col xs={8}>
            //             <TextBlock color={activeSection === i || activeSection > i ? '#7E8299' : '#3F4254'}>
            //                 {sect}
            //             </TextBlock>
            //         </Col>
            //     </Row>
            // }) : <Row className="mb-4"> {['Event', 'Customer info', 'Contract'].map((sect, i) => {
            //     return <Col xs={4} className="text-center p-0">
            //         <NumberBlock backgroundColor={activeSection === i ? '#009EF7' : '#F1FAFF'}
            //             color={activeSection === i ? '#F1FAFF' : '#009EF7'}>
            //             {activeSection === 1 ? i === 0 ? <BsCheckLg size={15} /> : i + 1 :
            //                 activeSection === 0 ? i + 1 : i === 0 || i === 1 ? <BsCheckLg size={15} /> : i + 1}
            //         </NumberBlock>
            //         <TextBlock color={activeSection === i || activeSection > i ? '#A1A5B7' : '#3F4254'}>
            //             {sect}
            //         </TextBlock>
            //     </Col>
            // })}</Row>
            // */}
        </Container >
    }, [activeSection]);

    const contractHandleChange = useCallback(({ target }) => {
        let newTotal = 0;

        ['gratitude', 'lightning', 'security', 'cocktail_hour', 'ceremony', 'tax', 'other'].forEach((el) => {
            if (el == [target.name]) {
                newTotal = newTotal + Number(target.value);
            }
            else {
                newTotal = newTotal + Number(contractState[el] ? contractState[el] : 0)
            }
        });

        if (target.name == 'cost_per_guest') {
            newTotal = newTotal + Number(target.value) * Number(eventsState.guests_number);
        }
        else {
            newTotal = newTotal + contractState.cost_per_guest * Number(eventsState.guests_number);
        }

        if (target.name == 'serviceFee') {
            let proc = Number(target.value.split(" ")[0]);
            newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;
        } else {
            if (contractState.serviceFee) {
                let proc = Number(contractState.serviceFee.split(" ")[0]);
                newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;
            }
        }

        setContractState({
            ...contractState,
            [target.name]: target.value,
            payment: newTotal
        });

    }, [contractState]);

    const paintSectionsComponent = useCallback(() => {
        switch (activeSection) {
            case 0: return <EventsSection requiredError={requiredEvents} state={eventsState} isMobile={isMobile}
                handleChange={({ target }) => {
                    if (target.name === 'guests_number') {

                        let newTotal = 0;

                        ['gratitude', 'lightning', 'security', 'cocktail_hour', 'ceremony', 'tax', 'other'].forEach((el) => {
                            newTotal = newTotal + Number(contractState[el] ? contractState[el] : 0)
                        });

                        if (contractState.cost_per_guest) {
                            newTotal = newTotal + Number(contractState.cost_per_guest ? contractState.cost_per_guest : 1) * Number(target.value ? target.value : 0);
                        }

                        if (contractState.serviceFee) {
                            let proc = Number(contractState.serviceFee.split(" ")[0]);
                            newTotal = newTotal ? newTotal + ((newTotal * proc) / 100) : 0;
                        }

                        setEventsState({ ...eventsState, [target.name]: target.value })
                        setContractState({ ...contractState, payment: newTotal, balance_due: Number(newTotal) - Number(contractState.deposit) })
                    }
                    else {
                        setEventsState({ ...eventsState, [target.name]: target.value })
                    }
                }
                }
            />;
            case 1: return <CustomerInfo requiredError={customerRequired} state={customerInfo}
                disabledAll={contractState.hasOwnProperty('customer_id')} createActive={true}
                handleChange={({ target }) => { setCustomerInfo({ ...customerInfo, [target.name]: target.value }) }} />;
            case 2: return <Contract requiredError={contractRequired} state={contractState}
                handleChange={contractHandleChange} />;
        }
    }, [activeSection, eventsState, customerInfo, contractState, requiredEvents, customerRequired, contractRequired]);

    const changeSection = useCallback((backOrCon) => {
        if (backOrCon) {
            if (activeSection === 0) {
                let cloneReqArray = [...requiredEvents];

                ['name', 'event_date', 'event_start', 'event_end', 'guests_number'].map((el, i) => {
                    eventsState[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true;
                });

                if (cloneReqArray.includes(true)) {
                    setRequiredEvents(cloneReqArray);
                } else {
                    setActiveSection(activeSection + 1);
                }
            }
            else {
                let cloneReqArray = [...customerRequired];
                ['firstName', 'lastName', 'address', 'email',
                    'phone_number', 'dl_number', 'dl_expire_date'].forEach((el, i) => customerInfo[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true);
                if (cloneReqArray.includes(true)) {
                    setCustomerRequired(cloneReqArray);
                } else {

                    if (contractState.hasOwnProperty('customer_id')) {
                        setActiveSection(activeSection + 1);
                    } else {
                        dispatch({ type: 'PENDING_CREATE_CUSTOMER', payload: true });
                        axios.post(`${config["API"]}api/api/customers`,
                            {
                                full_name: customerInfo.firstName + ' ' + customerInfo.lastName,
                                email: customerInfo.email,
                                address: customerInfo.address,
                                phone_number: customerInfo.phone_number,
                                alt_phone_number: customerInfo.alt_phone_number,
                                dl_number: customerInfo.dl_number,
                                dl_expire_date: customerInfo.dl_expire_date
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                }
                            }
                        ).then(res => {
                            setContractState({
                                ...contractState,
                                customer_id: res.data.id
                            })
                            setActiveSection(activeSection + 1);

                            dispatch({
                                type: 'TOAST_MESSAGE',
                                successMessage: `${res.data.full_name} has been created`,
                                errorMessage: null
                            })
                            dispatch({ type: 'PENDING_CREATE_CUSTOMER', payload: false })
                        }).catch(er => {
                            dispatch({
                                type: 'TOAST_MESSAGE',
                                successMessage: null,
                                errorMessage: er.response.data.errors[Object.keys(er.response.data.errors)[0]][0]
                            })
                            dispatch({ type: 'PENDING_CREATE_CUSTOMER', payload: false })
                        })
                    }
                }
            }
        }
        else {
            setActiveSection(activeSection - 1);
            if (activeSection === 1) {
                setRequiredEvents([false, false, false]);
            }
            if (activeSection === 2) {
                setCustomerRequired([false, false]);
            }
            if (activeSection === 2) {
                setContractRequired([false, false]);
            }
        }
    }, [activeSection, eventsState, customerInfo, contractState]);

    const createEvenet = useCallback(() => {
        let cloneContractRequired = [...contractRequired];
        contractState.deposit ? cloneContractRequired[0] = false : cloneContractRequired[0] = true;
        contractState.menu_id ? cloneContractRequired[1] = false : cloneContractRequired[1] = true;
        contractState.cost_per_guest ? cloneContractRequired[2] = false : cloneContractRequired[2] = true;
        contractState.payment_type ? cloneContractRequired[3] = false : cloneContractRequired[3] = true;

        if (cloneContractRequired.includes(true)) {
            setContractRequired(cloneContractRequired);
        }
        else {
            dispatch({ type: 'PENDING_CREATE_EVENT', payload: true });
            createEvent({
                ...eventsState,
                notes: eventsState.notes,
                customer_id: contractState.customer_id,
                event_date: eventsState.event_date.toISOString().slice(0, 10),
                type_id: eventsState.type_id.split(" ")[1],
                event_end: eventsState.event_end + ':00',
                event_start: eventsState.event_start + ':00',
                contract: {
                    // ...contractState, 
                    cost_per_guest: contractState.cost_per_guest,
                    deposit: contractState.deposit,
                    payment: contractState.payment_tes,
                    balance_due: contractState.balance_due,
                    payment_type: contractState.payment_type,
                    grand_total: contractState.payment,
                    menu_id: contractState.menu_id.split("&&&&&")[1],
                    service_fee: contractState.serviceFee ? Number(contractState.serviceFee.split(" ")[0]) : 0,
                    services: {
                        lightning: contractState.lightning,
                        cocktail_hour: contractState.cocktail_hour,
                        other: contractState.other,
                        gratitude: contractState.gratitude,
                        security: contractState.security,
                        ceremony: contractState.ceremony,
                        tax: contractState.tax
                    },
                }
            }, onClose, setPage);
        }
    }, [contractState, contractRequired, eventsState]);

    return <Dialog
        fullWidth={true}
        maxWidth="md"
        open={true}
        onClose={() => { onClose(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle style={{ padding: `${isMobile > 600 ? '' : '0px 15px'}` }}>
            <RowHeader>
                <h3 className="pt-1 pb-1">Create Event</h3>
                <div className="pt-0 pb-0"> <AiOutlineClose size={20} onClick={() => { onClose(false) }} className="cursorPointer" /> </div>
            </RowHeader>
        </DialogTitle>
        <DialogContent style={{ padding: `${isMobile > 600 ? '' : '0px 5px'}` }}>
            <Main>
                <RowBody isMobile={isMobile < 600}>
                    <BodySectionsCol className="mb-5">
                        {paintSectionsNumber()}
                    </BodySectionsCol>

                    <BodyValuesCol>
                        {paintSectionsComponent()}
                    </BodyValuesCol>
                </RowBody>
            </Main>
        </DialogContent>
        <DialogActions>
            <Container className="mt-4 mb-4" style={{ paddingLeft: '42px', paddingRight: '40px' }}>
                <Row>
                    <Col xs={6} className="text-left">
                        {activeSection !== 0 &&
                            <button type="button"
                                onClick={() => {
                                    changeSection('');
                                }}
                                class={`btn ${isMobile > 650 ? 'btn-lg' : ''} btn-light-primary me-3`} data-kt-stepper-action="previous">
                                <BsArrowLeft className="mr-1" />
                                Back</button>
                        }</Col>

                    <Col xs={6} className="text-right">{
                        activeSection === 0 ? <button type="button" class={`btn ${isMobile > 650 ? 'btn-lg' : ''} btn-primary`}
                            data-kt-stepper-action="next"
                            onClick={activeSection === 2 ? createEvenet : changeSection}>
                            {activeSection === 2 ? 'Submit' : 'Continue'}
                        </button> : createCustomerLoad || createEventLoad ? <Spinner width="2em" borderWidth="0.25em" /> :
                            <button type="button" className={`btn ${isMobile > 650 ? 'btn-lg' : ''} btn-primary`}
                                data-kt-stepper-action="next"
                                onClick={activeSection === 2 ? createEvenet : changeSection}>
                                {activeSection === 2 ? 'Submit' : 'Continue'}
                            </button>
                    }
                    </Col>
                </Row>
            </Container>
        </DialogActions>

    </Dialog >
}

export default memo(CreateEvents);