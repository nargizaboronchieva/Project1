var fChoice = []; // choice to be selected
var mealHistory = JSON.parse(localStorage.getItem('userRecipes')) || []; //array of saved meal objects....
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

$("#food").on("click", showFoodPage);
function showFoodPage() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("foodPage").style.display = "block";
  document.getElementById("drinkPage").style.display = "none";
  document.getElementById("userPage").style.display = "none";
}

// Listener for Meal Search
$("#searchMeal").on("click", mealList);

// API call to retrieve Receipe Name, instruction, pic, quantity
function mealList(event) {
  //get user meal input

  var mealChoice = $("#mealInput").val();
  mealDetail = false;

  console.log("User input", mealChoice);

  var fURL =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealChoice;

  $.ajax({
    url: fURL,
    method: "GET",
  }).then(processData);
} // end mealList



// Construct a food object that has all attributes.
function processData(fObject) {
  console.log(
    "food object is:",
    fObject,
    " with ",
    fObject.meals.length,
    " meals inside"
  );

  var numFood = fObject.meals.length; // # of meals suggested
  $("#foodList").empty();
  fChoice = [];
  for (var mealCnt = 0; mealCnt < numFood; mealCnt++) {
    //Create new mealObj
    var mealObj = {};
    mealObj["mName"] = fObject.meals[mealCnt].strMeal;
    mealObj["mInst"] = (fObject.meals[mealCnt].strInstructions).split('\r\n');
    mealObj["mPic"] = fObject.meals[mealCnt].strMealThumb;
    mealObj["mIngreQty"] = []; // Array to store multiple Ingredients for that same meal
    mealObj["mYouTube"] = fObject.meals[mealCnt].strYoutube;
    mealObj["mID"] = mealCnt;


    // Initialize the first ingredent and qty index
    var index = 1;

    // process and add all Ingredients in the obj. Return # of ingredients.
    var ingLen = pIngredient(fObject, mealObj, mealCnt, index);

    mealObj["mIngLen"] = ingLen;
    console.log("This meal obj is: ", mealObj, mealObj.mID, ingLen);

    fChoice.push(mealObj);
    renderNamePic(mealObj);
  } // end For.

  // fChoice array now have the list of completed objects. 
  console.log("The Suggested Chocies include in this food array:", fChoice);
} // end Process Data


function pIngredient(fObject, mealObj, mealCnt, index) {

  var ingre = "strIngredient" + index;
  var ingreQty = "strMeasure" + index;

  // If ingredent field is not blank AND searched <= max 20
  while ((fObject.meals[mealCnt][ingre] != "") && (index <= 20)) {
    // create Dict for Ingredient/Qty, on that index (ingredent #)
    mealObj["mIngreQty"][index] = {};

    // assign Ingredient Name, and Qty to this new key/value pair.
    mealObj["mIngreQty"][index - 1] = {
      'mIngre': fObject.meals[mealCnt][ingre],
      'mIQty': fObject.meals[mealCnt][ingreQty]
    };

    index++;
    // New property name base on next index
    var ingre = "strIngredient" + index;
    var ingreQty = "strMeasure" + index;
  } // end While

  // Return number of ingredients in this meal
  return (index - 1);
} // end pIngredient

