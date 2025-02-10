function handleForm(formAction,formHandler) {
    const form = document.querySelector(`form[action="${formAction}"]`);
    if (!form) {
        console.error("Form element not found!");
        return;
    }
    const formOriginField = document.getElementById('formorigin');
    if (!formOriginField?.value) {
        console.error("Form origin not specified!");
        return;
    }
    const formDiv = document.getElementById('formdiv');
    const MAILFORMHANDLER = formHandler;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        appendSpinner();

        // Clear existing errors
        clearErrors('name-group');
        clearErrors('email-group');
        clearErrors('betreff-group');

        // Retrieve form fields
        const nameField = document.getElementById('name') || document.getElementById('contact-name');
        const emailField = document.getElementById('email') || document.getElementById('contact-email');
        const betreffField = document.getElementById('betreff') || document.getElementById('contact-betreff');
        const messageField = document.getElementById('message') || document.getElementById('contact-message');

        const formData = {
            name: nameField ? nameField.value.trim() : '',
            email: emailField ? emailField.value.trim() : '',
            betreff: betreffField ? betreffField.value.trim() : '',
            formorigin: document.getElementById('formorigin')?.value.trim() || 'contactform',
            message: messageField ? messageField.value.trim() : ''
        };

        console.log("Form Data before sending:", formData);

        if (!validateForm(formData)) {
            removeSpinner();
            return;
        }

        sendFormData(formData);
    });

    function validateForm(formData) {
        let isValid = true;

        if (!formData.name) {
            showError('name-group', 'Bitte geben Sie Ihren Namen ein.');
            isValid = false;
        }

        if (!formData.email || !validateEmail(formData.email)) {
            showError('email-group', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            isValid = false;
        }

        if (!formData.betreff) {
            showError('betreff-group', 'Bitte geben Sie einen Betreff ein.');
            isValid = false;
        }

        return isValid;
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function sendFormData(formData) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', MAILFORMHANDLER, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                removeSpinner();
                handleResponse(xhr);
            }
        };

        xhr.send(JSON.stringify(formData));
    }

    function handleResponse(xhr) {
        try {
            console.log("Server Response:", xhr.status, xhr.responseText);

            if (xhr.status === 422) {
                console.error('Validation error: ', xhr.responseText);
                form.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Bitte füllen Sie alle erforderlichen Felder aus.</div>');
                return;
            }

            const data = JSON.parse(xhr.responseText);

            if (!data.success && data.errors) {
                Object.keys(data.errors).forEach(field => {
                    showError(`${field}-group`, data.errors[field]);
                });
            } else {
                form.innerHTML = `<div class="alert alert-success">Erfolg: ${data.message}</div>`;
            }
        } catch (error) {
            console.error('Error parsing server response:', error);
            form.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.</div>');
        }
    }

    function showError(groupId, message) {
        const group = document.getElementById(groupId);
        if (!group) return;
        group.classList.add('has-error');
        group.insertAdjacentHTML('beforeend', `<div class="help-block">${message}</div>`);
    }

    function clearErrors(groupId) {
        const group = document.getElementById(groupId);
        if (!group) return;
        group.classList.remove('has-error');
        const helpBlocks = group.querySelectorAll('.help-block');
        helpBlocks.forEach(block => block.remove());
    }

    function appendSpinner() {
        if (!formDiv) return;
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.innerHTML = '<img src="images/spinner.gif" width="64" height="64"> Ihre Nachricht wird gesendet.';
        formDiv.appendChild(spinner);
    }

    function removeSpinner() {
        if (!formDiv) return;
        const spinner = formDiv.querySelector('.spinner');
        if (spinner) {
            formDiv.removeChild(spinner);
        }
    }
};
