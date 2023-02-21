window.onload = () => {
    const signupForm = document.getElementById('signup-form');
    const errorText = document.getElementById('error-text');
    const successMsg = document.getElementById('success-message');
    const signupBtn = document.getElementById('signup-btn');
    const loader = document.getElementById('loader-wrapper');
    const callToAction = document.getElementById('call-to-action');
    
    // Hide signup form on page load
    signupForm.style.display = 'none';

    // Hide success message on page load
    successMsg.style.display = 'none';

    // Hide loader on page load
    loader.style.display = 'none';

    /**
     * Toggles the visibility of the signup form
     */
    const toggleElement = (element) => {
        const state = element.style.display === 'none' ? 'inline-block' : 'none';
        element.style.display = state;
    }

    /**
     * Validates the signup form
     * @param {HTMLFormElement} form the form to be validated
     * @returns true if form is valid else false
     */
    const validateForm = (form) => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let valid = false;
        password.value = password.value.trim();
        if (form.reportValidity()) {
            valid = true;
            errorText.textContent = '';
        } else {
            errorText.textContent = 'Please correct the errors';
        }

        return valid;
    }

    /**
     * Gets the form data
     * @param {HTMLFormElement} form 
     * @returns the form data
     */
    const getFormData = (form) => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        return {
            email: email.value, 
            password: password.value
        }
    }

    /**
     * Processes the signup request
     * @param {Object} data The data to be sent to the backend
     */
    const processSignUp = async (data) => {
        console.log(data);
        try {
            const response = await fetch('/auth/user/new', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const res = await response.json();
            if (res.error) {
                throw Error(res.message);
            }
            toggleElement(signupForm); // Hide signup form
            toggleElement(successMsg); // Display success message
            toggleElement(callToAction); // Hide call to action text
            successMsg.style.color = 'green';
        } catch (err) {
            errorText.textContent = err.message;
        }
    }

    // Handle form submission
    signupForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        toggleElement(loader); // Show loader
        loader.style.position = 'absolute';
        loader.style.display = 'grid';
        loader.style.placeContent = 'center';
        if (validateForm(signupForm)) {
            const data = getFormData(signupForm);
            await processSignUp(data);
        }
        toggleElement(loader); // Hide loader
    });

    // Toggle the visibility of the signup form on click of the signup call to action button
    signupBtn.addEventListener('click', () => {
        toggleElement(signupForm);
    });
};

