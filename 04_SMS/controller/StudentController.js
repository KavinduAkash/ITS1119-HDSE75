// ------------------------ Student DB ------------------------------
let student_db = [];

// ------------------------ Student Regex ------------------------------
const nic_regex = new RegExp("^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))");
const phone_regex = new RegExp("^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$");

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
    loadStudentTbl();
}

$('#student_save_btn').on('click', function () {
    let id = $('#student_id_input').val();
    let name = $('#student_name_input').val();
    let nic = $('#student_nic_input').val();
    let phone = $('#student_phone_input').val();
    let address = $('#student_address_input').val();

    (id == "") ?
        alert("Invalid Id!") :
        (student_db.find(item => item.id==id)) ? alert("Id is already exist!") :
            (name == "") ? alert("Invalid Name!") :
                (!nic_regex.test(nic)) ? alert("Invalid NIC!") :
                    (!phone_regex.test(phone)) ? alert("Invalid Phone!") :
                        (address == "") ? alert("Invalid Address!") : addStudentData(id, name, nic, phone, address);
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
    loadStudentTbl();
}

$('#student_update_btn').on('click', function () {
    let id = $('#student_id_input').val();
    let name = $('#student_name_input').val();
    let nic = $('#student_nic_input').val();
    let phone = $('#student_phone_input').val();
    let address = $('#student_address_input').val();

    (id == "") ? alert("Invalid Id!") :
        (!(student_db.find(item => item.id==id))) ? alert("Student not found!") :
            (name == "") ? alert("Invalid Name!") :
                (!nic_regex.test(nic)) ? alert("Invalid NIC!") :
                    (!phone_regex.test(phone)) ? alert("Invalid Phone!") :
                        (address == "") ? alert("Invalid Address!") : updateStudentData(id, name, nic, phone, address);
})
//------------------------- End: Student Update ------------------------------

//------------------------- Start: Student Delete ------------------------------
const deleteStudentData = (sid) => {
    let index = student_db.findIndex(item => item.id == sid); // -1

    if(index!==-1) {
        student_db.splice(index, 1);
    }

    cleanStudentForm();
    loadStudentTbl();
}

$('#student_delete_btn').on('click', function () {
    let id = $('#student_id_input').val();

    (id == "") ? alert("Invalid Id!") :
        (!(student_db.find(item => item.id==id))) ? alert("Student not found!") : deleteStudentData(id);
});
//------------------------- End: Student Delete ------------------------------