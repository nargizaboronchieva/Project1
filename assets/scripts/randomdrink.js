
// SHOW RANDOM DRINK SECTION
// button
// id="randomDrink"
// ***** FOR NARGIZA'S CODE FOR RANDOM DRINK start
// var randomDrinkArr=["collins","martini","oldFashion","shots","masonJar","margarita"];


var getRandomDrinkContainer = document.getElementById('randomDrinkResult');

// $(".glassItem").on('click', function (e) {
//     fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php') 
//     	.then(res => res.json())
// 		.then(res => {
// 		createRandomDrink(res.drinks[0]);
// 	});
// });
$('.glassItem').on('click', function (e) {

    console.log("****", e.target.id);
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=' + e.target.id + '_glass' || +e.target.id)
        .then(res => res.json())
        .then(res => {
            if (res.drinks.length > 0) {
                console.log(res.drinks[0].idDrink)
                fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' +
                    res.drinks[Math.floor(Math.random() * res.drinks.length)].idDrink)
                    .then(res2 => {
                        console.log(res2)
                        return res2.json()
                    })
                    .then(res2 => {
                        if (res2.drinks.length > 0) {
                            createRandomDrink(res2.drinks[Math.floor(Math.random() * res2.drinks.length)]);
                        }
                        createRandomDrink(res2.drinks[Math.floor(Math.random() * res2.drinks.length)]);
                    });

            }
        });

});


var createRandomDrink = (drinks) => {
    $('randomDrinkResult').empty();
    var ingredients = [];
    // Get all ingredients from the object. Up to 15
    for (let i = 1; i <= 15; i++) {
        if (drinks[`strIngredient${i}`]) {
            ingredients.push(`${drinks[`strIngredient${i}`]} - ${drinks[`strMeasure${i}`]}`)
        } else {
            // Stop if no more ingredients
            break;
        }
        // $('.ui.modal').modal('show');
        // console.log('Previous modal content has been cleared.');
        document.getElementById("homePage").style.display = "block";
        document.getElementById("foodPage").style.display = "none";
        document.getElementById("drinkPage").style.display = "none";
        document.getElementById("userPage").style.display = "none";
        //document.getElementById("headingStyle").style.display = "none";
        // document.getElementById("moodText").style.display = "none";
        // document.getElementById("glassContainer").style.display = "none";
    }
        console.log('Program has arrived at the start of card creation');
            //2. Empty container
        $('#randomDrinkResult').empty();

        //  Build the recipe card using retrieved data
        //  Retrieve the drink title
        var mainDrinkContainer = $('<div>').attr('class', 'sixteen wide column');
        mainDrinkContainer.appendTo('#randomDrinkResult');
        var currentDrinkTitle = $('<h2>').text(drinks.strDrink);
        currentDrinkTitle.appendTo(mainDrinkContainer);
        //  Retrieve the drink photo
        var currentDrinkImage = $('<img>').attr({ src: drinks.strDrinkThumb, class: 'ui rounded image' });
        currentDrinkImage.appendTo(mainDrinkContainer);
        //  Retrieve the drink directions
        //  Ingredients retrieval part 1: Cycle through ingredients array and create ingredient list  
        var thisDrinkIngredientList = $("<div>").text(thisDrinkIngredientContent).addClass("ui celled unordered list");
        thisDrinkIngredientList.appendTo('#randomDrinkResult');
        for (var i = 0; i < ingredients.length; i++) {
            var thisDrinkIngredientContent = ingredients[i];
                console.log('The ingredient ' + i + ' = ' + thisDrinkIngredientContent);
            //Ingredients retrieval Part 2: For each looped ingredient, create and append an ingredient row.
            var thisDrinkIngredientRow = $("<div>").text(thisDrinkIngredientContent).addClass("item");
            thisDrinkIngredientRow.appendTo(thisDrinkIngredientList);
            console.log('Drink ingredient ' + i + ' was added to the list.');
        };
        //6. Append the directions container to the page
        var thisDrinkDirectionsContainer = $('<p>').text(drinks.strInstructions);
        thisDrinkDirectionsContainer.appendTo('#randomDrinkResult');

        //7. Add button to clear randomDrinkResults container
        var clearButtonDiv = $('<div>').attr('class', 'actions');
        clearButtonDiv.appendTo('#randomDrinkResult');
        var clearButton = $('<button>').attr('class', 'ui pink basic button').text('Clear');
        clearButton.click(function(){
            $('#randomDrinkResult').empty();
        });
        clearButton.appendTo(clearButtonDiv);
            console.log('Program has arrived at the end of card creation');

}
