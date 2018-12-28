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
                cell.innerHTML = data[i][key][j];
            }
        }
    }
    var tr=document.getElementsByTagName("tr");   //给每一行添加鼠标hover事件
    for (i=1;i<tr.length;i++){
        tr[i].onmouseover=function(e){
            e.target.parentNode.classList.add("selected");

            var item1=new Array();
           var item2=new Array();
           if (document.getElementsByTagName("tr")[1].children[0].rowSpan==1)
           {item1.push(e.target.parentNode.children[1].innerHTML);
           item2.push(e.target.parentNode.children[0].innerHTML);}
           else
           {item1.push(e.target.parentNode.children[0].innerHTML);
            item2.push(e.target.parentNode.children[1].innerHTML);}

            var data=getData(item1,item2);
            console.log(data);
            plotLine(data);
              plotBloc(data);
        }
        tr[i].onmouseleave=function (e){                    //给每一行添加鼠标leave事件
         e.target.classList.remove("selected");
         var row=document.querySelectorAll("tr");
         var item1=new Array(),item2=new Array();
         for (var i=1;i<row.length;i++){
             if (row[1].children[0].rowSpan==1)
             {   item1.push(row[i].children[1].innerHTML);
                 item2.push(row[i].children[0].innerHTML);}
             else
             {   if (item1.length==0) {
                 item1.push(row[i].children[0].innerHTML);}
                 item2.push(row[i].children[1].innerHTML);
             }
         }
         var data=getData(item1,item2);
         plotLine(data);
         plotBloc(data);
        }
    }
    adjustTable(table);
}
function edit(t){                 //在编辑事件里添加 输入框 图标 按钮
    var previous=t.innerHTML;
    t.innerHTML="<input type=\"input\"  autofocus=\"autofocus\" value='" +t.innerText+ " ' style='width: 40px;'/>" +
        "<button  style='width: 20px; height:20px' value='me' />";
    t.childNodes[0].focus();

    t.childNodes[1].onclick=function (e){
        submitMe(e.target.parentNode.children[0],previous);
    }

}
function submitMe(input,previous){    //提交函数
    var td=input.parentNode;
    if (!isNaN(input.value))
        input.parentNode.innerHTML=input.value;
    else input.parentNode.innerHTML=previous;
    var sale=new Array();
    for (var i=2;i<td.parentNode.children.length;i++){
        sale.push(Number(td.parentNode.children[i].innerHTML));
    }
    var data=new Array();
    var data1={};
    data1["product"]=td.parentNode.children[0].innerHTML;
    data1["region"]=td.parentNode.children[1].innerHTML;
    data1["sale"]=sale;
    data.push(data1);

    plotLine(data);
    plotBloc(data);


}

function adjustTable(table){        //合并第一列单元格
    var count=1;
    if (item1.length==1&&item2.length>1){
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
    // var td=document.getElementsByTagName("td")
    // for(var i=0;i<td.length;i++){
    // if (!isNaN(td[i].innerHTML)){
    //     var p=document.createElement("p");
    //     var t=document.createTextNode("编辑");
    //     p.appendChild(t);
    //     p.classList.add("editIcon");
    //     p.classList.add("disappear");
    //     td[i].appendChild(p);
    // }
    //
    // }

}

