import { navigateTo } from "../../Router";


export function NotFound() {
    const $root = document.getElementById('root');
    $root.innerHTML = `
    <div>Not found - 404</div>
    `;

    setTimeout(() => {
        navigateTo('/register')
    }, 3000);
    
}