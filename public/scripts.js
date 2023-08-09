//Animation Active On Sidebar
const sidebarMenu = document.querySelector(".sidebar");
const btns = sidebarMenu.getElementsByTagName("a");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
