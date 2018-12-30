function produceCheckBox( div, data ){
    var f=document.createDocumentFragment();
    var all=document.createElement("input");
    all.setAttribute("type","checkbox");
    all.setAttribute("checkbox-type","all");
    var p=document.createTextNode("全选");
    f.appendChild(all);
    f.appendChild(p);
    for (var i=0;i<data.length;i++) {
        var c=document.createElement("input");
        c.setAttribute("type","checkbox");
        c.setAttribute("checkbox-type","child-box");
        c.setAttribute("value",data[i]["value"]);
        f.appendChild(c);
        f.appendChild( document.createTextNode(data[i]["text"]));
    }
    div.appendChild(f);
    div.onclick = function(e) {
        if (e.target.nodeName.toLowerCase()=="input"){
            var a=e.target;
            if (a.getAttribute("checkbox-type").toLowerCase()=="all"&&e.target.checked==true){
                for (var i=0;i<div.children.length;i++){
                    div.children[i].checked=true;
                }
            }
            else if(a.getAttribute("checkbox-type").toLowerCase()=="all"&&e.target.checked==false){
                for (var i=0;i<div.children.length;i++){
                    div.children[i].checked=false;
                }
                div.children[1].checked=true;
            }
            else if (a.getAttribute("checkbox-type").toLowerCase()!="all") {
                var count=0;
                for (var i=1;i<div.children.length;i++){
                    if (div.children[i].checked==true) count++;
                }
                if (count==0&&e.target.checked==false){e.target.checked=true;}
                if (count==3&&div.children[0].checked==false){div.children[0].checked=true;}
                if (count<3)  div.children[0].checked=false;
            }
        }
        if (div.id=="region-radio-wrapper") item1=getItem(div,regionlist);
        else if(div.id=="product-radio-wrapper") item2=getItem(div,productlist);
        var datalist=getData(item1,item2);
        formView(datalist);

        plotLine(datalist);
        plotBloc(datalist);


    }
    var arr=new Array();
    for (var i=1;i<div.children.length;i++){
        if (div.children[i].checked==true){
            arr.push(data[i-1]["text"])
        }
    }
    return arr;

}
