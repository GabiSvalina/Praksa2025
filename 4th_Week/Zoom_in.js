const tekst = document.getElementById("tekst");
const gumb = document.getElementById("gumb");

let velicina = 16;
gumb.addEventListener("click", function () {
    velicina = velicina * 1.2;
    tekst.style.fontSize = velicina + "px";
});
