// Liste des chambres
const chambres = [
    {num: '10'}, {num: '11'}, {num: '12'}, {num: '13'}, {num: '14'},
    {num: '20'}, {num: '21'}, {num: '22'}, {num: '23'}, {num: '24'},
    {num: '30'}, {num: '31'}, {num: '32'}, {num: '33'}, {num: '34'},
    {num: '40'}, {num: '41'}, {num: '42'}, {num: '43'}, {num: '44'}
];

// Création des checkbox pour les chambres
const chambresDiv = document.getElementById('chambres');
let table = document.createElement('table');
chambresDiv.appendChild(table);

let header = document.createElement('tr');
table.appendChild(header);

let chambreTitle = document.createElement('th');
chambreTitle.textContent = 'Numéro de Chambre';
header.appendChild(chambreTitle);

let departTitle = document.createElement('th');
departTitle.textContent = 'Départ';
header.appendChild(departTitle);

let recoucheTitle = document.createElement('th');
recoucheTitle.textContent = 'Recouche';
header.appendChild(recoucheTitle);

// Ajout des colonnes "Commentaire" et "Fait"
let commentaireTitle = document.createElement('th');
commentaireTitle.textContent = 'Commentaire';
header.appendChild(commentaireTitle);

let faitTitle = document.createElement('th');
faitTitle.textContent = 'Fait';
header.appendChild(faitTitle);

for (let chambre of chambres) {
    let row = document.createElement('tr');
    table.appendChild(row);

    let chambreCell = document.createElement('td');
    chambreCell.textContent = chambre.num;
    row.appendChild(chambreCell);

    let departCell = document.createElement('td');
    let departCheckbox = document.createElement('input');
    departCheckbox.type = 'checkbox';
    departCheckbox.id = 'depart' + chambre.num;
    departCell.appendChild(departCheckbox);
    row.appendChild(departCell);

    let recoucheCell = document.createElement('td');
    let recoucheCheckbox = document.createElement('input');
    recoucheCheckbox.type = 'checkbox';
    recoucheCheckbox.id = 'recouche' + chambre.num;
    recoucheCell.appendChild(recoucheCheckbox);
    row.appendChild(recoucheCell);

    // Ajout des colonnes "Commentaire" et "Fait"
    let commentaireCell = document.createElement('td');
    commentaireCell.textContent = ""; // Empty for now
    row.appendChild(commentaireCell);

    let faitCell = document.createElement('td');
    faitCell.textContent = ""; // Empty for now
    row.appendChild(faitCell);
}

// Fonction pour attribuer les chambres
function attribuer() {
    let n = document.getElementById('femmes').value;

    let chambresSelectionnees = chambres.filter(chambre => 
        document.getElementById('depart' + chambre.num).checked || document.getElementById('recouche' + chambre.num).checked
    ).map(chambre => ({
        num: chambre.num,
        poids: document.getElementById('recouche' + chambre.num).checked ? 1 : 1.5
    }));

    chambresSelectionnees.sort((a, b) => a.num.localeCompare(b.num));

    let chambresParEtage = {};
    for (let chambre of chambresSelectionnees) {
      let etage = chambre.num[0];
      if (!chambresParEtage[etage]) {
        chambresParEtage[etage] = [];
      }
      chambresParEtage[etage].push(chambre);
    }

    let resultat = [];
    for (let i = 0; i < n; i++) {
        resultat.push({chambres: [], poids: 0});
    }

    let etages = Object.keys(chambresParEtage);
    etages.sort((a, b) => chambresParEtage[b].length - chambresParEtage[a].length);

    for (let etage of etages) {
        let minIndex = 0;
        for (let i = 1; i < n; i++) {
            if (resultat[i].poids < resultat[minIndex].poids) {
                minIndex = i;
            }
        }

        while (chambresParEtage[etage].length) {
            let chambre = chambresParEtage[etage].pop();
            resultat[minIndex].chambres.push(chambre.num);
            resultat[minIndex].poids += chambre.poids;
        }
    }

    let resultatDiv = document.getElementById('resultat');
    resultatDiv.textContent = '';
    for (let i = 0; i < n; i++) {
        let p = document.createElement('p');
        p.textContent = 'Femme de chambre ' + (i + 1) + ' : ' + resultat[i].chambres.join(', ');
        resultatDiv.appendChild(p);
    }
}