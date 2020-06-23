
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
    var ingredients = [];
    // Get all ingredients from the object. Up to 15
    for (let i = 1; i <= 15; i++) {
        if (drinks[`strIngredient${i}`]) {
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
        // document.getElementById("moodText").style.display = "none";
        // document.getElementById("glassContainer").style.display = "none";
    }

    var newInnerHTML = `
		<div class="row">
			<div>
				<img src="${drinks.strDrinkThumb}" alt="drinks Image">
                <h1 style="font-size:45px">
                     ${drinks.strDrink}
                </h1>
                ${drinks.strCategory ? `
                <p style="font-size:20px">
                    <strong>
                         Category:
                    </strong>
                 ${drinks.strCategory}
                 </p>` : ''}
                ${drinks.strGlass ? `
                <p style="font-size:20px">
                    <strong>
                         Glass Type:
                    </strong>
                 ${drinks.strGlass}
                 </p>` : ''}
                <h5 style="font-size:20px">
                     <strong>
                        Ingredients:
                    </strong>
                </h5>
                <ul 
                    style="line-height: 3em">
                    ${ingredients.map(ingredient =>
                         `<li>
                             ${ingredient}
                         </li>`).join('')}
				</ul>
			</div>
			<div>
				<p style="font-size:25px">${drinks.strInstructions}</p>
			</div>
		</div>
	`;

    getRandomDrinkContainer.innerHTML = newInnerHTML;
}


