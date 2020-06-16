// NAVIGATION FUNCTIONALITY
// Initial document set to show home page
document.getElementById("homePage").style.display = "block";
document.getElementById("foodPage").style.display = "none";
document.getElementById("drinkPage").style.display = "none";
document.getElementById("userPage").style.display = "none";

// SHOW HOME PAGE
$("#home").on("click", showHome);
// id="home" button
// id="homePage"
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
    console.log("Enter showFoodPage");
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

    // loop thru max 20 ingredients
    var index = 1;
    abc = "strIngredient"+ index;
    while (fObject.meals[0].("strIngredient"+index)) {
        console.log("Success");
        if ((fObject.meals[0].("strIngredient" + index) =="")) {
            index++;
            console.log("food ingredit");
        } // end If
    } // end While
   
    var foodIngre 
    console.log("meal name:", foodName);
    console.log("meal name:", foodInst);

    // After received results, call mealListRender() for each one
}



// SHOW DRINK MAIN PAGE
// id="drink" button
// id="drinkPage"
$("#drink").on("click", showDrinkPage);
function showDrinkPage(event){
    event.preventDefault();
    event.stopPropagation();

    console.log("Enter showDrinkPage");
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