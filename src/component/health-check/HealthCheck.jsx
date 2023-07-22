import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './HealthCheck.css';


export default function HealhCheck({ isServerReady, isError }) {

    const READY_TEXT = 'Сервер готов к работе';
    const NOT_READY_TEXT = 'Сервер просыпается. Подождите.';
    const ERROR_TEXT = 'Сервер не готов к работе';

    const Dot = ({ className, tooltipTitle }) => (
        <OverlayTrigger overlay={<Tooltip>{tooltipTitle}</Tooltip>} placement='left'>
            <div className={className}></div>
        </OverlayTrigger>
    );

    if (isError) {
        return (
            <div id='health-check'>
                <Dot className={'dot error'} tooltipTitle={ERROR_TEXT} />
            </div>

        );
    } else {
        return (
            <div id='health-check' >
                <Dot
                    className={isServerReady ? 'dot server-ready' : 'dot server-not-ready'}
                    tooltipTitle={isServerReady ? READY_TEXT : NOT_READY_TEXT}
                />
            </div>

        );
    }

}