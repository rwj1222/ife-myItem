function plotBloc(data){
    var colornew=new Array();
    colornew=["#FF6600","blue","green","yellow","pink","purple","brown","orange","black"];
    var SVG=document.getElementById("svgColumn1");
    SVG.innerHTML="";
    var left=40;
    var blockInternal=5;   //柱状图之间的间隔
    var blockWidth=38/data.length;     //柱状图的宽度
    //var svgWidth=640,svgHeight=400;                   //定义绘图区域的宽高
    var line1=document.createElementNS("http://www.w3.org/2000/svg","line");
    line1.setAttribute("x1",left);   //绘制横坐标轴
    line1.setAttribute("y1",380);
    line1.setAttribute("x2",620);
    line1.setAttribute("y2",380);
    line1.setAttribute("style","stroke:black;stroke-width:2");
    SVG.appendChild(line1);

    var line2=document.createElementNS("http://www.w3.org/2000/svg","line");
    line2.setAttribute("x1",left);   //绘制纵坐标轴
    line2.setAttribute("y1",380);
    line2.setAttribute("x2",left);
    line2.setAttribute("y2",1);
    line2.setAttribute("style","stroke:black;stroke-width:2");
    SVG.appendChild(line2)

    var path1=document.createElementNS("http://www.w3.org/2000/svg","path");
    path1.setAttribute("d","M610 370 L610 390 L620 380 Z");
    path1.setAttribute("style","stroke:black;stroke-width:2");
    SVG.appendChild(path1);

    var path2=document.createElementNS("http://www.w3.org/2000/svg","path");
    path2.setAttribute("d","M40 1 L30 10 L50 10 Z");
    path2.setAttribute("style","stroke:black;stroke-width:2");
    SVG.appendChild(path2);


    var max=0;
    for (var j=0;j<data.length;j++){
    for (var i=0;i<data[j]["sale"].length;i++){
        if (data[j]["sale"][i]>max) max=data[j]["sale"][i];
    }
    }
    for (var i=0;i<5;i++){
        var p=document.createElementNS("http://www.w3.org/2000/svg","line");
        p.setAttribute("x1",left);
        p.setAttribute("y1",(i)*70+30);
        p.setAttribute("x2",blockWidth*data.length*13+blockInternal*13);
        p.setAttribute("y2",(i)*70+30);
        p.setAttribute("style","stroke:rgb(200,200,200);stroke-width:2");
        SVG.appendChild(p);

        var text=document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x",5);
        text.setAttribute("y",(i)*70+30);
        text.setAttribute("font-size","10");
        text.setAttribute("text-anchor","start");
        text.setAttribute("font-family","system-ui");
        text.setAttribute("dominant-baseline","middle");
        text.textContent=(max-(max/5)*i).toFixed(1);
        SVG.appendChild(text);
    }
    for (i=0;i<12;i++){
        var text=document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x",left+blockInternal+blockWidth*data.length*i+blockInternal*i+blockInternal);
        text.setAttribute("y",399);
        text.setAttribute("text-anchor","right");
        text.textContent=i+1+"月";
        SVG.appendChild(text);
    }
    for (var j=0;j<data.length;j++){
        if (data.length==1) dcolor=colornew[Math.floor(Math.random()*9)];
        else dcolor=colornew[j];
    //var dcolor="rgb("+(255-Math.floor(Math.random()*200))+","+(255-Math.floor(Math.random()*150))+","+(255-Math.floor(Math.random()*120))+")";

    for (var i=0;i<data[j]["sale"].length;i++){
        var rect = document.createElementNS( "http://www.w3.org/2000/svg", "rect" );
        var height=(data[j]["sale"][i]/max)*350
        rect.setAttribute("x",left+blockWidth*data.length*i+blockInternal*i+blockWidth*j+blockInternal);
        rect.setAttribute("y",380-height);
        rect.setAttribute("height",height);
        rect.setAttribute("width",blockWidth);
        var yup=-height;
        rect.setAttribute( "style", "fill:"+dcolor);
        SVG.appendChild(rect);

    }


    var circle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx",570);
    circle.setAttribute("cy",30+j*30);
    circle.setAttribute("r",6);
    circle.setAttribute( "style", "fill:"+dcolor);
    SVG.appendChild(circle);

    var text=document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x",580);
    text.setAttribute("y",30+j*30);
    text.textContent=data[j]["product"]+"-"+data[j]["region"];
    text.setAttribute("dominant-baseline","middle");
    text.setAttribute("fontSize","5px");
    text.setAttribute( "style", "fill:"+dcolor);
    SVG.appendChild(text);
}


}
