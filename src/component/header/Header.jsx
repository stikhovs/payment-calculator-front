import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import InstructionModal from '../instruction-modal/InstructionModal';

import './Header.css';


export default function Header({
    isCalcBtnDisabled, isExcelBtnDisabled, isPrintBtnDisabled,
    doCalculation, downloadExcel, printResult, isCalculationInProgess, isExcelCreationInProgress
}) {

    const [showInstructions, setShowInstructions] = useState(false);
    const handleShow = () => setShowInstructions(true);
    const closeInstructionModal = () => setShowInstructions(false);

    return (
        <header className="sticky-sm-top shadow">
            <div className='d-flex flex-column flex-sm-row'>
                <div className='col-12 col-sm-3 title-container p-2 d-flex align-items-center'>
                    <h1>Помощник расчета квитанций</h1>
                </div>
                <div className='col buttons-container p-2 d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <Button id='btn-do-calculation'
                            onClick={doCalculation}
                            disabled={isCalcBtnDisabled}>
                            {isCalculationInProgess ? <><span>Идет обработка...</span><Spinner className='in-progress-spinner' animation="border" variant="light" size="sm" /></>
                                : <span>Обработать группы</span>}
                        </Button>
                        <Button id='btn-to-excel'
                            onClick={downloadExcel}
                            disabled={isExcelBtnDisabled}>
                            {isExcelCreationInProgress ? <>Формирование отчета...<Spinner className='in-progress-spinner' animation="border" variant="light" size="sm" /></>
                                : <span>Преобразовать в Excel</span>
                            }
                        </Button>
                        <Button id='btn-do-print' variant='outline-secondary'
                            onClick={printResult}
                            disabled={isPrintBtnDisabled}>
                            Распечатать
                        </Button>
                    </div>
                    <div className='instructions-container d-flex align-items-center'>
                        <Button id='instructions-btn' onClick={handleShow}>
                            <FontAwesomeIcon className="instructions-btn-icon" icon={faCircleQuestion} />
                        </Button>
                    </div>
                </div>
            </div>

            <InstructionModal 
                showInstructions={showInstructions}
                onHide={closeInstructionModal}
            />

        </header>
    );
}