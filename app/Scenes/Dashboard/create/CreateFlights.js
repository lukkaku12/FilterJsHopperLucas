export function CreateFlights() {
  const $pageContent = `
  <form id="form-CreateFlights">
      <input type="number" placeholder="number" required/>
      <input type="text" placeholder="origin" required/>
      <input type="text" placeholder="destination" required/>
      <input type="date" placeholder="departure" required/>
      <input type="date" placeholder="arrival" required/>
      <input type="number" placeholder="capacity" required/>

      <button type="submit">Submit</button>

  </form>
  `;

  
  const logic = () => {
    const $inputs = document.querySelectorAll("input");
    const $submit = document.querySelector("form");

    const $number = $inputs[0];
    const $origin = $inputs[1];
    const $destination = $inputs[2];
    const $departure = $inputs[3];
    const $arrival = $inputs[4];
    const $capacity = $inputs[5];

    $submit.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:2000/flight", {
          method: "POST",
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
