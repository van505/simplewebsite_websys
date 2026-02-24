document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.getElementById("menuBtn");
  var mainNav = document.getElementById("mainNav");
  menuBtn &&
    menuBtn.addEventListener("click", function () {
      if (mainNav.style.display === "block") {
        mainNav.style.display = "";
      } else {
        mainNav.style.display = "block";
      }
    });

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var form = document.getElementById("contactForm");
  var result = document.getElementById("formResult");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      })
      .then(function(response) {
        if (response.ok) {
          form.reset();
          result.style.color = "green";
          result.textContent = "Thanks — your message has been sent!";
        } else {
          result.style.color = "crimson";
          result.textContent = "Oops! There was an error sending your message.";
        }
      })
      .catch(function(error) {
        result.style.color = "crimson";
        result.textContent = "Error sending message. Please try again.";
      });
    });
  }
});
