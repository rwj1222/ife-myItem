
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
