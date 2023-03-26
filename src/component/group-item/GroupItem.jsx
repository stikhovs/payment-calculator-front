import React from 'react';
import Table from 'react-bootstrap/Table';

import "./GroupItem.css";


export default function GroupItem({ group }) {
    return (
        <>
            <h4>Группа {group.groupName}</h4>
            <Table striped bordered hover>
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
                    {group.students?.map((student, studentIndex) =>
                        <tr key={studentIndex}>
                            <td>{studentIndex + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.discount !== 0 ? (student.discount * 100).toFixed(0) + "%" : ""}</td>
                            <td>{student.hoursToPay.toFixed(2) > 0.0 ? student.hoursToPay.toFixed(2) : ""}</td>
                            <td>{student.hoursToPay.toFixed(2) > 0.0 ? student.moneyToPay.toFixed(2) + " руб" : "не должен"}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}