import { navigateTo } from "../../Router";
import { emailValidator } from "../../helpers/email-validator";

export function Login() {
    const $root = document.getElementById('root');
    $root.innerHTML = `
    <form id="form-login">
        <input type="email" placeholder="email" required/>
        <input type="password" placeholder="password" required/>
        <button type="submit">Submit</button>

    </form>
    `;

    const $inputs = document.querySelectorAll('input');
    const $submit = document.querySelector('form');

    const $email = $inputs[0];
    const $password = $inputs[1];
    $submit.addEventListener('submit', async (e)=> {
        e.preventDefault();
        if (!$email || !$password) {
            alert('fill in all fields!')
            return
        };
        
        // we validate after the submit all the values provided by the user
        const emailValidation = emailValidator($email.value);
    
        if (!emailValidation) {
            alert('put a valid email!');
            return
        };
        try {
        const response = await fetch('http://localhost:2000/User')
        if(response.ok) {
            const users = await response.json();
            // I make an HTTP request and then find wether the user email is on the database or not.
            const userFound = users.find((user) => user.email === $email.value);
            if (!userFound) {
                alert('usuario no encontrado')
                return
            };
            // then it checks for the passcode.
            const authPassword = userFound.password === $password.value
            if (authPassword) {
                // if it does work, then the system will create a token, inform the user, 
                // save in localStorage, the role of the user "Admin" or "Guest".
                // the token, and the id of the user so we can trace it later on the booking he made.
                const token = Math.random().toString(36).substring(2);
                alert('usuario autenticado con exito');
                localStorage.setItem('roleUser', userFound.roleId);
                localStorage.setItem('token', token)
                localStorage.setItem('IdUser', userFound.id)
                navigateTo('/dashboard')
            } else {
                alert('usuario no encontrado ve a registrarte');
                navigateTo('/register')
            }
        }
        } catch (error) {
            console.error(error, 'algo no funciona')
        }
    })
}