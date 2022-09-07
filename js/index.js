document.addEventListener('DOMContentLoaded', (event) => {

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
                renderPopularCocktails(data)
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
            response.json().then(data => {
                console.log(data);
                renderRecentCocktails(data)});
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

    //render recent cocktails
    function renderRecentCocktails(cocktails){
        // get an object of the cocktail images from the api
        let bestThumbs = cocktails.drinks.map(function(cocktail){
        let cocktailImages = cocktail.strDrinkThumb
    
        return cocktailImages
            
        });
        // get an object of the cocktail names from the api
        let  bestCocktails = cocktails.drinks.map(function(cocktail){
            let cocktailList = cocktail.strDrink
            return cocktailList   
        });

        let imageContainer = document.querySelector('#recent')

        // loop over the object and apped the cocktails to html
        for (let i = 0; i < 8; i++){
            let bestList = bestCocktails[i]
            let cocktailimage = bestThumbs[i]

            let divwarp = document.createElement('div')
            divwarp.classList.add('wrapping')
            const item = document.createElement('h4')
            const image = document.createElement('img')

            item.textContent = `${bestList}`
            image.src = `${cocktailimage}`
            divwarp.appendChild(image)
            divwarp.appendChild(item)
            imageContainer.appendChild(divwarp)
            imageContainer.appendChild(divwarp)

        }

    }


    function renderPopularCocktails(cocktails){

         // get an object of the cocktail images from the api
        let bestThumbs = cocktails.drinks.map(function(cocktail){
        let cocktailImages = cocktail.strDrinkThumb
        return cocktailImages
            
        });

        // get an object of the cocktail names from the api
        let  bestCocktails = cocktails.drinks.map(function(cocktail){
            let cocktailList = cocktail.strDrink
            return cocktailList   
        });

        let imageContainer = document.querySelector('#latest')

    // loop over the object and apped the cocktails names to html
        for (let i = 0; i < 8; i++){
            let bestList = bestCocktails[i]
            let cocktailimage = bestThumbs[i]
            let divwarp = document.createElement('div')
            divwarp.classList.add('wrapping')
            const item = document.createElement('h4')
            const image = document.createElement('img')

            item.textContent = `${bestList}`
            image.src = `${cocktailimage}`
            divwarp.appendChild(image)
            divwarp.appendChild(item)
            imageContainer.appendChild(divwarp)

        }

    }



    // function renderRandomCocktail(cocktail){
    //     let randomdrinks = document.querySelector('#random')
    //     let cocktailName = document.createElement('h2')
    //     cocktailName.innerHTML = cocktail.drinks[0].strDrink
    //     randomdrinks.appendChild(cocktailName)
    //     let image = document.createElement('img')
    //     image.src = cocktail.drinks[0].strDrinkThumb
    //     randomdrinks.appendChild(image)

    // }




    // function calls
    getRecentCocktails()
    getPopularCocktails()
    // getRandomCocktail();


    // event listners

    // mouseover evenlistner
    const heading = document.querySelector('.toolbar')
    // This handler will be executed every time the cursor
    // is moved over the heading
    heading.addEventListener("mouseover", (event) => {
    // highlight the mouseover target
    event.target.style.color = "orange";

    // reset the color after a short delay
    setTimeout(() => {
        event.target.style.color = "";
    }, 500);
    }, false);
})


