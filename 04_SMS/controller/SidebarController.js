// ------------------------ Sidebar Handler --------------------------
let sidebar_open = true;
$('#menu_btn').on('click', function () {
    if(sidebar_open) {
        $('#sidebar').css({display: 'none'});
        $('#content').css({marginLeft: '0px'});
        sidebar_open = false;
    } else {
        $('#sidebar').css({display: 'block'});
        $('#content').css({marginLeft: '250px'});
        sidebar_open = true;
    }
})

$('#course_content').css('display', 'none');

$('#student_sidebar_tab').on('click', function () {
    $('#course_content').css('display', 'none');
    $('#student_content').css('display', 'block');
})

$('#course_sidebar_tab').on('click', function () {
    $('#course_content').css('display', 'block');
    $('#student_content').css('display', 'none');
})
// ------------------------ Sidebar Handler --------------------------