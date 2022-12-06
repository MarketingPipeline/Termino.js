/**!
 * @license Termino.js - A JavaScript library to make custom terminals in the browser with support for executing your own custom functions!
 * VERSION: 1.0.0
 * LICENSED UNDER MIT LICENSE
 * MORE INFO CAN BE FOUND AT https://github.com/MarketingPipeline/Termino.js/
 */



/* DEV & CONTRIBUTOR NOTES IE: TODO LIST -

- NEED TO IMPROVE / WRITE DOCUMENTATION FOR LIBRARY - URGENT TASK NEEDS HELP BIG TIME!
  - CREATE DOCUMENATION WEBSITE HOSTED VIA GITHUB PAGES BRANCH
  - REMOVE WIKI FROM REPO.
- NEED TO IMPROVE USAGE OF LOOPING INPUTS / ASKING USER FOR INPUTS CONSTANTLY...? (ANY SUGGESTIONS APPRECIATED)  
- SUPPORT FOR MULTIPLE KEYBINDS / KEYBOARD SHORT CUTS (VIA MOUSETRAP ON NPM / GITHUB)
- POSSIBILY MAKE PLUGINS / FUNCTIONS THAT CAN BE SHARED.
  - CREATE TEMPLATE TO USE PLUGIN / CREATE PLUGINS 
  - PLUGIN FOR CREATING TERMINAL ANIMATIONS VIA A TYPEWRITER / TYPING LIBRARY ETC.. 
  - PLUGIN FOR PLAYING PRE-RECORDED TERMINAL ANIMATIONS. 
- IMPROVE ERROR HANDLING (CHECK IF PASSED PROPER ARGUMENTS - CHECK IF VARIABLE IS ARRAY TYPE / JSON TYPE ETC...)
- CODE CLEANING - USE CONST INSTEAD OF LET VARIABLES WHEN CAN.
  - CLEAN / IMPROVE FILTER FUNCTION. 
- REMOVE EVENT HANDLERS WHEN TERMINAL INSTANCE IS KILLED. 
- MAKE THIS A EXPORT THIS AS WELL & GLOBAL IN SAME SCRIPT....? (DISCUSSION) 
- INTERATION OBERSERVER FOR ANIMATIONS / POSSIBLY ALL INSTANCES. 
- DOM OBSERVER (FOR NEW TERMINALS IN DOM) 
- ADD ANY POLYFILL SUPPORTS NEEDED / UNTHOUGHT OF. 
- CREATE TESTS + ACTION / WORKFLOW
  - BROWSER AUTOMATION TESTS VIA PUPPETEER ETC (CHECK ALL DEVICES / BROWSER COMPABILITY + POSSIBLY SCREENSHOTS). 
  - OTHER TESTS. 
  - CREATE ACTION THAT AUTO TESTS ON PR.
  - IF ANYONE COULD HELP WRITING TESTS / THESE WOULD BE APPRECIATED. 
- LOTS OF OTHER IMPROVEMENTS THAT CAN BE MADE THO THIS. IF YOU ARE WILLING TO IMPROVE IT. FEEL FREE! :)



*/

// POLYFILL SUPPORT (AUTO-DETECTED ON LOAD FOR DEVICE)
import 'https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.filter,console,document,JSON,Promise'

