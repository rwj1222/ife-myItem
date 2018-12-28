function plotLine(data) {
    var width=640,height=400,lWidth=500,lHeight=370;
    var r=8;
    var left=30;
    var interval=43;
    var max=0;
    for (var j=0;j<data.length;j++){
    for (var i=0;i<data[j]["sale"].length;i++){
        if (data[j]["sale"][i]>max) max=data[j]["sale"][i];
    }
    }

    var ratio=(350)/max;
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");

    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);    //清空画布
    ctx.closePath();
    init(ctx,lHeight,lWidth,interval,left,max);        //初始化坐标轴


   for (var j=0;j<data.length;j++){
       var dcolor="rgb("+(255-Math.floor(Math.random()*120))+","+(255-Math.floor(Math.random()*150))+","+(Math.floor(Math.random()*180))+")";
   for (var i=0;i<data[j]["sale"].length;i++){

       ctx.beginPath();
       ctx.lineWidth="1";
       ctx.strokeStyle=dcolor;
       ctx.fillStyle=dcolor;
       ctx.moveTo(left+interval*(i+1)+r,380-data[j]["sale"][i]*ratio);
       ctx.arc(left+interval*(i+1),380-data[j]["sale"][i]*ratio,r,0,Math.PI*2,false);
       ctx.fill();
       ctx.closePath();
       if (i!=0){
           ctx.beginPath();
           ctx.lineWidth="2";
           ctx.strokeStyle=dcolor;
           ctx.moveTo(left+interval*(i+1),380-data[j]["sale"][i]*ratio);
           ctx.lineTo(x0,y0);
           ctx.stroke();
           ctx.closePath();
       }


       // ctx.beginPath();
       // ctx.fontSize="17px";
       // ctx.fillStyle="black";
       // ctx.fillText(data[j]["sale"][i],left+interval*(i+1)+r,lHeight+10-data[j]["sale"][i]*ratio);
       // ctx.closePath();

       var x0=left+interval*(i+1)+r;
       var y0=380-data[j]["sale"][i]*ratio;
   }
   ctx.beginPath();
  ctx.fillStyle=dcolor;
  ctx.arc(left+interval*13+10,30+j*30,6,0,Math.PI*2);
ctx.fill();
ctx.textBaseline = 'middle';
ctx.font="15px 微软雅黑";
ctx.fillText(data[j]["product"]+"-"+data[j]["region"],left+interval*13+19,30+j*30);
ctx.closePath();



}
}
function init(ctx,lHeight,lWidth,interval,left,max){
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle="black";
    ctx.moveTo(left+5,10);
    ctx.lineTo(left+5,lHeight+10);
    ctx.moveTo(left+5,lHeight+10);
    ctx.lineTo(left+5,lHeight+10);
    ctx.lineTo(620,lHeight+10);
    ctx.stroke();
    ctx.moveTo(630,lHeight+10);
    ctx.lineTo(620,lHeight);
    ctx.lineTo(620,lHeight+20);
    ctx.fill();
    ctx.moveTo(left+5,0);
    ctx.lineTo(left-5,10);
    ctx.lineTo(left+15,10);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle="gray";


    for (var i=0;i<5;i++) {

        ctx.lineWidth="1";
        ctx.moveTo(left,lHeight+10-((i+1)*70));
        ctx.lineTo(left+interval*13,lHeight+10-((i+1)*70));
        ctx.stroke();
        ctx.font="15px 微软雅黑"
        ctx.textBaseline = 'middle';
        ctx.fillText((max/5)*(i+1),2,lHeight+10-((i+1)*70));

    }
    ctx.closePath();

}



