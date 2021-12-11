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
    // dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    //     localizer.format(start, { date: 'MM' }, culture) + ' — ' +
    //     localizer.format(end, { date: 'MM' }, culture),
    dayHeaderFormat: 'MMMM d,yyyy'
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
export const events = [
    {
        title: 'AAAAA',
        start: new Date(2021, 11, 0),
        end: new Date(2021, 11, 0)
    },
    {
        title: 'AAAAA',
        start: new Date(2021, 11, 0),
        end: new Date(2021, 11, 0)
    },
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