$( document ).ready(function() {
var cont = 0
var lasto
var bento = 0
var procesos = []
var teprom = 0
var tepromRes
var trprom = 0
var trpromRes
var getName= []
var getTllega= []
var getTraf= []
var valid
var isName = /^[a-z\d_]{3,15}$/i;
var isValues =/(?:\d*\.)?\d+/i;

//add event
$("#add").click(function(){
	$("#processNum").append("<input class=inp id=proceso"+ cont +">")
	$("#processRaf").append("<input class=inp id=raf"+ cont +">")
	$("#processTll").append("<input class=inp id=tll"+ cont +">")

	cont = cont + 1
});
//end add event

//calculate event
$("#calculate").click(function(){

//asignment validate values	
for (var a = 0 ; a < cont; a++) {
getName[a] = document.getElementById("proceso"+a).value;
getTllega[a] = document.getElementById("tll"+ a).value;
getTraf[a] = document.getElementById("raf"+ a).value;
}
for (var p = 0 ; p < cont; p++) {
	if (!isName.test(getName[p]) || !isValues.test(getTllega[p]) || !isValues.test(getTraf[p])) {
		valid = false;
		break;
	}else{
		valid = true;
		continue;
	}
}

//end asignment validate values	

if (valid == true) {
for (var i = 0 ; i < cont; i++) {
//assignment values
	procesos[i] = {
		"name":getName[i],	
		"Tllega":getTllega[i],
		"Traf":getTraf[i],
		"Te":document.getElementById("tee"+ i),
		"Tr":document.getElementById("trr"+ i)
	}
}
//assignment values end

//sort function
function sortByTllega(elem1, elem2) {return eval(elem1.Tllega) > eval(elem2.Tllega);}
procesos.sort(sortByTllega)
console.log(procesos)
//end sort function

//calculate second function
lasto = eval(procesos[0].Tllega)
for (var u = 0; u < cont; u++) {
	
bento = lasto - eval(procesos[u].Tllega)
	//grant diagram
	$("#Grandcontainer").append("<output id=grant>"+lasto+"</output>")
	$("#Grandcontainer").append("<output id=grant>"+procesos[u].name+"</output>")
	//end grant diagram
lasto= lasto + eval(procesos[u].Traf)
procesos[u].Te = bento
procesos[u].Tr = lasto
$("#processTe").append("<output id=tee"+ u +"> tiempo de espera para "+procesos[u].name +"  "+ procesos[u].Te +"</output>")
$("#processTr").append("<output id=trr"+ u +"> tiempo de respuesta para "+procesos[u].name +"  "+ procesos[u].Tr +"</output>")
}
//calculate second function

//last grant line
$("#Grandcontainer").append("<output id=grant>"+lasto+"</output>")
//end last grant line

//calculate proms
for (var s = 0; s < cont; s++) {
	teprom = teprom + eval(procesos[s].Te)
	trprom = trprom + eval(procesos[s].Tr)

}
trpromRes = trprom/cont
tepromRes = teprom/cont

$("#thirtContainer").append("<p>el tiempo de espera promedio es de "+tepromRes+" ms</p>")
$("#thirtContainer").append("<p>el tiempo de respuesta promedio es de "+trpromRes+" ms</p>")
//end calculate proms


}else{
	console.log("nope")
}

});

});