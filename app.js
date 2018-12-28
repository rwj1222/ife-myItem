var item1,item2;
var table=document.createElement("table");
var s1=document.getElementById("region-radio-wrapper");
var s2=document.getElementById("product-radio-wrapper");

produceCheckBox(s1, regionlist);
produceCheckBox(s2, productlist);

s1.children[1].checked=true;
s2.children[1].checked=true;

item1=getItem(s1,regionlist);
item2=getItem(s2,productlist);

var datalist=getData(item1,item2);

formView(datalist);

plotBloc(datalist);
plotLine(datalist);




