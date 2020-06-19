// NAVIGATION FUNCTIONALITY
// Initial document set to show home page
document.getElementById("homePage").style.display = "block";
document.getElementById("foodPage").style.display = "none";
document.getElementById("drinkPage").style.display = "none";
document.getElementById("userPage").style.display = "none";

// SHOW HOME PAGE
// Data structure of each single meal 
// var mealObj = {
//     mName:"Fried Chicken",
//     mRecipe:"",
//     mIngreQty:[{mIngre:"lemon", mInQty:"4 teaspoon"}],
//     mPic:""
// }

// // Array List of favorite Recipes
// var arrayR = [];

// id="home" button
// id="homePage" section
$("#home").on("click", showHome);
function showHome() {
    console.log("Enter showHome");
    document.getElementById("homePage").style.display = "block";
    document.getElementById("foodPage").style.display = "none";
    document.getElementById("mealResult").style.display = "none";
    document.getElementById("drinkPage").style.display = "none";
    document.getElementById("userPage").style.display = "none";
};

//DROPDOWNS Functionality: Food and Drink page
$('.ui.dropdown')
    .dropdown();

// ***** FOR NARGIZA TO EDIT

// BUTTON TO SHOW RANDOM DRINK SECTION
// id="randomGlass" section on load
// id="randomDrink" section after clicks

// SHOW RANDOM DRINK SECTION
// button
// id="randomDrink"
// ***** FOR NARGIZA'S CODE FOR RANDOM DRINK start
// var randomDrinkArr=["collins","martini","oldFashion","shots","masonJar","margarita"];

var getRandomDrinkBtn = document.getElementById('collins');
var getRandomDrinkContainer = document.getElementById('randomDrinkResult');

getRandomDrinkBtn.addEventListener('click', () => {
	fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
		createRandomDrink(res.drinks[0]);
	});
});

