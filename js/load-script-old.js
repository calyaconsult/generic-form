const myFormAction = `mailform-${Math.random().toString(36).slice(-6)}.php`; // Decoy form action and unique ID
const myFormNode = 'container1'; // Parent element of the form (must be in HTML)
const myFormHandler = '/formhandler.php';
const myFormCreator = 'js/general-form-create.js';

// Set span contents
document.getElementById('sp1').textContent = myFormAction;
document.getElementById('sp2').textContent = myFormHandler;

function loadScriptAndAppendForm(formNode, formAction, formHandler, formCreator) {
      function loadScript(src, callback) {
            const script = document.createElement('script');
            script.src = src;
            script.onload = callback;
            script.onerror = () => console.error(`Failed to load script: ${src}`);
            document.head.appendChild(script);
      }

      function initializeForm() {
            if (typeof appendFormToNode === 'function') {
                  appendFormToNode(formNode, formAction);
                  if (typeof handleForm === 'function') {
                        handleForm(formAction, formHandler);
                  } else {
                        console.error("handleForm is not defined or is not a function");
                  }
            } else {
                  console.error("appendFormToNode is not defined or is not a function");
            }
      }

      if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => loadScript(formCreator, initializeForm));
      } else {
            loadScript('general-form-create.js', initializeForm);
      }
}

loadScriptAndAppendForm(myFormNode, myFormAction, myFormHandler, myFormCreator);
