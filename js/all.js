var dateCol = document.querySelectorAll(".date");
var btn = document.querySelector(".result-btn");
var p = document.querySelector(".header > footer > p");
var height = document.querySelector("#height");
var weight = document.querySelector("#weight");
var ulNode = document.querySelector(".records");
var record = JSON.parse(localStorage.getItem("recordList")) || [];
var pDis = document.querySelector(".header > footer > p");


updateList(record);

btn.addEventListener('click', addData, false);
height.addEventListener('keydown', enterPress, false);
weight.addEventListener('keydown', enterPress, false);

function reset() {
    let fotterNode = document.querySelector('.header > footer');
    fotterNode.innerHTML= '';
    fotterNode.appendChild(btn);
    fotterNode.appendChild(p);
}

function countBMI(heightValue, weightValue){
    heightValue /= 100;
    return Math.round((weightValue / (heightValue * heightValue)) * 100) / 100;
}

function createNode(color, text, heightValue, weightValue, BMIValue) {
    let ulNode = document.createElement('ul');

    const classMap = {
        "理想":"color-ideal",
        "過輕":"color-light",
        "過重":"color-heavy",
        "輕度肥胖":"color-light-fat",
        "中度肥胖":"color-mod-fat",
        "重度肥胖":"color-heavy-fat",
    }

    var divNode = document.createElement("div");

    divNode.classList.add("color");
    divNode.classList.add(classMap[text]);
    divNode.style.background = color;
    ulNode.appendChild(divNode);

    divNode = document.createElement("div");
    divNode.classList.add("second-div");
    divNode.textContent = text;
    ulNode.appendChild(divNode);

    divNode = document.createElement("div");
    divNode.classList.add("third-div");
    span1 = document.createElement("span");
    span2 = document.createElement("span");
    span1.classList.add("first-span");
    span2.classList.add("second-span");
    span1.textContent = "BMI ";
    span2.textContent = BMIValue;
    divNode.appendChild(span1);
    divNode.appendChild(span2);
    ulNode.appendChild(divNode);

    divNode = document.createElement("div");
    divNode.classList.add("fourth-div");
    span1 = document.createElement("span");
    span2 = document.createElement("span");
    span1.classList.add("first-span");
    span2.classList.add("second-span");
    span1.textContent = "Weight ";
    span2.textContent = heightValue + "cm";
    divNode.appendChild(span1);
    divNode.appendChild(span2);
    ulNode.appendChild(divNode);

    divNode = document.createElement("div");
    divNode.classList.add("fivth-div");
    span1 = document.createElement("span");
    span2 = document.createElement("span");
    span1.classList.add("first-span");
    span2.classList.add("second-span");
    span1.textContent = "Height ";
    span2.textContent = weightValue + "kg";
    divNode.appendChild(span1);
    divNode.appendChild(span2);
    ulNode.appendChild(divNode);

    divNode = document.createElement("div");
    divNode.textContent = getDate();
    divNode.classList.add("first-span");
    divNode.classList.add("date");
    ulNode.appendChild(divNode);
    
    return ulNode;
}

function validate(height, weight) {
    if (height == "" || weight == "") {
        alert("請填寫完整資料!");
        return false
    }
    return true
}

function btnChange(color, text, BMIValue) {
    let fotterNode = document.querySelector('.header > footer');
    let divNode = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let pNode = document.createElement('p');

    let divCircle = document.createElement('div');
    let imgNode = document.createElement('img');
    
    imgNode.setAttribute("src","images/icons_loop.png");
    divCircle.classList.add('circleNode');
    divCircle.style.border = "3px solid #424242";
    divCircle.style.backgroundColor = color;
    divCircle.appendChild(imgNode);
    divCircle.addEventListener('click', reset, false);

    fotterNode.style.color = color;
    divNode.classList.add('inputNode');
    divNode.style.border = `6px solid ${color}`;
    span1.textContent = BMIValue;
    span2.textContent = "BMI";
    pNode.textContent = text;
    pNode.style.color = color;
    divNode.appendChild(span1);
    divNode.appendChild(span2);
    divNode.appendChild(divCircle);

    fotterNode.innerHTML = "";
    fotterNode.appendChild(divNode);
    fotterNode.appendChild(pNode);

}   

function getClass(BMIValue) {

    if (BMIValue < 18.5) {
        return 1;
    } else if (18.5 <= BMIValue  && BMIValue < 24) {
        return 2;
    } else if (24 <= BMIValue  && BMIValue < 27) {
        return 3;
    } else if (27 <= BMIValue  && BMIValue < 30) {
        return 4;
    } else if (30 <= BMIValue  && BMIValue < 35) {
        return 5;
    } else{
        return 6;
    }
}

function getText(value){

    switch (value) {
        case 1:
            return "過輕";
        case 2:
            return "理想";
        case 3:
            return "過重";
        case 4:
            return "輕度肥胖";
        case 5:
            return "中度肥胖";
        case 6:
            return "重度肥胖";
        default:
            break;
    }
}

function getColor(value){
    
    switch (value) {
        case 1:
            return "#31BAF9";
        case 2:
            return "#86D73F";
        case 3:
            return "#FF982D";
        case 4:
            return "#FF6C02";
        case 5:
            return "#FF6C02";
        case 6:
            return "#FF1200";
        default:
            break;
    }
}

function addData(e){

    if(!validate(height.value, weight.value)){return};

    let BMIValue = countBMI(height.value, weight.value);
    
    let classBelong = getClass(BMIValue);
    let color = getColor(classBelong);
    let text = getText(classBelong);

    let nNode = createNode(color, text, height.value, weight.value, BMIValue);
    btnChange(color, text, BMIValue);

    record.push(nNode.innerHTML);
    let recordLength = record.length;

    if (recordLength > 6) {
        record.splice(0,1);
    }
    
    localStorage.setItem("recordList", JSON.stringify(record));
    updateList(record);
}

function updateList(record){
    let l = record.length;
    str = '';

    for(let i =0; i < l; i++) {
        str += record[i];
    }

    ulNode.innerHTML = str;
}

function enterPress(e){
    if(e.keyCode == 13){addData()}
}

function getDate(e) {

    let date = new Date();

    const formatDate = (date)=>{

        function packZero(val){

            if (val < 9){
                val = "0" + val;
            }
        
            return val;
        }

        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        
        month = packZero(month);
        day = packZero(day);

        let formatted_date =  month + "-" + day + "-" + year;
        return formatted_date;
    }

    let formatted_date = formatDate(date);

    return formatted_date;
}