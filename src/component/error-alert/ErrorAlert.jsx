import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';

import './ErrorAlert.css';

export default function ErrorAlert({errorMessage, showError, onClose}) {

    if (showError) {
        return (
            <Alert id="error-alert" variant="danger" onClose={onClose} dismissible>
                <p className="m-0">{errorMessage}</p>
            </Alert>
        );
    }
    return '';

}