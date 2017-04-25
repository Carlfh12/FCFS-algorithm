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
var getPrior=[]
var valid
var isName = /^[a-z\d_]{3,15}$/i;
var isValues =/(?:\d*\.)?\d+/i;
var checkmethod
var pivot= []
var checkcontinue

//add event
$("#add").click(function(){
	$("#processNum").append("<input class=inp id=proceso"+ cont +">")
	$("#processRaf").append("<input class=inp id=raf"+ cont +">")
	$("#processTll").append("<input class=inp id=tll"+ cont +">")
	$("#processPrior").append("<input class=inp id=prior"+ cont +">")

	cont = cont + 1
});
//end add event

//calculate event
$("#calculate").click(function(){

//asignment validate values	
for (var i = 0 ; i < cont; i++) {
getName[i] = document.getElementById("proceso"+i).value;
getTllega[i] = document.getElementById("tll"+ i).value;
getTraf[i] = document.getElementById("raf"+ i).value;
getPrior[i] = document.getElementById("prior"+ i).value;
}
for (var i = 0 ; i < cont; i++) {
	if (!isName.test(getName[i]) || !isValues.test(getTllega[i]) || !isValues.test(getTraf[i]) || !isValues.test(getPrior[i]) ) {
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
		"Tprior":getPrior[i],
		"Te":document.getElementById("tee"+ i),
		"Tr":document.getElementById("trr"+ i)
	}
}
//assignment values end

//sort functions
function sortByTllega(elem1, elem2) {return eval(elem1.Tllega) > eval(elem2.Tllega);}
function sortByTraf(elem1,elem2) {return eval(elem1.Traf) > eval(elem2.Traf);}
function sortByTprior(elem1,elem2) {return eval(elem1.Tprior) > eval(elem2.Tprior);}
//end sort functions

// 0 locates
	for (var i = 0; i < cont; i++) {
		if(eval(procesos[i].Tllega) == 0){
			checkmethod = true;
			break;
		}else{
			checkmethod = false;
			continue;
		}
	}
	// end 0 locates

	//check continue if all be 0
	for (var i = 0; i < cont; i++) {
		if(eval(procesos[i].Tllega) != 0){
			checkcontinue = false;
			break;
		}else{
			checkcontinue = true;
			continue;
		}
	}//end checkcontine if all be 0

//choose checkmethod
if ($('#FCFS').prop('checked')) {
//FCFS sort function
procesos.sort(sortByTllega)
//end FCFS sort function
}else if($('#SJF').prop('checked')){
	// SJF Sort
	
//way if all be 0
if (checkcontinue == false) {

	// way if just one 0 exist or not
	if (checkmethod == true) {
		procesos.sort(sortByTllega)
		for (var i = 0; i < cont; i++) {
			pivot[i]=procesos[i]
		}
		pivot.splice(0,1);
		pivot.sort(sortByTraf)
		for (var i = 0; i < pivot.length; i++) {
			procesos[i+1]=pivot[i]	
		}

	}else{
		// sort by raf time
		procesos.sort(sortByTraf)
		console.log(checkmethod)
		// sort by raf time
	}
	//end way if just exist one
}else{
		procesos.sort(sortByTraf)
		console.log(checkmethod)
}
//end if all be 0
}else if($('#priority').prop('checked')){

	// Priority Sort
//way if all be 0
if (checkcontinue == false) {

	// way if just one 0 exist or not
	if (checkmethod == true) {
		procesos.sort(sortByTllega)
		for (var i = 0; i < cont; i++) {
			pivot[i]=procesos[i]
		}
		pivot.splice(0,1);
		pivot.sort(sortByTprior)
		for (var i = 0; i < pivot.length; i++) {
			procesos[i+1]=pivot[i]	
		}

	}else{
		// sort by prior time
		procesos.sort(sortByTprior)
		console.log(checkmethod)
		// sort by prior time
	}
	//end way if just exist one
}else{
		procesos.sort(sortByTprior)
		console.log(checkmethod)
}
//end if all be 0

}
//end choose checkmethod


//calculate second function
lasto = eval(procesos[0].Tllega)
for (var i = 0; i < cont; i++) {
	
bento = lasto - eval(procesos[i].Tllega)
	//grant diagram
	$("#Grandcontainer").append("<output id=grant>"+lasto+"</output>")
	$("#Grandcontainer").append("<output id=grant>"+procesos[i].name+"</output>")
	//end grant diagram
lasto= lasto + eval(procesos[i].Traf)
procesos[i].Te = bento
procesos[i].Tr = lasto
$("#processTe").append("<output id=tee"+ i +"> tiempo de espera para "+procesos[i].name +"  "+ procesos[i].Te +"</output>")
$("#processTr").append("<output id=trr"+ i +"> tiempo de respuesta para "+procesos[i].name +"  "+ procesos[i].Tr +"</output>")
}
//calculate second function

//last grant line
$("#Grandcontainer").append("<output id=grant>"+lasto+"</output>")
//end last grant line

//calculate proms
for (var i = 0; i < cont; i++) {
	teprom = teprom + eval(procesos[i].Te)
	trprom = trprom + eval(procesos[i].Tr)

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