var gotchi = require('./tamagotchi');

///////////////// READLINE SECTION ///////////////// 

// initiate readline
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "\nCual es el Proximo \n JUega (type p), Come (f), DUerme (s), Pelea (b), Resetear (r), salir (q) "
});

var pet;
var beast;

// create pet
function createPet(answer){
	var pet = new gotchi.data.Pet(answer,5,5,5);
	return pet;
}

// grab pet stats and formulate a legible message
function showStats() {
   var infoName = '\n' + pet.name.toUpperCase() + "'s life: ";
   var infoParameters = "Felicidad " + pet.happiness + ",  Comida: " + pet.food + ", Energia: " + pet.energy;
   var stats = infoName + infoParameters;
   return stats;
 }


// ask for name and create a new pet object
initiatePet = function(answer){
	pet = createPet(answer);
	var intro = "\nFelicidades Tu Persionaje " + answer.toUpperCase() + " Fue Creado Creado!\n"
	console.log(intro, showStats());
	rl.prompt();
}

rl.question('Como llamaras a tu Pesonaje ', initiatePet);


rl.on('line', (line) => {
  switch (line) {
    case 'p':
			var outcome = pet.play();
      console.log(showStats());
			if (outcome === 1) {rl.question('\nComo quieres Nombrear a tu Pesonaje? ', initiatePet);}
			else if (outcome === 2) {console.log("\n~~~~~~~ Chau chau chauu! ~~~~~~~~"); process.exit(0);}
      break;
		case 'f':
			outcome = pet.feed();
      console.log(showStats());
			if (outcome === 1) {rl.question('\nComo quieres Nombrear a tu Pesonaj? ', initiatePet);}
			else if (outcome === 2) {console.log("\n~~~~~~~ Bye Bye! ~~~~~~~~"); process.exit(0);}
      break;
		case 's':
			outcome = pet.sleep();
      console.log(showStats());
			if (outcome === 1) {rl.question('\nComo quieres Nombrear a tu Pesonaje? ', initiatePet);}
			else if (outcome === 2) {console.log("\n~~~~~~~ Bye Bye! ~~~~~~~~"); process.exit(0);}
      break;
		case 'b':
			var answer = pet.battle(); // create beast, compare numbers, return 0 if pet died
			if (answer === 0) {rl.question('\nComo quieres Nombrear a tu Pesonaje?', initiatePet);}
			break;
		case 'r':
			console.log("\n^^^^^^^ Tu Pesonaje" + pet.name.toUpperCase() + " esta Viejito .  Lo tubimos q mandar al Asilo! ^^^^^^^\n");
			rl.question('\nNow, how do you want to name your NEW friend? ', initiatePet);
      break;
		case 'q':
			console.log("\n~~~~~~~ Nos Vemos! ~~~~~~~~");
  		process.exit(0);
			break;
    default:
      console.log("\n******* Perdon pero esto no se puede hacer *******"); // if user typed in anything else than what is understood as proper commands
      break;
  }
  rl.prompt();
});

