window.addEventListener("load", function() {
  document.getElementById("hamburger").addEventListener("click", displayMenu);
  var windowWidth = document.documentElement.clientWidth;
	if (windowWidth >= 650) {
		window.onscroll = function() {
   			if (document.body.scrollTop + document.documentElement.scrollTop > 100) {
   				document.getElementById("menu-bar_fixed").className = "menu-bar-sticky";
   				document.getElementById("menu-items").id = "menu-items-sticky";
   				document.getElementById("nav-right").id = "nav-right-sticky";
   			} else {
   				document.getElementById("menu-bar_fixed").className = "menu-bar";
   				document.getElementById("menu-items-sticky").id = "menu-items";
   				document.getElementById("nav-right-sticky").id = "nav-right";
   			}
		}
	}
});

function displayMenu() {
	document.getElementById("hamburger").innerHTML = "<i class=\"fa fa-times-circle fa-2x\" aria-hidden=\"true\"></i>";
	document.getElementById("hamburger").removeEventListener("click", displayMenu);
	document.getElementById("hamburger").addEventListener("click", collapseMenu);
}

function collapseMenu() {
	document.getElementById("hamburger").innerHTML = "<i class=\"fa fa-bars fa-2x\" aria-hidden=\"true\"></i>";
	document.getElementById("hamburger").addEventListener("click", displayMenu);
	document.getElementById("hamburger").removeEventListener("click", collapseMenu);
}