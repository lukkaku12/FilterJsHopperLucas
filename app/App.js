import { Router } from "./Router";

export function App() {
    const $root = document.getElementById('root')

    if (!$root) {
        console.error('no se encuentra root');
    }
    Router()
}