/*var ingredients = [
	{
		question: "do ye like yer drinks to taste like rubbin' alcohol, me matey?",
		strong: ["rum", "whiskey", "gin"]
	},
	{
		question: "do ye like it wit a bit o' salty tang?",
		salty: ["olive", "salt-dusted rim", "rasher of bacon"]
	},
	{
		question: "are ye a land-lubber who likes it bitter?",
		bitter: ["shake of bitters", "splash of tonic", "twist of lemon peel"]
	},
	{
		question: "would ye fancy a bit of sweetness in yer drink?",
		sweet: ["sugar cube", "spoonful of honey", "splash of cola"]
	},
	{
		question: "are ye one for a fruity finish?",
		fruit: ["slice of orange", "dash of cassis", "cherry on top"]
	}
];
*/

var Question = function(questions) {
	this.questions = questions;
};

var Pantry = function(pantry) {
	this.pantry = pantry;
};

var Ingredients = function(ingredients) {
	this.ingredients = ingredients;
};

var Drink = function (preferences) {
	this.preferences = preferences;
	this.makeDrink = function () {
		ind = numGenerator(0,3);
		return ind;
	}
};



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


var pantry = new Pantry([strongIngredients,saltyIngredients,bitterIngredients,sweetIngredients,fruitIngredients]);
var questionList = [strong, salty, bitter, sweet, fruit];
console.log(pantry);
console.log(questionList);
count = 0;


$(document).ready(function() {
	preferences = [];
	generateQuestion();
	$("form").on("submit", function(event) {
		event.preventDefault();
		var preference = $("input[type='radio']:checked").val();
		if (preference == "yes") {
			preferences.push(pantry.pantry[count-1].ingredients);
		}
		generateQuestion(preferences);
	});


});

function generateQuestion () {
	if (count < 5) {
	var question = questionList[count].questions[0];
	$(".thequestion").text(question);
	count++
	}
	else {
		$(".thequestion").text("that be it for ye choices, lad");
		theBrew = new Drink([preferences]);
		console.log(theBrew.makeDrink());
		//$(".result").append(theBrew);
		$(".answers").hide();
	}
}

function numGenerator(min, max) {
	return Math.floor(Math.random()*(max-min)) + min;
}