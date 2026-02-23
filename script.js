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
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();
      if (!name || !email || !message) {
        result.textContent = "Please complete all fields.";
        result.style.color = "crimson";
        return;
      }
      var submission = {
        name: name,
        email: email,
        message: message,
        time: new Date().toISOString(),
      };
      try {
        var stored = JSON.parse(localStorage.getItem("subs") || "[]");
        stored.push(submission);
        localStorage.setItem("subs", JSON.stringify(stored));
      } catch (e) {}
      form.reset();
      result.style.color = "green";
      result.textContent = "Thanks — your message is noted.";
    });
  }
});
