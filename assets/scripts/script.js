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
// var fChoice = []; // choice to be selected
// var mealDetail;

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
  // var drink = drinks[drinkIndex];
  // console.log(drink);
  // 3. display the modal
  displayDrink(drinkIndex);
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
    processDrinksData(drinks);
    //displayDrinkList();
  });
}

//Set variable for local storage array
var myStoredDrinks = JSON.parse(localStorage.getItem('savedDrinks')) || [];
var drinksObjectArray = [];

function processDrinksData(drinks) {
  //for each new click, empty the drinksObjectArray
  drinksObjectArray = [];
  //loop through all drinks
  drinks.forEach((drink, i) => {
    //take out image and title of a single drink
    var drinkImage = drink.strDrinkThumb;
    var drinkTitle = drink.strDrink;
    var drinkInstructions = drink.strInstructions;
    //retrieve ingredients and directions for the drink object array
    var thisDrinkIngredientsArray = [];
    for (var j = 1; j < 16; j++) {
      var measure = drink["strMeasure" + j];
      var ingredient = drink["strIngredient" + j];
      if (ingredient === null || ingredient === '') {
        break;
      } else if (measure === null) {
        thisDrinkIngredientsArray.push(ingredient);
        console.log('This ingredient without measure ' + i + ' = ', ingredient);
      } else {
        var combinedIngredient = (measure + ' ' + ingredient);
        thisDrinkIngredientsArray.push(combinedIngredient);
        console.log('This ingredient + measure ' + i + ' = ', combinedIngredient)
      }

    };
    console.log('The DrinkIngredientsArray for ' + drinkTitle + ' = ', thisDrinkIngredientsArray);

    var thisDrinkObject = {
      'name': drinkTitle,
      'pic': drinkImage,
      'ingredients': thisDrinkIngredientsArray,
      'directions': drinkInstructions
    };

    drinksObjectArray.push(thisDrinkObject);
    console.log('This drinksObjectArray after iteration ' + i + ' = ', drinksObjectArray);

  })
  console.log()
  displayDrinkList();
};


//Use the drinkObjectArray to append the drink result cards to the page
function displayDrinkList() {
  //Clear the drinkList container
  $('#drinkList').empty();

  for (i = 0; i < drinksObjectArray.length; i++) {
    console.log('The drinkObjectArray length = ', drinksObjectArray.length);
    var drinkData = drinksObjectArray[i];
    var drinkName = $("<h2>").text(drinkData.name);
    var drinkStarIcon = $("<i>").attr({ class: "right floated star icon", id: drinkData.name });
    drinkStarIcon.attr('data-index', i);
    //SET LOCAL STORAGE BASED ON USER SELECTION
    drinkStarIcon.click(function (event) {
      event.stopPropagation();
      myStoredDrinks = JSON.parse(localStorage.getItem('savedDrinks')) || [];
        console.log('These are my stored drinks so far at the start of star click: ', myStoredDrinks);
      var idToStore = $(this).attr('data-index');
      console.log('Id to store = ', idToStore);
      $(this).attr('class', 'right floated orange star icon');
      var addDrink = true;
      for (var i = 0; i < myStoredDrinks.length; i++) {
        console.log(drinksObjectArray[idToStore].name);
        if (myStoredDrinks[i].name == drinksObjectArray[idToStore].name) {
          console.log("This drink is already in myStoredDrinks, do not add", drinksObjectArray[idToStore]);
          addDrink = false;
        }
      }// end For Loop
      if (addDrink == true) {
        myStoredDrinks.push(drinksObjectArray[idToStore]);
          console.log('Add this drink to drink history and local storage ', drinksObjectArray[idToStore]);
          localStorage.setItem('savedDrinks', JSON.stringify(myStoredDrinks));
          console.log("Drink History so far: ", myStoredDrinks);
      } //end If Condition
      
    })

    drinkName.append(drinkStarIcon);
    var drinkPic = $("<img>")
      .attr({ src: drinksObjectArray[i].pic, id: i })
      .addClass("ui fluid image rounded")
      .css("float", "left");

    var drinkPicCon = $("<div>")
      .append(drinkName, drinkPic)
      .addClass("seven wide column pusher");
    
    $("#drinkResult").css("display", "block");
    $("#drinkList").append(drinkPicCon).css("display", "block");

    console.log('Complete iteration ' + i);
  }
}



