var btn = document.querySelector(".send");
var ul = document.querySelector(".list");
var data = JSON.parse(localStorage.getItem("listData"));
var text = document.querySelector(".text");

if(!data){data = []};

updateList(data);

btn.addEventListener('click',addData,false);

ul.addEventListener('click',deleteData,false);

text.addEventListener('keydown',enterPress,false);

function addData(e){

    data.push(text.value);
    localStorage.setItem("listData", JSON.stringify(data));
    text.value = "";
    updateList(data);
}

function updateList(list){

    var str = '';

    for (var i = 0; i < list.length; i++) {
        str += '<li><a href="#" data-index=' + i + ' />刪除</a> <span>' + list[i] + '</span></li>';
    }
    ul.innerHTML = str;
}

function deleteData(e) {
    if(e.target.nodeName !== "A"){return}

    data.splice(e.target.dataset.index, 1);
    localStorage.setItem("listData", JSON.stringify(data));
    updateList(data);
}

function enterPress(e){
    if(e.keyCode == 13){addData()}
}
