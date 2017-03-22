---
title: The DOM and JavaScript
image: placeholder.jpg
---

The DOM, short for Document Object Model, gives you some much needed dynamic power to build better, more interactive websites. Using the DOM, you are able to navigate through HTML code as if it were tree of interconnected objects. You can dynamically add, remove, or most importantly alter these objects as your user interfaces with your website.

### How can this be used?

<div class="img-container"><img src="{{ "/assets/images/DOM/pic_html_tree.gif" | relative_url }}" alt="DOM Tree" class="article-image"></div>
<div class="img-container img-caption">Visual Example of navigating the HTML DOM Tree</div>

In the above example you can see how the DOM can be traversed. HTML is structered so that elements or tags are always associated with a parent element (all the way to the top of the page, beginning at the `<body>` tag or  `<html>` tag). Objects on your page (text, images, forms, etc...) are all connected to their parent tags in a hierarchical tree structure. All of these objects are considered "nodes" of the DOM, pieces of the document model.

Using the DOM and Javascript together gives you a powerful tool with which to manipulate your website. When writing HTML you'll find it's completely static, the web browser simply runs through the code from top to bottom and prints out your website for the user typically in that exact order. Hence the term _markup language_ in HTML. Any interaction with the website is extremely limited to only what you have asked it to show. You can do so much more though by dynamically integrating HTML with a real language such as Javascript. As an example, you can have the user click a button and suddenly, without reloading the page, it's entire structure can be re-written.

<div class="img-container"><img src="{{ "/assets/images/DOM/comments1.png" | relative_url }}" alt="Replies Closed" class="article-image"></div>
<div class="img-container img-caption">Example comments HTML page</div>
<p></p>
<div class="img-container"><img src="{{ "/assets/images/DOM/comments2.png" | relative_url }}" alt="Replies Open" class="article-image"></div>
<div class="img-container img-caption">Using Javascript and the DOM to expand Bob's replies</div>

In the above example you can see a comments system that has been written for in plain HTML. By using Javascript and the DOM to dynamically alter the page based on user input, you can see we change the page in the second image when a user has clicked on something. In the example the user has clicked a link to see the 4 replies to Bob, and without reloading the page, the replies are shown.

### What is the difference between "client-side" and "server-side" web development?

There is an important but easy distinction between "client-side" and "server-side" web development, and yes it's written right into their descriptors. Anything developed to happen "client-side" is code that is entirely managed and processed on your personal computer. You send a request to a website (by typing in _jamielocatis.com_ for example), and the server sends back all of the code needed to make the website work. All of the processing through that code happens on your computer, inside of your web browser. HTML happens completely on the "client-side". JavaScript is also "client-side", but we can use it to communicate with the server to request and receive and new data for the page (without having to reload the page).

Opposite to this is "server-side" development, where portions of the code are processed completely on the server, and the server sends back to your computer only the HTML needed to display whatever it is you were requesting. Than using a language such as JavaScript, we can actively update the DOM with our new information.

Let's say the example above was something as robust as _Facebook_. On your initial page load, your computer would only need the code for the top image to load right? Why waste time and bandwidth sending everything else! When the user hits the link to show Bob's replies, a language like JavaScript would send an AJAX request to the server for those replies. The server sends the code back, and the HTML DOM is updated to display all of the replies.

<div class="note_box"><strong>Note:</strong> I haven't talked about AJAX just yet. If you aren't sure what this is, check out my "Build Your First Game for the Web" tutorial!</div>

### What are events?

We have talked about how using the DOM and Javascript can be a great way to add some true dynamic functionality to your website. "Events" are exactly how they sound, coded events that will tell the computer when "this" happens go do "that". In the comments example from above a Javascript event was coded to a DOM node (in this case the '4 replies' link) that said when clicked, do everything needed to get the 4 replies for Bob.

### What are event listeners? How are they used in web development?

Events were described above, essentially a way of telling the computer to do something when something specifically happens to trigger it. But what is that specific something? In Javascript it's called an event listener.

{% highlight javascript %}
var repliesArray = document.getElementsByClassName("reply_click");

for (x = 0; x < repliesArray.length; x++) {
  repliesArray[x].addEventListener("click", showReplies);
}
{% endhighlight %}

There are several different ways of creating an event listener. In the above example we wait for a "click" on the '4 Replies' link, and than run the function 'showReplies'. We can even create groups of events through loops, like the above example. It creates an event listener for every defined 'reply_click' link it finds in the DOM. When clicked, it will run the `showReplies` function.

### Get to know the DOM

Understanding the DOM is important to good web development. Play around with it and see the power it has to offer you. Updating websites without reloading them is significant when you think about how your user will be interacting with what you build.