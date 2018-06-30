---
title: Enumeration Performance in .NET
image: placeholder.jpg
---

Read more into enumeration and performance of different methods in .NET.

More often than not I find myself writing code without regard to it's actual performance (good and bad, well mostly bad probably). You have a goal in front of you, the application needs to do something. If the perceived output performance of the code feels acceptable, most likely you move on. You don't always think about the minute details of how it actually performs.

### Antão Almada's Excellent Dive Into .NET Enumeration

Read more into <a href="https://blog.usejournal.com/enumeration-in-net-d5674921512e" target="_blank">Antão Almada's blog on .NET enumeration performance</a>. His deep dive into IEnumerable() vs. IQueryable() is of particular interest. The big takeaway, if searching an IEnumerable() object, always use Any() to see if it contains what you're looking for.