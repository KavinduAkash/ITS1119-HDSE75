$(document).ready(function () {

    let light_count = $('div').length;
    let direction = "RIGHT"; // RIGHT/LEFT
    let current_light = 0;

    setInterval(function () {
        if(direction == "RIGHT") {

            $('div').css({background: "black"});
            $('div').eq(current_light).css({background: "red"});
            $('div').eq(current_light - 1).css({background: "hotpink"});
            $('div').eq(current_light - 2).css({background: "pink"});
            current_light++;

            if(current_light == light_count - 1) {
                direction = "LEFT";
            }

        } else {

            $('div').css({background: "black"});
            $('div').eq(current_light).css({background: "red"});
            $('div').eq(current_light + 1).css({background: "hotpink"});
            $('div').eq(current_light + 2).css({background: "pink"});
            current_light--;

            if(current_light == 0) {
                direction = "RIGHT";
            }

        }
    }, 30);

});