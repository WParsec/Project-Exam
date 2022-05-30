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

// FETCH 

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")

const url = "https://dev-spider.com/futuredawn/wp-json/wp/v2/custom_posts/" + id + "?acf_format=standard"

let results = [];

async function getResults() {
    try {
        const response = await fetch(url);
        results = await response.json();
        console.log(results);

        createHTML(results);

    }
    catch (error) {
        console.log(error);
    }
}
getResults(url);

// CREATE HTML FUNCTION

const flexWrap = document.querySelector(".details-header-flex-wrap");
const postTextDiv = document.querySelector(".post-text-div");

function createHTML(results) {
    flexWrap.innerHTML = "";
    flexWrap.innerHTML += `<div class="details-image-div" title="${results.acf.image_alt}" id="detailsImage" style="background-image: url(${results.acf.image})"></div>
                           <div class="title-and-author-wrap">
                           <h1 class="details-h1">${results.title.rendered}</h1>
                           <p class="author-name">By Tom Erik</p><p>${results.date}</p>
                           </div>`

    postTextDiv.innerHTML += `<div class="post-text-wrap">
                                <p class="post-para-1 post-para">${results.acf.paragraph_1}</p>
                                <h2 class="post-h2">${results.acf.heading_2}</h2>
                                <p class="post-para-2 post-para">${results.acf.paragraph_2}</p>
                                </div>`

    document.title = `Future Dawn | ${results.title.rendered}`;

    modalImage = document.querySelector(".details-image-div");
    modalImage.addEventListener("click", openModal);
}

// MODAL 

const modal = document.querySelector("#modal");
let modalContent = document.querySelector(".modal-content");

function openModal() {
    modal.style.display = "block";
    modal.innerHTML = `<div class="modal-content">
                            <div class="modal-top">
                                <span class="close-modal">&#10006;</span>
                            </div>
                            <div class="modal-image" title="${results.acf.image_alt}" style="background-image: url(${results.acf.image})">
                            </div>
                        </div>`

}

document.addEventListener("click", closeModal);

function closeModal(e) {
    if (e.target === modal || e.target.className === "close-modal") {
        modal.style.display = "none";
    }
}

