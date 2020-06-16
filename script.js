// NAVIGATION FUNCTIONALITY
// Initial document set to show home page
document.getElementById("homePage").style.display = "block";
document.getElementById("foodPage").style.display = "none";
document.getElementById("drinkPage").style.display = "none";
document.getElementById("userPage").style.display = "none";

// Data structure of each single meal 
// var mealObj = {
//     mName:"Fried Chicken",
//     mRecipe:"",
//     mIngreQty:[{mIngre:"lemon", mInQty:"4 teaspoon"}],
//     mPic:""
// }

// Array List of favorite Recipes
var arrayR = [];

// id="home" button
// id="homePage"
$("#home").on("click", showHome);
function showHome(){
    console.log("Enter showHome");
    document.getElementById("homePage").style.display = "block";
    document.getElementById("foodPage").style.display = "none";
    document.getElementById("drinkPage").style.display = "none";
    document.getElementById("userPage").style.display = "none";
};

// SHOW FOOD MAIN PAGE
// id="food" button
// id="foodPage"
$("#food").on("click", showFoodPage);
function showFoodPage(){
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
    
    $.ajax ({
        url:fURL,
        method:"GET"
    }).then(processData)
} // end mealList


function processData(fObject) {
    console.log("food object is:", fObject);

    var foodName = fObject.meals[0].strMeal;
    var foodInst = fObject.meals[0].strInstructions;
    var foodPic = fObject.meals[0].strMealThumb;

    //Create new mealObj
    var mealObj={};
    mealObj['mName'] = foodName;
    mealObj['mInst'] = foodInst;
    mealObj['mPic'] = foodPic;
    mealObj['mIngreQty']=[]; // Array to store multiple Ingredients for that same meal

    // Below will retrive an unknown number of ingredients.
    // Loop thru max 20 ingredients/qty
    // Initialize the first ingredent and qty index
    var index = 1;
    var ingre = "strIngredient" + index;
    var ingreQty = "strMeasure" + index;

    // If ingredent field is not blank And searched <= 20
    while ((fObject.meals[0][ingre] != "") && (index <= 20)) {
        
        console.log(" Ingredient: ", index, ": ", fObject.meals[0][ingre]);
        console.log(" Quantity: ", fObject.meals[0][ingreQty]);
        
        // create Dict for Ingredient/Qty, on that index (ingredent #)  
        mealObj['mIngreQty'][index]={};

        // assign Ingredient Name, and Qty to this new key/value pair.
        mealObj['mIngreQty'][index-1]={'mIngre':fObject.meals[0][ingre]};
        mealObj['mIngreQty'][index-1]={'mIngreQty':fObject.meals[0][ingreQty]};

        index++;
        // New property name base on next index
        var ingre = "strIngredient" + index;
        var ingreQty = "strMeasure" + index;
        
        console.log("This meal obj is: ", mealObj);

    } // end While
   

 

    // After received results, call mealListRender() for each one
} // end Process Data



// SHOW DRINK MAIN PAGE
// id="drink" button
// id="drinkPage"
$("#drink").on("click", showDrinkPage);
function showDrinkPage(){
    document.getElementById("homePage").style.display = "none";
    document.getElementById("foodPage").style.display = "none";
    document.getElementById("drinkPage").style.display = "block";
    document.getElementById("userPage").style.display = "none";
};

// SHOW USER PROFILE
// id="user" button
// id="userPage"
$("#user").on("click", showUserProfile);
function showUserProfile(){
    console.log("Enter showUserProfile");
    document.getElementById("homePage").style.display = "none";
    document.getElementById("foodPage").style.display = "none";
    document.getElementById("drinkPage").style.display = "none";
    document.getElementById("userPage").style.display = "block";
};