---
title: Build Your First Game for the Web
image: waldo_front.jpg
tags: [javascript, ruby, sinatra]
---

<p>This tutorial will walk you through the steps of creating an interactive Where's Waldo game for the web. You will be able to select you're own Where's Waldo image, and build your program around this image. Introducing some basic JavaScript and Ruby code with AJAX functionality.</p>

<div class="img-container"><img src="{{ "/assets/images/waldo/waldo_front.jpg" | relative_url }}" alt="My Where's Waldo game" class="article-image"></div>
<div class="img-container img-caption">My Where's Waldo game</div>

<h3>Basic Concepts</h3>

<p>It will store high scores on the server with the player's name for others to see. Most importantly from a programming perspective, the location of Waldo within the image will be stored server-side preventing the player from "cheating". To break the program down we will need to accomplish the following:</p>

<ul>
	<li>These first steps can be accomplished on your own before we get into the nitty-gritty:</li>
	<li class="hidden-li">
		<ul>	
			<li>Search the internet for a Waldo image to use. (And yes you will need to solve it first so you know where Waldo is!)</li>
			<li>Build this image into a basic HTML page for now. (If you don't know HTML, go check out some tutorials and come back to this later!) Don't worry too much about the CSS styling of the page. Portions of your program may eventually rely on a little bit of CSS so I would reccommend for now just creating an empty stylesheet and integrating that into your HTML page.</li>
		</ul>
	</li>
	<li>After the above is done, we can start accomplishing these goals:</li>
	<li class="hidden-li">	
		<ul>
			<li>Build a way for the user's click location within the image to be calculated.</li>
			<li>Send that information to a server.</li>
			<li>Once on the server-side, check the click location against Waldo's actual location.</li>
			<li>Send either true or false back to the client.</li>
			<li>Either display some sort of message indicating to the user they haven't found Waldo yet, or end the game if true is returned.</li>
			<li>If true, tell the user they're successful.</li>
			<li>Add a live timer to the page so we can provide a little pressure to the user, and give them a score at the end.</li>
			<li>Build a way for these timed scores to be stored in a high scores list on the server.</li>
			<li>Add the high scores list functionality to the game (including allowing the user to save their name with their score).</li>
		</ul>
	</li>
	</ul>

<p>Sounds easy enough right!? Let's get started...</p>

<p>First let's go to your HTML page containing your Waldo image. We need a way to get x and y's pixel variables of the user's click location. We will compare these numbers to the real location of Waldo (which you should be aware of). First let's find Waldo's pixel coordinates within your image. If you haven't already, I suggest you use HTML to set a fixed width for your image, especially if the image is larger than your typical screen at full size. You want to make sure the image fits nicely in a window for the user to see, and also that it's size will be the same across different browser/computer setups. After this is done we will use the JavaScript console of your browser to find Waldo's coordinate range.</p>

<p>In your code editor create a new JavaScript file. We will be using JavaScript for programming this portion of the game. Now let's create a function that will tell us the click location of our mouse within the image. This can be done with the code below:</p>

{% highlight javascript %}
var x = 0;
var y = 0;

function findClickLocation(event) {
	var click_event = window.event;
	x = click_event.offsetX?(click_event.offsetX):click_event.
		pageX-document.getElementsByClassName("waldo").offsetLeft;
	y = click_event.offsetY?(click_event.offsetY):click_event.
		pageY-document.getElementsByClassName("waldo").offsetTop;
}
{% endhighlight %}

<p>We will be using JavaScript's <em>window.event</em> method which will give us all sorts of information about the state of the page as the event happens. But wait, what is the event? We also need to add an event listener to our JavaScript that will "listen" for when the click occurs, and execute the code in our <em>findClickLocation</em> function when it happens. Make some room at the top of your JS file and add the following code:</p>

{% highlight javascript %}
window.addEventListener("load", function() {
	document.getElementsByClassName("waldo")[0].
		addEventListener("click", findClickLocation);
}
{% endhighlight %}

<p>In order for the above event listener to work, you will need to return to your HTML page and give your Waldo image the class name "Waldo" (please see HTML tutorials on how this can be accomplished). The above JS code will add the event listener when our <em>window</em>, or page, loads. Just one last step we need in order to find Waldo's coordinates. Add a <em>debugger;</em> to the end of your findClickLocation function. The debugger will let us use your browser's JavaScript console to see where we are clicking. Everytime the browser reaches the debugger line (which will be on every click), it will halt the execution of the program and allow you to interact with it's current state.</p>

<div class="img-container"><img src="{{ "/assets/images/waldo/JS_console.jpg" | relative_url }}" alt="Accessing the JavaScript console" class="article-image"></div>
<div class="img-container img-caption">Accessing the JavaScript console</div>
<p></p>
<div class="img-container"><img src="{{ "/assets/images/waldo/click_event.jpg" | relative_url }}" alt="Looking at a click event in the console" class="article-image"></div>
<div class="img-container img-caption">Click event in the console</div>

<p>The first image above shows me opening my JavaScript console. The second image shows me clicking on my waldo image with a debugger in place, and exploring what is returned in <em>window.event</em>. In the above example I am using Google Chrome, but your browser of choice will have something similiar. Feel free to type "click_event" into your console, and see the output of everything <em>window.event</em> gives you. All we need is the <em>offsetX</em> and <em>offsetY</em> position of the click. These are the location of the mouse within the event target (in this case the Waldo image).</p>

<div class="img-container"><img src="{{ "/assets/images/waldo/x_and_y.jpg" | relative_url }}" alt="Example location of x and y" class="article-image"></div>
<div class="img-container img-caption">X and Y in the console</div>

<p>Click around and write down the range Waldo exists within. We will need this a bit later. For now let's focus on getting the click location of <strong>x</strong> and <strong>y</strong> to a server. For this piece of the project we will be coding in Ruby on the server-side, and will be using the Sinatra framework. If you aren't sure how the Sinatra framework handles things, please read over the beginnings of <a href="http://www.sinatrarb.com/intro.html" target="blank">this README</a> to familiarize yourself. You will only need to understand the basics of a Ruby web framework in order to proceed. Create your controller action file first. Start it out with this code:</p>

{% highlight ruby %}
require 'sinatra'
require './functions.rb'
require 'pry'

get('/') do
	erb :index
end

get('/return') do
	waldo = waldoTest(params)
	waldo = waldo.to_s
	return waldo
end
{% endhighlight %}

<p>The above code will get the routes you need to finish the next few steps of our program. Return to your JS script file and let's write a function that will take our <strong>x</strong> and <strong>y</strong> coordinates and send them to the Ruby route '/return' we just created. Create a function named <em>getData</em>:</p>

{% highlight javascript %}
function getData() {
	httpRequest = new XMLHttpRequest();
	var coordinates = "x=" + x + "&y=" + y;
	httpRequest.open('GET', '/return?' + coordinates)
	httpRequest.setRequestHeader("Content-type", 
		"application/x-www-form-urlencoded");
	httpRequest.onreadystatechange = function() {
		// var waldo_test = httpRequest.responseText
		if (httpRequest.responseText == "true") {
			console.log("true!!!");
			}
		} else if (httpRequest.responseText == "false") {
			console.log("false :(:(:(");
	}
	}
	httpRequest.send();
}
{% endhighlight %}

<p>For now we just want to make sure it works, so I have included <em>console.log</em> statements within our true/false test that will just print "true" or "false" to your JS console. You're probably wondering what some of that code is. Here I am introducing AJAX (Asynchronous JavaScript and XML). Using AJAX, we can communicate easily between our client side code and our server side code. Examine the above code and see if you can guess what it is doing. It creates a new <em>XMLHttpRequest</em>, and sends our <strong>x</strong> and <strong>y</strong> variables as parameters to the server where we can use them in our Ruby code. <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started" target="blank">Here</a> is some good entry level reading on the details of AJAX if interested, but it is important to understand that it is basically designed to do two things:</p>

<ul>
	<li>Make requests to the server without reloading the page</li>
	<li>Receive and work with data from the server</li>
</ul>

<p>Back in the Ruby route for '/return' we need to create our function <em>waldoTest</em> to check and see if the user clicked on Waldo or not. If you haven't done so already, make a ruby file to hold your functions. Let's add the code to check if waldo exists:</p>

{% highlight ruby %}
## Replace your x and y min/max variables with the actual integer numbers 
## you wrote down from your JavaScript console.

def waldoTest(params)
	x = params[:x]
	y = params[:y]
	waldo_test = true
	if x.to_i >= x_min && x.to_i <= x_max && 
		y.to_i >= y_min && y.to_i <= y_max
			waldo_test = true
	else
		waldo_test = false
	end
	
	return waldo_test
end
{% endhighlight %}

<p>This will return true or false based on your provided coordinates. Notice back on the controller page that we set this variable to a string before returning it at the end of the route. Any variable returned at the end of your Ruby route is what the JavaScript AJAX request will receive. A JavaScript boolean object is different from a Ruby boolean object, so we will instead use a string.</p>

<p><strong>At this point test your program. It should be working. True or false should be returned to your JS console based on your click. If you have that working, let's make this thing a little more functional!</strong></p>

<p>This next step is somewhat more open-ended. If you would like to let the user know that their click was unsuccessful, there are several creative ways you can do it. I just added an extra line in my HTML essentially saying "wrong location", and used some JavaScript and CSS magic to display it for a few seconds if false is returned. What about true? In my HTML I built a reusable hidden modal window (this way I can re-use it for both the end game message and high scores). If true is returned, this window is displayed. Get creative with your HTML/CSS skills and see what you can come up with! Here is my updated <em>getData</em> function replacing our console.log statements with working code:</p>

{% highlight javascript %}
function getData() {
  httpRequest = new XMLHttpRequest();
  var coordinates = "x=" + x + "&y=" + y;
  httpRequest.open('GET', '/return?' + coordinates)
  httpRequest.setRequestHeader("Content-type", "application
  	x-www-form-urlencoded");
  httpRequest.onreadystatechange = function() {
	  // var waldo_test = httpRequest.responseText
	  if (httpRequest.responseText == "true") {
		  document.getElementsByClassName("not_yet")[0]
			  .style.display = "none";
		  document.getElementsByClassName("modal")[0]
			  .style.display = "block";
		  document.getElementsByClassName("modal_content")[0]
			  .style.display = "block";
		  document.getElementsByClassName("modal_title")[0]
			  .textContent = "You found him!";
		  clearInterval(current_timer);
		  final_minutes = document.getElementsByClassName("minutes")[0]
			  .textContent;
		  final_seconds = document.getElementsByClassName("seconds")[0]
			  .textContent;
		  document.getElementsByClassName("modal_body")[0].textContent = 
			  "Your final time was " + final_minutes + 
			  " minutes and " + final_seconds + " seconds.";
		  document.getElementsByClassName("submit_score")[0]
			  	.addEventListener("click", function() {
			  winner_name = document.getElementsByClassName("winner_name")[0]
			  	.value;
			  storeScores(winner_name, final_minutes, final_seconds);
		  });
	  } else if (httpRequest.responseText == "false") {
		  document.getElementsByClassName("not_yet")[0].style.display = 
			  "block";
		  setTimeout(resetResponseError, 5000);
		  function resetResponseError() {
			  document.getElementsByClassName("not_yet")[0].style.display = 
			  	"none";
		  }
  }
  }
  httpRequest.send();
}
{% endhighlight %}

<p>You might notice some code in the above function referring to a timer. Let's add some fun to your game by making a live timer on the screen that starts counting the instant the user loads the page. We can also use these times as a means of tracking high scores. There are several ways a timer in JavaScript can be accomplished. For this program I built a custom timer, that updates a string formatted like a clock ("minutes:seconds") every second:</p>

{% highlight javascript %}
var current_timer = "";

function timer() {
	var sec = 0;
	function pad(val) { 
		return val > 9 ? val : "0" + val; 
	}
	current_timer = setInterval( function(){
    document.getElementsByClassName("seconds")[0]
    	.textContent=pad(++sec%60);
    document.getElementsByClassName("minutes")[0]
    	.textContent=pad(parseInt(sec/60,10));
	}, 1000);
}

timer();
{% endhighlight %}

<p>My approach will create a bigger challenge later on when we go to sort our scores based on time (since we aren't actually storing time, but a string of time). But it does, in my opinion, look nicer to the user. </p>

<p>So the timer code was already added to my <em>getData</em> function above, now let's build a function that will store those scores on the server. You may have already noticed in my <em>getData</em> function I call a new function named <em>storeScores</em> that will run if a player wins and chooses to submit their score. We will need to create another AJAX request to send this information back to the server. Here goes:</p>

{% highlight javascript %}
function storeScores(name, minutes, seconds) {
	httpRequest = new XMLHttpRequest();
	var params = "name=" + name + "&mins=" + minutes + "&secs=" + seconds;
	httpRequest.open('POST', '/storescores?' + params);
	httpRequest.setRequestHeader("Content-type", 
		"application/x-www-form-urlencoded");
	httpRequest.send();
	event.stopImmediatePropagation();
}
{% endhighlight %}

<p>While we are at it, let's also create a way to pull back those scores from the server for display. Create a link somewhere in your HTML and add an event listener in your JavaScript. Here is the code creating another AJAX request getting our scores:</p>

{% highlight javascript %}
function showScores() {
	clearInterval(current_timer);
	document.getElementsByClassName("modal")[0].addEventListener("click", 
		function(){
		window.location.href = "/";
	});
	document.getElementsByClassName("modal")[0].style.display = "block";
	document.getElementById("score_modal").style.display = "block";
	document.getElementsByClassName("modal_body")[0].style.display = "none";
	xhr = new XMLHttpRequest();
	xhr.open('GET', '/showscores');
	xhr.onreadystatechange = function() {
		document.getElementById("score_body").innerHTML = xhr.responseText
	}
	xhr.send();
}
{% endhighlight %}

<p>Let's add some routes to our ruby controller to make this all work:</p>

{% highlight ruby %}
post('/storescores') do
	storeScore(params)
end

get('/showscores') do
	scores = loadScores()
	scores = scores.join("")
	scores = scores.gsub(',', ', ')
	scores = scores.gsub(/\n/, '<br>')
	return scores
end
{% endhighlight %}

<p>In our '/storescores' route we send the data to a function called <em>storeScore</em>. Let's write it:</p>

{% highlight ruby %}
def storeScore(params)
	new_score = params[:name] + "," + params[:mins] + ":" 
		+ params[:secs] + "\n"
	File.open('./public/highscores.csv', 'a+') do |file|
		file << new_score
	end
end
{% endhighlight %}

<p>We are writing the scores to a .csv file (in the above example, called 'highscores.csv') that will be stored on the server. Now what if someone wants to see the high scores? Let's make the '/showscores' route a reality. Depending on how you chose to track time you could be doing something completely different. But that's the fun in programming, solving unique problems in different ways! My function is a little more complicated because it needs to break our clock string down into seconds, sort the scores by seconds, and restore the time back to it's clock format. It's a fun algorithmic excercise to rack your brain on! Here is the code:</p>

{% highlight ruby %}
def loadScores()
	scores = []
	CSV.foreach('./public/highscores.csv', {headers:true}) do |row|
		row["Name"] = row["Name"].chomp
		row["HighScore"] = row["HighScore"].chomp
		scores << row.to_s
	end

	# Takes the minutes/seconds string, converts it into seconds 
	# as an integer, sorts the array based on the integer value, 
	# and returns the seconds integer back into a minutes/seconds string.
	
	sort_scores = []
	scores.each do |x|
		time_array = x.split(',')
		current_time = time_array[1]
		mins = current_time.slice(0,2).to_i
		secs = current_time.slice(3,2).to_i
		time_array[1] = (mins * 60) + secs
		sort_scores << time_array
	end

	sort_scores = sort_scores.sort_by(&:last)
	sort_scores.each do |i|
		time = i[1]
		if time > 60
			seconds = time % 60 #seconds
			time = time / 60 #minutes
			if seconds < 10
				seconds = seconds.to_s
				clock = ":0" + seconds
			else
				seconds = seconds.to_s
				clock = ":" + seconds
			end
			if time < 10
				time = time.to_s
				clock = "0" + time + clock
			else
				time = time.to_s
				clock = time + clock
			end
		else
			if time < 10
				time = time.to_s
				clock = "00:0" + time
			else
				time = time.to_s
				clock = "00:" + time
			end
		end
		i[1] = clock
	end
	
	sort_scores_again = []
	sort_scores.each do |j|
		string = j.join(',')
		sort_scores_again << string + "\n"
	end

	return sort_scores_again
end
{% endhighlight %}

<p>One last bonus that happened in the code above but I didn't explain was adding a name to the high scores. Before anything in JS or Ruby can accomplish this, you need to get some sort of input method integrated into your HTML. If you look above you can see I grab the user's name and send it with the score in the <em>storeScores</em> JavaScript function. The <em>storeScore</em> Ruby function than writes the name and corresponding time to the .csv file. The <em>loadScores</em> function will sort the names as it sorts the times.</p>

<p>I hope this tutorial was informative and fun! Spend sometime after you get the game working styling it up through HTML and CSS. For added difficulty you can add multiple Waldo pictures to your challenge. Enjoy!</p>