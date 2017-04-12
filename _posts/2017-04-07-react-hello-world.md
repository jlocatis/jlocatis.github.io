---
title: Hello World From React
image: react.png
---

Learn how to build a simple Hello World app in React!

<div class="img-container"><img src="{{ "/assets/preview_images/reactjshw.jpg" | relative_url }}" alt="ReactJS Logo" class="article-image"></div>

{% highlight javascript %}
var React = require('react');
var ReactDOM = require('react-dom');

var HelloWorld = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello World!</h1><br />
        <h2>From {this.props.name}</h2>
      </div>
    )
  }
});

ReactDOM.render(<HelloWorld name="Jamie" />, document.getElementById('app'));
{% endhighlight %}