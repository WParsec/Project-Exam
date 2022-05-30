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


// SLIDER

const scrollWrap = document.querySelector(".scroll-wrap");



// API RESULTS FOR SLIDER

const url = "https://dev-spider.com/futuredawn/wp-json/wp/v2/custom_posts?acf_format=standard&per_page=20"

let results = [];

async function getResults() {
    try {
        const response = await fetch(url);
        results = await response.json();

        createSlideContent(results, amountPerPage, currentPage);

    }
    catch (error) {
        console.log(error);
    }
}
getResults();


const slideWrap = document.querySelector(".scroll-wrap");

let currentPage = 1;
let amountPerPage = 3;
let color = "";

function createSlideContent(results, amountPerPage, currentPage) {
    slideWrap.innerHTML = "";
    currentPage--;
    console.log(results)

    if (currentPage === 0) {
        arrowLeft.style.display = "none";
    }
    else {
        arrowLeft.style.display = "block";
    }
    if (currentPage === 3) {
        arrowRight.style.display = "none";
    }
    else {
        arrowRight.style.display = "block";
    }

    let loopStart = currentPage * amountPerPage;
    for (let i = loopStart; i < loopStart + amountPerPage; i++) {
        categoryColor(results[i].acf.category);
        scrollWrap.innerHTML += `<a class= "card-div" href="details.html?id=${results[i].id}">
                                <div class="card-image-div" style="background-image: url(${results[i].acf.image})">
                                <div class="category" style="background-color: ${color}">${results[i].acf.category}</div></div>
                                <div class="card-title"><h3 class="card-title-h3">${results[i].title.rendered}</h3></div>
                                </a>`
    }
};

// ARROWS

const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");

arrowRight.addEventListener("click", slideRight);
arrowLeft.addEventListener("click", slideLeft);

// FUNCTION 

function slideRight() {
    currentPage++;
    createSlideContent(results, amountPerPage, currentPage);
}

function slideLeft() {
    currentPage--;
    createSlideContent(results, amountPerPage, currentPage);
}

// CATEGORY COLOR FUNCTION

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

// WINDOW SCROLL 

function windowScroll() {
    window.scrollTo({
        top: 700,
        behavior: 'smooth',
    })
};

const arrowDown = document.querySelector(".scroll-down-indicator-block");

arrowDown.addEventListener("click", windowScroll);