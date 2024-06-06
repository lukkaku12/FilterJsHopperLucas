import { navigateTo } from "../../../Router";

export function EditFlights() {
    const $pageContent = `
  <form id="form-CreateFlights">
      <input type="number" placeholder="number" required/>
      <input type="text" placeholder="origin" required/>
      <input type="text" placeholder="destination" required/>
      <input type="date" placeholder="departure" required/>
      <input type="date" placeholder="arrival" required/>
      <input type="number" placeholder="capacity" required/>

      <button type="submit">Edit flight</button>

  </form>
  `;

  
  const logic = async () => {
    const $inputs = document.querySelectorAll("input");
    const $submit = document.querySelector("form");

    const parameter = new URLSearchParams(window.location.search).get('productId')
    console.log(parameter)

    const $number = $inputs[0];
    const $origin = $inputs[1];
    const $destination = $inputs[2];
    const $departure = $inputs[3];
    const $arrival = $inputs[4];
    const $capacity = $inputs[5];

    try {
        const response = await fetch(`http://localhost:2000/flight/${parameter}`)
        if (response.ok) {
            const results = await response.json()
            $number.value = results.number
            $origin.value = results.origin
            $destination.value = results.destination
            $departure.value = results.departure
            $arrival.value = results.arrival
            $capacity.value = results.capacity

            console.log('ready to edit :)')

        }
        
    } catch (error) {
        console.error(error, 'something went wrong with searching the whatever it is')
    }

    $submit.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:2000/flight/${parameter}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "number": $number.value,
            "origin": $origin.value,
            "destination": $destination.value,
            "departure": $departure.value,
            "arrival":$arrival.value,
            "capacity":$capacity.value
          }),
        });
        if (response.ok) {
          alert("registro aeronautico guardado");
          navigateTo('/dashboard')
        }
      } catch (error) {
        console.error(error, 'something wrong happened')
      }
    });
  };
  return {
    $pageContent,
    logic,
  };
}