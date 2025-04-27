const unos = document.getElementById("unos");
const popis = document.getElementById("popis");
const upisi = document.getElementById("gumb_unos");

// Dohvaćanje liste iz localStorage-a ili postavljanje prazne liste
let todo = JSON.parse(localStorage.getItem("todo-lista")) || [];

// Funkcija za ažuriranje prikaza popisa knjiga
function osvjeziPrikaz() {
  popis.innerHTML = ""; // Brišemo postojeći sadržaj

  todo.forEach((knjiga, index) => {
    // Kreiramo div za svaku knjigu
    let knjigaDiv = document.createElement("div");

    // Kreiramo checkbox
    let knjigaCheckbox = document.createElement("input");
    knjigaCheckbox.setAttribute("type", "checkbox");
    knjigaCheckbox.checked = knjiga.completed;

    // Kreiramo label (tekstualni prikaz knjige)
    let knjigaLabel = document.createElement("label");
    knjigaLabel.textContent = knjiga.item;

    // Ako je checkbox označen, primijenimo stil za precrtavanje teksta
    if (knjigaCheckbox.checked) {
      knjigaLabel.style.textDecoration = "line-through";
    }

    // Dodajemo event listener za promjenu statusa knjige
    knjigaCheckbox.addEventListener("change", () => {
      todo[index].completed = knjigaCheckbox.checked;
      localStorage.setItem("todo-lista", JSON.stringify(todo));

      // Ako je označeno, precrtaj tekst, inače ukloni precrtavanje
      knjigaLabel.style.textDecoration = knjigaCheckbox.checked
        ? "line-through"
        : "none";
    });

    // Dodajemo checkbox i label u div
    knjigaDiv.appendChild(knjigaCheckbox);
    knjigaDiv.appendChild(knjigaLabel);

    // Dodajemo div u glavni popis
    popis.appendChild(knjigaDiv);
  });
}

// Pozivamo osvježavanje prikaza pri pokretanju stranice
osvjeziPrikaz();

// Funkcija za dodavanje nove knjige
function dodaj_knjigu() {
  let novaKnjiga = unos.value.trim();
  if (novaKnjiga === "") {
    alert("Unesite naziv knjige!");
    return;
  }

  // Provjeravamo postoji li već ista knjiga
  let postoji = todo.some((i) => i.item === novaKnjiga);
  if (postoji) {
    alert("Knjiga već postoji na popisu!");
    return;
  }

  // Dodajemo novu knjigu u listu
  todo.push({ item: novaKnjiga, completed: false });

  // Spremaju se promjene u localStorage
  localStorage.setItem("todo-lista", JSON.stringify(todo));

  // Ažuriramo prikaz
  osvjeziPrikaz();

  // Brišemo unos iz polja
  unos.value = "";
}

// Dodajemo event listener na gumb
upisi.addEventListener("click", dodaj_knjigu);