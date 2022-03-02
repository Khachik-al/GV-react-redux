import React, { useState, useEffect } from 'react';
import { BsFillPlusSquareFill, BsFillDashSquareFill, BsFileEarmarkPdfFill } from "react-icons/bs";
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AccordDown from '../../components/Smart/AccordDown/AccordDown';
import { DollarIconBlock, InputWithDollar, SpanIcon } from '../../components/CreateEvents/styles';
import { GridMain, FixedBlock } from '../EventsEdit/styles';
import RadioGro from '../../components/Smart/Radio/Radio';
import { TableCol, TableRow, TextWithBack } from '../../components/Table/styles';
import BlockInputs from '../../components/Smart/InputBlock/InputBlock';
import { UpdateButton } from '../EventsEdit/styles';
import { SectionsBlock, SectionsTitle } from '../EventsEdit/styles';
import { Main, InputTitle } from '../../styles/globalStyles';
import { getEvent } from '../Events/actions';
import { BiDollar } from 'react-icons/bi';

function EventsView({ isMobile, data, getEvent, match }) {
    const [state, setState] = useState(null);
    const [customerState, setCustomerState] = useState(null);
    const [accordIsOpen, setAccordIsOpen] = useState(false);
    // const [paymentsAccordIsOpen, setPaymentsAccordIsOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getEvent(match.params.id);
        return () => {
            dispatch({
                type: 'GET_EVENT',
                payload: null
            })
        }
    }, []);
    const totalPayment = () => {
        if (!data?.payments) return
        let a = 0;
        data.payments.forEach((el, i) => {
            if (i !== 0) {
                a += el.amount
            }
        })
        return a
    }

    useEffect(() => {
        if (data && data.contract && data.customer) {
            let total = Number(data.guests_number) * Number(data.contract.cost_per_guest);
            let newDate = {
                name: data.name,
                type_id: `${data.type.name} ${data.type.id}`,
                created_at: data.created_at.split(' ')[0],
                event_date: new Date(data.event_date).toISOString().slice(0, 10),
                event_end: data.event_end,
                event_start: data.event_start,
                guests_number: data.guests_number,
                guests_number_expected: data.guests_number_expected,
                id: data.id,
                updated_at: data.updated_at,
                notes: data.notes,
                menu_id: `${data.contract.menu.name}`,
                balance_due: data.contract.balance_due,
                cost_per_guest: data.contract.cost_per_guest,
                deposit: data.contract.deposit,
                // id: data.contract.id,
                payment_type: data.contract.payment_type,
                updated_at: data.contract.updated_at,
                serviceFee: data.contract.service_fee ? `${data.contract.service_fee} %` : '',
                status_id: `${data.status.id}`
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
                ...newDate,
                payment: total,
                payment_tes: data.contract.payment
            });

            setCustomerState({
                fullName: data.customer.full_name,
                email: data.customer.email,
                address: data.customer.address,
                phone_number: data.customer.phone_number,
                alt_phone_number: data.customer.alt_phone_number,
                dl_number: data.customer.dl_number,
                customer_id: data.customer.id,
                dl_expire_date: new Date(data.customer.dl_expire_date).toISOString().slice(0, 10),
                guests_number: data.guests_number,
            })
        }
    }, [data]);


    return state && <Main className="pb-4">
        <div className="pb-4">
            <GridMain>
                <div className={isMobile > 600 ? "pr-4 pt-3" : "pl-0 pr-0 pt-3"}>
                    <SectionsBlock>
                        <Container fluid>
                            <Row>
                                <Col className="pl-2" xs={12}>
                                    <SectionsTitle className="mb-4 pl-2">Event</SectionsTitle>
                                </Col>
                            </Row>

                            <Row>{[
                                {
                                    title: 'Event Name', name: "name"
                                },
                                {
                                    title: 'Event Date', name: "event_date"
                                },
                                {
                                    title: 'Event Time', name: "event_start"
                                },
                            ].map((el, ind) => {
                                return <Col xs={4} className="mb-4" key={ind}>
                                    <InputTitle>{el.title}</InputTitle>
                                    <div style={{ borderColor: '1px solid red' }}>
                                        <BlockInputs
                                            value={state[el.name]}
                                            disabled={true}
                                        />
                                    </div>
                                </Col>
                            })
                            }</Row>


                            <Row>{
                                [{
                                    title: 'Event Type', name: "type_id"
                                },
                                {
                                    title: 'Phone', name: ""
                                },
                                ].map((el, ind) => {
                                    return <Col xs={6} className="mb-4" key={ind}>
                                        <InputTitle>{el.title}</InputTitle>
                                        <div style={{ borderColor: '1px solid red' }}>
                                            <BlockInputs
                                                value={state[el.name]?.split(" ")[0]}
                                                disabled={true}
                                            />
                                        </div>
                                    </Col>
                                })
                            }</Row>
                            {/* <Row>{
                                [
                                    {
                                        title: 'Email', name: ""
                                    }
                                ].map((el, ind) => {
                                    return <Col xs={6} className="mb-4" key={ind}>
                                        <InputTitle>{el.title}</InputTitle>
                                        <div style={{ borderColor: '1px solid red' }}>
                                            <BlockInputs
                                                value={state[el.name]}
                                                disabled={true}
                                            />
                                        </div>
                                    </Col>
                                })
                            }</Row> */}
                            <Row>{
                                [
                                    {
                                        title: 'Email', name: ""
                                    },
                                    {
                                        title: 'Fax', name: ""
                                    },
                                    {
                                        title: 'Create Date', name: "created_at"
                                    },
                                    {
                                        title: 'Minimum of # Guests', name: "guests_number"
                                    },
                                    {
                                        title: 'Number of Guests Expected', name: "guests_number_expected"
                                    }
                                ].map((el, ind) => {
                                    return <Col xs={6} className="mb-4" key={ind}>
                                        <InputTitle>{el.title}</InputTitle>
                                        <div style={{ borderColor: '1px solid red' }}>
                                            <BlockInputs
                                                value={state[el.name]}
                                                disabled={true}
                                            />
                                        </div>
                                    </Col>
                                })
                            }</Row>
                        </Container>
                    </SectionsBlock>

                    <SectionsBlock>
                        <Container fluid>
                            <Row>
                                <Col className="pl-2">
                                    <SectionsTitle className="mb-4 pl-2">Customer Info</SectionsTitle>
                                </Col>
                            </Row>
                            <Row>{
                                [{
                                    title: 'Full Name', name: "fullName"
                                },
                                {
                                    title: 'Home Address', name: "address"
                                }
                                ].map((el, ind) => {
                                    return <Col xs={12} className="mb-4" key={ind}>
                                        <InputTitle>{el.title}</InputTitle>
                                        <div style={{ borderColor: '1px solid red' }}>
                                            <BlockInputs
                                                value={customerState[el.name]}
                                                disabled={true}
                                            />
                                        </div>
                                    </Col>
                                })
                            }</Row>




                            <Row>{
                                [
                                    {
                                        title: 'Home Phone', name: "phone_number"
                                    },
                                    {
                                        title: 'Alternate Phone', name: "alt_phone_number"
                                    },
                                    {
                                        title: 'Email', name: "email"
                                    }].map((el, ind) => {
                                        return <Col xs={4} className="mb-4" key={ind}>
                                            <InputTitle>{el.title}</InputTitle>
                                            <div style={{ borderColor: '1px solid red' }}>
                                                <BlockInputs
                                                    value={customerState[el.name]}
                                                    disabled={true}
                                                />
                                            </div>
                                        </Col>
                                    })
                            }</Row>





                            <Row>{
                                [
                                    {
                                        title: 'DL number', name: "dl_number"
                                    },
                                    {
                                        title: 'DL expiration data', name: "dl_expire_date"
                                    }
                                ].map((el, ind) => {
                                    return <Col xs={6} className="mb-4" key={ind}>
                                        <InputTitle>{el.title}</InputTitle>
                                        <div style={{ borderColor: '1px solid red' }}>
                                            <BlockInputs
                                                value={customerState[el.name]}
                                                disabled={true}
                                            />
                                        </div>
                                    </Col>
                                })
                            }</Row>
                        </Container>
                    </SectionsBlock>

                    <SectionsBlock>
                        <Container fluid>
                            <Row>
                                <Col className="pl-2">
                                    <SectionsTitle className="mb-4 pl-2">Contract</SectionsTitle>
                                </Col>
                            </Row>



                            <Row>
                                <Col xs={6} className="mb-4">
                                    <InputTitle>Menu</InputTitle>
                                    <div style={{ borderColor: '1px solid red' }}>
                                        <BlockInputs
                                            value={state['menu_id']}
                                            disabled={true}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} className="mb-4">
                                    <InputTitle>Cost per guest</InputTitle>
                                    <div style={{ borderColor: '1px solid red' }}>
                                        <InputWithDollar>
                                            <BlockInputs
                                                value={state['cost_per_guest']}
                                                disabled={true}
                                            />
                                            <DollarIconBlock><BiDollar size={18} color='#5E6278' /></DollarIconBlock>
                                        </InputWithDollar>
                                    </div>
                                </Col>
                                <Col xs={6} className="mb-4">
                                    <InputTitle>Service fee</InputTitle>
                                    <div style={{ borderColor: '1px solid red' }}>
                                        <BlockInputs
                                            value={state['serviceFee']}
                                            disabled={true}
                                        />
                                    </div>
                                </Col>
                            </Row>


                            <Row className="mb-4">
                                <Col xs={12}>
                                    <AccordDown onClickAS={() => { setAccordIsOpen(!accordIsOpen) }}
                                        title={<h5 className="text-gray-700 fw-bolder cursor-pointer mb-0">
                                            <SpanIcon className="mr-3"> {accordIsOpen ? <BsFillDashSquareFill size={18} /> : <BsFillPlusSquareFill
                                                size={18} />} </SpanIcon>
                                            Other Services</h5>}>

                                        <Row>
                                            {[{
                                                title: 'Gratitude', name: "gratitude"
                                            },
                                            {
                                                title: 'Lighting', name: "lightning"
                                            },
                                            {
                                                title: 'Security', name: "security"
                                            },
                                            {
                                                title: 'Cocktail hour', name: "cocktail_hour"
                                            },
                                            {
                                                title: 'Ceremony', name: "ceremony"
                                            },
                                            {
                                                title: 'Tax', name: "tax"
                                            }].map((el, ind) => {
                                                return <Col xs={6} className="mb-4" key={ind}>
                                                    <InputTitle>{el.title}</InputTitle>
                                                    <div style={{ borderColor: '1px solid red' }}>
                                                        <InputWithDollar>
                                                            <BlockInputs
                                                                value={state[el.name]}
                                                                disabled={true}
                                                            />
                                                            <DollarIconBlock><BiDollar size={18} color='#5E6278' /></DollarIconBlock>
                                                        </InputWithDollar>
                                                    </div>
                                                </Col>
                                            })}

                                            <Col xs={12} className="mb-4">
                                                <InputTitle>Other</InputTitle>
                                                <div style={{ borderColor: '1px solid red' }}>
                                                    <InputWithDollar>
                                                        <BlockInputs
                                                            value={state.other}
                                                            disabled={true}
                                                        />
                                                        <DollarIconBlock><BiDollar size={18} color='#5E6278' /></DollarIconBlock>
                                                    </InputWithDollar>
                                                </div>
                                            </Col>
                                        </Row>
                                    </AccordDown>
                                    <hr style={{ height: '0px' }} />
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col xs={12}>
                                    {/* <AccordDown onClickAS={() => { setPaymentsAccordIsOpen(!paymentsAccordIsOpen) }}
                                        title={<h5 className="text-gray-700 fw-bolder cursor-pointer mb-0">
                                            <SpanIcon className="mr-3"> {paymentsAccordIsOpen ? <BsFillDashSquareFill size={18} /> : <BsFillPlusSquareFill
                                                size={18} />} </SpanIcon>
                                            Payments</h5>}> */}
                                    <Col xs={12}
                                    // style={{ boxShadow: '0 0 5px grey', padding: '5px', borderRadius: '5px' }}
                                    >
                                        <TableRow gridCount={'25% 25% 25% 25%'} className='pl-4' background='rgba(245, 248, 250, 0.5)'>
                                            {['Payment type', 'Type', 'Date', 'Amount', ''].map(
                                                tit => <TableCol color='#469CF0' key={tit}>{tit}</TableCol>)}
                                        </TableRow>
                                        {/* <hr style={{ margin: '0px' }} /> */}
                                        {data?.payments.map(el => {
                                            return <TableRow gridCount='25% 25% 25% 25%' key={Math.random()} className='pl-4'>
                                                <TableCol>{el.payment_name}</TableCol>
                                                <TableCol>{el.payment_type}</TableCol>
                                                <TableCol>{new Date(el.payment_date).toISOString().split('T')[0]}</TableCol>
                                                <TableCol >{'$ ' + el.amount}</TableCol>
                                            </TableRow>
                                        })}
                                    </Col>

                                    {/* </AccordDown> */}
                                    <hr style={{ height: '0px' }} />
                                </Col>
                            </Row>

                            {/* <Row>
                                <Col xs={6} className="mb-4">
                                    <InputTitle>Deposit</InputTitle>
                                    <div style={{ borderColor: '1px solid red' }}>
                                        <BlockInputs
                                            value={state.deposit}
                                            disabled={true}
                                        />
                                    </div>
                                </Col>

                                <Col xs={6} className="mb-4">
                                    <InputTitle> Payment </InputTitle>

                                    <BlockInputs
                                        disabled={true}
                                        value={state.payment_tes}
                                    />
                                </Col>
                            </Row> */}


                        </Container>
                    </SectionsBlock>
                </div>



                <div className="pt-3 text-left">
                    <FixedBlock>
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <div className="text-right m-2"
                                        style={{
                                            color: 'white',
                                            fontFamily: 'Poppins',
                                            fontWeight: '500',
                                            fontSize: '12px',

                                        }}
                                    >
                                        {/* <a
                                            rel='noopener noreferrer'
                                            target='_blank'
                                            href={`http://188.225.57.14/api/api/customer-events/agreement-download/${state.id}`}
                                            style={{ textDecoration: 'none', padding: '5px 10px', borderRadius: '5px', fontWeight: 600, background: '#009EF7', cursor: 'pointer' }}>
                                            Export <span style={{ color: '#f8dfe7' }}><BsFileEarmarkPdfFill size={15} /></span>
                                        </a> */}
                                        <span
                                            style={{ padding: '5px 10px', borderRadius: '5px', fontWeight: 600, background: '#009EF7', cursor: 'pointer' }}>
                                            <a style={{ textDecoration: 'none', color: 'white' }} href={`http://188.225.57.14/api/api/customer-events/agreement-download/${state.id}`} target='_blank' rel='noopener noreferrer'>Export</a>
                                            <span style={{ color: '#f8dfe7' }}><BsFileEarmarkPdfFill size={15} /></span>
                                        </span>
                                    </div></Col>

                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <RadioGro
                                        title="Status"
                                        name="status_id"
                                        value={state.status_id}
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
                            </Row>

                            <Row className="mb-2 mt-4">
                                <Col xs={6}> <div className="text-left"
                                    style={{
                                        marginTop: '5px',
                                        color: '#51545D',
                                        fontFamily: 'Poppins',
                                        fontWeight: '500',
                                        fontSize: '1.15rem'
                                    }}
                                >Deposit </div></Col>
                                <Col xs={6}>
                                    <div className="text-right"
                                        style={{
                                            marginTop: '5px',
                                            color: '#51545D',
                                            fontFamily: 'Poppins',
                                            fontWeight: '500',
                                            fontSize: '1.15rem'
                                        }}
                                    >$ {parseInt(data?.payments[0]?.amount)}</div>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col xs={6}> <div className="text-left"
                                    style={{
                                        marginTop: '5px',
                                        color: '#51545D',
                                        fontFamily: 'Poppins',
                                        fontWeight: '500',
                                        fontSize: '1.15rem'
                                    }}
                                >Payment </div></Col>
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
                            </Row>

                            <Row className="mb-2">
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
                                    >$ {data?.payments?.length && parseInt(state.payment - (Number(data.payments[0].amount) + Number(totalPayment())))}
                                        {/* {parseInt(state.payment - (Number(state.deposit) + Number(state.payment_tes)))} */}
                                    </div>
                                </Col>
                            </Row>


                            <Row className="mb-4">
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
                            </Row>



                            <Row>
                                <Col xs={isMobile > 900 ? 12 : 6} className={isMobile > 600 ? "text-left mt-4" : "text-center mt-4"}>
                                    <NavLink
                                        exact
                                        to={`/eventsedit/${match.params.id}`}><UpdateButton>Edit</UpdateButton>
                                    </NavLink>

                                </Col>
                            </Row>
                        </Container>
                    </FixedBlock>
                </div>
            </GridMain>
        </div >
    </Main >
};


