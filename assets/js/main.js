// Main JS for ESD Security Business Website

document.addEventListener("DOMContentLoaded", function () {
  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("newsletter-email").value;
      if (email && email.includes("@")) {
        alert("Thank you for subscribing!");
        newsletterForm.reset();
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }
});
