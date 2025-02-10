function appendFormToNode(nodeId,formAction) {
    // Ensure the node with the given ID exists
    const targetNode = document.getElementById(nodeId);
    if (!targetNode) {
        console.error(`Node with ID '${nodeId}' not found.`);
        return;
    }

    // Create the div container
    const formDiv = document.createElement('div');
    formDiv.id = 'formdiv';

    // Create the form element
    const form = document.createElement('form');
    form.action = formAction;
    form.method = 'post';
    form.setAttribute('data-form-id', 'contact');

    // Create and append the name group
    const nameGroup = document.createElement('div');
    nameGroup.className = 'form-group';
    nameGroup.id = 'name-group';
    form.appendChild(nameGroup);

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name *';
    nameGroup.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'form-control';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.autocomplete = 'name';
    nameInput.required = true;
    nameGroup.appendChild(nameInput);

    // Create and append the email group
    const emailGroup = document.createElement('div');
    emailGroup.className = 'form-group';
    emailGroup.id = 'email-group';
    form.appendChild(emailGroup);

    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'E-Mail *';
    emailGroup.appendChild(emailLabel);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.className = 'form-control';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.required = true;
    emailGroup.appendChild(emailInput);

    // Create and append the betreff group
    const betreffGroup = document.createElement('div');
    betreffGroup.className = 'form-group';
    betreffGroup.id = 'betreff-group';
    form.appendChild(betreffGroup);

    const betreffLabel = document.createElement('label');
    betreffLabel.setAttribute('for', 'betreff');
    betreffLabel.textContent = 'Betreff *';
    betreffGroup.appendChild(betreffLabel);

    const betreffInput = document.createElement('input');
    betreffInput.type = 'text';
    betreffInput.className = 'form-control';
    betreffInput.id = 'betreff';
    betreffInput.name = 'betreff';
    betreffInput.required = true;
    betreffGroup.appendChild(betreffInput);

    // Create and append the message group
    const messageGroup = document.createElement('div');
    messageGroup.className = 'form-group';
    messageGroup.id = 'message-group';
    form.appendChild(messageGroup);

    const messageLabel = document.createElement('label');
    messageLabel.setAttribute('for', 'message');
    messageLabel.textContent = 'Nachricht';
    messageGroup.appendChild(messageLabel);

    const messageTextarea = document.createElement('textarea');
    messageTextarea.className = 'form-control';
    messageTextarea.id = 'message';
    messageTextarea.name = 'message';
    messageTextarea.rows = 5;
    messageGroup.appendChild(messageTextarea);

    // Create and append the hidden input for form origin
    const formOriginInput = document.createElement('input');
    formOriginInput.type = 'hidden';
    formOriginInput.id = 'formorigin';
    formOriginInput.name = 'formorigin';
    formOriginInput.value = 'contact-page-main-form';
    formOriginInput.required = true;
    form.appendChild(formOriginInput);

    // Create and append the submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Nachricht senden';
    form.appendChild(submitButton);

    // Append the form to the div container
    formDiv.appendChild(form);

    // Append the div container to the target node
    targetNode.appendChild(formDiv);
}
