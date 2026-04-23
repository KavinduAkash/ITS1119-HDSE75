import {course_db} from '../db/db.js';

//------------------------- Load Course Tbl ------------------------------
const loadCourseTbl = () => {
    $('#course_tbody').empty();

    course_db.map((item, index) => {
        let new_row = `<tr data-index="${index}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.credits}</td> </tr>`;
        $('#course_tbody').append(new_row);
    });
}

//------------------------- Clean Course Form ------------------------------
const cleanCourseForm = () => {
    $('#course_reset_btn').click();
}

//------------------------- Click on Course Row ------------------------------
$('#course_tbody').on('click', 'tr', function () {
    let course_obj = course_db[$(this).index()];

    $('#course_id_input').val(course_obj.id);
    $('#course_name_input').val(course_obj.name);
    $('#course_credits_input').val(course_obj.credits);
})

//------------------------- Start: Course Add ------------------------------
const addCourseData = (cid, cname, ccredits ) => {
    let new_course = {
        id: cid,
        name: cname,
        credits: ccredits
    };
    course_db.push(new_course);
    cleanCourseForm();

    Swal.fire({ icon: "success", title: "Course saved successfully!"});

    loadCourseTbl();
}

$('#course_save_btn').on('click', function () {
    let id = $('#course_id_input').val();
    let name = $('#course_name_input').val();
    let credits = $('#course_credits_input').val();

    (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (course_db.find(item => item.id==id)) ? Swal.fire({ icon: "error", title: "Id is already exist!"}) :
            (name == "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                        (credits == "" || credits < 1) ? Swal.fire({ icon: "error", title: "Invalid Credits!"}) : addCourseData(id, name, credits);
})
//------------------------- End: Course Add ------------------------------

//------------------------- Start: Course Update ------------------------------
const updateCourseData = (cid, cname, ccredits) => {
    let obj = course_db.find(item => item.id == cid);

    if(obj) {
        obj.name=cname;
        obj.credits=ccredits;
    }

    cleanCourseForm();

    Swal.fire({ icon: "success", title: "Course updated successfully!"});

    loadCourseTbl();
}

$('#course_update_btn').on('click', function () {
    let id = $('#course_id_input').val();
    let name = $('#course_name_input').val();
    let credits = $('#course_credits_input').val();

    (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (!(course_db.find(item => item.id==id))) ? Swal.fire({ icon: "error", title: "Id is already exist!"}) :
            (name == "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                (credits == "" || credits < 1) ? Swal.fire({ icon: "error", title: "Invalid Credits!"}) : updateCourseData(id, name, credits);
})
//------------------------- End: Course Update ------------------------------

//------------------------- Start: Course Delete ------------------------------
const deleteCourseData = (sid) => {
    let index = course_db.findIndex(item => item.id == sid); // -1

    if(index!==-1) {
        course_db.splice(index, 1);
    }

    cleanCourseForm();
    Swal.fire({ icon: "success", title: "Course deleted successfully!"});
    loadCourseTbl();
}

$('#course_delete_btn').on('click', function () {
    let id = $('#course_id_input').val();

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
                (!(course_db.find(item => item.id==id))) ? Swal.fire({ icon: "error", title: "course not found!"}) : deleteCourseData(id);
        };
    });
});
//------------------------- End: Course Delete ------------------------------