let ifRadiusChosen=false;
let radius;
let array = new Array();
function checkForm(el) {
    let y = el.y.value;
    let x = el.x.value;
    if (checkX(x) & checkY(y) & checkR()) {
        el.y.value = y.replace(",",".");
        el.time.value = new Date().getTimezoneOffset();
        return true;
    }
    return false;

}

function printErr(text,id) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id).style.color='red';
}

function checkY(y) {
    y = y.replace(",",".");
    if (y == '') {
        printErr('Fill in the field','yError');
        return false;
    }else if (new RegExp(/^-?[0-2](\.[0-9]*)?$/).test(y)) {
        document.getElementById('yError').innerHTML = '';
        return true;
    }else {
        printErr('Incorrect value','yError');
        return false;
    }
}

function checkX(x) {
    if (x == '') {
        printErr('Fill in the field','xError');
        return false;
    }
    else {
        document.getElementById('xError').innerHTML = '';
        return true;
    }
}

function checkR() {
    const params = document.getElementsByClassName("param");
    let empty = true;
    for (let i = 0; i < params.length; i++) {
        if(params[i].checked) {
            empty = false;
            break;
        }
    }
    if (empty) {
        printErr('Fill in the field','rError');
        return false;
    }
    else {
        document.getElementById('rError').innerHTML = '';
        return true;
    }
}
function checkOnlyOne(b){

    const x = document.getElementsByClassName('param');
    for (let i = 0; i < x.length; i++) {
        if(x[i].value != b) x[i].checked = false;
    }
    let empty = true;
    for (let i = 0; i < x.length; i++) {
        if(x[i].checked) {
            empty = false;
            break;
        }
    }
    if (empty) {
        clearCanv();
        draw();
        ifRadiusChosen = false;
    }
    else {
        ifRadiusChosen=true;
        radius=b;
        drawGraph(b);
    }
}

function send(x,y) {
    if ((x>=-5 & x<=3) & (y>-3&y<3)) {
        let send = new XMLHttpRequest();
        send.open("GET", "/lab2-1.0-SNAPSHOT/?x=" + x + "&y=" + y + "&r=" + radius);
        send.send(null);

        send.onreadystatechange = function () {
            if (send.readyState !=4) {
                return;
            }
            if (send.status == 200){
                let datas = send.responseText.matchAll(/<td>-?[0-9a-z].*<\/td>/g);
                let array1 = new Array();
                for (const data of datas) {
                    array1.push(data[0].replace('<td>','').replace('</td>',''));
                }
                let tr = document.createElement("tr");
                tr.innerHTML='<td>'+array1[0]+'</td> <td>'+array1[1]+' </td> <td>'+array1[2]+'</td> <td>'+array1[3]+'</td>';
                document.getElementById("table1").appendChild(tr);
                let hit=false;
                if (array1[3]=="true") {
                    hit=true;
                }
                let obj = {
                    x:array1[0],
                    y:array1[1],
                    r:array1[2],
                    hit:hit
                };
                array.push(obj);
                drawDot(obj.x,obj.y,hit);
            }
        }
    }
}

function getData() {
    let request = new XMLHttpRequest();
    request.open("GET","/lab2-1.0-SNAPSHOT/data");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState !=4) {
            return;
        }
        if (request.status == 200) {
            if (!request.responseText.match("empty")) {
            let dates = request.responseText.split("\n");
            dates.pop();
            dates.forEach(data => {
                console.log(JSON.parse(data));
                array.push(JSON.parse(data));
            });
            fillTableAndDots();
        }
        }
    }
}
function fillTableAndDots() {
    if (array.length>0) {
        array.forEach(data => {
            let tr = document.createElement("tr");
            tr.innerHTML='<td>'+data.x+'</td> <td>'+data.y+' </td> <td>'+data.r+'</td> <td>'+data.hit+'</td>';
            document.getElementById("table1").appendChild(tr);
            drawDot(data.x,data.y,data.hit);
        })
    }
}

function setHiddenValues(x,y) {
    document.getElementById("form:xVal1").value=x;
    document.getElementById("form:textY").value=y;
}


function getCursorPosition(canvas,event) {
    if (ifRadiusChosen) {
        let pos = canvas.getBoundingClientRect();
        let x = ((event.clientX - pos.left -250)/50).toFixed(2);
        let y = ((150 - (event.clientY - pos.top))/50).toFixed(2);
        //send(x,y);
        //setHiddenValues(x,y)
        drawDot(x,y,true);

    }
    else {
        alert("Select radius");
    }
}

function addEventListenerToCanvas() {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener("mousedown", function (e) {
        getCursorPosition(canvas,e);
        //document.getElementById("form:button").click();
    })
}

