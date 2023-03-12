import React, { useState, useEffect } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ExcelParser from '../excel/parser/ExcelParcer';


import './FileChooser.css';

export default function FileChooser({ onUploadDone }) {

    const saveFileUrl = 'http://localhost:8080/save';
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isAnimatedProgress, setIsAnimatedProgress] = useState(true);

    /* const groupInfoCells = {
            pricePerHour: "A1", 
            groupId: "A3",
            groupLevel: "E3",
            teacherOne: "R1",
            teacherTwo: "R3",
            classDurationOne: "Y1",
            classDurationTwo: "Y3",
            classStartTime: "AF2"
        }; */

    function changeHandler(event) {
        if (event.target.files[0] !== undefined) {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
            ExcelParser(event.target.files[0]);

            let formData = new FormData();
            formData.append('fileToUpload', event.target.files[0]);

            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';

            xhr.upload.onprogress = function (event) {
                console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
                setProgress(event.loaded / event.total * 100);
            };

            xhr.upload.onload = function () {
                console.log(`Upload finished successfully.`);
                setIsAnimatedProgress(false);
            };

            xhr.upload.onerror = function () {
                console.error(`Error during the upload: ${xhr.status}`);
            };

            xhr.onload = () => {
                let responseObj = xhr.response;
                console.log(responseObj);
                onUploadDone(responseObj);
            };

            xhr.open('POST', saveFileUrl);
            xhr.send(formData);

            /* fetch(saveFileUrl, {
                method: 'POST',
                body: formData
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.error(err)); */

        }
    };


    return (
        <div id="file-choose-container">
            <InputGroup className="mb-3">
                <Form.Control
                    id='file-choose-input'
                    type='file'
                    accept='.xlsx, .xlsm'
                    onChange={changeHandler}
                />
                <Form.Label id='file-choose-label'
                    htmlFor='file-choose-input'>Выберите Excel файл</Form.Label>
            </InputGroup>
            <div id='file-info'>
                {isFilePicked ? (
                    <div>
                        <p>Выбранный файл: {selectedFile.name}</p>
                    </div>
                ) : <></>}
            </div>
            <ProgressBar variant="info" animated={isAnimatedProgress} now={progress} label={`${progress}%`} />
        </div>
    );
}