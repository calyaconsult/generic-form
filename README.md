# Generic Contact Form

This repo provides HTML, CSS, and JavaScript code for a generic contact form.

The script `form-action.js` validates the form data and sends it as JSON to a remote endpoint.

The script that handles the data at the endpoint is not included here.

You can simulate the request made by `form-action.js` on https://reqbin.com/curl
```
curl -X POST 'https://reqbin.com/echo/post/json' -H 'Content-Type: application/json;charset=UTF-8' -d '{
    "name": "Tester",
    "email": "tester@example.com",
    "betreff": "Testing",
    "formorigin": "contact-page-main-form",
    "message": "This is a test."
}'
```
As a minimum, your endpoint should be able to 
1. **Receive the JSON data** sent in the request body.
2. **Decode the JSON data** into an array or object.
3. **Process the data** (e.g., validate, sanitize, or store it).
4. **Send a response** back to the client (e.g., a success message or error details).
