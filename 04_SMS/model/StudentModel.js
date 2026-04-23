import {student_db} from '../db/db.js';

// --------------------------- Add Student ---------------------------
 const addStudentData = (sid, sname, snic, sphone, saddress) => {
     let new_student = {
         id: sid,
         name: sname,
         nic: snic,
         phone: sphone,
         address: saddress
     };
     student_db.push(new_student);
 }

 // --------------------------- Update Student ---------------------------
const updateStudentData = (sid, sname, snic, sphone, saddress) => {
    let obj = student_db.find(item => item.id == sid);

    if(obj) {
        obj.name=sname;
        obj.nic=snic;
        obj.phone=sphone;
        obj.address=saddress
    }
}

 // --------------------------- Delete Student ---------------------------
const deleteStudentData = (sid) => {
    let index = student_db.findIndex(item => item.id == sid); // -1

    if(index!==-1) {
        student_db.splice(index, 1);
    }
}

 // --------------------------- Get Student ---------------------------
 const getStudentData = () => {
    return student_db;
 }

// --------------------------- Get Student by Index ---------------------------
const getStudentDataByIndex = (index) => {
    return student_db[index];
}

// --------------------------- Get Student by Id ---------------------------
const getStudentDataById = (id) => {
    return student_db.find(item => item.id==id);
}

 export {addStudentData, updateStudentData, deleteStudentData, getStudentData, getStudentDataByIndex, getStudentDataById};