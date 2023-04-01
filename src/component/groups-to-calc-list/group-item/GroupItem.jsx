import React from "react";

import './GroupItem.css';


export default function GroupItem({title, schedule, studentsCount, isActive, onClick}) {
    return(
        <li className={`list-group-item ${isActive ? "active" : ""}`} onClick={onClick}>
            <div className="d-flex justify-content-between w-100">
                <p className="group-title">{title}</p>
                <p className="group-schedule">{schedule}</p>
            </div>
            <div className="w-100">
                <p className="students-count">Студентов: {studentsCount}</p>
            </div>
        </li>
    );
}