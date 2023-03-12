import {DayOfWeek} from "./DayOfWeek";
import Student from "./Student";

export default class GroupInfo {
    groupName: string;
    pricePerHour: number;
    groupId: string;
    groupLevel: string;
    teacherOne: string;
    teacherTwo: string;
    classDurationOne: number;
    classDurationTwo: number;
    classStartTime: string;
    classDaysOne: DayOfWeek[];
    classDaysTwo: DayOfWeek[];
    students: Student[];
}