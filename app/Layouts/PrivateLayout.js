import { navigateTo } from "../Router";
import styles from './privateLayout.css'

// this function will handle the window if the user is logged in, where it will display different things depending on which path the user is at.
export function privateLayout($pageContent, logic) {
  const $root = document.getElementById("root");
  $root.innerHTML = `
    <nav class="${styles.nav}">
        <ul class="${styles.ul}">
            <li class="${styles.li}" id="flights">Vuelos Actuales</li>
        </ul>
    </nav>
    <div id="main-content">
        ${$pageContent}
    </div>
    `;

  logic;
  logic();
  //this will be the logic for the navbar we just placed before
  const logicNavbar = () => {
    const roleUser = localStorage.getItem("roleUser");
    document.getElementById("main-content").style.display = "block";
    
    
    document.getElementById("flights").addEventListener("click", async (e) => {
      e.preventDefault();
      //if the user clicks on the flights it will hide the content the dashboard was displaying and it will only show the flights
      document.getElementById("main-content").style.display = "none";
      //since there also scenes that will show, i decided that if the user clicks on the button it will show only the flights available and not the scene.
      const $flights = document.createElement("div");
      const $createFlightsBtn = document.createElement("button");
      //here I create 2 elements so I can add them afterwards, but before that, to edit their properties.
      $createFlightsBtn.textContent = `create`;
      $createFlightsBtn.style.backgroundColor = 'rgba(22, 130, 124, 0.4)';
      $createFlightsBtn.style.padding = '20px';
      $createFlightsBtn.style.borderRadius = '10px'
      $createFlightsBtn.style.border = 'rgba(22, 130, 124, 0.4)'
      $createFlightsBtn.style.marginTop = '10px';
      $createFlightsBtn.style.alignSelf = 'center';


      try {
        const response = await fetch("http://localhost:2000/flight");

        if (response.ok) {
          const flights = await response.json();
          flights.forEach((flight) => {
            const $flightDiv = document.createElement("div");
            $flightDiv.style.display = 'flex';
            $flightDiv.style.justifyContent = 'space-around';

            $flightDiv.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
            $flightDiv.style.backgroundColor = 'rgba(93, 202, 206, 0.2)';
            

            $root.style.display = 'flex';
            $root.style.flexDirection = 'column';
            

            //for each flight it will create a new div, this div contain the following data underneath.
            $flightDiv.innerHTML = `
                <h3>Numero de vuelo ${flight.number}</h3>
                <p>Origen: ${flight.origin}</p>
                <p>Destino: ${flight.destination}</p>
                <p>Tiempo Salida: ${flight.departure}</p>
                <p>Tiempo llegada: ${flight.arrival}</p>
                <p>Capacidad avion: ${flight.capacity}</p>
                <div class="flight-${flight.id}"></div>
                `;
                //and then it will add it to the main card flights mentioned earlier.
            $flights.appendChild($flightDiv);

            const $permissionButtons = $flightDiv.querySelector(
              `.flight-${flight.id}`
            );
            // here, I select the div below the flights data, why? to append the buttons depending if the user is an Admin or if the user is just a guest.
            if (roleUser === "Admin") {
              $permissionButtons.innerHTML = `
                    <button class="edit" data-id="${flight.id}">Edit</button>
                    <button class="delete" data-id="${flight.id}">Delete</button>
                    `;
            } else if (roleUser === "User") {
              $permissionButtons.innerHTML = `
                    <button class="book" data-id="${flight.id}">Reserve</button>
                    
                    `;
            } else {
              alert("type of user is non-existent");
              return;
            }

            let $editButton = $permissionButtons.querySelector(".edit");
            let $deleteButton = $permissionButtons.querySelector(".delete");
            let $purchase = $permissionButtons.querySelector(".book");
            // i select the buttons to add the eventlisteners
            if ($editButton) {
              $editButton.style.backgroundColor = 'rgba(95, 158, 160, 0.1)';
              $editButton.style.border = 'rgba(95, 158, 160, 0.5)'
              $editButton.style.borderRadius = '20px'
              
              $editButton.addEventListener("click", () => {
                navigateTo(
                  `/dashboard/flights/edit?productId=${$editButton.getAttribute(
                    "data-id"
                  )}`
                );
              });
            }
            // if they exist, then they will that eventlistener added.
            if ($deleteButton) {
              $deleteButton.style.backgroundColor = 'rgba(228, 23, 0, 0.5)';
              $deleteButton.style.border = 'rgba(228, 23, 0, 0.5)'
              $deleteButton.style.borderRadius = '20px'
              $deleteButton.addEventListener("click", () => {
                navigateTo(
                  `/dashboard/flights/delete?productId=${$deleteButton.getAttribute(
                    "data-id"
                  )}`
                );
              });
            }

            if ($purchase) {
              $purchase.addEventListener("click", async (e) => {
                e.preventDefault();
                const userReservation = confirm(
                  "do you want to book this flight?"
                );
                const userId = localStorage.getItem("IdUser");
                const dayOfPurchase = new Date();
                if (userReservation) {
                  const response = await fetch(
                    "http://localhost:2000/Booking",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        
                        "flightId":flight.id,
                        "userId":userId,
                        "bookingDate": dayOfPurchase,

                      }),
                    }
                  );
                  if (response.ok) {
                  }
                } else {
                  console.log(error);
                }
              });
            }
          });
          $root.appendChild($flights);
          $root.appendChild($createFlightsBtn);
          //after editing the properties the whole thing inside of these elements, we can proceed and implement them into the DOM.

          $createFlightsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo("/dashboard/flights/create");
          });
        }
      } catch (error) {
        console.error(error, "hubo un error haciendo el fetch");
      }
    });
  };

  logicNavbar();
}
