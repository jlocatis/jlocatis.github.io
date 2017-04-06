---
title: Setting Up A React Dev Environment, Part I
image: react.png
---

This quick setup tutorial will get you started on everything you need to begin coding with ReactJS! After just a few steps you will be ready to begin coding in this newer declarative, component-based JavaScript library.

<div class="img-container"><img src="{{ "/assets/preview_images/reactjspt1.jpg" | relative_url }}" alt="ReactJS Logo" class="article-image"></div>

[Visit Part II of this tutorial!]({% post_url 2017-04-05-react-setup-part2 %})

### Prerequisites

You will need to have Homebrew, Node.js, and npm installed on your computer before proceeding. Ensure that your installation of Node.js is up to date and includes npm (Node Package Manager). The newest versions of Node.js should already include npm. Visit the Homebrew site <a href="https://brew.sh/" target="_blank">here</a> to get it up and running first. Next install Node.js via your Homebrew package manager using the following line:

`brew install node`

<div class="note_box"><strong>Note:</strong> If you aren't on macOS and can't use Homebrew, <a href="http://scoop.sh/" target="_blank">Scoop</a> is a similiar command-line installer for Windows. Head <a href="https://nodejs.org/en/download/package-manager/" tager="_blank">here</a> for a list of various package maanger install commands for Node.js.</div>

### Getting your template setup

Let's get everything installed and running in a new directory so you can begin coding in React! Create a new empty directory, and in your terminal type the following in order: (and make sure you are in your new empty directory!)

`npm init`

After entering this first command you will be prompted with a bunch of questions, just hit enter for all of them. As you learn more about React and Node you will use these prompts, but nothing needs to change to get a basic dev environment up and running.

`npm i -S react`

`npm i -S react-dom`

`npm i -D babel-core babel-loader babel-preset-react`

`npm i -D webpack webpack-dev-server html-webpack-plugin`

Whoa, that was a lot right? For starters I abbreviated a few things in those commands. Where you see `npm i` I am shortening `npm install`. I do the same with `-S` which is short for `--save`. The other we used was `-D`. This flag is short for `--save-dev` and saves an npm module for development version only.

We installed a lot, including React and the React-DOM! We also installed Babel, a next generation JavaScript compiler that will convert your React JSX syntax to regular JavaScript. JSX is a XML-like syntax extension for ES6, the latest version of JavaScript. I know there a lot of new terms being thrown out here, but we installed one more thing. Webpack will act as your server for the React code you will write. It bundles application source code in convenient chunks and loads that code from a server into a broswer.

<div class="img-container"><img src="{{ "/assets/images/reactjspt1/reactjs.png" | relative_url }}" alt="ReactJS Logo" class="article-image"></div>

Whew! Take some time to go over what just happened above. Your directory should now be full of files and folders. In [Part II]({% post_url 2017-04-05-react-setup-part2 %}) of Setting Up a React Dev Environment we will finish getting everything ready to go for your React app!