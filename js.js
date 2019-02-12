// Danny de Jonge, Pizza calculator

var $count = 0;

var allPizza = ['Pizza Hawaii', 'Pizza Salami', 'Pizza Calzone'];
var allPrices = [5, 4, 6];
var countPizza = [0, 0, 0];

var allToppings = ['Peper', 'Kruiden', "Ui", "Augurk", "Tomaat"];
var allToppingPrices = [1, 2, 1, .5, .2];

// var allToppingSelected = [false, false, false, false, false];
/*
var allToppings = [
	{name:"Peper", price:1, selected:false},
	{name:"Peper", price:1, selected:false},
	{name:"Peper", price:1, selected:false},
	{name:"Peper", price:1, selected:false},
	{name:"Peper", price:1, selected:false}
];
*/

var allSizes = ['Normal', 'Medium', 'Large', 'Extra'];
var sizesMulti = [1, 1.5, 2, 2.5];

var allSlices = ['Heel', 'Half', 'Kwart'];
var slicesDivided = [1, 2, 3];

var allPayment = ['Basis', 'Pin'];
var paymentMin = [0, 2];

var allService = ['Afhalen' , 'Bezorgen'];
var servicePlus = [0, 5];

var countPrice = [];
var multiPriceArray = [];

var sum = 0;
var newSum = 0;
var sliceSum = 0;
var paymentSum = 0;
var serviceSum = 0;

function reload(){
	location.reload();
}

function startPizza(){

	document.getElementById('pizzaInfo').style.display = 'none';
	document.getElementById('homePage').style.display = 'block';

	for (i = 0; i < allPizza.length; i++) { 

		if (document.getElementById("pizzalist" + i) == null) {

			var tr = document.createElement("tr");
			tr.setAttribute("id", "pizzalist" + i);
			document.getElementById('tbody').appendChild(tr);

			var tdP = document.createElement("td");
			tdP.setAttribute("id", i);
			document.getElementById('pizzalist' + i).appendChild(tdP);

			var tdN = document.createElement("td");
			tdN.setAttribute("id", "myTdN" + i);
			document.getElementById('pizzalist' + i).appendChild(tdN);

			document.getElementById('myTdN' + i).innerHTML = countPizza[0];

			document.getElementById(i).innerHTML = allPizza[i];

		}

		document.getElementById(i).onclick = function(){
			clickPizza(this.id);
		}
	}
}

function clickPizza($id) {

	$count++;
	countPizza[$id] = $count;

	document.getElementById($id).style.color = 'darkgreen';

	var homePage = document.getElementById('homePage');
	var pizzaInfo = document.getElementById('pizzaInfo');
	var pizzaName = document.getElementById('pizzaName');
	var pizzaPicture = document.getElementById('pizzaPicture');
	var pizzaPrice = document.getElementById('pizzaPrice');

	homePage.style.display = 'none';
	pizzaInfo.style.display = 'block';

	pizzaName.innerHTML = allPizza[$id];
	pizzaPicture.src = allPizza[$id] + ".jpg";

	pizzaPrice.innerHTML = '€' + allPrices[$id];

	var $price = allPrices[$id];
	countPrice.push($price);

	sum = countPrice.reduce(add, 0);

	function add(a, b){
		return a+b;
	}

	var toppingUl = document.createElement("ul");
	toppingUl.setAttribute("id", 'toppingUl');
	document.getElementById('dynamicDiv').appendChild(toppingUl);

	for (a = 0; a < allToppings.length; a++) { 

		var toppingText = document.createTextNode(allToppings[a] + ' ' + '€' + allToppingPrices[a]);
		var toppingLi = document.createElement("li");
		toppingLi.appendChild(toppingText);
		toppingLi.setAttribute("id", 't' + a);
		document.getElementById('toppingUl').appendChild(toppingLi);

		document.getElementById('t'+a).onclick = function(){
			clickTopping(this.id);
		}
	}

	var nextButton = document.createElement('button');
	nextButton.setAttribute('id', 'buttonId')
	document.getElementById('dynamicDiv').appendChild(nextButton);

	nextButtonId = document.getElementById('buttonId');
	nextButton.setAttribute('class', 'btn btn-outline-dark');

	nextButtonId.innerHTML = 'Next';
	document.getElementById('buttonId').onclick = function(){
		sizeAction();
	}
}

function clickTopping($id) {

	document.getElementById($id).style.color = 'green';

	var $newId = $id.slice(-1);
	countPrice.push(allToppingPrices[$newId]);

	sum = countPrice.reduce(add, 0);

	function add(a, b){
		return a+b;
	}

	document.getElementById('pizzaPrice').innerHTML = '€' + sum;
}

function sizeAction()
{
	document.getElementById('toppingUl').style.display = 'none';
	document.getElementById('dynamicH2').innerHTML = 'Choose size'
	document.getElementById('buttonId').style.display = 'none';

	var sizeUl = document.createElement('ul');
	sizeUl.setAttribute('id', 'sizeUl');
	document.getElementById('dynamicDiv').appendChild(sizeUl);

	for (s = 0; s < allSizes.length; s++) {  
		var sizeText = document.createTextNode(allSizes[s]);
		var sizeLi = document.createElement("li");
		sizeLi.appendChild(sizeText);
		sizeLi.setAttribute('id', 's' + s);
		document.getElementById('sizeUl').appendChild(sizeLi);

		document.getElementById('s' + s).onclick = function(){
			clickSize(this.id);
		}
	}
}

