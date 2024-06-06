import styles from './dashboard.styles.css'

export function Dashboard() {
    const $pageContent = `
        <div class="${styles.container}">Bienvenido a bordo, aqui encontraras vuelos de los que necesites.</div>
    `;

    const logic = () => {
        console.log('im on dashboard')
    };


    return {$pageContent, logic}

}