function loadScriptAndAppendForm(formNode, formAction, formHandler, formCreator) {
    return new Promise((resolve, reject) => {
        function loadScript(src, callback) {
            const script = document.createElement('script');
            script.src = src;
            script.onload = callback;
            script.onerror = () => {
                console.error(`Failed to load script: ${src}`);
                reject(new Error(`Failed to load script: ${src}`));
            };
            document.head.appendChild(script);
        }

        function initializeForm() {
            if (typeof appendFormToNode === 'function') {
                appendFormToNode(formNode, formAction);
                if (typeof handleForm === 'function') {
                    handleForm(formAction, formHandler);
                    resolve();
                } else {
                    console.error("handleForm is not defined or is not a function");
                    reject(new Error("handleForm is not defined or is not a function"));
                }
            } else {
                console.error("appendFormToNode is not defined or is not a function");
                reject(new Error("appendFormToNode is not defined or is not a function"));
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => loadScript(formCreator, initializeForm));
        } else {
            loadScript('general-form-create.js', initializeForm);
        }
    });
}

async function run() {
    try {
        // Call the function asynchronously
        await loadScriptAndAppendForm(formNode, formAction, formHandler, formCreator);

        // Test if the functions are defined and are functions
        const functionsToTest = ['handleForm', 'appendFormToNode', 'loadScriptAndAppendForm'];
        const results = functionsToTest.map(funcName => {
            const isFunction = typeof window[funcName] === 'function';
            return {
                name: funcName,
                isFunction: isFunction
            };
        });

        // Display the results with red or green dots
        const resultList = results.map(result => {
            const color = result.isFunction ? '🟢' : '🔴';
            return `${color} ${result.name}`;
        }).join('\n');
        console.log("Results of Testing Essential Functions");
        console.log(resultList);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Constands form old script
const myFormAction = `mailform-${Math.random().toString(36).slice(-6)}.php`; // Decoy form action and unique ID
const myFormNode = 'container1'; // Parent element of the form (must be in HTML)
const myFormHandler = 'http://192.168.1.53:8088/webforms/mailform.php'; // Replace this URL with your endpoint URL
const myFormCreator = 'js/general-form-create.js';

// Set span contents
document.getElementById('sp1').textContent = myFormAction;
document.getElementById('sp2').textContent = myFormHandler;

const formNode = myFormNode;
const formAction = myFormAction;
const formHandler = myFormHandler;
const formCreator = myFormCreator

run();