function clickSize($id){

	document.getElementById($id).style.color = 'green';

	var $newId = $id.slice(-1);

	var multiPrice = sum * sizesMulti[$newId];
	multiPriceArray.push(multiPrice);

	newSum = multiPriceArray.reduce(add, 0);

	function add(a, b){
		return a+b;
	}

	document.getElementById('pizzaPrice').innerHTML = '€' + newSum;

	sliceAction();
}

function sliceAction(){

	document.getElementById('sizeUl').style.display = 'none';
	document.getElementById('dynamicH2').innerHTML = 'Choose slice';

	var sliceUl = document.createElement('ul');
	sliceUl.setAttribute('id', 'sliceUl');
	document.getElementById('dynamicDiv').appendChild(sliceUl);

	for (sl = 0; sl < allSlices.length; sl++) {  
		var sliceText = document.createTextNode(allSlices[sl]);
		var sliceLi = document.createElement("li");
		sliceLi.appendChild(sliceText);
		sliceLi.setAttribute('id', 'sl' + sl);
		document.getElementById('sliceUl').appendChild(sliceLi);

		document.getElementById('sl' + sl).onclick = function(){
			clickSlice(this.id);
		}
	}
}

function clickSlice($id) {

	document.getElementById($id).style.color = 'green';

	var $newId = $id.slice(-1);
	var $newestId = $newId.slice(-1);

	sliceSum = newSum / slicesDivided[$newestId];

	document.getElementById('pizzaPrice').innerHTML = '€' + sliceSum;

	chooseAction();
}

function chooseAction(){

	document.getElementById('sliceUl').style.display = 'none';
	document.getElementById('dynamicH2').innerHTML = 'Do you want to order now?'

	var chooseBTN1 = document.createElement('button');
	chooseBTN1.setAttribute('id', 'chooseBTN1');
	chooseBTN1.innerHTML = 'Nu bestellen'
	chooseBTN1.setAttribute('class', 'btn btn-outline-dark');
	document.getElementById('dynamicDiv').appendChild(chooseBTN1);

	chooseBTN1.onclick = function(){
		paymentAction();
	}

	var chooseBTN2 = document.createElement('button');
	chooseBTN2.setAttribute('id', 'chooseBTN2');
	chooseBTN2.innerHTML = 'Nog een pizza maken';
	chooseBTN2.setAttribute('class', 'btn btn-outline-dark');
	document.getElementById('dynamicDiv').appendChild(chooseBTN2);


}


function paymentAction(){

	document.getElementById('chooseBTN1').style.display = 'none';
	document.getElementById('chooseBTN2').style.display = 'none';

	document.getElementById('dynamicH2').innerHTML = 'Choose payment'

	var paymentUl = document.createElement('ul');
	paymentUl.setAttribute('id', 'paymentUl');
	document.getElementById('dynamicDiv').appendChild(paymentUl);

	for (p = 0; p < allPayment.length; p++) {  
		var paymentText = document.createTextNode(allPayment[p]);
		var paymentLi = document.createElement("li");
		paymentLi.appendChild(paymentText);
		paymentLi.setAttribute('id', 'p' + p);
		document.getElementById('paymentUl').appendChild(paymentLi);

		document.getElementById('p' + p).onclick = function(){
			clickPayment(this.id);
		}
	}
}

function clickPayment(id){

	document.getElementById(id).style.color = 'green';

	var $newId = id.slice(-1);

	paymentSum = sliceSum - paymentMin[$newId];

	document.getElementById('pizzaPrice').innerHTML = '€' + paymentSum;

	serviceAction();
}

function serviceAction(){

	document.getElementById('paymentUl').style.display = 'none';
	document.getElementById('dynamicH2').innerHTML = 'Choose service'

	var serviceUl = document.createElement('ul');
	serviceUl.setAttribute('id', 'serviceUl');
	document.getElementById('dynamicDiv').appendChild(serviceUl);

	for (se = 0; se < allService.length; se++) {  
		var serviceText = document.createTextNode(allService[se]);
		var serviceLi = document.createElement("li");
		serviceLi.appendChild(serviceText);
		serviceLi.setAttribute('id', 'se' + se);
		document.getElementById('serviceUl').appendChild(serviceLi);

		document.getElementById('se' + se).onclick = function(){
			clickService(this.id);
		}
	}
}

function clickService(id){

	document.getElementById(id).style.color = 'green';

	var $newId = id.slice(-1);
	var $newestId = $newId.slice(-1);

	serviceSum = paymentSum + servicePlus[$newestId];

	document.getElementById('pizzaPrice').innerHTML = '€' + serviceSum;

	finishAction();
}

function finishAction(){
	document.getElementById('pizzaName').innerHTML = 'Je kunt nu bestellen :-)';
	document.getElementById('dynamicDiv').style.display = 'none';

	var chooseBTN3 = document.createElement('button');
	chooseBTN3.setAttribute('id', 'chooseBTN3');
	chooseBTN3.innerHTML = 'Home';
	chooseBTN3.setAttribute('class', 'btn btn-outline-dark');
	document.getElementById('pizzaInfo').appendChild(chooseBTN3);
	
	chooseBTN3.onclick = function(){
		reload();
	}
}