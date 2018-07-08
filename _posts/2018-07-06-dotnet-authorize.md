---
title: Stop Using Unsafe Strings to Refer to User Roles In Your ASP.NET Application
image: dot-net-mvc.png
tags: [ASP.NET MVC, .NET, C#]
---

<p>Switch your user role references throughout your code base to an enum, instead of using the base ASP.NET implementation of just referencing the string role name. This helps to guarantee you won’t have any code errors when the application compiles. Also, learn how to easily create a custom ASP.NET MVC authorization attribute that will allow you to make use of this enum.</p>

### Introduction

<p>The base ASP.NET authorization attribute offers some robust access control throughout your application. This is important if you need to easily block certain users from seeing certain parts of your application. The base implementation of this can often cause problems, especially when working with a larger code base. Typically roles will be stored in your database with a name (a string), which can be referenced in code by the string that role has. When the application gets a user, it has a list of strings representing the roles the user is assigned. A standard Identity implementation will let you check a user role in a controller or in a view like so...</p>

{% highlight c# %}
var test = User.IsInRole("OtherTestRole");
{% endhighlight %}

These roles will probably look something like this in your database...

<div class="img-container">
    <img src="{{ "/assets/images/asp_net_authorize/DB_Roles_Example.PNG" | relative_url }}" alt="ASP.NET Identity Roles Database Example" class="article-image">
</div>
<div class="img-container img-caption">
    ASP.NET Identity Roles Database Example
</div>

### Make the Enum

<p>Let’s map those strings to an enum...</p>

{% highlight c# %}
public enum AuthorizeRoles
{
    Administrator,
    AnotherTestRole,
    OtherTestRole
}
{% endhighlight %}

### Check User Role

<p>There are a number of different ways you could override the current ASP.NET Identity User that you have access to, giving you a place to override the IsInRole method we used in the example above to check user role. To simplify this tutorial, let's just quickly create a User Helper that we can reference whenever we need to check user role. Inside of this new UserHelper class, let's write a quick method that gets the current HttpContext (so we can get to the current logged in User) and checks if they have any of our enum roles.</p>

{% highlight c# %}
public bool UserIsInRoles(params AuthorizeRoles[] roles)
{
    var httpContext = HttpContext.Current;

    if (roles.Any(r => httpContext.User.IsInRole(r.ToString())))
    {
        return true;
    }

    return false;
}
{% endhighlight %}

<p>Now anywhere in our application we can just make a call like this to check user role...</p>

{% highlight c# %}
var hasRole = UserHelper.UserIsInRoles(AuthorizeRoles.OtherTestRole, AuthorizeRoles.AnotherTestRole);
{% endhighlight %}

<p>The above code would return true if the currently logged in user has either OtherTestRole or AnotherTestRole associated with their account. This is much safer than the built in alternative, where you would pass these roles in as strings. Any typo in those strings wouldn't break until someone actually executed that code, whereas a typo in any of your enums will break when you compile your code. Plus you will also have the benefit of IntelliSense in Visual Studio.</p>

### Custom Authorization

<p>Now let’s create our own custom authorize attribute that will do the same as above, check for given roles using the enum instead of a string...</p>

{% highlight c# %}
public class CustomAuthorizeAttribute : AuthorizeAttribute
{
    public CustomAuthorizeAttribute(params AuthorizeRoles[] roles)
    {
        AuthorizedRoles = roles;
    }

    public AuthorizeRoles[] AuthorizedRoles { get; set; }

    protected override bool AuthorizeCore(HttpContextBase 
    httpContext)
    {
        if (httpContext == null)
        {
            throw new ArgumentNullException(nameof(httpContext));
        }

        if (AuthorizedRoles.Any(r => 
        httpContext.User.IsInRole(r.ToString())))
        {
            return true;
        }

        return false;
    }
}
{% endhighlight %}

<p>Our new attribute inherits from ASP.NET MVC’s <a href="https://docs.microsoft.com/en-us/previous-versions/aspnet/web-frameworks/dd460317(v=vs.118)" target="_blank">AuthroizeAttribute class</a>. It's constructor simply accepts an array of our attribute enum as it's parameters. By overriding the <a href="https://docs.microsoft.com/en-us/previous-versions/aspnet/web-frameworks/mt171834%28v%3dvs.118%29" target="_blank">AuthorizeCore method</a> of the AuthorizeAttribute, we can write our custom check to see if the user has any of the provided roles. Of course we are still just calling <em>.ToString()</em> on the enum, but at least it is <span style="text-decoration: underline;">only</span> happening here, greatly limiting the chance for any error (and again the compiler will catch a mistyped enum and throw an error, it won’t ever catch a mistyped string!).</p>

<p>Now we can call this attribute wherever we could normally call the Authorize attribute like so...</p>

{% highlight c# %}
public class TestController : Controller
{
    [CustomAuthorize(AuthorizeRoles.OtherTestRole)]
    public ActionResult Index()
    {
        return View();
    }
}
{% endhighlight %}

<p>Simple, easy, and safe!</p>