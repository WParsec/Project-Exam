
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