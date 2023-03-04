/// LIVE EXAMPLES / DEMOS FOR TERMINO.JS

import {Termino} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@main/dist/termino.min.js';
// Termino.js - Terminal Animation Demo 

//// Render animations when in view using Intersection Observer
(function() {
  var observer = new IntersectionObserver(onIntersect);


  observer.observe(document.getElementById("Example_Terminal_1"));

  function onIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.target.getAttribute("terminal-processed") || !entry.isIntersecting)
        return true;
      entry.target.setAttribute("terminal-processed", true);
      renderTerminal_Animation()
    });
  }
})();


// initialize a Terminal via Termino.js   

let term1 = Termino(document.getElementById("Example_Terminal_1"))


function renderTerminal_Animation() {

  async function animation() {
    term1.echo("hello world")
    await term1.delay(2000) // delay output 2 seconds
    term1.add_element("loading-text", `Fake loading animation`, "loading") // add HTML element with html text "loading" & class-name "loading" (shows the loading carot via CSS).
    await term1.delay(5000) // delay output 5 seconds
    term1.output("Animation fun has 'loaded'")
    term1.remove_element("loading-text") // remove HTML element added earlier
    term1.echo("what will you make with termino.js?")
  }

  animation()

}
/////////////////////////////////////////////////////////////////

// Termino.js - Terminal App Demo (Basic)


// initialize a Terminal via Termino.js   
let term2 = Termino(document.getElementById("Example_Terminal_2"))



function print_hello_world() {
  term2.output("hello world")
}



async function basicTerminalApp() {
  term2.output(`1. Print Hello Wolrd
2. Add Two Numbers
3. Exit`)

  // call Termino.js /  your terminal for inital input
  let termvalue = await term2.input("What would you like to do?")


  // function to add numbers
  async function add_numbers() {
    let number1 = await term2.input("First number to add")
    let number2 = await term2.input("Second number to add")
    term2.output(Number(number1) + Number(number2))
  }



  if (termvalue === "1") {
    print_hello_world() // example of running your own custom function
  }

  if (termvalue === "2") {
    await add_numbers() // example of running your own custom function
  }

  if (termvalue === "3") {
    term2.output("You chose option 3, exiting terminal")
    await term2.delay(2000)
    term2.kill() // exit terminal
  }

  if (termvalue != "1" && termvalue != "2" && termvalue != "3") {
    term2.output("Invalid choice")
  }

  // after called  - repeat function again (if not exit menu)
  if (termvalue != "3") {
    basicTerminalApp()
  }

}

basicTerminalApp()

////////////////////////////////////////////////////////////////////////////
// Termino.js - Terminal App Demo (Advanced)


  // initialize a Terminal via Termino.js   
  let term3 = Termino(document.getElementById("Example_Terminal_3"))

  //// YOUR COOL CUSTOM FUNCTIONS BELOW FOR YOUR APP.

  async function SearchGitHubProfile() {


    try {

      let username = await term3.input("What profile would you like to search?")

      term3.echo(username)
      if (!username) {
        throw {
          message: "No username was provided"
        }
      }
      const response = await fetch(`https://api.github.com/users/${username}`)
      let data = await response.json();
      if (data.login === undefined) {
        throw {
          message: "profile was not found"
        }
      }

      term3.output(`You searched for: ${data.login}, they have ${data.followers} followers, & ${data.public_repos} public repos`, )
    } catch (error) {
      term3.output(`Failed to get github info ${error.message}`)
    }



  }

  function ascii_art() {
    term3.output(`⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣤⣶⣶⣶⣶⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣤⣾⣿⣿⠿⠟⠛⠛⠛⠛⠻⠿⣿⣿⣷⣤⡀⠀⠀⠀⠀
⠀⠀⠀⣴⣿⣿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣿⣿⣦⠀⠀⠀
⠀⢀⣾⣿⡿⠁⠀⠀⣴⣦⣄⠀⠀⠀⠀⠀⣀⣤⣶⡀⠈⢿⣿⣷⡀⠀
⠀⣾⣿⡟⠁⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠈⢻⣿⣷⠀
⢠⣿⣿⠁⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠈⣿⣿⡄
⢸⣿⣿⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⣿⣿⡇
⠘⣿⣿⡦⠤⠒⠒⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠧⠤⢴⣿⣿⠃          TERMINO.JS
⠀⢿⣿⣧⡀⠀⢤⡀⠙⠻⠿⣿⣿⣿⣿⣿⡿⠟⠋⠁⠀⢀⣼⣿⡿⠀        COOL ASCII ART
⠀⠈⢿⣿⣷⡀⠈⢿⣦⣤⣾⣿⣿⣿⣿⣿⣷⣄⠀⠀⢀⣾⣿⡿⠁⠀
⠀⠀⠀⠻⣿⣿⣦⣄⡉⣿⣿⢿⣿⠉⢻⣿⢿⣿⣠⣴⣿⣿⠟⠀⠀⠀
⠀⠀⠀⠀⠈⠛⢿⣿⣿⣿⣧⣼⣿⣤⣾⣷⣶⣿⣿⡿⠛⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⠿⠿⠿⠿⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀`)
  }


  let YOUR_FUNCTIONS = ["SearchGitHubProfile()", "printInfoAboutDev()", "help", "demo_menu", "quit_term3inal"]


  async function add_numbers() {
    let number1 = await term3.input("First number to add")
    let number2 = await term3.input("Second number to add")
    term3.output(Number(number1) + Number(number2))
  }



  function help() {
    term3.output("This Termino.js Instances Custom Functions Include - SearchGitHubProfile(), demo_menu, printInfoAboutDev(), help & quit_term3inal")
  }

  async function quit_term3inal() {
    term3.output("Quitting Terminal...")
    term3.delay(3000)
    term3.kill()
  }

  function printInfoAboutDev() {
    term3.output("Jared is the creator of Termino.js & the founder of the GitHub organization <a href='https://marketingpipeline.com'>MarketingPipeline</a>, if you would like to hire him for any work. Feel free to reach him on GitHub - any client referals are apprecitated as well.")
  }


  async function demo_menu() {
    term3.output(`1. Print Hello World 
2. Add Two Numbers
3. Show ASCII Art`)

    let term3value = await term3.input("What would you like to do?")
    if (term3value === "1") {
      term3.output("Hello World")
    }

    if (term3value === "2") {
      term3.echo(term3value)
      await add_numbers()
    }

    if (term3value === "3") {
      ascii_art()
    }

    if (term3value != "1" && term3value != "2" && term3value != "3") {
      term3.output("Invalid choice")
    }


  }

  /// END OF YOUR COOL CUSTOM FUNCTIONS



  // MESSAGES TO PRINT AT START!
  term3.output("Your Cool Terminal Copyright Here")

  term3.output("You can list all the functions available by typing 'help'")



  /// 
  async function AdvancedDemo() {


    // call the term3inal for inital input
    let term3inal_msg = await term3.input("")


    /// cool way to execute some functions! (you can make your own way of executing them!)  
    if ((YOUR_FUNCTIONS.includes(term3inal_msg))) {


      // run term3inal commands with () example - hello_world() 
      if (term3inal_msg.endsWith('()')) {
        await eval(term3inal_msg)
      } else {
        // run term3inal commands without () example - hello_world 
        await eval(term3inal_msg + "()")
      }

    } else {
      //  Handle error if your function is not found
      if (term3inal_msg) {
        term3.output(term3inal_msg + " is not found")
      }

    }

    // after called  - repeat function again
   AdvancedDemo();

  }

  AdvancedDemo()
