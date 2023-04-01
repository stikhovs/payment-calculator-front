import React from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import './CalculationParametersList.css';


export default function CalculationParametersList({ chosenFileName, chosenMonth, chosenDaysOff, chosenDaysChange, onChangeDayRemove }) {
    return (
        <div id="calculation-parameters-list-container">
            <p className="calculation-parameters-list-title">Исходные параметры</p>
            <div className="chosen-params">
                {
                    chosenFileName !== '' ?
                        <p className="chosen-file">Выбранный отчет: {chosenFileName}</p>
                        : ''
                }

                {
                    chosenMonth !== undefined ?
                        <p className="chosen-month">Выбранный месяц: {chosenMonth}</p>
                        : ''
                }

                {
                    chosenDaysOff.length > 0 ?
                        <>
                            <p className="chosen-days-off">Выходные дни:</p>
                            <ul className="chosen-days-off-list">
                                {chosenDaysOff.map((date, index) => <li key={index}>{date}</li>)}
                            </ul>
                        </>
                        : ''
                }

                {
                    chosenDaysChange.length > 0 ?
                        <>
                            <p className="chosen-days-change">Перенос дней:</p>
                            <ul className="chosen-days-change-list">
                                {chosenDaysChange.map((dayChange, index) =>
                                    <li key={index}>
                                        <div className="d-flex justify-content-between align-items-center" >
                                            <span>с {dayChange.from} на {dayChange.to}</span>
                                            <Button
                                                variant='outline-danger'
                                                className="remove-day-change-btn border-0"
                                                onClick={() => onChangeDayRemove(index)}
                                            >
                                                <FontAwesomeIcon className="remove-day-change-btn-icon" icon={faTrashCan} />
                                            </Button>
                                        </div>
                                    </li>

                                )}
                            </ul>
                        </>
                        : ''
                }
            </div>
        </div>
    );
}