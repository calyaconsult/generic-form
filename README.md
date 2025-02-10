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
