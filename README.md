# [Termino.js](https://github.com/MarketingPipeline/Termino.js/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/MarketingPipeline/Termino.js/blob/main/LICENSE) [![Current version](https://img.shields.io/github/package-json/v/MarketingPipeline/Termino.js.svg?style=flat)](https://github.com/MarketingPipeline/Termino.js/releases)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/MarketingPipeline/Termino.js/blob/main/README.md#contributing-)



**[User Showcase](https://github.com/MarketingPipeline/Termino.js/blob/gh-pages/showcase.md)** | **[Live Demo](https://marketingpipeline.github.io/Termino.js/demo)** | **[Getting Started](https://github.com/MarketingPipeline/Termino.js/wiki/Getting-Started)** | **[Documentation](https://github.com/MarketingPipeline/Termino.js/wiki)** | **[GitHub](https://github.com/MarketingPipeline/Termino.js/)**

Termino.js is a highly customizable front-end component written in pure JavaScript that is great for making web based terminal animations, games & apps on any website including support for curses-based apps, custom functions on user commands, key-code & mouse events & much more!

_ie:_ You can use this JavaScript library to create web based terminals on any website.

[Learn how to use Termino.js in your project](https://github.com/MarketingPipeline/Termino.js/wiki/Getting-Started).

## Features <img height="20px" src="https://user-images.githubusercontent.com/86180097/196882869-d38fe649-8e33-44fe-ae91-b1f9cd5f1c3e.png">

- **Fast**: Termino.js is *lightweight* - being built in pure JavaScript
- **Self-contained**: Requires zero dependencies to work.
- **Great for animations**: You can make terminal animations with ease & bring your favourite typewriter library in or etc!
- **Customizable**: Bring your own HTML, CSS & customize / create a terminal to your liking!
- **Inputs**: Supports inputs for questions returned via a promised / await based value
- **Multiple instances**: Create more than one custom terminal in a page!
- **HTML support**: Add HTML elements such as links and more to your terminal!
- **Custom functions**: Create your own custom functions with ease (including user-command functions, key-code functions & your own mouse event functions)
- **And much more**: the options are endless!

## Termino.js is not <img height="20px" alt="Emoji hand pointing left" src="https://zefir.site/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/white-left-pointing-backhand-index_1f448.png">

- Termino.js is not a executable application that you can download and use on your computer. It is a JavaScript library you use in the **browser**.
- Termino.js is not a `bash` emulator etc. Termino.js can be connected to processes like `bash`  or a `SSH` instance via API etc or any process that lets you interact with them by providing input & receiving output.

## Documentation

> Note: this is **(v1.0.1 release)** - there is little to NO documentation. This project needs contributors like you to help improve documentation, usage & more!

You can find the Termino.js documentation [here](https://github.com/MarketingPipeline/Termino.js/wiki).  

Check out the [Getting Started](https://github.com/MarketingPipeline/Termino.js/wiki/Getting-Started) for a quick overview.

You can improve it by sending pull requests to [this repository](https://github.com/MarketingPipeline/Termino.js).

## Example and usage

You can view a demo of Termino.js in use [here](https://marketingpipeline.github.io/Termino.js/demo).

How to use **_Termino.js_**:

```html
<!doctype html>
  <html>
    <head>
    <title>Termino.js Basic Example</title>
    </head>
    <body>
      <div id="terminal">
      <pre><code class="termino-console"></code></pre>
      <textarea class="termino-input" rows="1" wrap="hard"></textarea>
      </div>
      <script type="module">
        import {Termino} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.1/dist/termino.min.js';
        let term= Termino(document.getElementById("terminal"))
        term.echo("Hello world from https://github.com/MarketingPipeline")
      </script>
    </body>
  </html>
```

For more advanced usage such as adding your own commands, creating animations & etc. See the live examples [here](https://marketingpipeline.github.io/Termino.js/demo) or you can find the Termino.js documentation [here](https://github.com/MarketingPipeline/Termino.js/wiki).  

<!--------------
### Importing

The recommended way to load Termino.js is via the ES6 module syntax:

```javascript
import { Termino } from 'termino';
```
------------>

<!------
### Add your own commands
If you want add your own commands to the terminal just pass a object using the *property* as your command and the *value* as the callback.

```js
let term2= Termino(document.getElementById("test"), customkeys)

function print_hello_world(){
  term2.output("hello world")
}

async function add_numbers(){
  let number1  = await term2.input("First number to add")
  let number2  = await term2.input("Second number to add")
  term2.output(Number(number1) + Number(number2))
}

async function test_menu(){
term2.output(`1. Print Hello Wolrd
2. Add Two Numbers
3. Exit` ) 
term2.echo(`<pre style="color;red">`)
let termvalue = await term2.input("What would you like to do?") 
if(termvalue === "1"){
  print_hello_world()
}
  
if(termvalue === "2"){
add_numbers()
}  
  
if(termvalue === "3"){
  term2.output("You chose option 3, exiting terminal")
  await term2.delay(2000)
  term2.kill()
} 
  
if(termvalue != "1" && termvalue != "2" && termvalue != "3"){
  term2.output("Invalid choice")
}    
  
  
}
  test_menu()
```

Now in your terminal could type your new commands:

```bash
> help
These shell commands are defined internally:
flavour, ping, clear, help, version, wipe

> flavour
There is only one flavour for your favorite🍦and it is vanilla.
@soyjavi ❤️ vanilla >
```
----->

## Contributing [![GitHub contributors](https://badgen.net/github/contributors/MarketingPipeline/Termino.js)](https://github.com/MarketingPipeline/Termino.js/graphs/contributors/)

> The main purpose of this repository is to continue evolving Termino.js, making it faster and easier to use. Development of Termino.js happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements.

Want to improve this? Create a pull request with detailed changes / improvements! If approved you will be added to the list of contributors of this awesome project!

Looking for a task to work on? Check the tasks that need improved in the [to-do](https://github.com/MarketingPipeline/Termino.js/blob/main/src/termino.js#L10) list.

See also the list of
[contributors](https://github.com/MarketingPipeline/Termino.js/graphs/contributors) who
participate in this project.

## License   [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/MarketingPipeline/Termino.js/blob/main/LICENSE)

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/MarketingPipeline/Termino.js/blob/main/LICENSE) file for
details.
