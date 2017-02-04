# Build Your Own Node Package

In this lab we will be exploring the node CLI and the concept of a javascript "package" or "module".

> This tutorial assumes you have `node` installed on your computer.

## The `node` REPL
"R.E.P.L." stands for "Read Evaluate Print Loop". The Chrome Javascript Console is an example of a REPL.

From the command line, type `node`. This will launch the node REPL. Type `.exit` to quit.

```bash
$ node

> 1 + 1;
2
> "hello" + "world";
"helloworld"
> .exit
```

The keyboard shortcut `ctrl+c` is your friend! Node will *only* evaluate syntactically correct code (e.g. all your brackets match). If you forgot to close a bracket, you will see `...` when you hit enter. Here are your options:
- Hit `ctrl+c` to start over if the mistake in on the line above.
- If your current code is correct, keep typing and complete your thought.

```bash
$ node

> function bad({
...                     # Uh oh! Super broken code. Hit ctrl+c to start over!
>
> function good(){
... return "yay";
... }                   # oops, almost forgot to close my curly bracket!
undefined
> good();
"yay"
> .exit
```

## Getting Fancy with Packages
The core javascript library has a lot of cool features, but it doesn't do everything. When we want more powerful tools, or have a domain-specific problem, we generally get help from third-party libraries and frameworks.

> Jargon Note: The words "Package", "Module", and "Library" are used interchangably.