function displayDrink(drinkIndex) {
//1. Empty the container
    $('#drinkList').empty();
    
//2. Grab id from image on page
    var userSelectedDrinkID = drinkIndex;
      console.log('User selected drink = ', drinksObjectArray[userSelectedDrinkID].name);
    var selectedDrink = drinksObjectArray[userSelectedDrinkID];
   
// 3. Retrieve data from stored drink object
    var drinkName = selectedDrink.name;
    var drinkImage = selectedDrink.pic;

//4. Create and append containers
    var outerRecipeWrapper = $('<div>').attr('class', 'three column row');
    $('#drinkList').append(outerRecipeWrapper);
    var thisRecipeContainer = $('<div>').attr('class', 'seven wide column pusher');
    thisRecipeContainer.appendTo(outerRecipeWrapper);
    var thisDrinkName = $('<h2>').text(drinkName);
    thisDrinkName.appendTo(thisRecipeContainer);
    var drinkStarIcon = $("<i>").attr({ class: "right floated star icon", id: event.target.id });
    drinkStarIcon.appendTo(thisDrinkName);
    //SET LOCAL STORAGE BASED ON USER SELECTION
    drinkStarIcon.click(function (event) {
      event.stopPropagation();
      myStoredDrinks = JSON.parse(localStorage.getItem('savedDrinks')) || [];
        console.log('These are my stored drinks so far at the start of star click: ', myStoredDrinks);
      var idToStore = $(this).attr('id');
      console.log('Id to store = ', idToStore);
      $(this).attr('class', 'right floated orange star icon');
      var addDrink = true;
      for (var i = 0; i < myStoredDrinks.length; i++) {
        console.log(drinksObjectArray[idToStore].name);
        if (myStoredDrinks[i].name == drinksObjectArray[idToStore].name) {
          console.log("This drink is already in myStoredDrinks, do not add", drinksObjectArray[idToStore]);
          addDrink = false;
        }
      }// end For Loop
      if (addDrink == true) {
        myStoredDrinks.push(drinksObjectArray[idToStore]);
          console.log('Add this drink to drink history and local storage ', drinksObjectArray[idToStore]);
          localStorage.setItem('savedDrinks', JSON.stringify(myStoredDrinks));
          console.log("Drink History so far: ", myStoredDrinks);
      } //end If Condition
      
    })


    var thisDrinkImage = $('<img>').attr({src: drinkImage, class: 'ui fluid image rounded'}).css('float', 'left');
    thisDrinkImage.appendTo(thisRecipeContainer);
//5. Ingredient loop
    //A. Create list container
    var outerInstructionsContainer = $('<div>').attr('class', 'seven wide column pusher');
    outerInstructionsContainer.appendTo(outerRecipeWrapper);
    var ingredientListContainer = $("<div>").attr('class', 'ui celled unordered list')
    ingredientListContainer.appendTo(outerInstructionsContainer);
    //B. Loop through the drink ingredients & append to list container after each round
      for (var i = 0; i < (selectedDrink.ingredients).length; i++) {
        var ingredient = selectedDrink.ingredients[i];
        if (ingredient === null || ingredient === '') {
          break; 
          } else {
          var thisDrinkIngredient = $("<div>").attr('class', 'item').text(ingredient);
          thisDrinkIngredient.appendTo(ingredientListContainer);
      }
   }

//6. Add directions below ingredients list
    var drinkInstructions = selectedDrink.directions;
    var thisDrinkInstructions = $('<p>').text(drinkInstructions);
    thisDrinkInstructions.appendTo(outerInstructionsContainer);
   }

//LOCAL STORAGE DISPLAY:
//Create object to store retrieved information for saved drinks (for next phase)
var storedDrinksObject = [];

