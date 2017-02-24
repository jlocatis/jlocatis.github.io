window.addEventListener("load", function() {
	document.getElementById("hamburger").addEventListener("click", displayMenu);
});

function displayMenu() {
	document.getElementsByClassName("menu-bar")[0].style.top = "100px";
	document.getElementsByClassName("menu-bar")[0].style.opacity = "1";
	document.getElementById("hamburger").innerHTML = "<i class=\"fa fa-times-circle fa-2x\" aria-hidden=\"true\"></i>";
	document.getElementById("hamburger").removeEventListener("click", displayMenu);
	document.getElementById("hamburger").addEventListener("click", collapseMenu);
	document.getElementsByClassName("page-body")[0].addEventListener("click", collapseMenu);
}

function collapseMenu() {
	document.getElementsByClassName("menu-bar")[0].style.top = "45px";
	document.getElementsByClassName("menu-bar")[0].style.opacity = "0";
	document.getElementById("hamburger").innerHTML = "<i class=\"fa fa-bars fa-2x\" aria-hidden=\"true\"></i>";
	document.getElementsByClassName("page-body")[0].removeEventListener("click", collapseMenu);
	document.getElementById("hamburger").removeEventListener("click", collapseMenu);
	document.getElementById("hamburger").addEventListener("click", displayMenu);
}