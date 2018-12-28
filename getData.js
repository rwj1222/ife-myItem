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
        else for (var i=0;i<item1.length;i++){
            for (var j=0;j<item2.length;j++){
                    for (var k=0;k<localdata.length;k++){
                        if (localdata[k]["region"]==item1[i]&&localdata[k]["product"]==item2[j])
                        {data.push(localdata[k]);break;}
                        else if (k==localdata.length-1){
                            var newdata=getDateFromJs(item1[i],item2[j]);
                            data.push(newdata);
                            localdata.push(newdata);
                        }}

                    }

                localStorage.setItem("data",JSON.stringify(localdata));
            }
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

