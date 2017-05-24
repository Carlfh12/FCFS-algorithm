$( document ).ready(function() {
var cont = 0
var bento = 0
var teprom = 0
var trprom = 0
var contador=0
var contador2 = 0
var lasto
var tepromRes
var trpromRes
var valid
var procesos = []
var getName= []
var getTllega= []
var getTraf= []
var getPrior=[]
var pivot= []
var pivot2 = [] 
var isName = /^[a-z\d_]{3,15}$/i;
var isValues =/(?:\d*\.)?\d+/i;
var checkmethod
var tim 
/*var checkcontinue*/

function reset(){
	for (var o = 0; o < procesos.length; o++) {
		$("#tee").remove()
		$("#trr").remove()
		$("#tnn").remove()
	}
	$("#thirtContainer").empty();
	$("#Grandcontainer").empty();
	 pivot= []
	 pivot2 = [] 
	 valid=false;
	 pivot= []
	 pivot2 = []
	 bento = 0
	 teprom = 0
	 trprom = 0
	 contador=0
	 contador2 = 0
	 lasto
	 tepromRes
	 trpromRes

	
}

//add event
$("#add").click(function(){
	$("#tble").append("<tr id=tr-id"+cont+"><td><input class=inp id=proceso"+ cont +"></td><td><input type=number class=inp id=raf"+ cont +"></td><td><input type=number class=inp id=tll"+ cont +"></td> <td><input type=number class=inp id=prior"+ cont +"></td></tr>")
	cont = cont + 1
});
//end add event

//eliminate event
$("#eliminate").click(function(){
	cont = cont - 1
	$("#tr-id"+cont).remove();

})
//end eliminate event


//calculate event
$("#calculate").click(function(){

	reset()
	
if (qu == true) {
	console.log("acti")
}else{
	console.log("desac")
}
//asignment validate values	
for (var i = 0 ; i < cont; i++) {
getName[i] = document.getElementById("proceso"+i).value;
getTllega[i] = document.getElementById("tll"+ i).value;
getTraf[i] = document.getElementById("raf"+ i).value;
getPrior[i] = document.getElementById("prior"+ i).value;
}

if (qu == true) {
	var quantum = document.getElementById("quant").value
	for (var i = 0 ; i < cont; i++) {
	if (!isName.test(getName[i]) || !isValues.test(getTllega[i]) || !isValues.test(getTraf[i]) || !isValues.test(getPrior[i]) || !isValues.test(quantum)) {
		valid = false;
		break;
	}else{
		valid = true;
		continue;
	}
}
}else{

for (var i = 0 ; i < cont; i++) {
	if (!isName.test(getName[i]) || !isValues.test(getTllega[i]) || !isValues.test(getTraf[i]) || !isValues.test(getPrior[i])) {
		valid = false;
		break;
	}else{
		valid = true;
		continue;
	}
}
}
//end asignment validate values	


if (valid == true) {
document.getElementById("SecondContainer").style.display = "block";
document.getElementById("results1").style.display = "block";
document.getElementById("results2").style.display = "block";

for (var i = 0 ; i < cont; i++) {
//assignment values
	procesos[i] = {
		"name":getName[i],	
		"Tllega":getTllega[i],
		"Traf":getTraf[i],
		"TrafPivo":getTraf[i],
		"Tprior":getPrior[i],
		"Te":document.getElementById("tee"+ i),
		"Tr":document.getElementById("trr"+ i),
		"Tfna":0,
		"Tian":0
	}
}
//assignment values end

//sort functions
function sortByTllega(elem1, elem2) {return eval(elem1.Tllega) > eval(elem2.Tllega);}
function sortByTraf(elem1,elem2) {return eval(elem1.Traf) > eval(elem2.Traf);}
function sortByTprior(elem1,elem2) {return eval(elem1.Tprior) > eval(elem2.Tprior);}
//end sort functions

//grant diagram
	function grant (){	
	$("#Grandcontainer").append("<output id=grantl>"+lasto+"</output>")
	$("#Grandcontainer").append("<output id=grantn>"+procesos[i].name+"</output>")
	}

	function grantRobin (){	
	$("#Grandcontainer").append("<output id=grantl>"+lasto+"</output>")
	$("#Grandcontainer").append("<output id=grantn>"+pivot2[i].name+"</output>")
	}
	//end grant diagram

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

	/*//check continue if all be 0
	for (var i = 0; i < cont; i++) {
		if(eval(procesos[i].Tllega) != 0){
			checkcontinue = false;
			break;
		}else{
			checkcontinue = true;
			continue;
		}
	}//end checkcontine if all be 0*/

//choose checkmethod
if ($('#FCFS').prop('checked')) {
	//FCFS sort function
	procesos.sort(sortByTllega)
	//end FCFS sort function
}else if($('#SJF').prop('checked')){
		// SJF Sort
		
// check if someone choked
	let longintud = procesos.length;
	pivot2 = procesos.slice()
	for (let i = 0; i < longintud; i++) {
		let before = procesos[i];
		let shocked = false;
		for (let j = 0; j < longintud; j++) {
			let next = procesos[j];
			if(next === undefined || before === undefined) continue;
			if(before.name === next.name) continue;
			if(before.Traf === next.Traf) {
				pivot.push(next);
				procesos.splice(j, 1);
				longintud = procesos.length;
				shocked = true;
				j--;
			}
		}

		if(shocked) {
			pivot.push(before);
			procesos.splice(i, 1);
			i=0;		
		}
	}
	pivot.sort(sortByTllega)
	if (pivot.length === pivot2.length) {
		procesos=[]
		procesos=pivot.slice()
	}else{	
	procesos = procesos.concat(pivot)
	}
	pivot = []
	pivot2=[]

// end check if someone shoked


		// way if just one 0 exist or not
		if (checkmethod == true) {
		for (var i = 0; i < cont; i++) {
			if(eval(procesos[i].Tllega) == 0){
				pivot[contador] = procesos[i]
				contador = contador + 1 
				
			}else{
				pivot2[contador2] = procesos[i]
				contador2 = contador2 + 1
				continue;
			}

		}
		pivot.sort(sortByTraf)
		pivot2.sort(sortByTraf)
		procesos = pivot.concat(pivot2)

		}else{
			// sort by raf time
			procesos.sort(sortByTraf)
			console.log(checkmethod)
			// sort by raf time
		}
		//end way if just exist one
	
	//end if all be 0
}else if($('#priority').prop('checked')){

		// Priority Sort
		procesos.sort(sortByTprior)
		//end priority sort

}
//end choose checkmethod

// como operar segun el algortimo

lasto = eval(procesos[0].Tllega)
if($('#Round').prop('checked')){
	pivot2 = procesos.slice()
	eval(quantum);
if (quantum == 0) {
	for (var i = 0; i < pivot2.length; i++) {
		grant()
		lasto= lasto + eval(pivot2[i].Traf)
	}
}else{

while (pivot.length != procesos.length){

		for (var i = 0; i < pivot2.length; i++) {
			if (eval(pivot2[i].Traf) <= eval(quantum) ) {
				pivot2[i].Tian = lasto
				if (pivot2[i].Traf == 0) {
					break;
				}
				grantRobin()
				lasto= lasto + eval(pivot2[i].Traf)
				pivot2[i].Tfna = lasto
				pivot2[i].Traf = 0
			
			}else{
				pivot2[i].Traf = pivot2[i].Traf - quantum
				pivot2[i].Tian = lasto
				grantRobin()
				pivot2[i].Tfna = lasto
				lasto = lasto + eval(quantum)
			}
		}

		for (var u = 0; u < pivot2.length; u++) {
			if (pivot2[u].Traf == 0) {
				pivot[contador] = pivot2[u]
				contador++
				pivot2.splice(u,1)
			}
		}

	
}
	
}

for (var z = 0; z < pivot.length; z++) {
	pivot[z].Te = pivot[z].Tfna - pivot[z].Tllega - pivot[z].TrafPivo
	pivot[z].Tr = pivot[z].Tfna - pivot[z].Tllega
}
procesos = pivot.slice()
for (var current = 0; current < cont; current++) {
	
	$("#tble-second").append("<tr><td id=tnn> "+procesos[current].name +" </td><td id=tee>"+ procesos[current].Te +"</td> <td id=trr>"+ procesos[current].Tr +"</td></tr>")
}

	
}else{

//calculate second function
for (var i = 0; i < cont; i++) {
	
	bento = lasto - eval(procesos[i].Tllega)
	grant()
	lasto= lasto + eval(procesos[i].Traf)
	procesos[i].Te = bento
	procesos[i].Tr = lasto
	$("#tble-second").append("<tr><td id=tnn> "+procesos[i].name +" </td><td id=tee>"+ procesos[i].Te +"</td> <td id=trr>"+ procesos[i].Tr +"</td></tr>")
}
//calculate second function

}// end como operar segun el algortimo


//last grant line
$("#Grandcontainer").append("<output id=grantl>"+lasto+"</output>")
//end last grant line

//calculate proms
for (var i = 0; i < cont; i++) {
	teprom = teprom + eval(procesos[i].Te)
	trprom = trprom + eval(procesos[i].Tr)

}
trpromRes = trprom/cont
tepromRes = teprom/cont

$("#thirtContainer").append("<p id=resum>el tiempo de espera promedio es de "+tepromRes+" ms</p>")
$("#thirtContainer").append("<p id=resum>el tiempo de respuesta promedio es de "+trpromRes+" ms</p>")
//end calculate proms

}else{
	console.log("nope")
}

});

});