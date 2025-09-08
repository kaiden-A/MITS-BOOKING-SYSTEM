
const venueInput = document.getElementById('venue');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');


const choices = new Choices(timeInput, {
  removeItemButton: true,
  placeholder: true,
  placeholderValue: '-- Select a Time For Reservations --',
  searchPlaceholderValue: 'Search time...'
});

dateInput.addEventListener('change' , async (input) => {

    console.log(input.target.value);
    console.log(venueInput.value)


    const venueId = venueInput.value;
    const date = input.target.value;

    const response = await fetch(`/api/availability?venueId=${venueId}&date=${date}`);

    const data = await response.json();

    createOptions(data.availableSlot);

})


function createOptions(slots) {
  // Clear existing options
  choices.clearChoices();

  // Add new ones
  choices.setChoices(
    slots.map(slot => ({
      value: slot,
      label: slot
    })),
    'value',
    'label',
    true
  );
}





