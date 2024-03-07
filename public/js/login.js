const loginFormHandler = async(event)=> {
    event.preventDefault();

    const password= document.querySelector('#password-login').value.trim();
    const email= document.querySelector('#email-login').value.trim();

    if (email && password) {
        console.log(email, password)
        
        const response = await fetch("/api/users/login", {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        console.log(response);

        if (response.ok){
            document.location.replace('/');
        } else {
            alert('Failed to log in')
            const errorMessage = await response.text();
            console.log('Error:', errorMessage);;
        }
    }
}

const signUpFormHandler = async(event)=> {
    event.preventDefault();

    const password= document.querySelector('#password-signup').value.trim();
    const email= document.querySelector('#email-signup').value.trim();
    const name= document.querySelector('#name').value.trim();

    if (email && password && name) {
        console.log(email, password, name)
        
        const response = await fetch("/api/users/signup", {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        console.log(response);

        if (response.ok){
            document.location.replace('/');
        } else {
            alert('Failed to log in')
            const errorMessage = await response.text();
            console.log('Error:', errorMessage);;
        }
    }
}

document.querySelector('.login-form')
document.addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form')
document.addEventListener('submit', signUpFormHandler);