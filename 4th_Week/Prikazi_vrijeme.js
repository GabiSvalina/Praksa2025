document.getElementById("gumb").addEventListener("click", function () {
    const sada = new Date();
    const naseSada = sada.toLocaleTimeString(); //toLocaleDateString

    document.getElementById("vrijeme").textContent = naseSada;
});