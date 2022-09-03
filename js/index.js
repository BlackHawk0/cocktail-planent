// Fetch the top 10 cocktails from thecocktaildb API
function getPopularCocktails(){
    fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php')
    .then(
    function(response) {
        //checking if the response is a success
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

        // change the response to json
        response.json().then(data => {
            //pass the data to mapData function   (data in json format)
            mapData(data)
        });
    }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
}


// Fetech the recent top 10 cocktails thecocktaildb API
function getRecentCocktails(){
    fetch('https://www.thecocktaildb.com/api/json/v2/9973533/recent.php')
    .then(
    function(response) {
        //checking if the response is a success
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

        ///pass the data to mapData function   (data in json format)
        response.json().then(data => mapData(data));
    }
    )
    // If response is not successfull show error
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
}

// GET a random cockatil from the database
function getRandomCocktail(){   
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(
    function(response) {
        //checking if the response is a success
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
        renderRandomCocktail(data)
        });
    }
    )
     // If response is not successfull show error
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });


}


function mapData(cocktails){
    let bestThumbs = cocktails.drinks.map(function(cocktail){
       let cocktailImages = cocktail.strDrinkThumb
       return cocktailImages
        
    });
    let  bestCocktails = cocktails.drinks.map(function(cocktail){
        let cocktailList = cocktail.strDrink
        return cocktailList   
    });
    renderPopularCocktails(bestThumbs, bestCocktails)
    renderRecentCocktails(bestThumbs, bestCocktails)
}


function renderRecentCocktails(cocktailimages, cocktailnames){

    let imageContainer = document.querySelector('#recent')

    for (let i = 0; i < 4; i++){
        let bestList = cocktailnames[i]
        let cocktailimage = cocktailimages[i]
        const item = document.createElement('h4')
        const image = document.createElement('img')

        item.innerText = `${bestList}`
        image.src = `${cocktailimage}`
        imageContainer.appendChild(item)
        imageContainer.appendChild(image)

    }
}


function renderRandomCocktail(cocktail){
    let randomdrinks = document.querySelector('#random')
    let cocktailName = document.createElement('h2')
    cocktailName.innerHTML = cocktail.drinks[0].strDrink
    randomdrinks.appendChild(cocktailName)
    let image = document.createElement('img')
    image.src = cocktail.drinks[0].strDrinkThumb
    randomdrinks.appendChild(image)

}

function renderPopularCocktails(images, names){

    let imageContainer = document.querySelector('#latest')

    for (let i = 0; i < 4; i++){
        let bestList = names[i]
        let cocktailimage = images[i]
        const item = document.createElement('h4')
        const image = document.createElement('img')

        item.innerText = `${bestList}`
        image.src = `${cocktailimage}`
        imageContainer.appendChild(item)
        imageContainer.appendChild(image)

    }
}


// function calls
getRecentCocktails()
getPopularCocktails()
getRandomCocktail();
