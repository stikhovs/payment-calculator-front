import React, { useState, useEffect } from 'react';
import XLSX from "xlsx";
import { groupInfoCells, weekDaysOne, weekDaysTwo, studentNames, studentBalance, individualGraphic, singleDiscount, permanentDiscount } from "../cell/CellsProperties";
import GroupInfo from "../dto/GroupInfo.ts";
import { DayOfWeek } from "../dto/DayOfWeek.ts";
import Student from '../dto/Student.ts';

import './ExcelParser.css';


export default async function ExcelParser(file) {

    console.log("Reading file");
    console.log(file);
    /* get raw data */
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const wb = XLSX.read(data);
    /* do something with the workbook here */
    //const wb_sheet = wb.Sheets[wb.SheetNames[6]];
    //const wb_sheet = wb.Sheets[wb.SheetNames["13B"]];
    //console.log(XLSX.utils.sheet_to_json(wb_sheet));
    //console.log(XLSX.utils.sheet_to_html(wb_sheet));
    //console.log(wb_sheet);
    //console.log(Object.entries(wb_sheet));
    //const {B14 , B15} = wb_sheet;
    //console.log(B14 , B15);
    //console.log(wb);
    console.log(wb.Sheets);

    const groups = wb.SheetNames
        .map(name => [name, wb.Sheets[name]])
        .filter(([, sheet]) => filterValidSheet(sheet))
        .map(([sheetName, sheet]) => handleSheetMapping(sheetName, sheet))

    console.log("groups to process");
    console.log(groups);

    return groups;

}

function filterValidSheet(sheet) {
    const hasPricePerHour = sheet[groupInfoCells.pricePerHour] !== undefined;
    const hasGroupId = sheet[groupInfoCells.groupId] !== undefined;
    const hasGroupLevel = sheet[groupInfoCells.groupLevel] !== undefined;
    const hasTeacherOne = sheet[groupInfoCells.teacherOne] !== undefined;
    const hasTeacherTwo = sheet[groupInfoCells.teacherTwo] !== undefined;
    const hasClassDurationOne = sheet[groupInfoCells.classDurationOne] !== undefined;
    const hasClassDurationTwo = sheet[groupInfoCells.classDurationTwo] !== undefined;
    const hasClassStartTime = sheet[groupInfoCells.classStartTime] !== undefined;

    if (hasPricePerHour && hasGroupId && hasGroupLevel && hasClassStartTime &&
        (hasTeacherOne || hasTeacherTwo) &&
        (hasClassDurationOne || hasClassDurationTwo)) {
        return true;
    }
    return false;
}

function handleSheetMapping(name, sheet) {
    let groupInfo = new GroupInfo();
    groupInfo.groupName = name;
    groupInfo.pricePerHour = sheet[groupInfoCells.pricePerHour]?.v;
    groupInfo.groupId = sheet[groupInfoCells.groupId]?.v;
    groupInfo.groupLevel = sheet[groupInfoCells.groupLevel]?.v;
    groupInfo.teacherOne = sheet[groupInfoCells.teacherOne]?.v;
    groupInfo.teacherTwo = sheet[groupInfoCells.teacherTwo]?.v;
    groupInfo.classDurationOne = sheet[groupInfoCells.classDurationOne]?.v;
    groupInfo.classDurationTwo = sheet[groupInfoCells.classDurationTwo]?.v;
    groupInfo.classStartTime = sheet[groupInfoCells.classStartTime]?.w;


    const daysOneRange = XLSX.utils.decode_range(weekDaysOne.start + ":" + weekDaysOne.end);
    const daysOneCells = rangeToCellAddressList(daysOneRange);
    groupInfo.classDaysOne = handleDays(sheet, daysOneCells);

    const daysTwoRange = XLSX.utils.decode_range(weekDaysTwo.start + ":" + weekDaysTwo.end);
    const daysTwoCells = rangeToCellAddressList(daysTwoRange);
    groupInfo.classDaysTwo = handleDays(sheet, daysTwoCells);


    groupInfo.students = handleStudents(sheet);


    return groupInfo;
}

function handleDays(sheet, daysCells) {
    //console.log(daysCells);
    return daysCells
        .map((cellName, index) => [index, cellName])
        .filter(([, cellName]) => {
            return sheet[cellName]?.v === true;
        })
        .map(([index, cellName]) => {
            //console.log("Filtered " + cellName + "; index: " + index + "; Day: " + Object.keys(DayOfWeek)[index]);
            return Object.keys(DayOfWeek)[index];
        })
}

function handleStudents(sheet) {
    // name
    const studentNamesRange = XLSX.utils.decode_range(studentNames.start + ":" + studentNames.end);
    const studentNamesCells = rangeToCellAddressList(studentNamesRange);

    // balance
    const studentBalanceRange = XLSX.utils.decode_range(studentBalance.start + ":" + studentBalance.end);
    const studentBalanceCells = rangeToCellAddressList(studentBalanceRange);

    // individualGraphic
    const individualGraphicRange = XLSX.utils.decode_range(individualGraphic.start + ":" + individualGraphic.end);
    const individualGraphicCells = rangeToCellAddressList(individualGraphicRange);

    // singleDiscount
    const singleDiscountRange = XLSX.utils.decode_range(singleDiscount.start + ":" + singleDiscount.end);
    const singleDiscountCells = rangeToCellAddressList(singleDiscountRange);

    // permanentDiscount
    const permanentDiscountRange = XLSX.utils.decode_range(permanentDiscount.start + ":" + permanentDiscount.end);
    const permanentDiscountCells = rangeToCellAddressList(permanentDiscountRange);

    return studentNamesCells.map((studentNameCell, index) => {
        let student = new Student()
        student.name = sheet[studentNameCell]?.v;
        student.balance = sheet[studentBalanceCells[index]]?.v;
        student.indGraphic = sheet[individualGraphicCells[index]]?.v !== undefined;
        student.singleDiscount = sheet[singleDiscountCells[index]]?.v;
        student.permanentDiscount = sheet[permanentDiscountCells[index]]?.v;
        return student;
    })
        .filter(student => student.name !== undefined);
}

function rangeToCellAddressList(range) {
    const startColumn = range.s.c;
    const startRow = range.s.r;

    const endColumn = range.e.c;
    const endRow = range.e.r;

    let result = [];
    for (let col = startColumn; col <= endColumn; col++) {
        for (let row = startRow; row <= endRow; row++) {
            result.push(XLSX.utils.encode_cell({ r: row, c: col }));
        }
    }

    return result;
}