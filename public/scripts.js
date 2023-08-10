//Animation Active On Sidebar
const sidebarMenu = document.querySelector(".sidebar");
const btns = sidebarMenu.getElementsByTagName("a");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Dark Theme Toggler
const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-var");
  themeToggler.querySelector(".light-mode").classList.toggle("active");
  themeToggler.querySelector(".dark-mode").classList.toggle("active");
});
