---
title: Navigating the DOM
image: dom.jpg
tags: [html]
---

The DOM, short for Document Object Model, gives you some much needed dynamic power to build better, more interactive websites. Using the DOM you are able to navigate through HTML code as if it were tree of interconnected objects. You can dynamically add, remove, or alter these objects as your user interfaces with your website.

### What is the DOM?

<div class="img-container"><img src="{{ "/assets/images/DOM/pic_html_tree.gif" | relative_url }}" alt="DOM Tree" class="article-image"></div>
<div class="img-container img-caption">Visual Example of navigating the HTML DOM Tree</div>

In the above example you can see how the DOM can be traversed. HTML is structered so that elements or tags are always associated with a parent element (all the way to the top of the page, beginning at the `<body>` or  `<html>` tag). Objects on your page (text, images, forms, etc...) are all connected to each other in a hierarchical tree structure. All of these objects are considered "nodes" of the DOM, pieces of the document model.

### How can this be used?

Let's talk about using the DOM and Javascript together. With JavaScript you have a powerful tool with which to manipulate your website. When writing HTML you'll find it's completely static, the web browser simply runs through the code from top to bottom and prints out your website for the user typically in that exact order. Hence the term _markup language_ in HTML. Any interaction with the website is extremely limited to only what you have asked it to show. You can do so much more by bringing out languages into the mix, such as Javascript. In the below example a visitor to the site can click a button and suddenly, without reloading the page, it's entire structure can be re-written.

<div class="img-container"><img src="{{ "/assets/images/DOM/comments1.png" | relative_url }}" alt="Replies Closed" class="article-image"></div>
<div class="img-container img-caption">Example comments HTML page</div>
<p></p>
<div class="img-container"><img src="{{ "/assets/images/DOM/comments2.png" | relative_url }}" alt="Replies Open" class="article-image"></div>
<div class="img-container img-caption">Using Javascript and the DOM to expand Bob's replies</div>

Above we have this commenting system built in plain HTML. By using Javascript and the DOM to dynamically alter the page based on user input, you can see we change the page in the second image when a user has clicked on something. In the example the user has clicked a link to see the 4 replies to Bob, and without reloading the page, the replies appear.

### Client vs. Server and the DOM's place in it all

There is an important but easy distinction between "client-side" and "server-side" web development, and yes it's written right into their descriptors. Anything developed to happen "client-side" is code that is entirely managed and processed on your personal computer. You send a request to a website (by typing in _jamielocatis.com_ for example), and the server sends back all of the code needed to make that website work. All of the processing of that code happens on your computer, inside of your web browser. HTML happens completely on the "client-side". JavaScript is also "client-side", but we can use it to communicate with the server to request and receive new data for the page (without having to do any reloading).

Opposite to this is "server-side" development, where portions of the code are processed completely on the server, and the server sends back to your computer only the HTML needed to display whatever it is you were requesting. Than using a language such as JavaScript, we can actively update the DOM with our new information.

Let's say the example above was something as robust as _Facebook_. On your initial page load, your computer would only need the code for the top image to load right? Why waste time and bandwidth sending everything else! When the user hits the link to show Bob's replies, a language like JavaScript would send an AJAX request to the server for that information. In response the server sends the requestsed code back, and the HTML DOM is updated to display all of the replies.

<div class="note_box"><strong>Note:</strong> I haven't talked about AJAX just yet. If you aren't sure what this is, check out my "Build Your First Game for the Web" tutorial!</div>

### What are events?

We have talked about how using the DOM and Javascript can be a great way to add some true dynamic functionality to your website. "Events" are exactly how they sound, coded events that will tell the computer when "this" happens go do "that". In the comments example from above a Javascript event was coded to a DOM node (in this case the '4 replies' link) that said when clicked, do everything needed to get the 4 replies for Bob.

### What are event listeners? How are they used in web development?

So what triggers these events? How do we tell computer that "this" has happened. In Javascript it's called an event listener.

{% highlight javascript %}
var repliesArray = document.getElementsByClassName("reply_click");

for (x = 0; x < repliesArray.length; x++) {
  repliesArray[x].addEventListener("click", showReplies);
}
{% endhighlight %}

There are several different ways of creating an event listener. In the above example we wait for a "click" on the '4 Replies' link, and than run the function 'showReplies'. We can even create groups of events through loops, which is done in the above code. It creates an event listener for every defined 'reply_click' link it finds in the DOM. When one of these are clicked, the `showReplies` function does it's thing.

### Get to know the DOM

Understanding the DOM is important to good web development. Play around with it and see the power it has to offer you. Updating websites without reloading them is significant when you think about how your user will be interacting with what you build.

<div class="img-container"><img src="{{ "/assets/images/DOM/console_example.jpg" | relative_url }}" alt="Inspecting a Page" class="article-image"></div>
<div class="img-container img-caption">Inspecting a page through the browser</div>

One tip for seeing how webpages are structured in this hierarchical structure is to inspect any page through your browser's developer tools. You will begin to see how all this fits together!