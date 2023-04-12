import React, { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { parseFile } from '../excel/parser/ExcelParser';
import Spinner from 'react-bootstrap/Spinner';


import './FileChooser.css';

export default function FileChooser({ onFileChoose, onGroupsParsed }) {

    const [isParsing, setIsParsing] = useState(false);

    function changeHandler(event) {
        if (event.target.files[0] !== undefined) {
            setIsParsing(true);
            onFileChoose(event.target.files[0].name);

            parseFile(event.target.files[0])
                .then(value => onGroupsParsed(value))
                .then(() => setIsParsing(false));
        }
    };


    return (
        <div id="file-choose-container">
            <InputGroup>
                <Form.Control
                    id='file-choose-input'
                    type='file'
                    accept='.xlsx, .xlsm'
                    onChange={changeHandler}
                />
                <Form.Label id='file-choose-label'
                    htmlFor='file-choose-input'>
                    {
                        isParsing ? <><span>Загрузка файла...</span><Spinner className='in-progress-spinner' animation="border" variant="light" size="sm" /></>
                        : 'Выберите Excel файл'
                    }
                </Form.Label>
            </InputGroup>
        </div>
    );
}