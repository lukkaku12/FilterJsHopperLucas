import { navigateTo } from '../../Router';
import { emailValidator } from '../../helpers/email-validator';

export function Register() {
    const $root = document.getElementById('root');
    $root.innerHTML = `
    <form id="form-register">
        <input type="text" placeholder="name" required/>
        <input type="email" placeholder="email" required/>
        <input type="date" placeholder="birthday" required/>
        <input type="pasword" placeholder="password" required/>
        <button type="submit">Submit</button>

    </form>
    `;

    const $inputs = document.querySelectorAll('input');
    const $submit = document.querySelector('form');

    const $name = $inputs[0];
    const $email = $inputs[1];
    const $date = $inputs[2];
    const $password = $inputs[3];
    $submit.addEventListener('submit', async (e)=> {
        e.preventDefault();
        
    if (!$name || !$email || !$date || !$password) {
        alert('fill in all fields!')
        return
    };

    const emailValidation = emailValidator($email.value);

    if (!emailValidation) {
        alert('put a valid email!');
        return
    };
 // we make a request, HTTP POST, to create a new statement in the users endpoint, after we've validated every input.
    const response = await fetch('http://localhost:2000/User', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name: $name.value,
            email:$email.value,
            date: $date.value,
            password:$password.value,
            //as per statement, every user will have the priviledges of an Admin.
            roleId:"Admin"
        })
        
    });

    if (response.ok) {
        const results = await response.json();
        console.log(results)
        alert('usuario creado exitosamente.')
        navigateTo('/login')
    };
    })







}