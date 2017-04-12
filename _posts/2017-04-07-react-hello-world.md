---
title: Hello World From React
image: react.png
---

Learn how to build a simple Hello World app in React!

If you haven't already make sure you read [Part I]({% post_url 2017-03-31-react-setup-part1 %}) and [Part II]({% post_url 2017-04-05-react-setup-part2 %}) of my Setting Up a React Dev Environment tutorials. If you have everything setup and ready to go let's dive in!

<div class="img-container"><img src="{{ "/assets/preview_images/reactjshw.jpg" | relative_url }}" alt="ReactJS Logo" class="article-image"></div>

### Let's do this

In your root directory containing your new React program, create a new file `index.html`. This should be a simple page, give it a title if you want. The only thing it really needs for this is one `<div>` element. You don't even have to put anything inside of it! Do give it an id of `app`. Your page should look something like this:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Hello World from React!</title>
</head>
<body>
  <!-- Our empty div! React will work it's magic here. -->
  <div id="app"></div>

</body>
</html>
{% endhighlight %}

Next make an empty file named `index.js`. Inside of that dump the following code:

{% highlight javascript %}
// Import React into your app.
var React = require('react');
// Import the React DOM into your app.
var ReactDOM = require('react-dom');

// React is designed to a modular way of creating JavaScript based websites. Below we create a class called Hello World, which will render our Hello World HTML code. The code below is a mix of JavaScript and JSX.
var HelloWorld = React.createClass({
  render: function() {
    return (
      <div>
        // Notice below the JSX syntax on the break HTML tag. All tags in JSX must be closed!
        <h1>Hello World!</h1><br />
        // I'm sure you're wondering what this.props.name is. Read on for an explanation!
        <h2>From {this.props.name}</h2>
      </div>
    )
  }
});

// Call the React DOM to render our HelloWorld component to the DOM on our app div we created.
ReactDOM.render(<HelloWorld name="Jamie" />, document.getElementById('app'));
{% endhighlight %}

If you followed the instructions from the previous two tutorials, everything should be ready to work! Remember in our file `webpack.config.js` we defined our entry JavaScript file as `index.js` in our directory's root folder, and our HTML template was also defined as `index.html` in the root folder. If you wanted these to be located in different places you would simply need to go back to the Webpack config file and change these locations. At this point you should be able to run `npm run start` at your command line to start the server and see Hello World in action!

<div class="note_box"><strong>Note:</strong> Webpack's default location is localhost:8080. This means it runs on port 8080 of your computer when running the server.</div>

### How'd that work?

Let's walk through the React code and breakdown what happened. The first two lines (as noted in the comments) are required to import the React and ReactDOM libraries into your file. As you build bigger apps that span multiple files, you will be requiring these imports in every file (well at least React, you won't need ReactDOM except for anywhere you are actually writing something to the DOM). 

Next we use `React.createClass` on a variable named `HelloWorld`. This is creating a React class, or more often referred to as a component, named HelloWorld! Inside of this component we write an anonymous render function that returns some JSX. Doesn't like look HTML? Why yes, it does! JSX is mostly HTML in JavaScript, making the writing of components like these a breeze. I did mention in the comments that I would explain what `{this.props.name}` is doing...

Notice at the bottom of our React code where we actually call the ReactDOM to render our HelloWorld component. I wrote `<HelloWorld name="Jamie" />`, instead we could have just called `<HelloWorld />` and that would have still done everything contained inside of the HelloWorld component. But where `{this.props.name}` is, it would be blank! A prop is an item you can pass into a React component. This makes these components super modular and very scalable, as you can reuse them over and over again as you pass in different prop objects (or props, it can get confusing I know!).

The last line does almost exactly what it reads like, it calls on ReactDOM to render an object to something in the DOM. ReactDOM will always take two parameters, the first is your React component you are passing in, the second is where it needs to connect it. In the case above we connect it to the single `<div>` we created in our HTML page. Imagine chaining lots of these React components together for one simple ReactDOM render! That's the magic of React.

Above I mentioned how our HelloWorld component was moduler and reusable. It is important when desigining React apps to break down the objects within your site in this way. This article in the official Facebook docs on React, <a href="https://facebook.github.io/react/docs/thinking-in-react.html" target="_blank">Thinking in React</a>, is a great entry into the idea of what React should be used for.

### That's it!

You've just built a simple Hello World toy application in React from the ground up! Exciting right!? Go back and read [Part I]({% post_url 2017-03-31-react-setup-part1 %}) and [Part II]({% post_url 2017-04-05-react-setup-part2 %}) of my React tutorials if you haven't already!