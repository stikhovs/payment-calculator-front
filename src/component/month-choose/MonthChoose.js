import React from "react";
import AirDatepickerReact from '../date-picker/air-datepicker-react';

import './MonthChoose.css';


export default function MonthChoose({onMonthChosen}) {
    return(
        <div id="month-choose-container">
            <p className="choose-month-title">Выберите месяц</p>
            <AirDatepickerReact
                name='choose-month'
                inline={true}
                position='right center'
                view='months'
                minView='months'
                dateFormat='MMMM yyyy'
                onSelect={(month => onMonthChosen(month))} />
        </div>
    )
}