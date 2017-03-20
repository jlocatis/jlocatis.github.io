window.addEventListener("load", function() {
	document.getElementById("hamburger").addEventListener("click", displayMenu);
	var windowWidth = document.documentElement.clientWidth;
	if (windowWidth >= 650) {
		window.onscroll = function() {
   			// if (document.body.scrollTop + document.documentElement.scrollTop > 100) {
   			// 	document.getElementsByClassName("menu-bar")[0].className = "menu-bar-sticky";
   			// 	document.getElementById("menu-items").id = "menu-items-sticky";
   			// 	document.getElementById("nav-right").id = "nav-right-sticky";
   			// } else {
   			// 	document.getElementsByClassName("menu-bar-sticky")[0].className = "menu-bar";
   			// 	document.getElementById("menu-items-sticky").id = "menu-items";
   			// 	document.getElementById("nav-right-sticky").id = "nav-right";
   			// }
   			$(document).ready(function() {
        		var $header = $("header"),
            	$clone = $header.before($header.clone().addClass("clone"));
        		$(window).on("scroll", function() {
            		var fromTop = $(window).scrollTop();
            		$("body").toggleClass("down", (fromTop > 400));
        		});
    		});
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