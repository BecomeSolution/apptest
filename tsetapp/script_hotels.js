const hotels = []; // Tableau pour stocker les informations sur les hôtels

// Charger les hôtels depuis la base de données lors du chargement de la page
window.addEventListener("load", function() {
    chargerHotels();
});

document.getElementById("hotelForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const nom = document.getElementById("nom").value;
    const etages = parseInt(document.getElementById("etages").value);
    const chambresParEtage = parseInt(document.getElementById("chambresParEtage").value);

    // Appeler une fonction pour ajouter l'hôtel au système
    ajouterHotel(nom, etages, chambresParEtage);

    // Réinitialiser le formulaire
    document.getElementById("hotelForm").reset();

    // Afficher les fiches des hôtels
    afficherHotels();
});

function chargerHotels() {
    // Charger les hôtels à partir de la base de données via des requêtes AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "charger_hotels.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                hotels.push(...data); // Ajouter les hôtels chargés dans le tableau
                afficherHotels();
            } else {
                console.log("Erreur lors du chargement des hôtels : " + xhr.status);
            }
        }
    };
    xhr.send();
}

function ajouterHotel(nom, etages, chambresParEtage) {
    // Votre code pour ajouter l'hôtel au système va ici
    hotels.push({ nom: nom, etages: etages, chetage: chambresParEtage }); // Utilisez le nouveau nom de champ ici

    // Enregistrez également les informations de l'hôtel dans la base de données
    enregistrerHotelDansBDD(nom, etages, chambresParEtage);
}

function afficherHotels() {
    const hotelsSection = document.getElementById("hotelsSection");
    hotelsSection.innerHTML = ""; // Efface le contenu actuel

    hotels.forEach((hotel, index) => {
        const ficheHotel = `
            <div class="fiche-hotel">
                <h3>${hotel.nom}</h3>
                <p>Nombre d'étages: ${hotel.etages}</p>
                <p>Chambres par étage: ${hotel.chetage}</p> <!-- Utilisez le nouveau nom de champ ici -->
                <!-- Ajoutez ici d'autres informations spécifiques à l'hôtel si nécessaire -->
            </div>
        `;

        hotelsSection.innerHTML += ficheHotel;
    });
}

function enregistrerHotelDansBDD(nom, etages, chambresParEtage) {
    // Utiliser des requêtes AJAX pour envoyer les données au serveur et les enregistrer dans la base de données
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "enregistrer_hotel.php", true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("root:"));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Enregistrement réussi !");
            } else {
                console.log("Erreur lors de l'enregistrement : " + xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify({ nom: nom, etages: etages, chetage: chambresParEtage })); // Utilisez le nouveau nom de champ ici
}

// script_hotels.js

// ...

function chargerHotels() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "charger_hotels.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                hotels.push(...data);
                console.log("Hôtels chargés avec succès :", hotels); // Message de débogage
                afficherHotels();
            } else {
                console.log("Erreur lors du chargement des hôtels :", xhr.status); // Message de débogage
            }
        }
    };
    xhr.send();
}

function afficherHotels() {
    const hotelsSection = document.getElementById("hotelsSection");
    hotelsSection.innerHTML = "";

    hotels.forEach((hotel, index) => {
        const ficheHotel = `
            <div class="fiche-hotel">
                <h3>${hotel.nom}</h3>
                <p>Nombre d'étages: ${hotel.etages}</p>
                <p>Chambres par étage: ${hotel.chetage}</p>
            </div>
        `;

        hotelsSection.innerHTML += ficheHotel;
    });

    console.log("Hôtels affichés :", hotels); // Message de débogage
}

// ...

