function validate(data, userInput) {
    let errors = {};

    for (let i = 0; i < data.length; i++) {
        if (userInput.username == data[i].username) {
                if(userInput.password == data[i].password) {
                    errors.password = null;
                    errors.passwordValid = true;
                } else {
                    errors.password = 'Invalid password'
                    errors.passwordValid = false;
                }
            errors.userId = null;
            errors.idValid = true;
            errors.firstname = data[i].firstname;
            errors.index = i;
            break;
        } else if (userInput.password == data[i].password) {
                if(userInput.username == data[i].username) {
                    errors.userId = null;
                    errors.idValid = true;
                } else {
                    errors.userId = 'Invalid username'
                    errors.idValid = false;
                }
            errors.password = null
            errors.passwordValid = true;
        } else {
            errors.userId = 'Invalid username'
            errors.idValid = false;
            errors.password = 'Invalid password'
            errors.passwordValid = false;
        }
    }

    if (errors.idValid == true && errors.passwordValid == true) {
        userInput.loginValid = true;
        userInput.firstname = errors.firstname;
        userInput.index = errors.index;
    }

    return errors
}

export default validate