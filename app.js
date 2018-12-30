var item1,item2;
var regionlist=[{
    value: 1,
    text: "华东"
}, {
    value: 2,
    text: "华北"
},
    {
        value: 3,
        text: "华南"
    }];
var productlist=[{
    value: 1,
    text: "手机"
}, {
    value: 2,
    text: "笔记本"
},
    {
        value: 3,
        text: "智能音箱"
    }];

var table=document.createElement("table");
var s1=document.getElementById("region-radio-wrapper");
var s2=document.getElementById("product-radio-wrapper");
var exchange=false;
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




