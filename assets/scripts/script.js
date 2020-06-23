// NAVIGATION FUNCTIONALITY
// Initial document set to show home page
document.getElementById("homePage").style.display = "block";
document.getElementById("foodPage").style.display = "none";
document.getElementById("drinkPage").style.display = "none";
document.getElementById("userPage").style.display = "none";

// RESPONSIVE MOBILE MENU
// $(window).resize(function() {
//   // Detect if the resized screen is mobile or desktop width
//       if($(window).width() > 617) {
//           console.log('desktop'); 
//           $('#mobileMenu').sidebar('hide');
//       }
//       else {
//          console.log('mobile');
//       }
//   });

// BUTTON DIRECTS TO FOOD AND DRINK PAGES
function goToFood() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("foodPage").style.display = "block";
}

function goToDrink() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("drinkPage").style.display = "block";
}

// SHOW HOME PAGE
// Data structure of each single meal
// var mealObj = {
//     mName:"Fried Chicken",
//     mRecipe:"",
//     mIngreQty:[{mIngre:"lemon", mInQty:"4 teaspoon"}],  <- ingredientName, Quantity
//     mPic:"",     < Meal Pic
//     mIngLen,     <- Number of Ingredent used in FOR loop
//     mID          <- Index the meal to retreive in array
// }

// // Array List of favorite Recipes
// var arrayR = [];
var fChoice = []; // choice to be selected
var mealDetail;

$("#home").on("click", showHome);
function showHome() {
  console.log("Enter showHome");
  document.getElementById("homePage").style.display = "block";
  document.getElementById("foodPage").style.display = "none";
  //document.getElementById("mealResult").style.display = "none";
  document.getElementById("drinkPage").style.display = "none";
  document.getElementById("userPage").style.display = "none";
}

//DROPDOWNS Functionality: Food and Drink page
$(".ui.dropdown").dropdown();

// Function to show recipe card
function showRandomDrinkSection() {
  document.getElementById("randomGlass").style.display = "none";
  document.getElementById("randomDrink").style.display = "block";
}

//######################## DRINK Section ##########################//

$("#drink").on("click", showDrinkPage);
function showDrinkPage() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("foodPage").style.display = "none";
  document.getElementById("mealResult").style.display = "none";
  document.getElementById("drinkPage").style.display = "block";
  document.getElementById("userPage").style.display = "none";
}

$("#searchDrink").on("click", drinkList);

var drinks;

document.addEventListener("click", function (event) {
  if (!drinks) {
    return;
  }

  var drinkIndex = event.target.id;
  // 1. detect which image was clicked on
  // 2. get drink data from the index
  var drink = drinks[drinkIndex];
  console.log(drink);
  // 3. display the modal
  displayDrink(drink);
});

function drinkList(event) {
  var drinkChoice = $("#drinkInput").val();
  console.log("userInput " + drinkChoice);
  $("#drinkList").empty();
  //get api endpoint
  var dURL =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkChoice;
  $.ajax({
    url: dURL,
    method: "GET",
  }).then((data) => {
    drinks = data.drinks;
    displayDrinkList();
  });
}
function displayDrinkList() {
  //loop through all drinks
  drinks.forEach((drink, i) => {
    //take out image and title of a single drink
    var drinkImage = drink.strDrinkThumb;
    var drinkTitle = drink.strDrink;
    //append to the page
     var drinkName = $("<h2>").text(drinkTitle);
     var drinkStarIcon = $("<i>").attr("class", "right floated star icon");
     drinkName.append(drinkStarIcon);
  
     var drinkPic = $("<img>")
       .attr({src: drinkImage, id: i})
       .addClass("ui fluid image rounded")
       .css("float", "left");
  
     var drinkPicCon = $("<div>")
       .append(drinkName, drinkPic)
       .addClass("seven wide column pusher");
  
     $("#drinkList").append(drinkPicCon).css("display", "block");

     });
  };

function displayDrink(drink) {
  //grab photo from data and attr on page
  // var drink = data.drinks[0];
  $('#drinkList').empty();
  //1. Retrieve data from API call
  var drinkName = drink.strDrink;
  var drinkImage = drink.strDrinkThumb;
  //2. Create and append containers
  var thisRecipeContainer = $('<div>').attr('class', 'seven wide column pusher');
  thisRecipeContainer.appendTo('#drinkList');
  var thisDrinkName = $('<h2>').text(drinkName);
  thisDrinkName.appendTo(thisRecipeContainer);
  var drinkStarIcon = $("<i>").attr({class: "right floated star icon", id: event.target.id});
  drinkStarIcon.appendTo(thisDrinkName);
  var thisDrinkImage = $('<img>').attr("src", drinkImage);
  thisDrinkImage.appendTo(thisRecipeContainer);
  //$("#drinkImage").attr("src", drinkImage);
  // grab instruction from data and .text it to page

  // 3. strIngredient1 loop
  // Create list container
  var ingredientListContainer = $("<div>").attr('class', 'ui celled unordered list')
  ingredientListContainer.appendTo(thisRecipeContainer);
  // loop through the drink ingredients
  for (var i = 1; i < 16; i++) {
    var measure = drink["strMeasure" + i];
    var ingredient = drink["strIngredient" + i];
    if (ingredient === null) {
        break;
    } else if (measure === null){
        var thisDrinkIngredient = $("<div>").attr('class', 'item').text(ingredient);
        thisDrinkIngredient.appendTo(ingredientListContainer);
    } else {
        var thisDrinkIngredient = $("<div>").attr('class', 'item').text(measure + ' ' + ingredient);
        thisDrinkIngredient.appendTo(ingredientListContainer);
    }
    
    // ingredient will be either a string or null
    console.log(ingredient);
    if (ingredient === null) {
      break;
    }
    // add to the drinkIngredients
    // pretend we have <ul id="drinkIngredients"><li></li></ul> in the html
    //$("#drinkIngredients").append("<li>" + ingredient + "</li>");
    }

    var drinkInstructions = drink.strInstructions;
    var thisDrinkInstructions = $('<div>').text(drinkInstructions);
    thisDrinkInstructions.appendTo(thisRecipeContainer);
    //$("#drinkInstructions").text(drinkInstructions);
  
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
}
