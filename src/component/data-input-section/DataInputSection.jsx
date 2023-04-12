import React from 'react';
import FileChooser from '../file-chooser/FileChooser';
import DayChange from '../day-change/DayChange';
import MonthChoose from '../month-choose/MonthChoose';
import DayOff from '../day-off/DayOff';

import './DataInputSection.css';


export default function DataInputSection({ onGroupsParsed, onFileChoose, onMonthChosen, chosenDate, daysOff, onDaysOffChosen, daysChange, onDaysChangeChosen }) {
    return (
        <div id='data-input-section' className='col-2 d-flex flex-column align-items-start'>
            <FileChooser
                onGroupsParsed={(res) => onGroupsParsed(res)}
                onFileChoose={onFileChoose}
            />
            <MonthChoose
                onMonthChosen={(res) => onMonthChosen(res)}
            />
            <DayOff
                chosenDate={chosenDate}
                daysOff={daysOff}
                onDaysOffChosen={(res) => onDaysOffChosen(res)}
            />
            <DayChange
                chosenDate={chosenDate}
                daysChange={daysChange}
                onDaysChangeChosen={(res) => onDaysChangeChosen(res)}
            />
        </div>
    );
}