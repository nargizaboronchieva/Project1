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


// BUTTON TO SHOW RANDOM DRINK SECTION
// id="randomGlassSubmit" button
// id="randomGlass" section
// id="randomDrink" section
$("#randomGlassSubmit").on("click", showRandomDrinkSection);
function showRandomDrinkSection() {
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
        mealObj['mPic'] = fObject.meals[mealCnt].strInstructions;

        mealObj['mIngreQty'] = []; // Array to store multiple Ingredients for that same meal

        // Below will retrive an unknown number of ingredients.
        // Loop thru max 20 ingredients/qty
        // Initialize the first ingredent and qty index
        var index = 1;
        var ingre = "strIngredient" + index;
        var ingreQty = "strMeasure" + index;

        // If ingredent field is not blank And searched <= 20
        while ((fObject.meals[mealCnt][ingre] != "") && (index <= 20)) {

            // create Dict for Ingredient/Qty, on that index (ingredent #)  
            mealObj['mIngreQty'][index] = {};

            // assign Ingredient Name, and Qty to this new key/value pair.
            mealObj['mIngreQty'][index - 1] = { 'mIngre': fObject.meals[mealCnt][ingre], 'mIngreQty': fObject.meals[mealCnt][ingreQty] };
            //mealObj['mIngreQty'][index - 1] = { 'mIngreQty': fObject.meals[mealCnt][ingreQty] };


            index++;
            // New property name base on next index
            var ingre = "strIngredient" + index;
            var ingreQty = "strMeasure" + index;
        } // end While

        console.log("Exit While, meal number ", mealCnt);
        console.log("This meal obj is: ", mealObj);
    
    }// end For.





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

function drinkList (event) {
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