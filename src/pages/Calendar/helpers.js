import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { dateFnsLocalizer } from 'react-big-calendar'


let locales = {
    'en-US': require('date-fns/locale/en-US')
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export let formats = {
    dateFormat: 'd',
    weekdayFormat: 'eee',
    dayFormat: 'eee MM/d',
    timeGutterFormat: 'haaa',
    dayHeaderFormat: 'MMMM d,yyyy',
    eventTimeRangeFormat: () => null
}

export function eventStyleGetter(event, start, end, isSelected) {
    var backgroundColor = !event.allDay ? '#e0e2e4' : '#029BF3';
    var color = !event.allDay ? '#7E8299' : '#fff';
    var style = {
        backgroundColor: backgroundColor,
        color: color,
        borderRadius: '5px',
        display: 'block'
    };
    return {
        style: style
    };
}
export default function CustomEvent(props) {
    console.log(props);
    return (
        <div>
            {props.title}
        </div>
    );
}
export const events = [
    {
        title: 'AAAAA',
        start: new Date(2021, 11, 0),
        end: new Date(2021, 11, 0)
    },
    {
        title: 'Vacation',
        allDay: true,
        start: new Date(2021, 10, 7),
        end: new Date(2021, 10, 10)
    },
    {
        title: 'Conference',
        allDay: true,
        start: new Date(2021, 10, 20),
        end: new Date(2021, 10, 23),
    },
]