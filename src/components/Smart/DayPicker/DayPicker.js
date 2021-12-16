import React from 'react';
import { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { DayPickerBlock } from './style';

export default function DayPicker() {
    const [state, setState] = useState(new Date())
    function handleDayChange(day) {
        setState(day);
    }
    console.log(state);


    return (
        <DayPickerBlock>
            <DayPickerInput placeholder='' onDayChange={handleDayChange} selectedDay={state} />
        </DayPickerBlock>
    );
}