//1. User clicks the User Icon
$("#user").on("click", showUserProfile);
function showUserProfile() {
  //2.Empty saved drinks list
  $('#savedDrinkList').empty();
  document.getElementById("homePage").style.display = "none";
  document.getElementById("foodPage").style.display = "none";
  document.getElementById("drinkPage").style.display = "none";
  document.getElementById("userPage").style.display = "block";

  //3. Retrieve information from local storage
  console.log('myStoredDrinks.length before user click if statement');
  if (myStoredDrinks.length > 0) {
    console.log('These are my saved drinks: ', myStoredDrinks);
    var userDrinks = JSON.parse(localStorage.getItem('savedDrinks'));
    //4. Cycle through the name drink array to retrieve drink information and post drinks to the page.
    for (var i = 0; i < userDrinks.length; i++) {
      var savedDrinkName = userDrinks[i].name;
      console.log('The drink name from my object = ', savedDrinkName);
      var savedDrinkImage = userDrinks[i].pic;
      console.log('The pic from my object = ', savedDrinkImage);

      //Build recipe card
      var mainCardContainer = $('<div>').attr('class', 'column drinkRecipeCard').appendTo('#savedDrinkList');
      var column = $('<div>').attr('class', 'ui fluid card').appendTo(mainCardContainer);
      var cardImageDiv = $('<div>').attr('class', 'image').appendTo(column);
      var cardImage = $('<img>').attr({ src: savedDrinkImage, id: i }).appendTo(cardImageDiv);
      var drinkTitleDiv = $('<div>').attr('class', 'content').appendTo(column);
      $('<p>').attr('class', 'header').text(savedDrinkName).appendTo(drinkTitleDiv);
    }
  }
};

//Display full recipe when stored card on user page is clicked
//1. On click event
$('#savedDrinkList').click(function (event) {
  event.stopPropagation();

  //2. Empty container
  $('#savedDrinkList').empty();

  //3. Retrieve index of stored recipe
  var drinkToShow = event.target.id;
  console.log('The recipe index to retrieve = ', drinkToShow);

  //4. Find clicked object in the local storage array
  var thisStoredDrink = JSON.parse(localStorage.getItem('savedDrinks'));
  var thisDrinkID = thisStoredDrink[drinkToShow];
  console.log('The user wants to see this drink object: ', thisDrinkID);

  //5. Build the recipe card using retrieved data
  //Retrieve the drink title
  var mainDrinkContainer = $('<div>').attr('class', 'sixteen wide column');
  mainDrinkContainer.appendTo('#savedDrinkList');
  var currentDrinkTitle = $('<h2>').text(thisDrinkID.name);
  currentDrinkTitle.appendTo(mainDrinkContainer);
  // Retrieve the drink photo
  var thisDrinkPhoto = thisDrinkID.pic;
  console.log('The selected mPic = ', thisDrinkPhoto);
  var currentDrinkImage = $('<img>').attr({ src: thisDrinkPhoto, class: 'ui rounded image' });
  currentDrinkImage.appendTo(mainDrinkContainer);
  //Retrieve the drink directions
  var thisDrinkDirections = thisDrinkID.directions;
  console.log('The selected drink directions are: ', thisDrinkID.directions);
  // Ingredients retrieval part 1: Cycle through ingredients array and create ingredient list
  var thisDrinkIngredients = thisDrinkID.ingredients;
  console.log('The selected drink ingredients array = ', thisDrinkIngredients);
  var thisDrinkIngredientList = $("<div>").text(thisDrinkIngredientContent).addClass("ui celled unordered list");
  thisDrinkIngredientList.appendTo('#savedDrinkList');
  for (var i = 0; i < thisDrinkIngredients.length; i++) {
    var thisDrinkIngredientContent = (thisDrinkIngredients[i]);
    console.log('The ingredient ' + i + ' = ' + thisDrinkIngredientContent);
    //Ingredients retrieval Part 2: For each looped ingredient, create and append an ingredient row.
    var thisDrinkIngredientRow = $("<div>").text(thisDrinkIngredientContent).addClass("item");
    thisDrinkIngredientRow.appendTo(thisDrinkIngredientList);
    console.log('Drink ngredient ' + i + ' was added to the list.');
  };
  //6. Append the directions container to the page
  var thisDrinkDirectionsContainer = $('<p>').text(thisDrinkID.directions);
  thisDrinkDirectionsContainer.appendTo('#savedDrinkList');
});

