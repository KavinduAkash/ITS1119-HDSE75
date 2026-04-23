import {student_db} from '../db/db.js';

class Student {
    #id;
    #name;
    #nic;
    #phone;
    #address;

    constructor(id, name, nic, phone, address) {
        this.#id = id;
        this.#name = name;
        this.#nic = nic;
        this.#phone = phone;
        this.#address = address;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get nic() {
        return this.#nic;
    }

    get phone() {
        return this.#phone;
    }

    get address() {
        return this.#address;
    }

    set id(id) {
        this.#id = id;
    }

    set name(name) {
        this.#name = name;
    }

    set nic(nic) {
        this.#nic = nic;
    }

    set phone(phone) {
        this.#phone = phone;
    }

    set address(address) {
        this.#address = address;
    }
}

// --------------------------- Add Student ---------------------------
 const addStudentData = (sid, sname, snic, sphone, saddress) => {
     let new_student = new Student(sid, sname, snic, sphone, saddress);
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