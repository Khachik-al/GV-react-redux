import React, { useState, useEffect } from 'react';
import { BsFillPlusSquareFill, BsFillDashSquareFill } from "react-icons/bs";
import { connect, useDispatch } from 'react-redux';
import { BiEditAlt } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AccordDown from '../../components/Smart/AccordDown/AccordDown';
import { SpanIcon } from '../../components/CreateEvents/styles';
import { GridMain, FixedBlock } from '../EventsEdit/styles';
import RadioGro from '../../components/Smart/Radio/Radio';
import { TableCol, TextWithBack } from '../../components/Table/styles';
import BlockInputs from '../../components/Smart/InputBlock/InputBlock';
import { UpdateButton } from '../EventsEdit/styles';
import { SectionsBlock, SectionsTitle } from '../EventsEdit/styles';
import { Main, InputTitle } from '../../styles/globalStyles';
import { getEvent } from '../Events/actions';


function EventsView({ isMobile, data, getEvent, match }) {

    const [state, setState] = useState(null);
    const [customerState, setCustomerState] = useState(null);
    const [accordIsOpen, setAccordIsOpen] = useState(false);
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

    useEffect(() => {
        if (data) {

            // let newState = {
            //     name: data.name,
            //     type_id: `${data.type.name} ${data.type.id}`,
            //     created_at: data.created_at,
            //     event_date: new Date(data.event_date).toISOString().slice(0, 10),
            //     event_end: data.event_end,
            //     event_start: data.event_start,
            //     guests_number: data.guests_number,
            //     id: data.id,
            //     updated_at: data.updated_at,
            //     notes: data.notes,
            //     menu_id: `${data.contract.menu.name}&&&&&${data.contract.menu.id}`,
            //     customer_id: data.customer.id,
            //     cost_per_guest: data.contract.cost_per_guest,
            //     deposit: data.contract.deposit,
            //     payment: data.contract.payment,
            //     balance_due: data.contract.balance_due,
            //     payment_type: data.contract.payment_type,
            //     status_id: `${data.status.id}`
            // }

            let total = Number(data.guests_number) * Number(data.contract.cost_per_guest);

            console.log(data);

            let newDate = {
                name: data.name,
                type_id: `${data.type.name} ${data.type.id}`,
                created_at: data.created_at,
                event_date: new Date(data.event_date).toISOString().slice(0, 10),
                event_end: data.event_end,
                event_start: data.event_start,
                guests_number: data.guests_number,
                id: data.id,
                updated_at: data.updated_at,
                notes: data.notes,
                menu_id: `${data.contract.menu.name}&&&&&${data.contract.menu.id}`,
                balance_due: data.contract.balance_due,
                cost_per_guest: data.contract.cost_per_guest,
                created_at: data.contract.created_at,
                deposit: data.contract.deposit,
                id: data.contract.id,
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
                firstName: data.customer.full_name.split(" ")[0],
                lastName: data.customer.full_name.split(" ")[1],
                email: data.customer.email,
                address: data.customer.address,
                phone_number: data.customer.phone_number,
                alt_phone_number: data.customer.alt_phone_number,
                dl_number: data.customer.dl_number,
                customer_id: data.customer.id,
                dl_expire_date: new Date(data.customer.dl_expire_date).toISOString().slice(0, 10),
            })
        }
    }, [data]);


    console.log(state);

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

                            <Row>{
                                [{
                                    title: 'Event Name', name: "name"
                                },
                                {
                                    title: 'Event type', name: "type_id"
                                }
                                ].map((el, ind) => {
                                    return <Col xs={12} className="mb-4">
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
                                    title: 'Date', name: "event_date"
                                },
                                {
                                    title: 'Start time', name: "event_start"
                                },
                                {
                                    title: 'End time', name: "event_end"
                                }
                                ].map((el, ind) => {
                                    return <Col xs={4} className="mb-4">
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
                                    title: 'Number of guest expected', name: "guests_number"
                                },
                                {
                                    title: 'Description', name: "notes"
                                }
                                ].map((el, ind) => {
                                    return <Col xs={12} className="mb-4">
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
                                    title: 'First name', name: "firstName"
                                },
                                {
                                    title: 'Last name', name: "lastName"
                                }
                                ].map((el, ind) => {
                                    return <Col xs={6} className="mb-4">
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
                                [{
                                    title: 'Home Address', name: "address"
                                },
                                {
                                    title: 'Email address', name: "email"
                                }].map((el, ind) => {
                                    return <Col xs={12} className="mb-4">
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
                                [{
                                    title: 'Phone number', name: "phone_number"
                                },
                                {
                                    title: 'Alt phone', name: "alt_phone_number"
                                },
                                {
                                    title: 'DL expiration data', name: "dl_expire_date"
                                },
                                {
                                    title: 'DL number', name: "dl_number"
                                }].map((el, ind) => {
                                    return <Col xs={6} className="mb-4">
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



                            <Row>{
                                [{
                                    title: 'Menu', name: "menu_id"
                                },
                                {
                                    title: 'Cost per guest', name: "cost_per_guest"
                                },
                                {
                                    title: 'Payment type', name: "payment_type"
                                },
                                {
                                    title: 'Service fee', name: "serviceFee"
                                },
                                ].map((el, ind) => {
                                    return <Col xs={6} className="mb-4">
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
                                                return <Col xs={6} className="mb-4">
                                                    <InputTitle>{el.title}</InputTitle>
                                                    <div style={{ borderColor: '1px solid red' }}>
                                                        <BlockInputs
                                                            value={state[el.name]}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </Col>
                                            })}

                                            <Col xs={12} className="mb-4">
                                                <InputTitle>Other</InputTitle>
                                                <div style={{ borderColor: '1px solid red' }}>
                                                    <BlockInputs
                                                        value={state.other}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </AccordDown>
                                    <hr style={{ height: '0px' }} />
                                </Col>
                            </Row>

                            <Row>
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
                            </Row>


                        </Container>
                    </SectionsBlock>
                </div>



                <div className="pt-3 text-left">
                    <FixedBlock>
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <RadioGro
                                        title="Status"
                                        name="status_id"
                                        value={state.status_id}
                                        values={[{
                                            value: '1',
                                            label: <TableCol color='#A1A5BE'>
                                                <TextWithBack color='#FFC700'
                                                    backColor='#FFF8DD'
                                                >booked</TextWithBack>
                                            </TableCol>
                                        }, {
                                            value: '2', label:
                                                <TableCol color='#A1A5BE'>
                                                    <TextWithBack color='#50CD89'
                                                        backColor='#E8FFF3'
                                                    >pending</TextWithBack>
                                                </TableCol>
                                        },
                                        {
                                            value: '3', label: <TableCol color='#A1A5BE'>
                                                <TextWithBack color='#F1416C'
                                                    backColor='#FFF5F8'
                                                >completed</TextWithBack>
                                            </TableCol>
                                        },
                                        {
                                            value: '4', label: <TableCol color='#A1A5BE'>
                                                <TextWithBack color='#ff0040'
                                                    backColor='#fff5f899'
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
                                    >$ {parseInt(state.deposit)}</div>
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
                                    >$ {parseInt(state.payment_tes ? state.payment_tes : 0)}</div>
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
                                    >$ 
                                    {/* {parseInt(state.payment - state.deposit)} */}
                                    {parseInt(state.payment - (Number(state.deposit) + Number(state.payment_tes)))}
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
        </div>
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