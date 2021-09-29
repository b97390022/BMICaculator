var dateCol = document.querySelectorAll(".date");
var btn = document.querySelector(".result-btn");
var height = document.querySelector("#height");
var weight = document.querySelector("#weight");
var ulNode = document.querySelector(".records");

btn.addEventListener('click', addData, false);
height.addEventListener('keydown', enterPress, false);
weight.addEventListener('keydown', enterPress, false);
// var ul = document.querySelector(".list");
// var data = JSON.parse(localStorage.getItem("listData"));
// var text = document.querySelector(".text");

// if(!data){data = []};

// updateList(data);

// btn.addEventListener('click',addData,false);

// ul.addEventListener('click',deleteData,false);

// text.addEventListener('keydown',enterPress,false);

function countBMI(heightValue, weightValue){
    heightValue /= 100;
    return Math.round((weightValue / (heightValue * heightValue)) * 100) / 100;
}

function createNode(switchClass, heightValue, weightValue, BMIValue, ulLength) {

    const textMap = {
        "color-ideal":"理想",
        "color-light":"過輕",
        "color-heavy":"過重",
        "color-light-fat":"輕度肥胖",
        "color-mod-fat":"中度肥胖",
        "color-heavy-fat":"重度肥胖",
    }

    var liNode = document.createElement("li");
    liNode.classList.add("dataNum-" + ulLength);
    var divNode = document.createElement("div");

    divNode.classList.add("color");
    divNode.classList.add(switchClass);
    liNode.appendChild(divNode);

    divNode = document.createElement("div");
    divNode.textContent = textMap[switchClass];
    liNode.appendChild(divNode);

    divNode = document.createElement("div");
    span1 = document.createElement("span");
    span2 = document.createElement("span");
    span1.classList.add("first");
    span2.classList.add("second");
    span1.textContent = "BMI ";
    span2.textContent = BMIValue;
    divNode.appendChild(span1);
    divNode.appendChild(span2);
    liNode.appendChild(divNode);

    divNode = document.createElement("div");
    span1 = document.createElement("span");
    span2 = document.createElement("span");
    span1.classList.add("first");
    span2.classList.add("second");
    span1.textContent = "Weight ";
    span2.textContent = heightValue + "cm";
    divNode.appendChild(span1);
    divNode.appendChild(span2);
    liNode.appendChild(divNode);

    divNode = document.createElement("div");
    span1 = document.createElement("span");
    span2 = document.createElement("span");
    span1.classList.add("first");
    span2.classList.add("second");
    span1.textContent = "Height ";
    span2.textContent = weightValue + "kg";
    divNode.appendChild(span1);
    divNode.appendChild(span2);
    liNode.appendChild(divNode);

    divNode = document.createElement("div");
    divNode.textContent = getDate();
    divNode.classList.add("first");
    divNode.classList.add("date");
    liNode.appendChild(divNode);

    return liNode;
}

function addData(e){

    let BMIValue = countBMI(height.value, weight.value);
    let ulLength = ulNode.getElementsByTagName('li').length;

    if (ulLength >= 6) {
        var rmNode = document.querySelector(".records > li:nth-child(1)");
        ulNode.removeChild(rmNode);
    }

    if (BMIValue < 18.5) {
        // 過輕
        var liNode = createNode("color-light", height.value, weight.value, BMIValue, ulLength);
        ulNode.appendChild(liNode);

    } else if (18.5 <= BMIValue  && BMIValue < 24) {
        // 理想
        var liNode = createNode("color-ideal", height.value, weight.value, BMIValue, ulLength);
        ulNode.appendChild(liNode);

    } else if (24 <= BMIValue  && BMIValue < 27) {
        // 過重
        var liNode = createNode("color-heavy", height.value, weight.value, BMIValue, ulLength);
        ulNode.appendChild(liNode);
    } else if (27 <= BMIValue  && BMIValue < 30) {
        // 輕度肥胖
        var liNode = createNode("color-light-fat", height.value, weight.value, BMIValue, ulLength);
        ulNode.appendChild(liNode);
    } else if (30 <= BMIValue  && BMIValue < 35) {
        // 中度肥胖
        var liNode = createNode("color-mod-fat", height.value, weight.value, BMIValue, ulLength);
        ulNode.appendChild(liNode);
    } else{
        // 重度肥胖
        var liNode = createNode("color-heavy-fat", height.value, weight.value, BMIValue, ulLength);
        ulNode.appendChild(liNode);
    }

    // data.push(text.value);
    // localStorage.setItem("listData", JSON.stringify(data));
    // text.value = "";
    // updateList(data);
}

// function updateList(list){

//     var str = '';

//     for (var i = 0; i < list.length; i++) {
//         str += '<li><a href="#" data-index=' + i + ' />刪除</a> <span>' + list[i] + '</span></li>';
//     }
//     ul.innerHTML = str;
// }

// function deleteData(e) {
//     if(e.target.nodeName !== "A"){return}

//     data.splice(e.target.dataset.index, 1);
//     localStorage.setItem("listData", JSON.stringify(data));
//     updateList(data);
// }

function enterPress(e){
    if(e.keyCode == 13){addData()}
}

function getDate(e) {
    let dateLength = dateCol.length;
    let date = new Date();

    const formatDate = (date)=>{
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        
        if (month < 9){
            month = "0" + (month+1);
        } else {
            month +=1;
        }

        let formatted_date =  month + "-" + day + "-" + year;
        return formatted_date;
    }

    let formatted_date = formatDate(date);

    return formatted_date;
}