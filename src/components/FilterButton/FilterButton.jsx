import React, { useState, memo, useCallback } from 'react';
import { AiFillFilter } from 'react-icons/ai';
import { Container, Row, Col } from 'react-bootstrap';
import FormControl from '@material-ui/core/FormControl';
import Popover from '@material-ui/core/Popover';
import SelectComponent from '../Smart/SelectComponent/SelectComponent';
import { TitlesFont, InputTitle } from '../../styles/globalStyles';
import { FilterBut, FilterBody, ResetBut, ApplyBut } from './styles';
import { selectorsValues } from '../../dummy/Events';

function FilterButton({ title, state, handleChange, onReset, onApply }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const paintSelects = useCallback(() => {
        return selectorsValues.map((select) => {
            return <FormControl fullWidth className="mt-2 mb-3" size="small" >
                <InputTitle>{select.title}</InputTitle>
                <SelectComponent
                    value={state[select.name]}
                    options={select.bodyValues}
                    setValues={handleChange}
                    name={select.name}
                />
            </FormControl>
        })
    }, [state]);

    return (
        <div>
            <FilterBut onClick={handleClick}> <AiFillFilter size={20} /> {title} </FilterBut>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <FilterBody>
                    <Container>
                        <Row className="mb-2" style={{ borderBottom: 'solid 1px #bfbfbf' }}>
                            <Col xs={12} className="p-3">
                                <TitlesFont>Filter Options</TitlesFont>
                            </Col>
                        </Row>


                        <Row>
                            <Col xs={12}>

                                <FormControl fullWidth className="mt-2 mb-3" size="small" >
                                    <InputTitle>Months</InputTitle>
                                    <SelectComponent
                                        value={state.month ? state.month.split(' ')[0] : state.month}
                                        options={[{ title: 'None', value: '' },
                                            { title: 'January', value: 'january 1' }, { title: 'February', value: 'february 2' }, { title: 'March', value: 'March 3' },
                                            { title: 'April', value: 'April 4' }, { title: 'May', value: 'may 5' }, { title: 'June', value: 'June 6' },
                                            { title: 'July', value: 'July 7' }, { title: 'August', value: 'August 8' },
                                            { title: 'September', value: 'september 9' },
                                            { title: 'October', value: 'october 10' }, { title: 'November', value: 'november 11' },
                                            { title: 'December', value: 'december 12' }
                                        ]}
                                        setValues={handleChange}
                                        name="month"
                                    />
                                </FormControl>



                                <FormControl fullWidth className="mt-2 mb-3" size="small" >
                                    <InputTitle>Status</InputTitle>
                                    <SelectComponent
                                        value={state.status ? state.status.split(' ')[0] : state.status}
                                        options={[{ title: 'None', value: '' },
                                            { title: 'Booked', value: 'booked 1' }, { title: 'Pending', value: 'pending 2' },
                                            { title: 'Completed', value: 'completed 3' }, { title: 'Canceled', value: 'canceled 4' }
                                        ]}
                                        setValues={handleChange}
                                        name="status"
                                    />
                                </FormControl>



                                <FormControl fullWidth className="mt-2 mb-3" size="small" >
                                    <InputTitle>Event type</InputTitle>
                                    <SelectComponent
                                        value={state.event_type ? state.event_type.split(' ')[0] : state.event_type}
                                        options={[{ title: 'None', value: '' },
                                        { title: 'Wedding', value: 'wedding 1' }, { title: 'Birthday', value: 'birthday 2' },
                                        { title: 'Baptism', value: 'baptism 3' }
                                        ]}
                                        setValues={handleChange}
                                        name="event_type"
                                    />
                                </FormControl>

                            </Col>
                        </Row>


                        <Row className="mt-4">
                            <Col xs={6}>
                                <ResetBut onClick={() => { onReset(); handleClose() }}>Reset</ResetBut>
                            </Col>
                            <Col xs={6}>
                                <ApplyBut onClick={() => { onApply(); handleClose() }}>Apply</ApplyBut>
                            </Col>
                        </Row>
                    </Container>
                </FilterBody>
            </Popover>
        </div>
    );
};

export default memo(FilterButton);
