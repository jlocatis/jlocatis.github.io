window.addEventListener("resize", function() {
	windowWidth = document.documentElement.clientWidth;
	stickyNav(windowWidth);
});

window.addEventListener("load", function() {
	document.getElementById("hamburger").addEventListener("click", displayMenu);
	windowWidth = document.documentElement.clientWidth;
	stickyNav(windowWidth);
	// if (windowWidth >= 650) {
	// 	window.onscroll = function() {
 //   			if (document.body.scrollTop + document.documentElement.scrollTop > 100) {
 //   				document.getElementsByClassName("menu-bar")[0].className = "menu-bar-sticky";
 //   				document.getElementById("menu-items").id = "menu-items-sticky";
 //   			} else {
 //   				document.getElementsByClassName("menu-bar-sticky")[0].className = "menu-bar";
 //   				document.getElementById("menu-items-sticky").id = "menu-items";
 //   			}
	// 	}
	// }
});

function stickyNav(windowWidth) {
	if (windowWidth >= 650) {
		window.onscroll = function() {
   			if (document.body.scrollTop + document.documentElement.scrollTop > 100) {
   				document.getElementsByClassName("menu-bar")[0].className = "menu-bar-sticky";
   				document.getElementById("menu-items").id = "menu-items-sticky";
   			} else {
   				document.getElementsByClassName("menu-bar-sticky")[0].className = "menu-bar";
   				document.getElementById("menu-items-sticky").id = "menu-items";
   			}
		}
	}
}

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