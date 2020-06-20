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
  document.getElementById("mealResult").style.display = "none";
  document.getElementById("drinkPage").style.display = "none";
  document.getElementById("userPage").style.display = "none";
}

//DROPDOWNS Functionality: Food and Drink page
$(".ui.dropdown").dropdown();

// ***** FOR NARGIZA TO EDIT

// BUTTON TO SHOW RANDOM DRINK SECTION
// id="randomGlass" section on load
// id="randomDrink" section after clicks

// SHOW RANDOM DRINK SECTION
// button
// id="randomDrink"
// ***** FOR NARGIZA'S CODE FOR RANDOM DRINK start
// var randomDrinkArr=["collins","martini","oldFashion","shots","masonJar","margarita"];

var getRandomDrinkContainer = document.getElementById("randomDrinkResult");

$(".glassItem").on("click", function (e) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createRandomDrink(res.drinks[0]);
    });
});

var createRandomDrink = (drinks) => {
  var ingredients = [];
  // Get all ingredients from the object. Up to 15
  for (let i = 1; i <= 15; i++) {
    if (drinks[`strIngredient${i}`]) {
      ingredients.push(
        `${drinks[`strIngredient${i}`]} - ${drinks[`strMeasure${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
    document.getElementById("homePage").style.display = "block";
    document.getElementById("foodPage").style.display = "none";
    document.getElementById("drinkPage").style.display = "none";
    document.getElementById("userPage").style.display = "none";
    document.getElementById("headingStyle").style.display = "none";
    // document.getElementById("moodText").style.display = "none";
    // document.getElementById("glassContainer").style.display = "none";
  }

  var newInnerHTML = `
		<div class="row">
			<div>
				<img src="${drinks.strDrinkThumb}" alt="drinks Image">
                <h1>${drinks.strDrink}</h1>
                ${
                  drinks.strCategory
                    ? `<p><strong>Category:</strong> ${drinks.strCategory}</p>`
                    : ""
                }
                ${
                  drinks.strGlass
                    ? `<p><strong>Glass Type:</strong> ${drinks.strGlass}</p>`
                    : ""
                }
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
			</div>
			<div>
				
				<p>${drinks.strInstructions}</p>
			</div>
		</div>
	`;

  getRandomDrinkContainer.innerHTML = newInnerHTML;
};

//END OF NARGIZAS CODING

// Function to show recipe card
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
// $("#food").on("click", showFoodPage);
// function showFoodPage() {
//   document.getElementById("homePage").style.display = "none";
//   document.getElementById("foodPage").style.display = "block";
//   document.getElementById("drinkPage").style.display = "none";
//   document.getElementById("userPage").style.display = "none";
// }

// // Listener for Meal Search
// $("#searchMeal").on("click", mealList);

// // API call to retrieve Receipe Name, instruction, pic, quantity
// function mealList(event) {
//   //get user meal input
//   var mealChoice = $("#mealInput").val();
//   mealDetail = false;

//   console.log("User input", mealChoice);

//   // Clear any previous displayed items
//   //$("#foodList").empty();

//   var fURL =
//     "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealChoice;

//   $.ajax({
//     url: fURL,
//     method: "GET",
//   }).then(processData);
// } // end mealList

// function processData(fObject) {
//   console.log(
//     "food object is:",
//     fObject,
//     " with ",
//     fObject.meals.length,
//     " meals inside"
//   );

//   var numFood = fObject.meals.length; // # of meals suggested

//   for (var mealCnt = 0; mealCnt < numFood; mealCnt++) {
//     //Create new mealObj
//     var mealObj = {};
//     mealObj["mName"] = fObject.meals[mealCnt].strMeal;
//     mealObj["mInst"] = fObject.meals[mealCnt].strInstructions;
//     mealObj["mPic"] = fObject.meals[mealCnt].strMealThumb;
//     mealObj["mIngreQty"] = []; // Array to store multiple Ingredients for that same meal
//     mealObj["mID"] = mealCnt;

//     // Initialize the first ingredent and qty index
//     var index = 1;
//     var ingre = "strIngredient" + index;
//     var ingreQty = "strMeasure" + index;

//     // If ingredent field is not blank AND searched <= max 20
//     while (fObject.meals[mealCnt][ingre] != "" && index <= 20) {
//       // create Dict for Ingredient/Qty, on that index (ingredent #)
//       mealObj["mIngreQty"][index] = {};

//       // assign Ingredient Name, and Qty to this new key/value pair.
//       mealObj["mIngreQty"][index - 1] = {
//         mIngre: fObject.meals[mealCnt][ingre],
//         mIQty: fObject.meals[mealCnt][ingreQty],
//       };

//       index++;
//       // New property name base on next index
//       var ingre = "strIngredient" + index;
//       var ingreQty = "strMeasure" + index;
//     } // end While

//     console.log("This meal obj is: ", mealObj, mealObj.mID);
//     mealObj["mIngLen"] = index - 1; // Assign # of ingredents used in this meal to mIngLen
//     fChoice.push(mealObj);
//     renderNamePic(mealObj);
//   } // end For.
//   console.log("The Suggested Chocies include in this food array:", fChoice);
// } // end Process Data

// // Display Food on Food container "foodList"
// function renderNamePic(mealObj) {
//   var fName = $("<h2>").text(mealObj.mName).addClass("star outline icon");
//   var fPic = $("<img>")
//     .attr("src", mealObj.mPic)
//     .addClass("ui fluid image rounded")
//     .css("float", "left");

//   fPic.attr("data-index", mealObj.mID);
//   fPic.click(function () {
//     mealDetail = true;
//     console.log("Clicked on: ", $(this).attr("data-index"));
//     renderNamePic(fChoice[$(this).attr("data-index")]);
//   });
//   var nPicCon = $("<div>")
//     .append(fName, fPic)
//     .addClass("seven wide column pusher");

//   console.log("Enter renderNamePic, nPicCon is ", nPicCon);
//   $("#foodList").append(nPicCon).css("display", "block");

//   if (mealDetail == true) {
//     $("#mealResult").empty();
//     renderIng(mealObj, nPicCon);
//     mealDetail = false;
//   }
// }

// function renderIng(mealObj, nPicCon) {
//   var i = 0;
//   var iuiList = $("<div>").addClass("ui celled unordered list");

//   console.log("Ingredent length: ", mealObj.mIngLen);
//   while (i < mealObj.mIngLen) {
//     var inDetail = $("<div>")
//       .text(mealObj.mIngreQty[i].mIQty + " " + mealObj.mIngreQty[i].mIngre)
//       .addClass("item");
//     iuiList.append(inDetail);
//     i++;
//   }

//   renderInst(mealObj, iuiList, nPicCon);
// } // end renderIng

// function renderInst(mealObj, iuiList, nPicCon) {
//   // Display Instruction on the right

//   var item = $("<div>").addClass("item");
//   var content = $("<div>").addClass("content");
//   var direction = $("<a>").text("Directions").addClass("header");
//   var description = $("<div>").addClass("description");
//   var fInst = $("<p>").text(mealObj.mInst);
//   var instC = $("<div>")
//     .append(item, content, direction, description, fInst)
//     .addClass("ui items");

//   //var ingInstCon = $("<div>").append(iuiList,instC).addClass("seven wide column row");
//   //var mContainer = $("<div>").append(nPicCon, ingInstCon).addClass("three column row");
//   //var mContainer = $("<div>").append(nPicCon, iuiList,instC).addClass("three column row");

//   nPicCon.append(fInst);
//   var mContainer = $("<div>")
//     .append(nPicCon, iuiList)
//     .addClass("three column row");
//   console.log("Before the whole mContainer", mContainer);
//   $("#mealResult").append(mContainer).css("display", "block");
// } // end renderInst

//######################## DRINK Section ##########################//

$("#drink").on("click", showDrinkPage);
function showDrinkPage() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("foodPage").style.display = "none";
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
    $("#drinkList").append(`
      <div>
        <h3>${drinkTitle}</h3>
        <img src="${drinkImage}" class="ui fluid image rounded" alt="${drinkTitle}" id="${i}">
      </div>
    `);
  });
}
function displayDrink(data) {
  //grab photo from data and attr on page
  var drink = data.drinks[0];
  var drinkImage = drink.strDrinkThumb;
  $("#drinkImage").attr("src", drinkImage);
  // grab instruction from data and .text it to page
  var drinkInstructions = drink.strInstructions;
  $("#drinkInstructions").text(drinkInstructions);

  // strIngredient1
  // loop through the drink ingredients
  for (var i = 1; i < 16; i++) {
    var ingredient = drink["strIngredient" + i];
    // ingredient will be either a string or null
    console.log(ingredient);
    if (ingredient === null) {
      break;
    }
    // add to the drinkIngredients
    // pretend we have <ul id="drinkIngredients"><li></li></ul> in the html
    $("#drinkIngredients").append("<li>" + ingredient + "</li>");
  }
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
