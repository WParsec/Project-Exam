const postsContainer = document.querySelector(".all-posts-container");

// API RESULTS FOR POSTS

const url = "https://dev-spider.com/futuredawn/wp-json/wp/v2/custom_posts?acf_format=standard&per_page=20"

let amount = 8;
let results = [];
let color;

async function getResults() {
    try {
        const response = await fetch(url);
        results = await response.json();

        createHTML(results, amount);
        createButtons(results);

    }
    catch (error) {
        console.log(error);
    }
}
getResults();

// CREATE HTML FUNCTION

function createHTML(APIresults, amountDisplayed) {
    postsContainer.innerHTML = "";
    for (let i = 0; i < amountDisplayed; i++) {
        categoryColor(results[i].acf.category);
        postsContainer.innerHTML += `<a class= "posts-page-card-div" href="details.html?id=${APIresults[i].id}">
                                <div class="posts-page-card-image-div" style="background-image: url(${APIresults[i].acf.image})">
                                <div class="category" style="background-color: ${color}">${results[i].acf.category}</div></div>
                                <div class="posts-page-card-title"><h3 class="card-title-h3">${APIresults[i].title.rendered}</h3></div>
                                </a>`
    }
}


// SHOW ALL RESULTS

const seeAllPosts = document.querySelector(".see-all-posts");
const showAllLess = document.querySelector(".show-all-show-less");

seeAllPosts.addEventListener("click", function increaseAmount() {

    if (showAllLess.innerText === "Show more") {
        amount = results.length;
        showAllLess.innerText = "Show less";
    }

    else {
        amount = 8;
        showAllLess.innerText = "Show more";
    }

    postsContainer.innerHTML = "";
    createHTML(results, amount);
})

// MENU 

const menu = document.querySelector(".toggle-menu-button");
const navigation = document.querySelector(".navigation");
const closeMenu = document.querySelector(".close-button");

menu.addEventListener("click", function openNav() {
    navigation.classList.add('navigation-active');
})

closeMenu.addEventListener("click", function closeNav() {
    navigation.classList.remove('navigation-active');
})


// CATEGORY COLOR

function categoryColor(category) {
    if (category === "Space") {
        color = "#B84814";
    }
    if (category === "Human") {
        color = "#066E62";
    }
    if (category === "Tech") {
        color = "#0D4267";
    }
}

// SEARCH BAR

const searchBar = document.querySelector("#search");

searchBar.addEventListener("keyup", filterResults);

function filterResults() {
    postsContainer.innerHTML = "";
    let value = this.value.toLowerCase();
    console.log(value);

    const filteredResults = results.filter(function mapFunction(result) {
        if (result.title.rendered.toLowerCase().includes(value) || result.acf.category.toLowerCase().includes(value)) {
            return true;
        }
    });

    createHTML(filteredResults, amount);
}


// CATEGORY SELECTION - CREATE BUTTONS

function createButtons(results) {
    const buttonContainer = document.querySelector(".category-buttons-div");
    // Looping everything with map and returning values from results.acf.category and creating a Set of the results.
    const uniqueArray = [...new Set(results.map(function mapFunction(results) {
        return results.acf.category
    }))];

    //Loop the new array
    for (let i = 0; i < uniqueArray.length; i++) {
        let button = document.createElement('button');
        button.className = 'category-button';
        button.innerText = uniqueArray[i];

        // Assign class according to value
        if (button.innerText === "Human") {
            button.classList.add("human-button")
        }
        if (button.innerText === "Space") {
            button.classList.add("space-button")
        }
        if (button.innerText === "Tech") {
            button.classList.add("tech-button")
        }

        buttonContainer.appendChild(button);
    }
}


// CATEGORY SELECTION - BUTTONS
