import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AirDatepickerReact from '../date-picker/air-datepicker-react';

import "./DayChange.css";


export default function DayChange({ chosenDate, daysChange, onDaysChangeChosen }) {

    const [dayFromTo, setDayFromTo] = useState([]);
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);
    const [datesToBeDisabled, setDatesToBeDisabled] = useState([]);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleSave = () => {
        onDaysChangeChosen(dayFromTo);
        handleClose();
    }

    const handleClose = () => {
        setDayFromTo([]);
        setShow(false);
    }

    const handleDayChange = ({ formattedDate }) => {
        console.log(formattedDate);
        setDayFromTo(formattedDate);
    };

    useEffect(() => {
        if ((dayFromTo.length === 2)) {
            setIsSaveDisabled(false);
        } else {
            setIsSaveDisabled(true);
        }
    }, [dayFromTo]);

    useEffect(() => {
        if (daysChange.length > 0) {
            daysChange.forEach((fromToPair) => {
                setDatesToBeDisabled([...datesToBeDisabled, fromToPair.from, fromToPair.to]);
            })
        }
        if (daysChange.length === 0) {
            setDatesToBeDisabled([]);
        }
    }, [daysChange]);

    return (
        <div id='day-change-container'>
            <Button variant="outline-info" id="add-day-change-btn" onClick={handleShow}>Добавить перенос дней</Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center w-100'>Перенос дней</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-12 col-sm-6'>
                            <AirDatepickerReact
                                name='days-from'
                                startDate={chosenDate}
                                inline={true}
                                multipleDates={2}
                                onSelect={handleDayChange}
                                onRenderCell={(date, cellType) => {
                                    if (datesToBeDisabled.length > 0) {
                                        if (datesToBeDisabled.includes(formatDate(date.date))) {
                                            return {
                                                disabled: true
                                            };
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className='col-12 col-sm mt-2 mt-sm-0 ms-sm-3'>
                            {
                                dayFromTo[0] !== undefined ? <span>Перенести с <strong>{dayFromTo[0]}</strong> </span> : ''
                            }
                            {
                                dayFromTo[1] !== undefined ? <span>на <strong>{dayFromTo[1]}</strong></span> : ''
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={isSaveDisabled}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function formatDate(date) {

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}