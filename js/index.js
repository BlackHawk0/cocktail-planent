document.addEventListener('DOMContentLoaded', ()=> console.log('Content loaded'))




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
        response.json().then(data => renderRecentCocktails(data));
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


function renderRecentCocktails(cocktails){

    let bestThumbs = cocktails.drinks.map(function(cocktail){
       let cocktailImages = cocktail.strDrinkThumb
       return cocktailImages
        
    });
    let  bestCocktails = cocktails.drinks.map(function(cocktail){
        let cocktailList = cocktail.strDrink
        return cocktailList   
    });

    let imageContainer = document.querySelector('#recent')

    for (let i = 0; i < 8; i++){
        let bestList = bestCocktails[i]
        let cocktailimage = bestThumbs[i]
        const item = document.createElement('h4')
        const image = document.createElement('img')

        item.innerText = `${bestList}`
        image.src = `${cocktailimage}`
        imageContainer.appendChild(item)
        imageContainer.appendChild(image)
    }

}


function renderPopularCocktails(cocktails){

    let bestThumbs = cocktails.drinks.map(function(cocktail){
       let cocktailImages = cocktail.strDrinkThumb
       return cocktailImages
        
    });
    let  bestCocktails = cocktails.drinks.map(function(cocktail){
        let cocktailList = cocktail.strDrink
        return cocktailList   
    });

    let imageContainer = document.querySelector('#latest')

    for (let i = 0; i < 8; i++){
        let bestList = bestCocktails[i]
        let cocktailimage = bestThumbs[i]
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




// function calls
getRecentCocktails()
getPopularCocktails()
getRandomCocktail();


// event listners

const commentContainer = document.getElementById('allComments');
document.getElementById('addComments').addEventListener('click', function (ev) {
   addComment(ev);
});

function addComment(ev) {
    let commentText, wrapDiv;
    const textBox = document.createElement('div');
    const replyButton = document.createElement('button');
    replyButton.className = 'reply';
    replyButton.innerHTML = 'Reply';
    const likeButton = document.createElement('button');
    likeButton.innerHTML = 'Like';
    likeButton.className = 'likeComment';
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'deleteComment';
    if(hasClass(ev.target.parentElement, 'container')) {
        const wrapDiv = document.createElement('div');
        wrapDiv.className = 'wrapper';
        wrapDiv.style.marginLeft = 0;
        commentText = document.getElementById('comment').value;
        document.getElementById('comment').value = '';
        textBox.innerHTML = commentText;
        textBox.style.backgroundColor = "cornflowerblue";
        wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
        commentContainer.appendChild(wrapDiv);
    } else {
        wrapDiv = ev.target.parentElement;
        commentText = ev.target.parentElement.firstElementChild.value;
        textBox.innerHTML = commentText;
        textBox.style.backgroundColor = "paleturquoise";
        wrapDiv.innerHTML = '';
        wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
    }
    // setOnLocalStorage();
}

// function setOnLocalStorage () {
//     localStorage.setItem('template', document.getElementById('allComments').innerHTML);
// }
function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
document.getElementById('allComments').addEventListener('click', function (e) {
    if (hasClass(e.target, 'reply')) {
        const parentDiv = e.target.parentElement;
        const wrapDiv = document.createElement('div');
        wrapDiv.style.marginLeft = (Number.parseInt(parentDiv.style.marginLeft) + 15).toString() + 'px';
        wrapDiv.className = 'wrapper';
        const textArea = document.createElement('textarea');
        textArea.style.marginRight = '20px';
        const addButton = document.createElement('button');
        addButton.className = 'addReply';
        addButton.innerHTML = 'Add';
        const cancelButton = document.createElement('button');
        cancelButton.innerHTML = 'Cancel';
        cancelButton.className='cancelReply';
        wrapDiv.append(textArea, addButton, cancelButton);
        parentDiv.appendChild(wrapDiv);

    } else if(hasClass(e.target, 'addReply')) {
        addComment(e);
    } else if(hasClass(e.target, 'likeComment')) {
         const likeBtnValue = e.target.innerHTML;
         e.target.innerHTML = likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue) + 1 : 1;
        setOnLocalStorage();
    } else if(hasClass(e.target, 'cancelReply')) {
        e.target.parentElement.innerHTML = '';
        setOnLocalStorage();
    } else if(hasClass(e.target, 'deleteComment')) {
        e.target.parentElement.remove();
    }
});