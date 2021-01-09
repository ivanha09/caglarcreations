window.onload = function() {
  let form = document.querySelector('#contact-form');
  // When the user submits the form, run this function to check if it is valid
  form.onsubmit = function(event) {
    if (!form.checkValidity()) {
      // Step 1. Check if the form is valid (i.e. has all required input elements)
      form.classList.add('was-validated');
      // Update the CSS for the form to show the error messages
      event.preventDefault();
      return false;
    }
    return true;
  };

  document.querySelector('#reason-orderproblem').addEventListener('change', function() {
    document.querySelector('#orderNumber').style.display = 'block';
    document.querySelector('#order').value = '';
  });
  document.querySelector('#reason-question').addEventListener('change', function() {
    document.querySelector('#orderNumber').style.display = 'none';
    document.querySelector('#order').value = '';
  });
  document.querySelector('#reason-comment').addEventListener('change', function() {
    document.querySelector('#orderNumber').style.display = 'none';
    document.querySelector('#order').value = '';
  });
};
