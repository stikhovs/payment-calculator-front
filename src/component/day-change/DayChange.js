import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AirDatepickerReact from '../date-picker/air-datepicker-react';

import "./DayChange.css";


export default function DayChange({daysChange, onDaysChangeChosen, onDayRemove}) {

    /* const [daysChange, setDaysChange] = useState([]); */
    const [dayFromTo, setDayFromTo] = useState([]);
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);

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
        if ((dayFromTo.length == 2)) {
            setIsSaveDisabled(false);
        } else {
            setIsSaveDisabled(true);
        }
    }, [dayFromTo]);

    return (
        <div id='day-change-container' className='col-12'>
            <label htmlFor="addDayChangeBtn">Перенос дней</label>
            <div>
                <Button variant="outline-info" id="addDayChangeBtn" onClick={handleShow}>Добавить</Button>
            </div>
            <div id="daysChangeContainer">
                {daysChange.map((dc, index) =>
                    <div key={index} className='day-change-item'>
                        <p>Перенос с {dc.from} на {dc.to}</p>
                        <Button variant='danger' onClick={() => onDayRemove(index)}>Remove</Button>
                    </div>
                )}
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Перенос дней</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-12'>
                            <AirDatepickerReact name='days-from' inline={true} multipleDates={2} onSelect={handleDayChange}/></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled = { isSaveDisabled }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}