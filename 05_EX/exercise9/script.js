let div_elements = document.getElementsByTagName('div');

let lights_count = div_elements.length;
let active_light = 1;
let direction = "RIGHT"; // RIGHT/LEFT

let first_light = "background: #f44336; box-shadow: 0px 0px 25px 2px red";
let second_light = "background: #ef5350;  box-shadow: 0px 0px 50px 2px red";
let third_light = "background: #e57373;  box-shadow: 0px 0px 100px 2px red";
let fourth_light = "background: #ef9a9a;  box-shadow: 0px 0px 100px 2px red";
let fifth_light = "background: #ffcdd2;  box-shadow: 0px 0px 100px 2px red";
let sixth_light = "background: #ffebee;  box-shadow: 0px 0px 100px 2px red";
let remaining_lights = "background: black";

setInterval(() => {

    if(direction == "RIGHT") {
        for (let i=1; i<=lights_count; i++) {
            if(i == active_light) {
                div_elements[i - 1].style.cssText = first_light;
            } else if(i == active_light - 1) {
                div_elements[i - 1].style.cssText = second_light;
            } else if(i == active_light - 2) {
                div_elements[i - 1].style.cssText = third_light;
            } else if(i == active_light - 3) {
                div_elements[i - 1].style.cssText = fourth_light;
            } else if(i == active_light - 4) {
                div_elements[i - 1].style.cssText = fifth_light;
            } else if(i == active_light - 5) {
                div_elements[i - 1].style.cssText = sixth_light;
            } else {
                div_elements[i - 1].style.cssText = remaining_lights;
            }
        }

        ++active_light;

        if(active_light > lights_count) {
            direction = "LEFT";
            active_light = div_elements.length;
        }
    } else {
        for (let i=1; i<=lights_count; i++) {
            if(i == active_light) {
                div_elements[i - 1].style.cssText = first_light;
            } else if(i == active_light + 1) {
                div_elements[i - 1].style.cssText = second_light;
            } else if(i == active_light + 2) {
                div_elements[i - 1].style.cssText = third_light;
            } else if(i == active_light + 3) {
                div_elements[i - 1].style.cssText = fourth_light;
            } else if(i == active_light + 4) {
                div_elements[i - 1].style.cssText = fifth_light;
            } else if(i == active_light + 5) {
                div_elements[i - 1].style.cssText = sixth_light;
            } else {
                div_elements[i - 1].style.cssText = remaining_lights;
            }
        }

        --active_light;

        if(active_light < 0) {
            direction = "RIGHT";
            active_light = 1;
        }
    }


}, 15);