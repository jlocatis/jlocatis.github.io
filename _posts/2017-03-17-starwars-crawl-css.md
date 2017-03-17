---
title: Star Wars Opening Crawl in CSS
image: crawl_example.jpg
---

How about something cool and completely useful on every website? Let’s build a Star Wars opening crawl entirely using CSS. No JavaScript required!

<div class="img-container"><img src="{{ "/assets/images/swcss/crawl_example.jpg" | relative_url }}" alt="Star Wars Crawl" class="article-image"></div>

It’s quite simple really. First build a basic HTML page containing two `<div>` containers for our crawl content.

<script src="https://gist.github.com/jlocatis/544a268a55d2a3ae44db000fa64ec5a0.js"></script>

The outer `<div>` with an id of `crawl_box` will contain most of the wizardry required to make this work! The inner `<div>` with an id of `content` will contain the engaging words you wish to share with the world. For the crawling text I simply used `<p>` tags to get the spacing needed in between your paragraphs. I did use two different `<div>` containers to get the crawl episode number and title looking as close as (I think) possible to the real thing.

Now for some movie making magic! Let’s use CSS to set how we want our `body` of the page to look. I grabbed a generic star background image off Google Images (yes I know it is NOT the exact Star Wars background image). You can choose any background that suits you best, but I would make sure to go with a higher resolution image. That way it holds up well with your great looking crawl. Here is a <a href="{{ "/assets/images/swcss/star_background.jpg" | relative_url }}" target="_blank">link</a> to the one I used. Also (after extensive research) I decided the font ‘News Cycle’ comes fairly close to the original crawl font. But play around and find one that suits you best!

<div class="note_box"><strong>Note:</strong> ‘News Cycle’ is available free from Google Fonts. Just use the CSS stylesheet link in your page’s head to include the use of the font throughout your page! <a href="https://fonts.google.com/specimen/News+Cycle" target="_blank" style="color:black">Link</a></div>

The next bit of CSS will animate our crawl using the `@keyframes` rule. Read more about how that works <a href="https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp" target="_blank">here</a>.

<script src="https://gist.github.com/jlocatis/b2e6ae56f6676b0f7880842c6889b188.js"></script>

Next we set the parameters for our two containers `crawl_box` and `content`.

<script src="https://gist.github.com/jlocatis/dbd35089c47fb735d79a8cda6655376d.js"></script>

Notice the use of `transform-origin` and `transform` in order to create the 3D perspective of the text. Combined with the animation we build (called `crawl`, which is than called in the `@keyframes` rule from above), we create the 3D illusion of the text moving through space away from you. If you need to change the timing of the crawl to more closely match your text, simply edit the time (second property) of `animation`.

Finally, here is the quick CSS I created for centering and styling the episode title and name. You don’t need to include this, any good film buff would know that Star Wars was originally released in 1977 without an episode number or title in the opening crawl. 

<div class="note_box"><strong>Fun Fact:</strong> The title ‘Episode IV: A New Hope’ was added in 1980 when The Empire Strikes Back was released as Episode V.</div>
<p></p>
<script src="https://gist.github.com/jlocatis/a58da0197cf198701110ae47e11df8df.js"></script>

That’s it! Have fun with it. Put it on every website you make, together let’s make the internet great again! Star Wars crawls everywhere!