let ifRadiusChosen=false;
//let radius;
let array = new Array();



function getData() {
    const table = document.getElementById("table1");
    const rows = table.getElementsByTagName('td');
    for (let i = array.length*4;i<rows.length;i=i+4) {
        let array1 = new Array();
        for (let j=0;j<4;j++) {
            if (rows[i+j].innerHTML.match(/true|false|-?[0-9]\.?[0-9]*/) === null) continue;
            array1.push(rows[i+j].innerHTML.match(/true|false|-?[0-9]\.?[0-9]*/)[0]);
        }
        if (array1.length === 0) continue;
        let hit;
        if (array1[3] ==='true') hit = true
        else hit = false
        let obj = {
            x:array1[0],
            y:array1[1],
            r:array1[2],
            hit:hit
        };
        drawDot(array1[0],array1[1],hit);
        array.push(obj);
    }
}

function getCursorPosition(canvas,event) {
    if (document.getElementById("j_idt10:textR").value>0) {
        let pos = canvas.getBoundingClientRect();
        let x = ((event.clientX - pos.left -250)/50).toFixed(2);
        let y = ((150 - (event.clientY - pos.top))/50).toFixed(2);
        //send(x,y);
        document.getElementById("j_idt10:xVal_input").value=x
        document.getElementById("j_idt10:textY").value=y
        document.getElementById("j_idt10:button").click()
        //setHiddenValues(x,y)
        //drawDot(x,y,true);

    }
    else {
        alert("Select radius");
    }
}

function addEventListenerToCanvas() {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener("mousedown", function (e) {
        getCursorPosition(canvas,e);
    })
}

function removeRow() {
    document.getElementById("table2").getElementsByTagName("tbody")[0].remove();
}

//function send(x,y) {
//     if (true) {
//         let send = new XMLHttpRequest();
//         const params = "j_idt10:xVal_input=" + x + "&j_idt10:textY=" + y + "&javax.faces.ViewState=" + document.getElementsByName("javax.faces.ViewState")[0].value + "&j_idt10:r1=" + "1"
//             + "&j_idt10:r2=" + "2" + "&j_idt10:r3=" + "3" + "&j_idt10:r4=" + "4" + "&j_idt10:r5=" + "5" + "&j_idt10=" + "j_idt10" + "&javax.faces.source=" +"j_idt10:button" +"&javax.faces.partial.event="+"click"
//         +"&javax.faces.partial.execute="+"j_idt10:button j_idt10" + "&javax.faces.behavior.event=" + "action" +"&javax.faces.partial.ajax="+"true" +"&javax.faces.partial.render="+"result form_pannel"+"&j_idt10:textR="+document.getElementById("j_idt10:textR").value
//         send.open("POST", "/lab3-1.0-SNAPSHOT/main.xhtml");
//         send.setRequestHeader("Content-type","application/x-www-form-urlencoded")
//         send.send(params);
//
//         send.onreadystatechange = function () {
//             if (send.readyState !=4) {
//                 return;
//             }
//             if (send.status == 200){
//                 document.getElementById("form:button1").click()
//                 let hits = send.responseText.matchAll(/false|true/g);
//                 let hit;
//                 for (const h of hits) {
//                     hit = h[0].replace('<td>','').replace('</td>','');
//                 }
//                 // if (hit ==="true") hit = true
//                 // else hit = false
//                 // let obj = {
//                 //     x:x,
//                 //     y:y,
//                 //     r:rad,
//                 //     hit:hit
//                 // };
//             }
//         }
//     }
// }

// function checkForm(el) {
//     let y = el.y.value;
//     let x = el.x.value;
//     if (checkX(x) & checkY(y) & checkR()) {
//         el.y.value = y.replace(",",".");
//         el.time.value = new Date().getTimezoneOffset();
//         return true;
//     }
//     return false;
//
// }
//
// function printErr(text,id) {
//     document.getElementById(id).innerHTML = text;
//     document.getElementById(id).style.color='red';
// }
//
// function checkY(y) {
//     y = y.replace(",",".");
//     if (y == '') {
//         printErr('Fill in the field','yError');
//         return false;
//     }else if (new RegExp(/^-?[0-2](\.[0-9]*)?$/).test(y)) {
//         document.getElementById('yError').innerHTML = '';
//         return true;
//     }else {
//         printErr('Incorrect value','yError');
//         return false;
//     }
// }
//
// function checkX(x) {
//     if (x == '') {
//         printErr('Fill in the field','xError');
//         return false;
//     }
//     else {
//         document.getElementById('xError').innerHTML = '';
//         return true;
//     }
// }
//
// function checkR() {
//     const params = document.getElementsByClassName("param");
//     let empty = true;
//     for (let i = 0; i < params.length; i++) {
//         if(params[i].checked) {
//             empty = false;
//             break;
//         }
//     }
//     if (empty) {
//         printErr('Fill in the field','rError');
//         return false;
//     }
//     else {
//         document.getElementById('rError').innerHTML = '';
//         return true;
//     }
// }
// function checkOnlyOne(b){
//
//     const x = document.getElementsByClassName('param');
//     for (let i = 0; i < x.length; i++) {
//         if(x[i].value != b) x[i].checked = false;
//     }
//     let empty = true;
//     for (let i = 0; i < x.length; i++) {
//         if(x[i].checked) {
//             empty = false;
//             break;
//         }
//     }
//     if (empty) {
//         clearCanv();
//         draw();
//         ifRadiusChosen = false;
//     }
//     else {
//         ifRadiusChosen=true;
//         radius=b;
//         drawGraph(b);
//     }
// }

// function fillTableAndDots() {
//     if (array.length>0) {
//         array.forEach(data => {
//             let tr = document.createElement("tr");
//             tr.innerHTML='<td>'+data.x+'</td> <td>'+data.y+' </td> <td>'+data.r+'</td> <td>'+data.hit+'</td>';
//             document.getElementById("table1").appendChild(tr);
//             drawDot(data.x,data.y,data.hit);
//         })
//     }
// }