// Display Food on Food container "foodList".
function renderNamePic(mealObj) {
  console.log('The renderNamePic function is being entered.');

  console.log('The renderNamePic function mealObj is: ', mealObj);
  var fName = $("<h2>").text(mealObj.mName).addClass("star outline icon");

  var starIcon = $("<i>").attr({ class: "right floated star icon", id: mealObj.mID });
  fName.append(starIcon);

  var fPic = $("<img>")
    .attr("src", mealObj.mPic)
    .addClass("ui fluid image rounded")
    .css("float", "left");

  fPic.attr("data-index", mealObj.mID);
  fPic.click(function () {
    mealDetail = true;
    console.log("Clicked on: ", $(this).attr("data-index"));
    renderNamePic(fChoice[$(this).attr("data-index")]);
  });

  var nPicCon = $("<div>")
    .append(fName, fPic)
    .addClass("seven wide column pusher");

  $("#mealResult").css("display", "block");
  $("#foodList").append(nPicCon).css("display", "block");

  if (mealDetail == true) {
    console.log("meal Detail should be True ,let check:", mealDetail)
    //$("#mealResult").empty();
    renderIng(mealObj, nPicCon);
    mealDetail = false;
  }

  // Local Storage.
  // 1. User clicks star
  // 2. mealObj associated with clicked item is pushed to local storage object array
    //Local Storage Array to hold all saved meals
    starIcon.on('click', function () {
      console.log('This is the selected mealObj position ', mealObj.mID);
      starIcon.css('color', 'orange');
      //Local Storage Array to hold all saved meals
      addMeal = true;
      for (var i = 0; i < mealHistory.length; i++) {
        console.log(mealHistory[i].mName);
        if (mealHistory[i].mName == mealObj.mName) {
          console.log("This meal obj is already in mealhistory, do not add", mealObj);
          var addMeal = false;
        }
      }// end For Loop
      if (addMeal == true) {
          mealHistory.push(mealObj);
          console.log('Add this meal obj to meal history and local storage ', mealObj);
          starIcon.css('color', 'orange');
          localStorage.setItem('userRecipes', JSON.stringify(mealHistory));
          console.log("Meal History so far: ", mealHistory);
      } //end If Condition
    }); //END SET LOCAL STORAGE FOR STARRED MEALS FUNCTION



} // end renderNamePic

//User menu button click starts renderMealHistory function
$('#user').click(function () {
  drinksObjectArray = [];
  $('#foodList').empty();
  $('#savedFoodList').empty();

  console.log('User icon clicked - enter function');
  //Function to render user page
  var storedMealName = JSON.parse(localStorage.getItem('userRecipes'));
  console.log('This is userRecipes array', storedMealName);
  if (storedMealName) {
    for (i = 0; i < storedMealName.length; i++) {
      //1. Retrieve data from local storage
        console.log('The storedMealName ' + i + ' = ' + storedMealName[i]);
      var recipeTitle = storedMealName[i].mName;
        console.log('Saved recipe title ' + i + ' is ' + recipeTitle);
      var recipeImage = storedMealName[i].mPic;
        console.log('Saved recipe pic ' + i + ' is ' + recipeImage);

      //2. Build saved recipe page
      var mainCardContainer = $('<div>').attr('class', 'column').appendTo('#savedFoodList');
      var column = $('<div>').attr('class', 'ui fluid card').appendTo(mainCardContainer);
      var cardImageDiv = $('<div>').attr('class', 'image').appendTo(column);
      var cardImage = $('<img>').attr({ src: recipeImage, id: i });
      cardImage.attr('data-index', i).appendTo(cardImageDiv);
      var recipeTitleDiv = $('<div>').attr('class', 'content').appendTo(column);
      $('<p>').attr('class', 'header').text(recipeTitle).appendTo(recipeTitleDiv);
    }
  }
});//END SAVED MEALS LIST DISPLAY FUNCTION

