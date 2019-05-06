//Decided to use an object here to keep track of stats
var Stats = {
	reps: 0,
	speed: .1,
};

//Upgrades
var Upgrades = {
	HPM: ["HighProteinMeals", 0, 15],
	Steroids: ["Steroids", 0, 75],
	PT: ["PersonalTrainers", 0, 125],
	Sponsor: ["Sponsors", 0, 200],
	AA: ["AnchorArms", 0, 500],
};

//Grab all DOM elements we need
var RepCount = document.getElementById("RepCount");
var bench = document.getElementById("bench-img");

//----------------
// EVENT HANDLING
//----------------
bench.addEventListener("click", function(e){
	//If bench is at rest, change image to etended bench, change name
	if(bench.name == "rest"){
		bench.src = "./bench-extend.png";
		bench.name = "extend";

		//Lets update our RepCount after a rep
		Stats.reps++;
		Math.round(Stats.reps);
		RepCount.innerHTML = "Reps: " + Stats.reps;
	}
	//If extended, change image to rest
	else{
		bench.src = "./bench-rest.png";
		bench.name = "rest";
	}
	//check Buttons
	checkBttn();
});

//Function to handle buying Upgrades
function addUpgrade(i){
	switch(i){
		case 0:
			addU_help(Upgrades.HPM, 0.02);
		break;
		case 1:
			addU_help(Upgrades.Steroids, 0.10);
		break;
		case 2:
			addU_help(Upgrades.PT, 0.2);
		break;
		case 3:
			addU_help(Upgrades.Sponsor, 0.5);
		break;
		case 4:
			addU_help(Upgrades.AA, 1);
		break;
	}
}
//Helper function to addUpgrades()
function addU_help(u, rate){
	//add stats and change related DOM
	var count = ++u[1];
	document.getElementById(u[0]).innerHTML = ": " + count;
	Stats.speed += rate;
	Stats.speed = Math.round(Stats.speed*100) /100;
	document.getElementById("RepRate").innerHTML = "Rate: " + Stats.speed/2 + "/sec";
	
	// subtract current price, make more expensive
	Stats.reps -= u[2];
	Math.round(Stats.reps);
	RepCount.innerHTML = "Reps: " + Stats.reps;
	
	u[2] *= 1.1;
	u[2] = Math.round(u[2]*10) /10;
	
	document.getElementById(u[0]+"Price").innerHTML = "Price: " + u[2] + " Reps";
	checkBttn();
	updateClock();
}


//Disables and Enables Buy buttons until you have enough reps to buy atleast 1
function deBttn(u){
	var bttn = document.getElementById(u[0]+"Bttn");
	if(Stats.reps < u[2]){
		bttn.disabled= true;
		bttn.style.backgroundColor = "grey";
	}
	else{
		bttn.disabled = false;
		bttn.style.backgroundColor = "green";
	}
}
//Checks all upgrades for deBttn
function checkBttn(){
	//check prices of buttons, disable accordingly
	deBttn(Upgrades.HPM);
	deBttn(Upgrades.Steroids);
	deBttn(Upgrades.PT);
	deBttn(Upgrades.Sponsor);
	deBttn(Upgrades.AA);
}


//-----------
// GAME CLOCK
//-----------
var Clock = setInterval(function(){
	checkBttn();
	bench.click();

}, 1000/Stats.speed);

function updateClock(){
	clearInterval(Clock);

	//reset with new speed
	Clock = setInterval(function(){ checkBttn(); bench.click() }, 1000/Stats.speed);
}