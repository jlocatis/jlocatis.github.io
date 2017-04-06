---
title: Setting Up A React Dev Environment, Part II
image: react.png
---

In this tutorial I will cover getting your React site up and running from a server so you can begin serving your react code to your browser. I will also give you the tools you need to finish creating the near _perfect_ dev environment for your React apps.

<div class="img-container"><img src="{{ "/assets/preview_images/reactjspt2.jpg" | relative_url }}" alt="ReactJS Logo" class="article-image"></div>

If you haven't been through [Part I of Setting Up A React Dev Enivronment]({% post_url 2017-03-31-react-setup-part1 %})Part I of Setting Up A React Dev Enivronment, do so before proceeding! Otherwise, let's dive in...

### Configure Babel

You should already have Babel installed inside of your app's directory. In the root of the directory, create a new file and save it as `.babelrc`. This file will configure Babel to work across your app. Remember that Babel will be compiling our JSX code into JavaScript, a core component of React. Save the following code in `.babelrc`:

{% highlight javascript %}
{ presets: ['react'] }
{% endhighlight %}

### Configure Webpack

Next we need to configure Webpack. Webpack will actually be bundling all of our app's code together, and doing the final build on the transformed HTML and JavaScript files the browser will ultimately be served. But Webpack needs to know how it should be doing this, so let's create a configuration file. In your project's root directly, create a new file and save it as `webpack.config.js`.