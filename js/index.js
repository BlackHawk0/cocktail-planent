function getRandomCocktail(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(
    function(response) {
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
        console.log(data);
        renderRandomCocktail(data)
        });
    }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
}

getRandomCocktail();
function renderRandomCocktail(cocktail){
    let randomdrinks = document.querySelector('.image-container')
    let cocktailName = document.createElement('h2')
    cocktailName.innerHTML = cocktail.drinks[0].strDrink
    randomdrinks.appendChild(cocktailName)
    let image = document.createElement('img')
    image.src = cocktail.drinks[0].strDrinkThumb
    randomdrinks.appendChild(image)

    //loop of the ingredients
    for(let i =1; i<16; i++){

        //eliminating null values
        if(cocktail.drinks[0][`strMeasure${i}`] !== null){
            let list = document.createElement('ul')
            list.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ' ' +cocktail.drinks[0][`strIngredient${i}`]
            randomdrinks.appendChild(list)
        }

    }
    let instructions = document.createElement('p')
    instructions.innerHTML = cocktail.drinks[0].strInstructions
    randomdrinks.appendChild(instructions)
}

