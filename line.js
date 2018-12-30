function plotLine(data) {
    var colornew=new Array();
   colornew=["#FF6600","blue","green","yellow","pink","purple","brown","orange","black"];
    var width=640,height=400,lWidth=500,lHeight=370;
    var r=8;
    var left=30;
    var interval=40;
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
       if (data.length==1) dcolor=colornew[Math.floor(Math.random()*9)];
       else dcolor=colornew[j];
       //var dcolor="rgb("+(255-Math.floor(Math.random()*120))+","+(255-Math.floor(Math.random()*150))+","+(Math.floor(Math.random()*180))+")";
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


       var x0=left+interval*(i+1)+r;
       var y0=380-data[j]["sale"][i]*ratio;
   }
   ctx.beginPath();
  ctx.fillStyle=dcolor;
  ctx.arc(left+interval*12+20,30+j*30,6,0,Math.PI*2);
  ctx.fill();
  ctx.textBaseline = 'middle';
  ctx.textAlign="left";
  ctx.font="15px 微软雅黑";
  ctx.fillText(data[j]["product"]+"-"+data[j]["region"],left+interval*12+27,30+j*30);
  ctx.closePath();



}
}
function init(ctx,lHeight,lWidth,interval,left,max){
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle="black";
    ctx.moveTo(left+5,10);
    ctx.lineTo(left+5,lHeight+10);   //画纵轴
    ctx.moveTo(left+5,lHeight+10);
    ctx.lineTo(620,lHeight+10);      //画横轴
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
    for(var i=0;i<12;i++){        //绘制横轴的月份
        ctx.moveTo(left+interval*(i+1),lHeight+12);
        ctx.lineTo(left+interval*(i+1),lHeight+8);
        ctx.stroke();
        ctx.font="15px 微软雅黑";
        ctx.textBaseline = 'middle';
        ctx.textAlign='center';
        ctx.fillText(i+1+"月",left+interval*(i+1),lHeight+20)
    }
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle="gray";
    for (var i=0;i<5;i++) {

        ctx.lineWidth="1";
        ctx.moveTo(left+5,lHeight+10-((i+1)*70));
        ctx.lineTo(left+interval*12+10,lHeight+10-((i+1)*70));
        ctx.stroke();
        ctx.font="10px 微软雅黑"
        ctx.textBaseline = 'middle';
        ctx.textAlign="center";
        ctx.fillText((max/5)*(i+1).toFixed(2),15,lHeight+10-((i+1)*70));

    }
    ctx.closePath();

}



