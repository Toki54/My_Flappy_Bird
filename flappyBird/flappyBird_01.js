// contexte graphique

const cvs = document.getElementById("zone_de_dessin");
cvs.width = 300;
cvs.height = 400;
const ctx = cvs.getContext("2d");

// images

const imageArrierePlan = new Image();
imageArrierePlan.src = "images/arrirePlan.png";
const imageAvantPlan = new Image();
imageAvantPlan.src = "images/avantPlan.png";
const imageOiseau1 = new Image();
imageOiseau1.src = "images/oiseau1.png";
const imageOiseau2 = new Image();
imageOiseau2.src = "images/oiseau2.png";
const imageTuyauBas = new Image();
imageTuyauBas.src = "images/tuyauBas.png";
const imageTuyauHaut = new Image();
imageTuyauHaut.src = "images/tuyauHaut.png";

// parametre des tuyaux

const largeurTuyau = 40;
const ecartTuyau = 80;
let xTuyau = 200;
let yTuyauBas = cvs.height - 150;

// Dessin

function dessine(){

    ctx.drawImage(imageArrierePlan, 0, 0);
    ctx.drawImage(imageTuyauBas, xTuyau, yTuyauBas);
    ctx.drawImage(imageTuyauHaut, xTuyau, yTuyauBas - ecartTuyau - imageTuyauHaut.height);
    ctx.drawImage(imageAvantPlan, 0, cvs.height - imageAvantPlan.height);
    ctx.drawImage(imageOiseau1, 100, 150),
    
    
    requestAnimationFrame(dessine);

}
dessine();