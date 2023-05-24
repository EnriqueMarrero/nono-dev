// Get the modal
var modal = document.getElementById('subscribe-modal');

// Get the button that opens the modal
var btn = document.getElementById('subscribe-button');

// Get the <span> element that closes the modal
var span = document.querySelector('.close-button');

// Get the message box
var messageBox = document.querySelector('#subscribe-modal .message-box');

if (!modal || !btn || !span || !messageBox) {
  console.error("Modal, subscribe-button, close-button or message-box not found");
} else {
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = 'block';
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = 'none';
    messageBox.innerText = '';
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      messageBox.innerText = '';
    }
  }

  // Handle form submission
  document.getElementById('subscribe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    messageBox.innerText = 'Loading...';

    fetch('subscribe.php', {
      method: 'POST',
      body: new FormData(event.target) // event.target is the form
    })
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(data => {
      // Show the message in the modal
      messageBox.innerText = data.message;

      // If the status code is not 200, it means there was an error
      if (data.statusCode !== 200) {
        // Do something to handle the error, like showing the error message
      } else {
        // Do something to handle the success, like clearing the form and closing the modal
        event.target.reset();
        setTimeout(function() {
          modal.style.display = 'none';
          messageBox.innerText = '';
        }, 2000); // Close the modal after 2 seconds
      }
    })
    .catch(error => {
      // Do something to handle the network error
      console.error('Error:', error);
      messageBox.innerText = 'Error: ' + error;
    });
  });
}
