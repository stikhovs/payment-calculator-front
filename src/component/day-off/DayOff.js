import React from "react";
import AirDatepickerReact from '../date-picker/air-datepicker-react';

import './DayOff.css';


export default function DayOff({chosenDate, onDaysOffChosen}) {

    return (
        <div id="day-off-container">
            <p className="day-off-title">Выберите выходные дни</p>
             <AirDatepickerReact
                name='days-off'
                inline={true}
                multipleDates={true}
                onSelect={({ formattedDate }) => onDaysOffChosen(formattedDate)} 
                startDate={chosenDate}
                />
        </div>
    );

}