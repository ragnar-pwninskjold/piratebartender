//question constructor
var Question = function(questions) {
	this.questions = questions;
};
//places an array of ingredients in the pantry
var Pantry = function(pantry) {
	this.pantry = pantry;
};
//Puts all of the available ingredients in an array
var Ingredients = function(ingredients) {
	this.ingredients = ingredients;
};
//creates a drink based upon preferences
var Drink = function (preferences) {
	this.preferences = preferences;
	console.log(preferences);
	arrayToLoop = preferences[0];
	//initiatlize an empty array for the chosen ingredients
	drinkArray = [];
	this.makeDrink = function () {
		//go through each array of ingredients (e.g. strong ingredients, salty ingredients, etc)
		$.each(arrayToLoop, function(i, pref) {
			//generate a random number which will serve as a random index position in each of the above arrays
			ind = numGenerator(0,3);
			itemToPush = arrayToLoop[i][ind];
			//push the random ingredient to the drink array
			drinkArray.push(itemToPush);
		});
		return drinkArray;
	}
};


//create questions and ingredient lists
var strong = new Question(["do ye like yer drinks to taste like rubbin' alcohol, me matey?"]);
var salty = new Question(["do ye like it wit a bit o' salty tang?"]);
var bitter = new Question(["are ye a land-lubber who likes it bitter?"]);
var sweet = new Question(["would ye fancy a bit of sweetness in yer drink?"]);
var fruit = new Question(["are ye one for a fruity finish?"]);

var strongIngredients = new Ingredients(["rum", "whiskey", "gin"]);
var saltyIngredients = new Ingredients(["olive", "salt-dusted rim", "rasher of bacon"]);
var bitterIngredients = new Ingredients(["shake of bitters", "splash of tonic", "twist of lemon peel"]);
var sweetIngredients = new Ingredients(["sugar cube", "spoonful of honey", "splash of cola"]);
var fruitIngredients = new Ingredients(["slice of orange", "dash of cassis", "cherry on top"]);
//add all ingredient lists to the pantry
var pantry = new Pantry([strongIngredients,saltyIngredients,bitterIngredients,sweetIngredients,fruitIngredients]);
//add all questions to an array of questions
var questionList = [strong, salty, bitter, sweet, fruit];
//global counter for the question position
count = 0;


$(document).ready(function() {
	//initialize an array of preferred ingredients
	preferences = [];
	//print first question to screen
	generateQuestion();
	$("form").on("submit", function(event) {
		event.preventDefault();
		//if they want it, add it to the preferences array
		var preference = $("input[type='radio']:checked").val();
		if (preference == "yes") {
			preferences.push(pantry.pantry[count-1].ingredients);
		}
		generateQuestion(preferences);
	});


});

function generateQuestion () {
	if (count < questionList.length) {
	var question = questionList[count].questions[0];
	$(".thequestion").text(question);
	count++
	}
	else {
		$(".thequestion").text("that be it for ye choices, lad");
		//make the drink based upon the prefered ingredients chosen
		theBrew = (new Drink([preferences])).makeDrink();
		$(".answers").hide();
		$(".results").prepend("AARRRRAGH! This be yer Drink me matey!:");
		$.each(theBrew, function(i, pref) {
			//print each item in the array to a list
			$(".results ul").append("<li>"+pref+"</li>");
		});
	}
}

function numGenerator(min, max) {
	return Math.floor(Math.random()*(max-min)) + min;
}