var createRandomDrink = (drinks) => {
	var ingredients = [];
	// Get all ingredients from the object. Up to 15
	for(let i=1; i<=15; i++) {
		if(drinks[`strIngredient${i}`]) {
			ingredients.push(`${drinks[`strIngredient${i}`]} - ${drinks[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
        }
        document.getElementById("homePage").style.display = "block";
        document.getElementById("foodPage").style.display = "none";
        document.getElementById("drinkPage").style.display = "none";
        document.getElementById("userPage").style.display = "none";
        document.getElementById("headingStyle").style.display = "none";
        document.getElementById("moodText").style.display = "none";
        // document.getElementById("glassContainer").style.display = "none";
	}
	
	var newInnerHTML = `
		<div class="row">
			<div>
				<img src="${drinks.strDrinkThumb}" alt="drinks Image">
				${drinks.strCategory ? `<p><strong>Category:</strong> ${drinks.strCategory}</p>` : ''}
                ${drinks.strGlass ? `<p><strong>Glass Type:</strong> ${drinks.strGlass}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div>
				<h2>${drinks.strDrink}</h2>
				<p>${drinks.strInstructions}</p>
			</div>
		</div>
	`;
	
	getRandomDrinkContainer.innerHTML = newInnerHTML;
}

//END OF NARGIZAS CODING

// Function to show recipe card
function showRandomDrinkSection(){
    document.getElementById("randomGlass").style.display = "none";
    document.getElementById("randomDrink").style.display = "block";
}

// SHOW RANDOM DRINK SECTION
// button
// id="randomDrink"

// SHOW FOOD MAIN PAGE
// id="food" button
// id="foodPage"
$("#food").on("click", showFoodPage);
function showFoodPage() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("foodPage").style.display = "block";
    document.getElementById("drinkPage").style.display = "none";
    document.getElementById("userPage").style.display = "none";
};

// Listener for Meal Search
$("#searchMeal").on("click", mealList);

// API call to retrieve Receipe Name, instruction, pic, quantity
function mealList(event) {
    //get user meal input
    var mealChoice = $("#mealInput").val();
    console.log("User input", mealChoice);

    var fURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealChoice;

    $.ajax({
        url: fURL,
        method: "GET"
    }).then(processData)
} // end mealList


function processData(fObject) {
    console.log("food object is:", fObject, " with ", fObject.meals.length, " meals inside");


    var numFood = fObject.meals.length; // # of meals suggested

    for (var mealCnt = 0; mealCnt < numFood; mealCnt++) {

        //Create new mealObj
        var mealObj = {};
        mealObj['mName'] = fObject.meals[mealCnt].strMeal;
        mealObj['mInst'] = fObject.meals[mealCnt].strInstructions;
        mealObj['mPic'] = fObject.meals[mealCnt].strMealThumb;

        mealObj['mIngreQty'] = []; // Array to store multiple Ingredients for that same meal


        // Initialize the first ingredent and qty index
        var index = 1;
        var ingre = "strIngredient" + index;
        var ingreQty = "strMeasure" + index;

        // If ingredent field is not blank AND searched <= max 20
        while ((fObject.meals[mealCnt][ingre] != "") && (index <= 20)) {

            // create Dict for Ingredient/Qty, on that index (ingredent #)  
            mealObj['mIngreQty'][index] = {};

            // assign Ingredient Name, and Qty to this new key/value pair.
            mealObj['mIngreQty'][index - 1] = { 'mIngre': fObject.meals[mealCnt][ingre], 'mIQty': fObject.meals[mealCnt][ingreQty] };
            //mealObj['mIngreQty'][index - 1] = { 'mIngreQty': fObject.meals[mealCnt][ingreQty] };

            index++;
            // New property name base on next index
            var ingre = "strIngredient" + index;
            var ingreQty = "strMeasure" + index;
        } // end While

        console.log("Exit While, meal number ", mealCnt);
        console.log("This meal obj is: ", mealObj, index);
        renderNamePic(mealObj);
    }// end For.

    // Display Food on Food container "foodList"
    function renderNamePic(mealObj) {
        var fName = $("<h2>").text(mealObj.mName).addClass("star outline icon");
        var fPic = $("<img>").attr("src", mealObj.mPic).addClass("ui fluid image rounded");
        var fNamePic = $("#foodList").append(fName, fPic).addClass("seven wide column pusher");
        //var fHeight = $("#foodList").height();
        renderIng(mealObj, fNamePic);

    }

    function renderIng(mealObj, fNamePic) {
        var i = 0;
        var iuiList = $("<div>").addClass("ui celled unordered list");

        while (i <= 10) {
            var inDetail = $("<div>").text(mealObj.mIngreQty[i].mIQty + " " + mealObj.mIngreQty[i].mIngre).addClass("item");
            iuiList.append(inDetail);
            i++;
        }
        //$("#fDetails").append(iuiList);
        renderInst(mealObj, iuiList, fNamePic);

    }

    function renderInst(mealObj, iuiList, fNamePic) {
        // Display Instruction on the right
        
        
        var item = $("<div>").addClass("item");
        var content = $("<div>").addClass("content");
        var direction = $("<a>").text("Directions").addClass("header");
        var description = $("<div>").addClass("description")
        var fInst = $("<p>").text(mealObj.mInst);
        var instC = $("<div>").append(item, content, direction, description,fInst).addClass("ui items");

        var ingInstCon = $("<div>").append(iuiList,instC).addClass("seven wide column row");
        var mContainer = $("<div>").append(fNamePic, ingInstCon).addClass("three column row");
        $("#mealResult").append(mContainer);
    } // end renderInst

    





    // After received results, call mealListRender() for each one
} // end Process Data



// SHOW DRINK MAIN PAGE
// id="drink" button
// id="drinkPage" section
$("#drink").on("click", showDrinkPage);
function showDrinkPage() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("foodPage").style.display = "none";
    document.getElementById("drinkPage").style.display = "block";
    document.getElementById("userPage").style.display = "none";
};

$('#searchDrink').on('click', drinkList);

function drinkList(event) {
    var drinkChoice = $('#drinkInput').val();
    console.log('userInput ' + drinkChoice);
    //get api endpoint
    var dURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkChoice;
    $.ajax({
        url:dURL,
        method:'GET'
    }).then(function(data){
        //grab photo from data and attr on page
        var drink = data.drinks[0];
        var drinkImage = drink.strDrinkThumb;
        $('#drinkImage').attr('src', drinkImage);
        // grab instruction from data and .text it to page
        var drinkInstructions = drink.strInstructions;
        $('#drinkInstructions').text(drinkInstructions);
         
        // strIngredient1
        // loop through the drink ingredients
        for (var i = 1; i < 16; i++) {
            
            var ingredient = drink["strIngredient" + i];
            // ingredient will be either a string or null
            if (ingredient === null) {
                break;
            }
            // add to the drinkIngredients
            // pretend we have <ul id="drinkIngredients"><li></li></ul> in the html
            $("#drinkIngredients").text("<li>" + ingredient + "</li>")
          }
    })

}


//interact with api. get data from api. extract image directions and ingridents
//display drink info



// SHOW USER PROFILE
// id="user" button
// id="userPage" section
$("#user").on("click", showUserProfile);
function showUserProfile() {
    console.log("Enter showUserProfile");
    document.getElementById("homePage").style.display = "none";
    document.getElementById("foodPage").style.display = "none";
    document.getElementById("drinkPage").style.display = "none";
    document.getElementById("userPage").style.display = "block";
};