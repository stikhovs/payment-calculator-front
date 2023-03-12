import React from "react";
import AirDatepickerReact from '../date-picker/air-datepicker-react';

import './MonthChoose.css';


export default function MonthChoose({onMonthChosen}) {
    return(
        <div className="col-12" id="month-choose-container">
            <AirDatepickerReact
                name='choose-month'
                position='right center'
                view='months'
                minView='months'
                dateFormat='MMMM yyyy'
                onSelect={(month => onMonthChosen(month))} />
        </div>
    )
}