import React, { useState } from "react";
import AirDatepickerReact from '../date-picker/air-datepicker-react';

import './DayOff.css';


export default function DayOff({daysOff, onDaysOffChosen}) {

    /* const [daysOff, setDaysOff] = useState([]);

    const handleDaysOff = ({ formattedDate }) => {
        console.log(formattedDate);
        setDaysOff(formattedDate);
    } */


    return (
        <div id="day-off-container" className="col-12">
             <AirDatepickerReact
                name='days-off'
                inline={true}
                multipleDates={true}
                onSelect={({ formattedDate }) => onDaysOffChosen(formattedDate)} />
            <div id='days-off-list'>
                <ul>
                    {daysOff.map((date, index) => <li key={index}>{date}</li>)}
                </ul>
            </div>
        </div>
    );

}