//Display Recipe when user clicks image from User Page - MODAL
$('#savedFoodList').click(function () {
  //Clear the container
  drinksObjectArray = [];
  $('#savedFoodList').empty();
  //1. Capture id (recipe index in saved recipe array) from clicked recipe card
  selectedFoodItem = event.target.id;
    console.log('The image has been clicked');
    console.log('This is the selectedFoodItem value: ', selectedFoodItem);
  //2. Retrieve the meal object containing all necessary information from local storage
  var storedMealName = JSON.parse(localStorage.getItem('userRecipes'));
  selectedRecipeCard = storedMealName[selectedFoodItem];
    console.log('The selected recipe object is: ', selectedRecipeCard);
  //3. Build the recipe on the page
  //3a. Retrieve the recipe name
  var thisRecipeName = selectedRecipeCard.mName;
    console.log('The selected mName = ', thisRecipeName);
  var mainRecipeContainer = $('<div>').attr('class', 'sixteen wide column');
  mainRecipeContainer.appendTo('#savedFoodList');
  var currentRecipeTitle = $('<h2>').text(thisRecipeName);
    currentRecipeTitle.appendTo(mainRecipeContainer);
  //3b. Retrieve the recipe photo
  var thisRecipePhoto = selectedRecipeCard.mPic;
    console.log('The selected mPic = ', thisRecipePhoto);
  var currentRecipeImage = $('<img>').attr({ src: thisRecipePhoto, class: 'ui rounded image' });
  currentRecipeImage.appendTo(mainRecipeContainer);
  //3c. Retrieve the recipe directions
  var thisRecipeDirections = selectedRecipeCard.mInst;
    console.log('The selected recipe directions are: ', thisRecipeDirections);
  //3d. Part 1: Cycle through ingredients and create ingredient list
  var thisIngredient = selectedRecipeCard.mIngreQty;
    console.log('The selected recipe ingredient array = ', thisIngredient);
  var thisIngredientList = $("<div>").text(thisIngredientContent).addClass("ui celled unordered list");
  thisIngredientList.appendTo('#savedFoodList');
  for (var i = 0; i < (thisIngredient.length - 1); i++) {
    var thisIngredientContent = (thisIngredient[i].mIQty + ' ' + thisIngredient[i].mIngre);
      console.log('The ingredient combination for ' + i + ' = ' + thisIngredientContent);
    //3d. Part 2: For each looped ingredient, create and append an ingredient row.
    var thisIngredientRow = $("<div>").text(thisIngredientContent).addClass("item");
    thisIngredientRow.appendTo(thisIngredientList);
    console.log('Ingredient ' + i + ' was added to the list.');
  };
  //3e. Cycle through the directions and append to the page
  for (var i = 0; i < thisRecipeDirections.length; i++){
    if (thisRecipeDirections[i] === ''){
      i++;
    } else {
      var thisDirectionsContainer = $('<p>').text(thisRecipeDirections[i]);
      thisDirectionsContainer.appendTo('#savedFoodList');
    }
  };
}); //END FULL SAVED RECIPE DISPLAY FUNCTION

function renderIng(mealObj, nPicCon) {
  var i = 0;
  var iuiList = $("<div>").addClass("ui celled unordered list");

  while (i < mealObj.mIngLen) {
    var inDetail = $("<div>")
      .text(mealObj.mIngreQty[i].mIQty + " " + mealObj.mIngreQty[i].mIngre)
      .addClass("item");
    iuiList.append(inDetail);
    i++;
  } // end While

  renderInst(mealObj, iuiList, nPicCon);
} // end renderIng


function renderInst(mealObj, iuiList, nPicCon) {
  // Display Instruction on the right
  var instructionsWrapper = $('<div>').attr('class', 'seven wide column pusher');
  instructionsWrapper.append(iuiList);

  //For loop to extract the directions from the array
  for (var i = 0; i < (mealObj.mInst).length; i++){
    if (mealObj.mInst[i] === ''){
      i++
    } else {
      var fInst = $("<p>").text(mealObj.mInst[i]);
      instructionsWrapper.append(fInst);
    }
  }
  
  //var ingInstCon = $("<div>").append(iuiList,instC).addClass("seven wide column row");
  //var mContainer = $("<div>").append(nPicCon, ingInstCon).addClass("three column row");
  //var mContainer = $("<div>").append(nPicCon, iuiList,instC).addClass("three column row");

  
  var mContainer = $("<div>")
    .append(nPicCon, instructionsWrapper)
    .addClass("three column row")
    .attr("id", "detailCon");
  console.log("Before the whole mContainer", mContainer);
  //$("#mealResult").empty().append(mContainer).css("display", "block");
  $("#foodList").empty().append(mContainer).css("display", "block");
  console.log("Final Meal History so far:", mealHistory);

} // end renderInst

$("#user").on("click", showUserProfile);
function showUserProfile() {
  console.log("Enter showUserProfile");
  document.getElementById("homePage").style.display = "none";
  document.getElementById("foodPage").style.display = "none";
  document.getElementById("drinkPage").style.display = "none";
  document.getElementById("userPage").style.display = "block";
}

