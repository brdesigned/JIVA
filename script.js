// ==========================================
// MOBILE MENU
// ==========================================

const menuButton =
  document.querySelector(".menu-button");

const mobileMenu =
  document.querySelector(".mobile-menu");

const mobileLinks =
  document.querySelectorAll(".mobile-menu a");


menuButton.addEventListener(
  "click",
  () => {

    menuButton.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    const isOpen =
      mobileMenu.classList.contains("active");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen
    );

    document.body.style.overflow =
      isOpen ? "hidden" : "";

  }
);


// Close menu when link is clicked

mobileLinks.forEach(link => {

  link.addEventListener(
    "click",
    () => {

      menuButton.classList.remove("active");
      mobileMenu.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.style.overflow = "";

    }
  );

});


// ==========================================
// CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener(
  "click",
  event => {

    if (
      !mobileMenu.classList.contains("active")
    ) {
      return;
    }

    const clickedMenu =
      mobileMenu.contains(event.target);

    const clickedButton =
      menuButton.contains(event.target);

    if (
      !clickedMenu &&
      !clickedButton
    ) {

      menuButton.classList.remove("active");
      mobileMenu.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.style.overflow = "";

    }

  }
);


// ==================================================
// WAITLIST FORM
// ==================================================

const waitlistForm = document.querySelector("#waitlist-form");
const formMessage = document.querySelector("#form-message");

waitlistForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();

  const formData = new FormData(waitlistForm);

  try {
    const response = await fetch(waitlistForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      formMessage.textContent =
        `You're in, ${name}. Welcome to JIVA.`;

      waitlistForm.reset();
    } else {
      formMessage.textContent =
        "Something went wrong. Please try again.";
    }
  } catch (error) {
    formMessage.textContent =
      "Something went wrong. Please try again.";
  }
});




// ==========================================
// FOOTER YEAR
// ==========================================

document.querySelector("#year")
  .textContent =
  new Date().getFullYear();


// ==========================================
// SIMPLE SCROLL REVEALS
// ==========================================

const revealElements =
  document.querySelectorAll(
    `
      .about h2,
      .about-copy,
      .benefit-card,
      .manifesto h2,
      .manifesto-copy,
      .waitlist-heading,
      .waitlist-content
    `
  );


revealElements.forEach(element => {

  element.classList.add("reveal");

});


const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target
            .classList.add("visible");

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(element => {

  observer.observe(element);

});