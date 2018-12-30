
function initialize(){

    var thead=table.insertRow(0);
    var t1=thead.insertCell();
    t1.innerText="商品";
    var t2=thead.insertCell();
    t2.innerText="地区";
    for (var i=0;i<12;i++){
        var t=thead.insertCell();
        t.innerText=i+1+"月";
    }
    document.body.appendChild(table);
}

function getItem(div,list){
    var r=new Array();
    for (var i=1;i<div.children.length;i++){
        if (div.children[i].checked==true){
            r.push(list[i-1]["text"]);
        }
    }
    return r;
}
function getData(item1,item2) {
    var data=new Array();
    var localStorage=window.localStorage;
    if (localStorage.getItem("data")==undefined)
        localStorage.setItem("data",JSON.stringify([]));
    var localdata=localStorage.getItem("data");
    localdata=JSON.parse(localdata);
    if (localdata.length==0){
        for (var i=0;i<item1.length;i++){
            for (var j=0;j<item2.length;j++){
                var newdata=getDateFromJs(item1[i],item2[j]);
                data.push(newdata);
                localdata.push(newdata);

            }}
        localStorage.setItem("data",JSON.stringify(localdata));
    }
    else{ for (var j=0;j<item2.length;j++){
        for (var i=0;i<item1.length;i++){
            for (var k=0;k<localdata.length;k++){
                if (localdata[k]["region"]==item1[i]&&localdata[k]["product"]==item2[j])
                {data.push(localdata[k]);break;}
                else if (k==localdata.length-1){
                    var newdata=getDateFromJs(item1[i],item2[j]);
                    data.push(newdata);
                    localdata.push(newdata);
                }}

        }
    }
        localStorage.setItem("data",JSON.stringify(localdata));}
    return data;// 返回数据
}



function getDateFromJs(item1,item2){
    var a={};
    for (var i=0;i<sourceData.length;i++){
        if ( sourceData[i]["region"] == item1&&sourceData[i]["product"] == item2)
        {a=sourceData[i];break;}
    }
    return a;

}

