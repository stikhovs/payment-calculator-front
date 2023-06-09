import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';

import ChooseFile from './img/chooseFile.png';
import PreCalcInfo from './img/preCalcInfo.png';
import ChooseMonth from './img/chooseMonth.png';
import ChooseDaysOffAndDayChange from './img/chooseDaysOffAndDayChange.png';
import CalcParams from './img/calcParams.png';
import CalcButton from './img/calcButton.png';
import CalcResult from './img/calcResult.png';
import ExcelOrPrint from './img/excelOrPrint.png';

import './InstructionModal.css';


export default function InstructionModal({ showInstructions, onHide }) {

    return (
        <Modal show={showInstructions} onHide={onHide} centered id="instruction-modal">
            <Modal.Header closeButton>
                <Modal.Title className='text-center w-100'>Инструкция</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Как пользоваться Помощником</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup as="ol" numbered className='list-group-flush'>
                                <ListGroup.Item as="li">
                                    Выберите Excel файл с отчетом.
                                    <div className='img-container d-flex justify-content-center mt-2'>
                                        <Image src={ChooseFile} alt="choose-file" fluid />
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    Дождитесь, пока файл будет загружен и прочитан. После этого на экране отобразится информация по группам и студентам из данного отчета. На этом этапе можно предварительно увидеть, сколько групп будет обработано, а также дополнительно проверить данные по студентам.
                                    <div className='img-container d-flex justify-content-center mt-2'>
                                        <Image src={PreCalcInfo} alt="pre-calculation-info" fluid />
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    Выберите месяц, на который нужно рассчитать квитанции.
                                    <div className='img-container d-flex justify-content-center mt-2'>
                                        <Image src={ChooseMonth} alt="choose-month" fluid />
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    При необходимости можно выбрать праздничные или выходные дни в выбранном месяце. А также добавить перенос занятий на другие даты.
                                    <div className='img-container d-flex justify-content-center mt-2'>
                                        <Image src={ChooseDaysOffAndDayChange} alt="choose-days-off-and-days-change" fluid />
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    Выбранный файл, праздничные/выходные дни и переносы отображаются в секции "Исходные параметры".
                                    <div className='img-container d-flex justify-content-center mt-2'>
                                        <Image src={CalcParams} alt="calculation-params" fluid />
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    После выполнения подготовительных шагов нажмите кнопку "Обработать группы". Данная кнопка становится активной только после успешного прочтения Excel-отчета и выбора месяца.
                                    <div className='img-container d-flex justify-content-center mt-2'>
                                        <Image src={CalcButton} alt="push-calculation-button" fluid />
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">Дождитесь выполнения обработки. Это должно занять несколько секунд.</ListGroup.Item>
                                <ListGroup.Item as="li">
                                    Результат успешного завершения обработки будет выведен на экран: количество обработанных групп, список групп, сгруппированных по расписанию (пн ср птн, вт чт, сб, индвидуалы, другое), информация по оплате для каждого студента в выбранной группе.
                                    <div className='img-container d-flex justify-content-center mt-2'>
                                        <Image src={CalcResult} alt="see-calculation-result" fluid />
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">Далее доступно два варианта:
                                    <div className='img-container d-flex justify-content-center mt-1 mb-2'>
                                        <Image src={ExcelOrPrint} alt="excel-or-print" fluid />
                                    </div>
                                    <ul>
                                        <li>Полученный результат можно преобразовать в Excel, нажав на соответствующую кнопку. В этом случае будет возможность сохранить расчет квитанций в формате Excel на компьютер, отредактировать его при необходимости и затем распечатать.</li>
                                        <li>Если это не требуется, можно сразу отправить результат обработки на печать, нажав на кнопку "Распечатать". Откроется окно с предварительным просмотром печатного варианта страницы, откуда можно будет отправить документ непосредственно на печать. </li>
                                    </ul>
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='2'>
                        <Accordion.Header>Как происходит расчет</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup as="ol" numbered className='list-group-flush'>
                                <ListGroup.Item as="li">
                                    На основе полученных данных рассчитывается количество часов в выбранном месяце для каждой группы.
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    От часов в предстоящем месяце отнимается текущий баланс студента в часах.
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    Если результат этого вычитания превышает -0.03, студент должен оплатить именно это кол-во часов. Если меньше, чем -0.03, студент ничего не должен, т.к. это означает, что кол-во часов на его балансе превышает кол-во часов в предстоящем месяце.
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    Если часов к оплате больше нуля, эти часы умножаются на стоимость 1 а/ч с учетом имеющейся у студента скидки.
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='3'>
                        <Accordion.Header>Какие листы учитываются</Accordion.Header>
                        <Accordion.Body>
                            <p className='mb-0 ps-3'>Лист берется в расчет, если он соответствует следующим условиям:</p>
                            <ListGroup as="ol" numbered className='list-group-flush'>
                                <ListGroup.Item as="li">
                                    указана стоимость 1 а/ч (обязательно число) (ячейка A1)
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    указан идентификатор группы (ячейка A3)
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    указан уровень группы (ячейка E3)
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    указано время начала занятия (ячейка AF2)
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    указан один или два преподавателя (ячейки R1 или R3)
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    указана продолжительность занятия (ячейки Y1 или Y3)
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
        </Modal>
    );

}