const mapStateToProps = (state) => {
    return {
        data: state.EditEventReducer.data,
        isMobile: state.AppReducer.screenSize
    };
};

const mapDispatchToProps = {
    getEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
// import React, { useState, useEffect } from 'react';
// import { BsFillPlusSquareFill, BsFillDashSquareFill } from "react-icons/bs";
// import { connect, useDispatch } from 'react-redux';
// import { BiEditAlt } from "react-icons/bi";
// import { NavLink } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';
// import AccordDown from '../../components/Smart/AccordDown/AccordDown';
// import { SpanIcon } from '../../components/CreateEvents/styles';
// import { GridMain, FixedBlock } from '../EventsEdit/styles';
// import RadioGro from '../../components/Smart/Radio/Radio';
// import { TableCol, TextWithBack } from '../../components/Table/styles';
// import BlockInputs from '../../components/Smart/InputBlock/InputBlock';
// import { UpdateButton } from '../EventsEdit/styles';
// import { SectionsBlock, SectionsTitle } from '../EventsEdit/styles';
// import { Main, InputTitle } from '../../styles/globalStyles';
// import { getEvent } from '../Events/actions';


// function EventsView({ isMobile, data, getEvent, match }) {

//     const [state, setState] = useState(null);
//     const [customerState, setCustomerState] = useState(null);
//     const [accordIsOpen, setAccordIsOpen] = useState(false);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         getEvent(match.params.id);
//         return () => {
//             dispatch({
//                 type: 'GET_EVENT',
//                 payload: null
//             })
//         }
//     }, []);

//     useEffect(() => {
//         if (data) {

//             // let newState = {
//             //     name: data.name,
//             //     type_id: `${data.type.name} ${data.type.id}`,
//             //     created_at: data.created_at,
//             //     event_date: new Date(data.event_date).toISOString().slice(0, 10),
//             //     event_end: data.event_end,
//             //     event_start: data.event_start,
//             //     guests_number: data.guests_number,
//             //     id: data.id,
//             //     updated_at: data.updated_at,
//             //     notes: data.notes,
//             //     menu_id: `${data.contract.menu.name}&&&&&${data.contract.menu.id}`,
//             //     customer_id: data.customer.id,
//             //     cost_per_guest: data.contract.cost_per_guest,
//             //     deposit: data.contract.deposit,
//             //     payment: data.contract.payment,
//             //     balance_due: data.contract.balance_due,
//             //     payment_type: data.contract.payment_type,
//             //     status_id: `${data.status.id}`
//             // }

//             let total = Number(data.guests_number) * Number(data.contract.cost_per_guest);


//             let newDate = {
//                 name: data.name,
//                 type_id: `${data.type.name} ${data.type.id}`,
//                 created_at: data.created_at,
//                 event_date: new Date(data.event_date).toISOString().slice(0, 10),
//                 event_end: data.event_end,
//                 event_start: data.event_start,
//                 guests_number: data.guests_number,
//                 id: data.id,
//                 updated_at: data.updated_at,
//                 notes: data.notes,
//                 menu_id: `${data.contract.menu.name}`,
//                 balance_due: data.contract.balance_due,
//                 cost_per_guest: data.contract.cost_per_guest,
//                 created_at: data.contract.created_at,
//                 deposit: data.contract.deposit,
//                 id: data.contract.id,
//                 payment_type: data.contract.payment_type,
//                 updated_at: data.contract.updated_at,
//                 serviceFee: data.contract.service_fee ? `${data.contract.service_fee} %` : '',
//                 status_id: `${data.status.id}`
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
//                 ...newDate,
//                 payment: total,
//                 payment_tes: data.contract.payment
//             });

//             setCustomerState({
//                 fullName: data.customer.full_name,
//                 email: data.customer.email,
//                 address: data.customer.address,
//                 phone_number: data.customer.phone_number,
//                 alt_phone_number: data.customer.alt_phone_number,
//                 dl_number: data.customer.dl_number,
//                 customer_id: data.customer.id,
//                 dl_expire_date: new Date(data.customer.dl_expire_date).toISOString().slice(0, 10),
//                 guests_number: data.guests_number,
//             })
//         }
//     }, [data]);



//     return state && <Main className="pb-4">
//         <div className="pb-4">
//             <GridMain>
//                 <div className={isMobile > 600 ? "pr-4 pt-3" : "pl-0 pr-0 pt-3"}>
//                     <SectionsBlock>
//                         <Container fluid>
//                             <Row>
//                                 <Col className="pl-2" xs={12}>
//                                     <SectionsTitle className="mb-4 pl-2">Event</SectionsTitle>
//                                 </Col>
//                             </Row>

//                             <Row>{[
//                                 {
//                                     title: 'Event Name', name: "name"
//                                 },
//                                 {
//                                     title: 'Event type', name: "type_id"
//                                 }
//                                 ].map((el, ind) => {
//                                     return <Col xs={12} className="mb-4">
//                                         <InputTitle>{el.title}</InputTitle>
//                                         <div style={{ borderColor: '1px solid red' }}>
//                                             <BlockInputs
//                                                 value={state[el.name]}
//                                                 disabled={true}
//                                             />
//                                         </div>
//                                     </Col>
//                                 })
//                             }</Row>


//                             <Row>{
//                                 [{
//                                     title: 'Date', name: "event_date"
//                                 },
//                                 {
//                                     title: 'Start time', name: "event_start"
//                                 },
//                                 {
//                                     title: 'End time', name: "event_end"
//                                 }
//                                 ].map((el, ind) => {
//                                     return <Col xs={4} className="mb-4">
//                                         <InputTitle>{el.title}</InputTitle>
//                                         <div style={{ borderColor: '1px solid red' }}>
//                                             <BlockInputs
//                                                 value={state[el.name]}
//                                                 disabled={true}
//                                             />
//                                         </div>
//                                     </Col>
//                                 })
//                             }</Row>




//                             <Row>{
//                                 [{
//                                     title: 'Number of guest expected', name: "guests_number"
//                                 },
//                                 {
//                                     title: 'Description', name: "notes"
//                                 }
//                                 ].map((el, ind) => {
//                                     return <Col xs={12} className="mb-4">
//                                         <InputTitle>{el.title}</InputTitle>
//                                         <div style={{ borderColor: '1px solid red' }}>
//                                             <BlockInputs
//                                                 value={state[el.name]}
//                                                 disabled={true}
//                                             />
//                                         </div>
//                                     </Col>
//                                 })
//                             }</Row>
//                         </Container>
//                     </SectionsBlock>

//                     <SectionsBlock>
//                         <Container fluid>
//                             <Row>
//                                 <Col className="pl-2">
//                                     <SectionsTitle className="mb-4 pl-2">Customer Info</SectionsTitle>
//                                 </Col>
//                             </Row>




//                             <Row>{
//                                 [{
//                                     title: 'First name', name: "firstName"
//                                 },
//                                 {
//                                     title: 'Last name', name: "lastName"
//                                 }
//                                 ].map((el, ind) => {
//                                     return <Col xs={6} className="mb-4">
//                                         <InputTitle>{el.title}</InputTitle>
//                                         <div style={{ borderColor: '1px solid red' }}>
//                                             <BlockInputs
//                                                 value={customerState[el.name]}
//                                                 disabled={true}
//                                             />
//                                         </div>
//                                     </Col>
//                                 })
//                             }</Row>




//                             <Row>{
//                                 [{
//                                     title: 'Home Address', name: "address"
//                                 },
//                                 {
//                                     title: 'Email address', name: "email"
//                                 }].map((el, ind) => {
//                                     return <Col xs={12} className="mb-4">
//                                         <InputTitle>{el.title}</InputTitle>
//                                         <div style={{ borderColor: '1px solid red' }}>
//                                             <BlockInputs
//                                                 value={customerState[el.name]}
//                                                 disabled={true}
//                                             />
//                                         </div>
//                                     </Col>
//                                 })
//                             }</Row>





//                             <Row>{
//                                 [{
//                                     title: 'Phone number', name: "phone_number"
//                                 },
//                                 {
//                                     title: 'Alt phone', name: "alt_phone_number"
//                                 },
//                                 {
//                                     title: 'DL expiration data', name: "dl_expire_date"
//                                 },
//                                 {
//                                     title: 'DL number', name: "dl_number"
//                                 }].map((el, ind) => {
//                                     return <Col xs={6} className="mb-4">
//                                         <InputTitle>{el.title}</InputTitle>
//                                         <div style={{ borderColor: '1px solid red' }}>
//                                             <BlockInputs
//                                                 value={customerState[el.name]}
//                                                 disabled={true}
//                                             />
//                                         </div>
//                                     </Col>
//                                 })
//                             }</Row>
//                         </Container>
//                     </SectionsBlock>

//                     <SectionsBlock>
//                         <Container fluid>
//                             <Row>
//                                 <Col className="pl-2">
//                                     <SectionsTitle className="mb-4 pl-2">Contract</SectionsTitle>
//                                 </Col>
//                             </Row>



//                             <Row>{
//                                 [{
//                                     title: 'Menu', name: "menu_id"
//                                 },
//                                 {
//                                     title: 'Cost per guest', name: "cost_per_guest"
//                                 },
//                                 {
//                                     title: 'Payment type', name: "payment_type"
//                                 },
//                                 {
//                                     title: 'Service fee', name: "serviceFee"
//                                 },
//                                 ].map((el, ind) => {
//                                     return <Col xs={6} className="mb-4">
//                                         <InputTitle>{el.title}</InputTitle>
//                                         <div style={{ borderColor: '1px solid red' }}>
//                                             <BlockInputs
//                                                 value={state[el.name]}
//                                                 disabled={true}
//                                             />
//                                         </div>
//                                     </Col>
//                                 })
//                             }</Row>


//                             <Row className="mb-4">
//                                 <Col xs={12}>
//                                     <AccordDown onClickAS={() => { setAccordIsOpen(!accordIsOpen) }}
//                                         title={<h5 className="text-gray-700 fw-bolder cursor-pointer mb-0">
//                                             <SpanIcon className="mr-3"> {accordIsOpen ? <BsFillDashSquareFill size={18} /> : <BsFillPlusSquareFill
//                                                 size={18} />} </SpanIcon>
//                                             Other Services</h5>}>

//                                         <Row>
//                                             {[{
//                                                 title: 'Gratitude', name: "gratitude"
//                                             },
//                                             {
//                                                 title: 'Lighting', name: "lightning"
//                                             },
//                                             {
//                                                 title: 'Security', name: "security"
//                                             },
//                                             {
//                                                 title: 'Cocktail hour', name: "cocktail_hour"
//                                             },
//                                             {
//                                                 title: 'Ceremony', name: "ceremony"
//                                             },
//                                             {
//                                                 title: 'Tax', name: "tax"
//                                             }].map((el, ind) => {
//                                                 return <Col xs={6} className="mb-4">
//                                                     <InputTitle>{el.title}</InputTitle>
//                                                     <div style={{ borderColor: '1px solid red' }}>
//                                                         <BlockInputs
//                                                             value={state[el.name]}
//                                                             disabled={true}
//                                                         />
//                                                     </div>
//                                                 </Col>
//                                             })}

//                                             <Col xs={12} className="mb-4">
//                                                 <InputTitle>Other</InputTitle>
//                                                 <div style={{ borderColor: '1px solid red' }}>
//                                                     <BlockInputs
//                                                         value={state.other}
//                                                         disabled={true}
//                                                     />
//                                                 </div>
//                                             </Col>
//                                         </Row>
//                                     </AccordDown>
//                                     <hr style={{ height: '0px' }} />
//                                 </Col>
//                             </Row>

//                             <Row>
//                                 <Col xs={6} className="mb-4">
//                                     <InputTitle>Deposit</InputTitle>
//                                     <div style={{ borderColor: '1px solid red' }}>
//                                         <BlockInputs
//                                             value={state.deposit}
//                                             disabled={true}
//                                         />
//                                     </div>
//                                 </Col>

//                                 <Col xs={6} className="mb-4">
//                                     <InputTitle> Payment </InputTitle>

//                                     <BlockInputs
//                                         disabled={true}
//                                         value={state.payment_tes}
//                                     />
//                                 </Col>
//                             </Row>


//                         </Container>
//                     </SectionsBlock>
//                 </div>



//                 <div className="pt-3 text-left">
//                     <FixedBlock>
//                         <Container>
//                             <Row>
//                                 <Col xs={12}>
//                                     <RadioGro
//                                         title="Status"
//                                         name="status_id"
//                                         value={state.status_id}
//                                         values={[{
//                                             value: '1',
//                                             label: <TableCol color='#A1A5BE'>
//                                                 <TextWithBack color='#50CD89'
//                                                     backColor='#E8FFF3'
//                                                 >booked</TextWithBack>
//                                             </TableCol>
//                                         }, {
//                                             value: '2', label:
//                                                 <TableCol color='#A1A5BE'>
//                                                     <TextWithBack color='#FFC700'
//                                                         backColor='#FFF8DD'
//                                                     >pending</TextWithBack>
//                                                 </TableCol>
//                                         },
//                                         {
//                                             value: '3', label: <TableCol color='#A1A5BE'>
//                                                 <TextWithBack color='#5f67cf'
//                                                     backColor='#d9e8fc'
//                                                 >completed</TextWithBack>
//                                             </TableCol>
//                                         },
//                                         {
//                                             value: '4', label: <TableCol color='#A1A5BE'>
//                                                 <TextWithBack color='#F1416C'
//                                                     backColor='#f8dfe7'
//                                                 >canceled</TextWithBack>
//                                             </TableCol>
//                                         }
//                                         ]}
//                                     />
//                                 </Col>
//                             </Row>

//                             <Row className="mb-2 mt-4">
//                                 <Col xs={6}> <div className="text-left"
//                                     style={{
//                                         marginTop: '5px',
//                                         color: '#51545D',
//                                         fontFamily: 'Poppins',
//                                         fontWeight: '500',
//                                         fontSize: '1.15rem'
//                                     }}
//                                 >Deposit </div></Col>
//                                 <Col xs={6}>
//                                     <div className="text-right"
//                                         style={{
//                                             marginTop: '5px',
//                                             color: '#51545D',
//                                             fontFamily: 'Poppins',
//                                             fontWeight: '500',
//                                             fontSize: '1.15rem'
//                                         }}
//                                     >$ {parseInt(state.deposit)}</div>
//                                 </Col>
//                             </Row>

//                             <Row className="mb-2">
//                                 <Col xs={6}> <div className="text-left"
//                                     style={{
//                                         marginTop: '5px',
//                                         color: '#51545D',
//                                         fontFamily: 'Poppins',
//                                         fontWeight: '500',
//                                         fontSize: '1.15rem'
//                                     }}
//                                 >Payment </div></Col>
//                                 <Col xs={6}>
//                                     <div className="text-right"
//                                         style={{
//                                             marginTop: '5px',
//                                             color: '#51545D',
//                                             fontFamily: 'Poppins',
//                                             fontWeight: '500',
//                                             fontSize: '1.15rem'
//                                         }}
//                                     >$ {parseInt(state.payment_tes ? state.payment_tes : 0)}</div>
//                                 </Col>
//                             </Row>

//                             <Row className="mb-2">
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
//                                     {/* {parseInt(state.payment - state.deposit)} */}
//                                     {parseInt(state.payment - (Number(state.deposit) + Number(state.payment_tes)))}
//                                     </div>
//                                 </Col>
//                             </Row>


//                             <Row className="mb-4">
//                                 <Col xs={6}> <div className="text-left"
//                                     style={{
//                                         marginTop: '5px',
//                                         color: '#51545D',
//                                         fontFamily: 'Poppins',
//                                         fontWeight: '500',
//                                         fontSize: '1.15rem'
//                                     }}
//                                 >Grand total </div></Col>
//                                 <Col xs={6}>
//                                     <div className="text-right"
//                                         style={{
//                                             marginTop: '5px',
//                                             color: '#51545D',
//                                             fontFamily: 'Poppins',
//                                             fontWeight: '500',
//                                             fontSize: '1.15rem'
//                                         }}
//                                     >$ {state["payment"] ? parseInt(state["payment"]) : '0'} </div>
//                                 </Col>
//                             </Row>



//                             <Row>
//                                 <Col xs={isMobile > 900 ? 12 : 6} className={isMobile > 600 ? "text-left mt-4" : "text-center mt-4"}>
//                                     <NavLink
//                                         exact
//                                         to={`/eventsedit/${match.params.id}`}><UpdateButton>Edit</UpdateButton>
//                                     </NavLink>

//                                 </Col>
//                             </Row>
//                         </Container>
//                     </FixedBlock>
//                 </div>
//             </GridMain>
//         </div>
//     </Main >
// };


// const mapStateToProps = (state) => {
//     return {
//         data: state.EditEventReducer.data,
//         isMobile: state.AppReducer.screenSize
//     };
// };

// const mapDispatchToProps = {
//     getEvent
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
