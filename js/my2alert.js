/* menu */
$(document).ready(
function(){
$("body")
.on('click', '[href*="#"]', function(e){
var fixed_offset = $("body > nav.menu")
.outerHeight(true);
$('html,body')
.stop()
.animate({
scrollTop: $(this.hash).offset().top - fixed_offset}, 1000);
e.preventDefault();
});
$(function(){
var curlvl;
var startlvl = 0;
var prevlvl = startlvl;
var lst = $("#toc");
var tmp2 = $("<p class='r'><a class='inl' href='javascript:void(0)' title='Закрыть меню' onclick='closeNav()'> ✖ </a></p><p class='c'><a class='inl' href='u00.html' title='Все уроки'> ⇚ </a> <a class='inl' href='#top' title='Наверх'> ⇑ </a> <a class='inl' href='javascript:void(0)' title='Произношение' onclick=\"toggleShow('.zxx')\">[ ]</a> <a class='inl' href='javascript:void(0)' title='Подлежащее и Сказуемое' onclick=\"toggleShow2('dd')\"> ≡ </a><hr class='h' />");
lst.append(tmp2);
var href1 = window.location.href;
var href2 = href1.replace(window.location.hash, "");
if (typeof lst !== "undefined"){
$(".text_read h2, .text_read h3")
.each(function(i){
var current = $(this);
current.attr("id", "title" + i);
for (curlvl = parseInt(current.prop("tagName")
.substring(1))-1; curlvl > prevlvl; prevlvl++){
var tmp = $("<ul></ul>");
if (prevlvl == startlvl)
{lst.append(tmp);}
else{
var last_li = $("#toc li")
.last();
last_li.append(tmp);

}
if (curlvl > prevlvl + 1)
tmp.append("<li></li>");
lst = tmp;
}
while (curlvl < prevlvl){
lst = lst.parent()
.parent();
prevlvl--;
}
curder = current.html();

if (curder.charAt(curder.length - 1) == ':'){
curder = curder.substr(0, curder.length - 1);
}
curder = curder.replace("•","Текст для чтения");
curder = curder.replace("<br>","@@@").replace("<br />","@@@").replace("<br/>","@@@");
if (curder.indexOf('@@@')>0){
curder = curder.substr(0, curder.indexOf('@@@'));
}
lst.append("<li><a id='link" + i + "' itemprop='url' href='" + href2 + "#title" + i + "'>" + curder.trim() + "</a></li>");
});
};
});
});


/* underline on/of */
toggleShow2=function(sel){
var i,x=getElements(".m"),l=x.length;
for (i=0;i<l;i++){
	if (x[i].style["text-decoration"]=="none"){
		styleElement(x[i],"text-decoration","underline firebrick");
	}else{
		styleElement(x[i],"text-decoration","none");
	}}

var y,xx=getElements(".i"),ll=xx.length;
for (y=0;y<ll;y++){
	if (xx[y].style["text-decoration"]=="none"){
		styleElement(xx[y],"text-decoration","double underline red");
	}else{
		styleElement(xx[y],"text-decoration","none");
	}}

var o,xxx=getElements(".d"),lll=xxx.length;
for (o=0;o<lll;o++){
	if (xxx[o].style["text-decoration"]=="none"){
		styleElement(xxx[o],"text-decoration","double underline DarkSlateGray");
	}else{
		styleElement(xxx[o],"text-decoration","none");
	}}
};


/* pronunciation on/of */
toggleShow=function(sel){
var i,x=getElements(sel),l=x.length;
for (i=0;i<l;i++){
	if (x[i].style.display=="none"){
		styleElement(x[i],"display","inline");
	}else{
		styleElement(x[i],"display","none");
	}
}};
getElements=function(id){
if (typeof id=="object"){
	return [id];
}else{
	return document.querySelectorAll(id);
}};
styleElement=function(element,prop,val){
element.style.setProperty(prop,val);};
/***************************/

/* small quize */
Array.prototype.shuffle=function(){
var i=this.length,j,t;
while(i){
	j=Math.floor((i--)*Math.random());
	t=this[i];
	this[i]=this[j];
	this[j]=t;}
return this;};

function unique(a){
var obj={};
for (var i=0;i<a.length;i++){
	var str=a[i];
	obj[str]=true;}
return Object.keys(obj);};

function z(a){
if(document.getElementById(a)!==null){
	document.getElementById(a).parentNode.removeChild(document.getElementById(a));
	ernu=ernu-1;};
if(ernu==0){
	var yy='';
	var vv=''
	var k=[];
	erro=unique(erro);
	for (var i=0;i<erro.length;i++){
		k=erro[i].split(",");
		yy=yy+"<p><span lang='hy'>"+k[0]+"<\/span>"+k[1]+"<\/p>";
		vv=vv+"<p>"+k[1]+" – <span lang='hy' class='n'>"+k[0]+"<\/span><\/p>";};
	if(yy!=''){
		yy="<h4>Ошибки в тесте<\/h4><p class='z'>HY<\/p>"+yy+"<\/p><p class='z'>RU<\/p>"+vv;};
	document.getElementById("id01").innerHTML=yy;
	document.body.scrollIntoView(false);}
};

