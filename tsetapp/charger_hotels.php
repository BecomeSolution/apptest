<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = ""; // Assurez-vous que le mot de passe correspond à celui de votre serveur MySQL
$dbname = "hotels";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Préparer la requête SQL pour récupérer les données de la table "hotels"
$sql = "SELECT * FROM hotels";

// Exécuter la requête SQL et récupérer les résultats
$result = $conn->query($sql);

// Créer un tableau pour stocker les hôtels
$hotels = [];

// Parcourir les résultats et ajouter chaque hôtel au tableau
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $hotels[] = $row;
    }
} else {
    echo "Aucun hôtel trouvé dans la base de données.";
}

// Fermer la connexion à la base de données
$conn->close();

// Renvoyer les hôtels au format JSON
header("Content-Type: application/json"); // Définir l'en-tête pour le contenu JSON

// Convertir en JSON et renvoyer la réponse
$jsonData = json_encode($hotels);
if ($jsonData === false) {
    $jsonError = json_last_error_msg();
    echo "Erreur lors de la conversion en JSON : " . $jsonError;
} else {
    echo $jsonData;
}
?>