export function Termino(terminalSelector, keyCodes, settings) {

  try {
    // DEFAULT TERMINAL SETTINGS   
    let DEF_SETTINGS = {
      allow_scroll: true, // allow scroll up & down on terminal 
      prompt: "> ", // default prompt
      command_key: 13, // default command key
      terminal_killed_placeholder: "TERMINAL DISABLED", // default terminal input placeholder when killed. 
      terminal_output: ".termino-console", // default output query selector
      terminal_input: ".termino-input", // default input query selector
      disable_terminal_input: false // disable any user commands / inputs. --- Useful for making terminal animations etc! 
    }

    /// ALLOW DEVS TO PASS CUSTOM SETTINGS FOR TERMINAL
    if (settings) {
      // function to compare custom settings
      function compare(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
      }
      // CUSTOM SETTINGS PASSED ARE NOT VALID
      if (compare(DEF_SETTINGS, settings) != true) {
        throw {
          message: "Settings Error: Your overwritten Termino settings are not valid"
        }
      } else {
        // CUSTOM SETTINGS ARE VALID
        DEF_SETTINGS = settings
      }
    }


    let terminal_console = terminalSelector.querySelector(DEF_SETTINGS.terminal_output)



    /// DEFAULT TERMINAL KEY CODES  
    let KEYCODES = [{
      "id": "SCROLL_UP_KEY", /// DEFAULT SCROLL UP KEY - "SCROLL_UP_KEY" ID NAME IS REQUIRED. 
      "key_code": 38
      // "function": example() // you can add your own custom function to the scroll up button if needed! 
    }, {
      "id": "SCROLL_DOWN_KEY", // DFEAULT SCROLL DOWN KEY - "SCROLL_DOWN_KEY" ID NAME IS REQUIRED. 
      "key_code": 40
      // "function": example() // you can add your own custom function to the scroll down button if needed! 
    }];



    // DEFAULT SCROLL BTNS

    /// DOWN ARROW
    let Scroll_Down_Key = KEYCODES.filter(x => x.id === "SCROLL_DOWN_KEY")[0].key_code

    /// UP ARROW
    let Scroll_Up_Key = KEYCODES.filter(x => x.id === "SCROLL_UP_KEY")[0].key_code




    /// ALLOW DEVS TO PASS CUSTOM KEYCODE FUNCTIONS FOR TERMINAL

    if (keyCodes) {
      // Check if scroll up key has been set
      if (keyCodes.filter(x => x.id === "SCROLL_UP_KEY").length != 0) {
        if (keyCodes.filter(x => x.id === "SCROLL_UP_KEY")[0].key_code != undefined) {
          // set custom scroll up key
          Scroll_Up_Key = keyCodes.filter(x => x.id === "SCROLL_UP_KEY")[0].key_code
        }
      }
      // Check if scroll down key has been set
      if (keyCodes.filter(x => x.id === "SCROLL_DOWN_KEY").length != 0) {
        if (keyCodes.filter(x => x.id === "SCROLL_DOWN_KEY")[0].key_code != undefined) {
          // set custom scroll down key
          Scroll_Down_Key = keyCodes.filter(x => x.id === "SCROLL_DOWN_KEY")[0].key_code
        }
      }
      KEYCODES = keyCodes
    }




    // DEFAULT COMMAND KEY - ie - ENTER BTN
    let Command_Key = DEF_SETTINGS.command_key




    // Handle keyboard events for the Termino.js instance.
    terminalSelector.addEventListener('keydown', e => {

      //// DISABLE TERMINAL SCROLL UP / DOWN FOR ANIMATIONS ETC...
      if (DEF_SETTINGS.disable_terminal_input != true) {
        /// HANDLE INPUTS ON COMMAND KEY. 
        checkIfCommand()
      }

      /// SCROLL UP / DOWN TERMINAL FUNCTION
      if (DEF_SETTINGS.allow_scroll === true) {
        if (e.keyCode == Scroll_Up_Key) {
          /// SCROLL TERMINAL UP
          terminal_console.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else if (e.keyCode == Scroll_Down_Key) {
          /// SCROLL TERMINAL DOWN
          terminal_console.scrollTop = terminal_console.scrollHeight;
        }
      }
    });




    // TERMINAL INPUT STATE / TERMINAL PROMPT FUNCTION  
    let InputState = false;

    function termInput(question) {
      return new Promise(function(resolve) {

        /// add the question value to terminal
        terminal_console.innerHTML += question


        termClearValue()

        scrollTerminalToBottom()

        InputState = true;

        function handleCommandForQuestion(event) {

          if (event.keyCode == Command_Key) {
            if (window.event.preventDefault) {
              window.event.preventDefault()
            }
            let value = terminalSelector.querySelector(DEF_SETTINGS.terminal_input).value
            termClearValue()
            terminalSelector.querySelector(DEF_SETTINGS.terminal_input).removeEventListener('keypress', handleCommandForQuestion);
            InputState = false;
            if (value.length != 0) {
              // echo value to terminal
              termEcho(value)
              resolve(value)
            } else {
              // return an empty prompt
              termEcho("")
              resolve()
            }

          }
        }

        /// Handle inputs for question state.
        terminalSelector.querySelector(DEF_SETTINGS.terminal_input).addEventListener('keypress', handleCommandForQuestion);


      })
    }




    // FUNCTION TO OUTPUT TO TERMINAL (WITH TERMINAL PROMPT)
    function termEcho(command) {
      terminal_console.innerHTML += `<pre>${DEF_SETTINGS.prompt} ${command}</pre>`
      scrollTerminalToBottom()
    }


    // FUNCTION TO OUTPUT TO TERMINAL (WITHOUT TERMINAL PROMPT)
    function termOutput(command) {
      terminal_console.innerHTML += `<pre>${command}</pre>`
      scrollTerminalToBottom()
    }


    // FUNCTION TO CLEAR TERMINAL CONSOLE OUTPUT
    function termClear() {
      terminal_console.innerHTML = ``
    }



    /// DEFAULT FUNCTION TO KILL TERMINAL - DEVS CAN PROGRAM THEIR OWN IF THEY WANT.   
    function termKill() {
      /// TODO - REMOVE EVENT LISTENERS

      /// clear terminal
      termClear()

      /// set the terminal text values to disabled
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).setAttribute("disabled", "");

      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).setAttribute("placeholder", DEF_SETTINGS.terminal_killed_placeholder);

    }


    /// FUNCTION TO ENABLE TERMINAL INPUT     
    function termEnable() {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).removeAttribute("disabled", "");
    }

    /// FUNCTION TO DISABLE TERMINAL INPUT  
    function termDisable() {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).setAttribute("disabled", "");
    }


    /// FUNCTION TO REMOVE / CLEAR INPUT VALUE
    function termClearValue() {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).value = ""
    }

    /// FUNCTION TO DELAY TERMINAL OUTPUTS / ECHO ETC (AWAIT / PROMISE BASED) - EXAMPLE : await term.delay(xxx) ...     
    const termDelay = ms => new Promise(res => setTimeout(res, ms));



    /// FUNCTION TO SCROLL TERMINAL TO THE BOTTOM    
    function scrollTerminalToBottom() {
      terminal_console.scrollTop = terminal_console.scrollHeight;
    }

    /// FUNCTION TO SCROLL TERMINAL TO THE TOP    
    function scrollTerminalToTop() {
      terminal_console.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }



    /// DISABLE INPUT IF DEFAULT SETTING IS SET TO TRUE  
    if (DEF_SETTINGS.disable_terminal_input === true) {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).setAttribute("disabled", "");
    }


    /// ADD ELEMENT TO TERMINAL BY ID, HTML & CLASS NAME
    function addElementWithID(id, html, class_name) {
      let g = null;
      g = document.createElement('div');
      if (class_name) {
        g.setAttribute("class", class_name);
      }
      g.setAttribute("id", id);
      if (html) {
        g.innerHTML = html
      }
      terminal_console.appendChild(g);
    }


    /// REMOVE ADDED ELEMENT FROM TERMINAL BY ID
    function removeElementWithID(id) {
      try {
        terminalSelector.querySelector("#" + id).outerHTML = "";
      } catch (error) {
        throw {
          message: `Error could not find ${error.message}`
        }
      }
    }



    // If the user has pressed COMMAND btn - default btn is enter
    async function checkIfCommand() {

      let key = window.event.keyCode;



      /// RUN ANY FUNCTIONS FOR KEYCODES / KEYBIND SHORTCUTS / BUTTONS. 
      if (KEYCODES.filter(x => x.key_code === key).length != 0) {
        KEYCODES = KEYCODES.filter(x => x.key_code === key)
        if (KEYCODES.length != 0) {
          if (KEYCODES[0].function != undefined)
            try {
              await eval(KEYCODES[0].function)
            } catch (error) {
              throw {
                message: `KeyCode Function Error: ${error.message}`
              }
            }
        }
      }



      /// MAKE SURE USER IS NOT ANSWERING A QUESTION
      if (InputState != true) {


        /// ECHO INPUT VALUE ON COMMAND BUTTON - BY DEFAULT IS ENTER. 
        if (key === Command_Key) {


          /// STOP ENTER FROM GOING DOWN / DOING WEIRD THINGS..
          if (window.event.preventDefault) {
            window.event.preventDefault()
          }

          /// ECHO USER INPUT     
          termEcho(terminalSelector.querySelector(DEF_SETTINGS.terminal_input).value)


          /// CLEAR OUTPUT  
          termClearValue()


        }

      }

    } /// DEFAULT TERMINO FUNCTIONS FOR DEVELOPER USAGE
    return {
      echo: termEcho, // ECHO MESSAGE TO TERM WITH CAROT
      output: termOutput, // ECHO MESSAGE TO TERM WITHOUT CAROT
      clear: termClear, // CLEAR THE TERMINAL
      delay: termDelay, // DELAY FUNCTION BY X VALUE OF SECONDS
      disable_input: termDisable, // DISABLE TERMINAL INPUT
      enable_input: termEnable, // ENABLE TERMINAL INPUT
      input: termInput, // ASK USER QUESTION & RETURN VALUE
      scroll_to_bottom: scrollTerminalToBottom, // SCROLL TERMINAL TO THE BOTTOM
      scroll_to_top: scrollTerminalToTop, // SCROLL TERMINAL TO TOP
      add_element: addElementWithID, // ADD HTML ELEMENT WITH ID TO TERMINAL,
      remove_element: removeElementWithID, // REMOVE HTML ELEMENT WITH ID TO TERMINAL,
      kill: termKill // KILL THE TERMIMAL - IE.. SET INPUT TO DISABLED & CLEAR THE TERMINAL.
    };
  } catch (error) {
    // Something went wrong! 
    console.error(`Termino.js Error: ${error.message}`)
    throw {
      message: `Termino.js Error: ${error.message}`
    }
  }
}

if (typeof document === 'undefined') {
  console.error("Termino.js is only supported for the browser")
}