function ran(max){return Math.floor(Math.random()*max);};

function MakeList(arr,aLL,ii,ital,ord){
b2="<\/button>";
if (ital !=""){
	i1="<span lang='hy' class='n'>";i2="<\/span>";}
else {i1="<span lang='en'>";i2="<\/span>";};
d1=ran(aLL);
if (d1==ii){d1=0};
d2=ran(aLL);
if (d2==ii){d2=0};
d3=ran(aLL);
if (d3==ii){d3=0};
d4=ran(aLL);
if (d4==ii){d4=0};
d5=ran(aLL);
if (d5==ii){d5=0};
var b=["<button onclick='z(\""+arr[ii][ord]+"\")'>"+i1+ arr[ii][ord].split('*').join('')+i2+"<\/button>",
	"<button onclick='g(\""+arr[ii][ord]+"\",\""+arr[d1]+"\",\""+arr[ii]+"\")'>"+i1+arr[d1][ord].split('*').join('')+i2+b2,
	"<button onclick='g(\""+arr[ii][ord]+"\",\""+arr[d2]+"\",\""+arr[ii]+"\")'>"+i1+arr[d2][ord].split('*').join('')+i2+b2,
	"<button onclick='g(\""+arr[ii][ord]+"\",\""+arr[d3]+"\",\""+arr[ii]+"\")'>"+i1+arr[d3][ord].split('*').join('')+i2+b2,
	"<button onclick='g(\""+arr[ii][ord]+"\",\""+arr[d4]+"\",\""+arr[ii]+"\")'>"+i1+arr[d4][ord].split('*').join('')+i2+b2,
	"<button onclick='g(\""+arr[ii][ord]+"\",\""+arr[d5]+"\",\""+arr[ii]+"\")'>"+i1+arr[d5][ord].split('*').join('')+i2+b2];
b.shuffle();
b=unique(b);
return b;};

var erro=[];
var ernu=0;
function g(evt,a,aa){
erro.push(a);
erro.push(aa);
document.getElementById(evt).style.backgroundColor="#ffd1dc";
};

function tt(){
if (typeof u=='undefined'){
	alert("Quiz not possible.");
	return;};
var aL=u.length;
ernu = aL-1;
erro=[];
u.shuffle();
var s="";
for (var i=1;i<aL;i++){
	bbb=MakeList(u,aL,i,"",1);
	var ss="";
	for (var j=0;j<bbb.length;j++){
		ss+=bbb[j];};
	s+="<div class='sh' id='"+u[i][1]+"'><p><span lang='hy'>"+u[i][0].split('*').join('')+"<\/span><span class='zxx' lang='zxx'>"+u[i][2]+"</span><\/p><p class='bu'>"+ss+"<\/p><\/div>";};
/* ru??? en???*/
document.getElementById("id01").innerHTML=s;
document.body.scrollIntoView(false);};

function tttt(){
if (typeof u=='undefined'){
	alert("Quiz not possible.");
	return;};
var aL=u.length;
ernu = aL-1;
erro=[];
u.shuffle();
var s="";
for (var i=1;i<aL;i++){
	bbb=MakeList(u,aL,i,"i",0);
	var ss="";
	for (var j=0;j<bbb.length;j++){
		ss+=bbb[j];};
	s+="<div class='sh' id='"+u[i][0]+"'><p>"+u[i][1].split('*').join('')+"<\/p><p class='bu'>"+ss+"<\/p><\/div>";};
document.getElementById("id01").innerHTML=s;
document.body.scrollIntoView(false);};

function dd(){
if (typeof uu=='undefined'){
	alert("Quiz not possible.");
	return;};
var aL=uu.length;
ernu = aL-1;
erro=[];
uu.shuffle();
var s="";
for (var i=1;i<aL;i++){
	bbb=MakeList(uu,aL,i,"",1);
	var ss="";
	for ( var j=0;j<bbb.length;j++){
		ss+=bbb[j];};
	s+="<div class='sh' id='"+uu[i][1]+"'><p><span lang='hy' class='n'>"+uu[i][0].split('*').join('')+"<\/span><p\/><p class='bu'>"+ss+"<\/p><\/div>";};
document.getElementById("id01").innerHTML=s;
document.body.scrollIntoView(false);};

function dddd(){
if (typeof uu=='undefined'){
	alert("Quiz not possible.");
	return;};
var aL=uu.length;
ernu = aL-1;
erro=[];
uu.shuffle();
var s="";
for (var i=1;i<aL;i++){
	bbb=MakeList(uu,aL,i,"i",0);
	var ss="";
	for (var j=0;j<bbb.length;j++){
		ss+=bbb[j];};
	s+="<div class='sh' id='"+uu[i][0]+"'><p>"+uu[i][1].split('*').join('')+"<p\/><p class='bu'>"+ss+"<\/p><\/div>";};
document.getElementById("id01").innerHTML=s;
document.body.scrollIntoView(false);};

/* nav menu on/off*/
function openNav(){document.getElementById("toc").style.width="360px"}
function closeNav(){document.getElementById("toc").style.width="0"}
/**************************/





