<?php
// Récupérer les données du formulaire
$data = json_decode(file_get_contents('php://input'), true);
$nom = $data['nom'];
$etages = $data['etages'];
$chambresParEtage = $data['chetage']; // Mettez à jour le nom du champ ici

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

// Préparer la requête SQL pour insérer les données dans la table "hotels"
$stmt = $conn->prepare("INSERT INTO hotels (nom, etages, chetage) VALUES (?, ?, ?)");
$stmt->bind_param("sii", $nom, $etages, $chambresParEtage);

// Exécuter la requête SQL
if ($stmt->execute()) {
    echo "Hotel enregistré avec succès.";

    // Ajouter un code de débogage pour vérifier que l'enregistrement a été effectué
    $sql = "SELECT * FROM hotels WHERE nom='$nom' AND etages=$etages AND chetage=$chambresParEtage";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo "Données correctement enregistrées dans la base de données.";
    } else {
        echo "Erreur : Les données n'ont pas été correctement enregistrées dans la base de données.";
    }
} else {
    echo "Erreur lors de l'enregistrement de l'hôtel: " . $conn->error;
}

// Fermer la connexion à la base de données
$stmt->close();
$conn->close();
?>