function formView(data) {
    table.innerHTML="";
    initialize();
    for (var i=0;i<data.length;i++){
        var t=table.insertRow();
        for (key in data[i]) {
            if (Array.isArray(data[i][key]) == false) {
                var cell = t.insertCell();
                cell.innerHTML= data[i][key];
            } else for (var j = 0; j < data[i][key].length; j++) {
                var cell = t.insertCell();
                var divbox=document.createElement("div");
                divbox.setAttribute("class","box");
                divbox.setAttribute("id",j);
                cell.appendChild(divbox);

                var divchild=document.createElement("div");
                divchild.setAttribute("class","dataarea");
                divbox.appendChild(divchild);
                var text=document.createTextNode(data[i][key][j]);
                divchild.appendChild(text);

                var divIcon=document.createElement("div");
                divbox.appendChild(divIcon);
                var icon=document.createTextNode("编辑");
                divIcon.appendChild(icon);
                divIcon.setAttribute("class","editIcon");


            }
        }
    }
    adjustTable(table);
    var tr=document.getElementsByTagName("tr");   //给每一行添加鼠标滑入事件
    // for (i=1;i<tr.length;i++){
    table.onmouseover=function(e){
        if (e.target.parentNode.classList[0]=="box"||e.target.classList[0]=="box"){
            if(e.target.parentNode.classList[0]=="box") {
                e.target.parentNode.children[1].setAttribute("style","visibility:visible");
                var e=e.target.parentNode.parentNode;}
            else if (e.target.classList[0]=="box") var e=e.target;

            e.parentNode.classList.add("selected");
            var item1=new Array();
            var item2=new Array();

            if (!exchange)
            {item1.push(e.parentNode.children[1].innerHTML);
                item2.push(e.parentNode.children[0].innerHTML);}
            else
            {item1.push(e.parentNode.children[0].innerHTML);
                item2.push(e.parentNode.children[1].innerHTML);}


            var data=getData(item1,item2);

            plotLine(data);
            plotBloc(data);

        }
    }


    table.onmouseout=function (e){                    //给每一行添加鼠标leave事件
        if(e.target.parentNode.classList[0]=="box") {
            e.target.parentNode.children[1].setAttribute("style","visibility:hidden");
            var e=e.target.parentNode.parentNode;}
        else var e=e.target;
        e.parentNode.classList.remove("selected");
        var row=document.querySelectorAll("tr");
        var s1=document.getElementById("region-radio-wrapper");
        var s2=document.getElementById("product-radio-wrapper");
        var item1=getItem(s1,regionlist),item2=getItem(s2,productlist);
        var data=getData(item1,item2);
        plotLine(data);
        plotBloc(data);
    }

    // }
    var box=document.querySelectorAll(".box");   //为每个数据area添加点击事件
    for (var i=0;i<box.length;i++){
        box[i].onclick=function(e){
            if (e.target.nodeName.toLowerCase()!="button"&&e.target.parentNode.classList[0]=="box"){
                let previous=e.target.parentNode.children[0].innerHTML;
                e.target.parentNode.children[1].setAttribute("style","visibility:visible");
                e.target.parentNode.children[0].innerHTML="<input class='inputArea' width='5px' value='" +e.target.parentNode.children[0].innerText+" '/>" +
                    "<button id='enter' >确认</button>" +
                    "<button id='esc'>取消</button>";
                e.target.parentNode.children[0].children[0].focus();
                e.target.parentNode.children[0].children[0].onblur=function(e){
                    submitMe(e.target.parentNode,previous);
                }
                e.target.parentNode.children[0].children[0].onkeydown=function(e){
                    var keycode=e.which||event.keyCode;
                    if (keycode==13) submitMe(e.target.parentNode,previous);
                    if (keycode==27)  e.target.parentNode.innerHTML=previous;
                }
                document.getElementById("enter").onclick=function(e){
                    submitMe(e.target.parentNode,previous);
                }
                document.getElementById("esc").onclick=function(e){
                    e.target.parentNode.innerHTML=previous;
                }

            }
        }
    }


}
function submitMe(ipt,previous){    //提交函数
    var input=ipt.children[0];
    if (!isNaN(input.value)) {
        var databox=input.parentNode;
        databox.innerHTML = input.value;
        var newData=databox.innerHTML;             //取得更新后的数据
        var box = databox.parentNode;
        var num=box.id;
        var tr=box.parentNode.parentNode;
        if (!exchange){
            var reg=tr.children[1].innerHTML;
            var pro=tr.children[0].innerHTML;}
        else{
            var reg=tr.children[0].innerHTML;
            var pro=tr.children[1].innerHTML;
        }
        var data=new Array();                  //把更改后的数据存入localStorage
        var localStorage=window.localStorage;
        var localdata=localStorage.getItem("data");
        localdata=JSON.parse(localdata);
        for (var i=0;i<localdata.length;i++){
            if (localdata[i]["region"]==reg&&localdata[i]["product"]==pro){
                localdata[i]["sale"][num]=Number(newData);
                break;
            }
        }

        localStorage.setItem("data",JSON.stringify(localdata));
        var newdata=getData(new Array(reg),new Array(pro));
        plotLine(newdata);
        plotBloc(newdata);
    }
    else input.parentNode.innerHTML=previous;



}

function adjustTable(table){        //合并第一列单元格
    exchange=false;
    var count=1;
    if (item1.length==1&&item2.length>1){
        exchange=true;
        for (var i=0;i<table.rows.length;i++){
            var temp=table.rows[i].cells[0].innerText;
            table.rows[i].cells[0].innerText=table.rows[i].cells[1].innerText;
            table.rows[i].cells[1].innerText=temp;

        }
    }
    for (var j=1;j<table.rows.length;j++){
        if (table.rows[j].cells[0].innerText==table.rows[j-count].cells[0].innerText){
            table.rows[j-count].cells[0].rowSpan=count+1;
            count++;                             //多一个同类 就多一个rowspan
            table.rows[j].cells[0].style.display="none";
        }
        else count=1;
    }

}