For example the library [Lodash](https://lodash.com/) has a bunch of convenience methods that make working with arrays easier.

Using the lodash [`.last()`](https://lodash.com/docs/4.17.4#last) method we can grab the `"c"` in the following array:

``` js
> var lodash = require("lodash"); // import the lodash library into the REPL
> lodash.last(["a", "b", "c"]);
"c"
> .exit
```

**BUT WAIT!** We need to download the lodash package first!

From inside your project directory:
```bash
$ npm -v
4.1.2       # Make sure you have npm >= v4.1.2

$ npm install lodash
# wait for it to install
# You will see "WARN" messages --> that's okay!
$ ls
# README.md node_modules
```

Now your project directory has a new folder in it called `node_modules` and our first package "lodash".

        .
        ├── README.md
        └── node_modules
            └── lodash
                ├── LICENSE
                ├── README.md
                ├── index.js
                ├── last.js
                ├── /... and many more files .../

**Question**: What do you think is in `lodash/last.js`? (Take a look!)

### Setting Up `package.json`
When you want to include third-party packages in your project as "dependencies", you need to list which versions of packages you're using. To make this easier, `npm` stores this information in a json object called `package.json`.

To generate this file, type `npm init` and then follow the prompts. (You can hit `Enter` to accept all the default options):

        name: (build-your-own-node-package) sillyipsum
        version: (1.0.0) 
        description: A silly fake data generator, a la lorem-ipsum.
        entry point: (index.js) 
        test command: 
        git repository: 
        keywords: 
        author: janedoe
        license: (ISC) MIT
        About to write to /path/to/build-your-own-node-package/package.json:

        {
          "name": "sillyipsum",
          "version": "1.0.0",
          "description": "A silly fake data generator, a la lorem-ipsum.",
          "main": "index.js",
          "dependencies": {
            "lodash": "^4.17.4"
          },
          "devDependencies": {},
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "author": "janedoe",
          "license": "MIT"
        }


        Is this ok? (yes)


Now you should see `"lodash"` listed as a dependency in your `project.json`.

STOP and COMMIT!
```bash
    git add package.json # only add this file
    git commit -m "added package.json, lodash dependency"
```

### Make sure to `.gitignore` `node_modules`!
You're going to be using a ton of third-party libraries and frameworks, so over time your `node_modules` folder can get pretty big. Let's tell `git` that it's okay to ignore our `node_modules` folder. All of our dependencies are listed in `package.json`, so it's easy for another developer to get up and running (all they have to do is type `npm install` and node will take care of the rest).

Right now if you type `git status` it will list the `node_modules` folder, and we don't want that. To fix this:

1. Open `.gitignore` in your text editor.
2. Add a the word `node_modules` on a new line. Don't forget to save!
3. Now when you type `git status` you will see that `node_modules` is no longer listed.
4. Now we're ready to `git add` and `git commit`!

STOP and COMMIT!
```bash
    git add .gitignore  # only add this file
    git commit -m "ignored node_modules"
```

## Node REPL Practice
- Open and close the node REPL.
- Open the REPL and make a syntactical mistake (e.g. if you typed `[{])` accidentally). How do you recover?
- Import the lodash library into the REPL.
    + Are you sure you imported it?

<!-- DO NOT INDENT details/summary BLOCK -->
<details>
<summary>**Use the lodash [`.compact()`](https://lodash.com/docs/4.17.4#compact) method to transform `[null, 2, null, 5]` into `[2, 5]`** (Click Here)</summary>
<br>
```js
$ node
> var lodash = require("lodash");
> lodash.compact([null, 2, null, 5]);
[2, 5]
```
</details>

<!-- DO NOT INDENT details/summary BLOCK -->
<details>
<summary>**Bonus: How many methods does the lodash library have?** (Click Here)</summary>
<br>
```js
$ node
> var lodash = require("lodash");
> Object.keys(lodash).length;
308
> lodash.keysIn(lodash).length;
308
```
</details>


## Building Your Package
Let's create our first module, a silly [lorem-ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum) style fake data generator!

```bash
touch test.js
mkdir sillyipsum
touch sillyipsum/index.js
```

Add this to `sillyipsum/index.js`:

``` js
module.exports.sayHi = "hi";
module.exports.shakespearianInsult = function() {
    return "You villainous tickle-brained barnacle!";
}
```

Now open your node REPL:

```js
$ node
> var sillyIpsum = require("./sillyipsum/index.js");    // THESE ARE THE SAME
> var sillyIpsum = require("./sillyipsum");             // THESE ARE THE SAME
> sillyipsum;
{ sayHi: "hi", shakespearianInsult: [Function] }
> sillyIpsum.shakespearianInsult();
"You villainous tickle-brained barnacle!"
> .exit
```

> Note: The dot+slash at the beginning of "./sillyipsum/index.js" instructs node to look in the *current* directory for a file called "index.js" in a folder called "sillyipsum" (are you in the right directory?)

#### Why `index`.js?
When we name a file `index.js` or `index.html` we are indicating that it is the "main" entry point for the program. This makes it easy for developers (and programs!) to know exactly which file to run. That's why we can say `require("./sillyipsum")` and can skip the `index.js` part. This is true for hosted `index.html` files too!

## Running your module via `test.js`
Another way to execute your code is to use the `test.js` file.

Add the code from above to `test.js`:

```js
var sillyIpsum = require("./sillyipsum");
var output = sillyIpsum.shakespearianInsult();

console.log(output);
```

To execute this code from your command line, type:

```bash
$ node test.js
"You villainous tickle-brained barnacle!"
```

## Exercise
Can you extend your sillyipsum module to include methods for generating fake data? Here are some ideas:

- `loremIpsumSentence()` - A single [lorem ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum) sentence.
- `loremIpsumSentence(3)` - 3 lorem ipsum sentences.
- `random()` - A random number between 1-100;
- `random(0,10)` - A random number between 0 and 10;
- `state()` - A random state name.
- `city()` - A random city name.
- `streetAddress()` - A random street address.
- `fullAddress()` - A full address (city, state, street).
- The sky is the limit!

Do you want to use Lodash in your module? (There are a lot of useful utility methods we can benifit from!). All you have to do is `require` lodash in your `index.js` file (like we did in the REPL examples), and you'll have full access to lodash!

Good luck and have fun with sillyIpsum!

## Resources
- NPM's guide to [Installing Packages](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
- NPM's guide to [Using package.json](https://docs.npmjs.com/getting-started/using-a-package.json)
