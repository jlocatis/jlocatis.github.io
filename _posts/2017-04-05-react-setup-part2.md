---
title: Setting Up A React Dev Environment, Part II
image: react.png
---

In this tutorial I will cover getting your React site up and running from a server so you can begin serving your react code to your browser. I will also give you the tools you need to finish creating the near _perfect_ dev environment for your React apps.

<div class="img-container"><img src="{{ "/assets/preview_images/reactjspt2.jpg" | relative_url }}" alt="ReactJS Logo" class="article-image"></div>

If you haven't been through [Part I of Setting Up A React Dev Enivronment]({% post_url 2017-03-31-react-setup-part1 %}), do so before proceeding! Otherwise, let's dive in...

### Configure Babel

You should already have Babel installed inside of your app's directory. In the root of the directory, create a new file and save it as `.babelrc`. This file will configure Babel to work across your app. Remember that Babel will be compiling our JSX code into JavaScript, a core component of React. Save the following code in `.babelrc`:

{% highlight javascript %}
{ presets: ['react'] }
{% endhighlight %}

### Configure Webpack

Next we need to configure Webpack. Webpack will actually be bundling all of our app's code together, and doing the final build on the transformed HTML and JavaScript files the browser will ultimately be served. But Webpack needs to know how it should be doing this, so let's create a configuration file. In your project's root directly, create a new file and save it as `webpack.config.js`. Go ahead and insert this code first:

{% highlight javascript %}
module.exports = {
  entry: __dirname + '/index.js',
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
  }
  ]
};
{% endhighlight %}

The entry line will be our _entry_ file that will serve our app. React is mostly designed to work with SPA's (Single Page Applications), which is why in the case above all of our React and JavaScript will be funnelled through one file, `/index.js` above. Using `__dirname` is a method of Node.js, which will set the root directory before the `/`. 

At the bottom we add `loaders`. This is where we tell Webpack what files to use as it builds our site. You can have multiple loaders but for a simple application you will only need one. Each loader should have a `test:`, where we tell Webpack what actual files to load. In the test above we use a regular expression to indicate that we want all JavaScript files to be loaded. After `test:` we set what files to `exclude:`. We told Webpack first to take all JavaScript files, but that would include everything that was setup in your `/node_modules` directory when we initially set the app up. We don't want that! Lastly we tell Webpack which `loader:` to use, which should be Babel since it will actually be reading through our React code. So to recap our loader:

* We want to include all .js files we will be writing.
* We want to exclude any .js files that came with Node.js, React, React-DOM, etc...
* We want to run our .js files through Babel to translate JSX into JavaScript.

So where does Webpack put all of this? Why the `output:` of course! This should always have two properties, `filename:` and `path:`. And you guessed it, the name of our transformed file will be `filename:`, and it will save that file in the `path:` directory.

### One more thing with Webpack

Almost done getting it setup. We need to configure Webpack's HTMLWebpackPlugin. As we are developing our files will be located where they need to be. But when we build these files for deployment using the Webpack settings above, it will only be building the `transformed.js` file. Can't get to that without some good old HTML. Using the HTMLWebpackPlugin will build the accompanying HTML with our new .js file. Add this to the top of your `webpack.config.js` file:

{% highlight javascript %}
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPlugin = new HTMLWebpackPlugin({
  template: __dirname + '/index.html'
});
{% endhighlight %}

When we go to deploy our app, this will build an `index.html` based on our development version, and will automatically add a `<script></script>` tag with our `transformed.js` file. In a dev environment we won't need to be building these files, just for deployment.

One last piece to make this work. Inside of `module.exports` after your loaders add:

{% highlight javascript %}
plugins: [HTMLWebpackPluginConfig]
{% endhighlight %}

Make sure you add a comma after your loaders!

### Setup command line scripts

The hardest part is _almost_ over. We need to setup scripts so we have a way to run our app from the command line. In the root directory you should have a file name `package.json`, open it. Navigate to `"scripts":` and replace anything inside of it with the following:

{% highlight javascript %}
"build": "webpack"
"start": "webpack-dev-server"
{% endhighlight %}

Now you can run `npm run start` to run your app in development mode. You will be doing this most of the time as you are coding. It will start a server at a specific port (Webpack usually runs on port 8080) where you can view your page! Another nice perk of Webpack is that it will refresh everytime you save a file, no need to refresh the page or restart the server. When you want to deploy your app, just run `npm run build` and your HTML and JavaScript files will be built for deployment without the need for a server!

### Get Babel Transform in your code editor (Sublime Text)

Depending on what code editor you are using, it may or may not understand what JSX is as you're writing it. If you're like me you enjoy the extra readability of code this adds when your editor colors things for you. Personally I'm coding in Sublime Text, and it does not have a built-in understanding of JSX as of this writing. You will need to install the Babel Transform package to make this work. See <a href="http://stackoverflow.com/questions/13124532/installing-packages-in-sublime-text-2" target="_blank">this Stack Overflow</a> if you are unsure how to go about installing Sublime Text packages.

### Ready to go!

You should be ready to begin coding in React. In the next tutorial we will create a simple Hello World app using React!