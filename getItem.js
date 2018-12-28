function getItem(div,list){
    var r=new Array();
    for (var i=1;i<div.children.length;i++){
        if (div.children[i].checked==true){
            r.push(list[i-1]["text"]);
        }
    }
    return r;
}
