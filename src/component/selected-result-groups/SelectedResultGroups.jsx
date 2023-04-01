import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

import './SelectedResultGroups.css';


export default function SelectedResultGroups({ schedule, groups }) {
    return (
        <div id="result-group-details-section" className='col'>
            <h2>{schedule}</h2>
            <Accordion defaultActiveKey={0} alwaysOpen>
                {
                    groups.map((group, index) =>
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header>{group.groupName + (group.groupId !== '' ? " (" + group.groupId + ")" : '')}</Accordion.Header>
                            <Accordion.Body>
                                <p className="result-group-detail result-group-price">Цена за 1 а/ч: {group.pricePerHour} руб.</p>
                                <p className="result-group-detail result-group-schedule">Расписание: {group.classDaysOne
                                    .concat(group.classDaysTwo)
                                    .map(weekday => weekToStr(weekday))
                                    .join(" ")}</p>
                                <p className="result-group-detail result-group-duration">
                                    Длительность: {group.classDurationOne.toFixed(2)} а/ч
                                    {group.classDurationTwo !== undefined && group.classDurationTwo !== 0 && group.classDurationTwo.toFixed(2) !== group.classDurationOne.toFixed(2) ?
                                        `, ${group.classDurationTwo.toFixed(2)} а/ч`
                                        : ''
                                    }
                                </p>
                                <p className="result-group-detail result-group-teachers">
                                    {[group.teacherOne, group.teacherTwo].filter(teacher => teacher !== undefined).join(", ")}
                                    {group.groupLevel !== undefined ? `, ${group.groupLevel}` : ''}
                                </p>
                                <p className="result-group-detail next-month-hours">
                                    Часов в следующем месяце: {group.nextMonthHours.toFixed(2)} а/ч
                                </p>

                                <Table bordered hover className="result-group-students">
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Студент</th>
                                            <th>Скидка</th>
                                            <th>Часов к оплате</th>
                                            <th>Оплата в рублях</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            group.students.map((student, index) =>
                                                <tr key={index} className={`result-student-info ${student.hasDebt ? 'debt' : ''}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{student.name} {student.indGraphic ? <strong>(инд график)</strong> : ''}</td>
                                                    <td>{student.discount !== 0 ? (student.discount * 100).toFixed(0) + "%" : ""}</td>
                                                    <td>{student.hoursToPay.toFixed(2) > 0.0 ? student.hoursToPay.toFixed(2) : ""}</td>
                                                    <td>{student.hoursToPay.toFixed(2) > 0.0 ? student.moneyToPay.toFixed(2) + " руб" : "не должен"}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                }
            </Accordion>
        </div>
    );
}

function weekToStr(weekday) {
    switch (weekday) {
        case "MONDAY":
            return "пн";
        case "TUESDAY":
            return "вт";
        case "WEDNESDAY":
            return "ср";
        case "THURSDAY":
            return "чт";
        case "FRIDAY":
            return "птн";
        case "SATURDAY":
            return "сб";
        case "SUNDAY":
            return "вскр";
        default:
            return "";
    }
}