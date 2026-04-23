import {addStudentData, updateStudentData, deleteStudentData, getStudentData, getStudentDataByIndex, getStudentDataById} from '../model/StudentModel.js';
import {check_nic, check_phone} from '../utils/regex_utils.js';

//------------------------- Load Student Tbl (Read) ------------------------------
const loadStudentTbl = () => {
    $('#student_tbody').empty();
    let student_db = getStudentData();
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
    let student_obj = getStudentDataByIndex($(this).index());

    $('#student_id_input').val(student_obj.id);
    $('#student_name_input').val(student_obj.name);
    $('#student_nic_input').val(student_obj.nic);
    $('#student_phone_input').val(student_obj.phone);
    $('#student_address_input').val(student_obj.address);
})

//------------------------- Start: Student Add (Create) ------------------------------
$('#student_save_btn').on('click', function () {
    let id = $('#student_id_input').val();
    let name = $('#student_name_input').val();
    let nic = $('#student_nic_input').val();
    let phone = $('#student_phone_input').val();
    let address = $('#student_address_input').val();

    (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (getStudentDataById(id)) ? Swal.fire({ icon: "error", title: "Id is already exist!"}) :
            (name == "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                (!check_nic(nic)) ? Swal.fire({ icon: "error", title: "Invalid NIC!"}) :
                    (!check_phone(phone)) ? Swal.fire({ icon: "error", title: "Invalid Phone!"}) :
                        (address == "") ? Swal.fire({ icon: "error", title: "Invalid Address!"}) : addStudentData(id, name, nic, phone, address);

    cleanStudentForm();
    Swal.fire({ icon: "success", title: "Student saved successfully!"});
    loadStudentTbl();
})
//------------------------- End: Student Add ------------------------------

//------------------------- Start: Student Update (Update) ------------------------------
$('#student_update_btn').on('click', function () {
    let id = $('#student_id_input').val();
    let name = $('#student_name_input').val();
    let nic = $('#student_nic_input').val();
    let phone = $('#student_phone_input').val();
    let address = $('#student_address_input').val();

    (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (!(getStudentDataById(id))) ? Swal.fire({ icon: "error", title: "Student not found!"}) :
                (name == "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                    (!check_nic(nic)) ? Swal.fire({ icon: "error", title: "Invalid NIC!"}) :
                        (!check_phone(phone)) ? Swal.fire({ icon: "error", title: "Invalid Phone!"}) :
                            (address == "") ? Swal.fire({ icon: "error", title: "Invalid Address!"}) : updateStudentData(id, name, nic, phone, address);

    cleanStudentForm();
    Swal.fire({ icon: "success", title: "Student updated successfully!"});
    loadStudentTbl();
})
//------------------------- End: Student Update ------------------------------

//------------------------- Start: Student Delete (Delete) ------------------------------
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
                (!(getStudentDataById(id))) ? Swal.fire({ icon: "error", title: "Student not found!"}) : deleteStudentData(id);
        };

        cleanStudentForm();
        Swal.fire({ icon: "success", title: "Student deleted successfully!"});
        loadStudentTbl();
    });
});
//------------------------- End: Student Delete ------------------------------