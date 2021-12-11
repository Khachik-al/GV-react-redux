import { Calendar } from 'react-big-calendar'
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { formats, eventStyleGetter, events, localizer } from './helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { RedFont, InputTitle } from '../../styles/globalStyles';
import BlockInputs from '../../components/Smart/InputBlock/InputBlock';
import {
    CalendarBlock, ShowEventModal, ShowEventTitle, ShowEventTitleBlock, GreenPoint, RedPoint,
    TrashIconBlock, EditIconBlock, TextWithBack
} from './styles';
import { ReactComponent as CalendarIcon } from './icons/19632188291548141930.svg';
import { ReactComponent as EditIcon } from './icons/icons8-edit.svg';
import { ReactComponent as TrashIcon } from './icons/icons8-trash.svg';
import { format } from 'date-fns';
import { getData, createEvent, deleteEvent } from '../Events/actions';
import { getMenu } from '../Settings/actions';
import { useEffect } from 'react';

function CalendarComponent({ getData, getMenu, createEvent, deleteEvent, data, count, screenSize }) {
    let isMobile = screenSize < 800
    const [newEvent, setNewEvent] = useState({ title: '', description: '' })
    const [allEvents, setAllEvents] = useState(events)
    const [createOrEditModalShow, setCreateOrEditModalShow] = useState(false)
    const [eventModalShow, setEventModalShow] = useState(false)
    const [requireInput, setRequireInput] = useState(false)

    // useEffect(() => {
    //     console.log(document.getElementsByClassName('rbc-event-content')[0]);
    //     document.getElementsByClassName('rbc-event-content')[0].insertAdjacentHTML("afterend", "<p> hello world </p>")
    // }, [])

    useEffect(() => {
        getData(10, 1, '');
        getMenu();
    }, []);

    const handleAddEvent = (e) => {
        setCreateOrEditModalShow(false)
        setAllEvents([...allEvents, {
            ...newEvent,
            start: e.start,
            end: e.end,
            allDay: !(e.start.getMinutes() + e.end.getMinutes() + e.end.getHours() + e.start.getHours())
        }])
        setNewEvent({ title: '', description: '' })
    }
    return (
        <CalendarBlock isMobile={isMobile}>
            <div>
                {!!createOrEditModalShow &&
                    <Modal
                        show={true}
                        onHide={() => setCreateOrEditModalShow(false)}
                        centered size='lg'>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a New Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ width: '100%', padding: isMobile ? '10px' : '40px' }}>
                                <InputTitle>Event Name<RedFont>*</RedFont></InputTitle>
                                <div className="mb-5" style={{ borderColor: '1px solid red', position: 'relative' }}>
                                    <BlockInputs
                                        onChange={(e) => {
                                            if (requireInput) { setRequireInput(false) }
                                            setNewEvent({ ...newEvent, title: e.target.value })
                                        }}
                                        name={''}
                                        placeholder=""
                                        value={newEvent.title}
                                        require={requireInput}
                                    />
                                </div>
                                <InputTitle>Event Description</InputTitle>
                                <div style={{ borderColor: '1px solid red', position: 'relative' }}>
                                    <BlockInputs
                                        onChange={(e) => { setNewEvent({ ...newEvent, description: e.target.value }) }}
                                        name={''}
                                        placeholder=""
                                        value={newEvent.description}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center mb-3 pt-4' >
                            <Button variant="secondary" onClick={() => setCreateOrEditModalShow(false)}>Cancel</Button>
                            <Button variant="primary" className='ml-2' onClick={() => {
                                if (!newEvent.title) { setRequireInput(true); return }
                                handleAddEvent(createOrEditModalShow)
                            }}>Submit</Button>
                        </Modal.Footer>
                    </Modal>}

                {!!eventModalShow &&
                    <Modal
                        show={true}
                        onHide={() => setEventModalShow(false)}
                        centered
                    >
                        <Modal.Body >
                            <ShowEventModal isMobile={isMobile}>
                                <ShowEventTitleBlock >
                                    <div style={{ marginRight: '15px' }}>
                                        <CalendarIcon />
                                    </div>
                                    <ShowEventTitle>
                                        {eventModalShow.title} {eventModalShow.allDay &&
                                            <TextWithBack backColor='#E8FFF3' color='#50CD89'>All Day</TextWithBack>}
                                        <h6 className='mt-1'>{eventModalShow.description}lorem ipsum lorem ipsum</h6>
                                    </ShowEventTitle>
                                </ShowEventTitleBlock>
                                <div style={{ position: 'absolute', right: '20px', top: '15px' }}>
                                    <EditIconBlock
                                        onClick={() => {
                                            setNewEvent(eventModalShow)
                                            setCreateOrEditModalShow(eventModalShow)
                                            setEventModalShow(false)
                                        }}
                                    >
                                        <EditIcon />
                                    </EditIconBlock>

                                    <TrashIconBlock>
                                        <TrashIcon />
                                    </TrashIconBlock>
                                    <FontAwesomeIcon icon={faTimes} size='lg' color='#808080'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setEventModalShow(false)}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px', fontSize: '15px' }}>
                                    <GreenPoint></GreenPoint><span style={{ fontWeight: '600' }}>Starts
                                    </span>  <span style={{ fontSize: '13.5px' }}>
                                        {format(eventModalShow.start, 'do MMM, y - h:mm aaa')} </span>
                                </div>
                                <div style={{ fontSize: '15px' }}>
                                    <RedPoint></RedPoint><span style={{ fontWeight: '600' }}>Ends
                                    </span>  <span style={{ fontSize: '13.5px' }}>
                                        {format(eventModalShow.end, 'do MMM, y - h:mm aaa')} </span>
                                </div>



                            </ShowEventModal>

                        </Modal.Body>
                    </Modal>}
            </div>

            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor='start'
                endAccessor='end'
                onSelectSlot={(e) => {
                    if (newEvent.title) { setNewEvent({ title: '', description: '' }) }
                    setCreateOrEditModalShow(e)
                }}
                onSelectEvent={(e) => setEventModalShow(e)}
                eventPropGetter={eventStyleGetter}
                formats={formats}
                messages={{
                    "previous": <FontAwesomeIcon icon={faChevronLeft} size='1x' />,
                    "next": <FontAwesomeIcon icon={faChevronRight} size='1x' />,
                    'today': "Today"
                }}
                selectable
                // tooltipAccessor={false}
                // onDrillDown={(e) => console.log('onDrillDown', e)}
                // onView={(e) => setView(e)}
                views={{
                    month: true,
                    week: true,
                    day: true,
                }}
            />
        </CalendarBlock>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.EventsReducer.data,
        count: state.EventsReducer.count,
        screenSize: state.AppReducer.screenSize
    };
};

const mapDispatchToProps = {
    getData,
    getMenu,
    createEvent,
    deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);
// metronic