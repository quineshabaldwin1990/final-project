const trips = [];
// activities to list, which can be added
const activities = [{
    name: "Swimming",
    checked: false
},
{
    name: "Bungee Jumping",
    checked: false
},
{
    name: "Skiiing",
    checked: false
}
]
// places to visit
const places = [
    {
        name: "Dubai",
        checked: false
    },
    {
        name: "New York",
        checked: false
    },
    {
        name: "Delhi",
        checked: false
    }
]
// function to create checkboxes inside a div id
function createCheckboxes(list, selector) {
    const act = document.getElementById(selector);
    list.forEach((e, i) => {
        act.innerHTML += `<div class="mdc-checkbox">
                            <input type="checkbox" class="mdc-checkbox__native-control ${selector}" id="checkbox-${selector}-${i}" ${e.checked ? 'checked' : ''}/>
                            <div class="mdc-checkbox__background">
                                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                    <path class="mdc-checkbox__checkmark-path" fill="none"
                                        d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                                </svg>
                                <div class="mdc-checkbox__mixedmark"></div>
                            </div>
                            <div class="mdc-checkbox__ripple"></div>
                        </div>
                        <label for="checkbox-${selector}-${i}">${e.name}</label>`
    })
}
// creates a new trip
function newTrip() {

    const name = document.getElementById("trip-input").value
    const acts = document.querySelectorAll(".Activities")
    const plcs = document.querySelectorAll(".Places")

    const trip = {
        name,
        activities: [],
        places: []
    }
    acts.forEach(e => trip.activities.push({
        name: activities[parseInt(e.id.split('-')[2])].name,
        checked: e.checked
    }))
    plcs.forEach(e => trip.places.push({
        name: places[parseInt(e.id.split('-')[2])].name,
        checked: e.checked
    }))
    // cchecking trip json data
    console.log("Trip")
    console.log(trip)
    trips.push(trip)
    // refreshing trips list
    listTrips()
}
// deletes the trip from the list
function deleteTrip(id) {
    console.log("deleting" + id);
    trips.splice(id, 1)
    listTrips()
}
// list trips on the DOM from trips json
function listTrips() {
    console.log(trips);
    const $trips = document.getElementById("list_trips")
    if (trips.length) {
        $trips.innerHTML = '';
        // uses cards to display trips
        trips.forEach((e, i) => {
            $trips.innerHTML += `<div class="mdc-card mdc-card--outlined">
            <div class="header">
            <p class="mdc-typography--headline6">${e.name} </p>  
            <button class="mdc-fab mdc-fab--mini" aria-label="Favorite" onclick="deleteTrip(${i})">
            <div class="mdc-fab__ripple"></div>
            <span class="mdc-fab__icon material-icons">delete</span>
            </button>
            </div>
            <div class="mdc-card__content ">
            <label>Activities to Do: </label>
            <div class="mdc-form-field" id="trips-Activities-${i}">
                
            </div>

            <label>Places to Visit: </label>
            <div class="mdc-form-field" id="trips-Places-${i}">

            </div>

            </div>
            <div class="mdc-touch-target-wrapper">
  
        </div>`
            createCheckboxes(e.activities, `trips-Activities-${i}`)
            createCheckboxes(e.places, `trips-Places-${i}`)

        })
    } else {
        $trips.innerHTML = '<h3 class="mdc-typography--headline3">Your trips appear here!</h3>';
    }

}
// initialize
// list trips
listTrips()
// list the activitis and places to add
createCheckboxes(activities, "Activities")
createCheckboxes(places, "Places")