import {student_db} from '../db/db.js';
import {check_nic, check_phone} from '../utils/regex_utils.js';

//------------------------- Load Student Tbl ------------------------------
const loadStudentTbl = () => {
    $('#student_tbody').empty();

    student_db.map((item, index) => {
        let new_row = `<tr data-index="${index}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.nic}</td> <td>${item.phone}</td> <td>${item.address}</td> </tr>`;
        $('#student_tbody').append(new_row);
    });
}

//------------------------- Clean Student Form ------------------------------
const cleanStudentForm = () => {
    $('#student_reset_btn').click();
}

//------------------------- Click on Student Row ------------------------------
$('#student_tbody').on('click', 'tr', function () {
    let student_obj = student_db[$(this).index()];

    $('#student_id_input').val(student_obj.id);
    $('#student_name_input').val(student_obj.name);
    $('#student_nic_input').val(student_obj.nic);
    $('#student_phone_input').val(student_obj.phone);
    $('#student_address_input').val(student_obj.address);
})

//------------------------- Start: Student Add ------------------------------
const addStudentData = (sid, sname, snic, sphone, saddress) => {
    let new_student = {
        id: sid,
        name: sname,
        nic: snic,
        phone: sphone,
        address: saddress
    };
    student_db.push(new_student);
    cleanStudentForm();

    Swal.fire({ icon: "success", title: "Student saved successfully!"});

    loadStudentTbl();
}

$('#student_save_btn').on('click', function () {
    let id = $('#student_id_input').val();
    let name = $('#student_name_input').val();
    let nic = $('#student_nic_input').val();
    let phone = $('#student_phone_input').val();
    let address = $('#student_address_input').val();

    (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (student_db.find(item => item.id==id)) ? Swal.fire({ icon: "error", title: "Id is already exist!"}) :
            (name == "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                (!check_nic(nic)) ? Swal.fire({ icon: "error", title: "Invalid NIC!"}) :
                    (!check_phone(phone)) ? Swal.fire({ icon: "error", title: "Invalid Phone!"}) :
                        (address == "") ? Swal.fire({ icon: "error", title: "Invalid Address!"}) : addStudentData(id, name, nic, phone, address);
})
//------------------------- End: Student Add ------------------------------

//------------------------- Start: Student Update ------------------------------
const updateStudentData = (sid, sname, snic, sphone, saddress) => {
    let obj = student_db.find(item => item.id == sid);

    if(obj) {
        obj.name=sname;
        obj.nic=snic;
        obj.phone=sphone;
        obj.address=saddress
    }

    cleanStudentForm();

    Swal.fire({ icon: "success", title: "Student updated successfully!"});

    loadStudentTbl();
}

$('#student_update_btn').on('click', function () {
    let id = $('#student_id_input').val();
    let name = $('#student_name_input').val();
    let nic = $('#student_nic_input').val();
    let phone = $('#student_phone_input').val();
    let address = $('#student_address_input').val();

    (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (!(student_db.find(item => item.id==id))) ? Swal.fire({ icon: "error", title: "Student not found!"}) :
                (name == "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                    (!nic_regex.test(nic)) ? Swal.fire({ icon: "error", title: "Invalid NIC!"}) :
                        (!phone_regex.test(phone)) ? Swal.fire({ icon: "error", title: "Invalid Phone!"}) :
                            (address == "") ? Swal.fire({ icon: "error", title: "Invalid Address!"}) : updateStudentData(id, name, nic, phone, address);
})
//------------------------- End: Student Update ------------------------------

//------------------------- Start: Student Delete ------------------------------
const deleteStudentData = (sid) => {
    let index = student_db.findIndex(item => item.id == sid); // -1

    if(index!==-1) {
        student_db.splice(index, 1);
    }

    cleanStudentForm();
    Swal.fire({ icon: "success", title: "Student deleted successfully!"});
    loadStudentTbl();
}

$('#student_delete_btn').on('click', function () {
    let id = $('#student_id_input').val();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
                (!(student_db.find(item => item.id==id))) ? Swal.fire({ icon: "error", title: "Student not found!"}) : deleteStudentData(id);
        };
    });
});
//------------------------- End: Student Delete ------------------------------