import { navigateTo } from "../../../Router";

export function deleteFlights() {
    const $pageContent = `
  <div>on the way to delete the flight</div>
  `;

  
  const logic = async () => {

    const parameter = new URLSearchParams(window.location.search).get('productId')
    
    
    const destroyer = async () => {
      try {
        const response = await fetch(`http://localhost:2000/flight/${parameter}`, {
          method: "DELETE" 
        });
        if (response.ok) {
          alert("registro aeronautico guardado");
          navigateTo('/dashboard')
        }
      } catch (error) {
        console.error(error, 'something wrong happened')
      }
    };


    const auth = confirm('are you sure you want to delete it? there will be no way back');
    auth ? destroyer() : navigateTo('/dashboard');
  };
  return {
    $pageContent,
    logic,
  };
}