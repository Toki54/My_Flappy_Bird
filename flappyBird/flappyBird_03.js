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
imageTuyauBas.src = "images/fourchette.png";
const imageTuyauHaut = new Image();
imageTuyauHaut.src = "images/couteau.png";

// sons

const sonVole = new Audio();
sonVole.src = "sons/sonVole.mp3";
const sonScore = new Audio();
sonScore.src = "sons/sonScore.mp3";
const sonChoc = new Audio();
sonChoc.src = "sons/sonChoc.mp3";

// parametre des tuyaux


const largeurTuyau = 40;
const ecartTuyau = 80;

let tabTuyaux =[];

tabTuyaux[0] = {
    x:cvs.width,
    y:cvs.height - 150
}



// parametre de l'oiseau
 let xOiseau = 100;
 let yOiseau = 150;
 const gravite = 1.75;
 let oiseauMonte = 0;
 const largeurOiseau = 34;
 const hauteurOiseau = 24;

 let FinDuJeu = false;

 let score = 0;

 document.addEventListener("click", monte);
 function monte(){
    oiseauMonte = 10;
    yOiseau = yOiseau - 33;
    sonVole.play();
 }


// Dessin

function dessine(){

    ctx.drawImage(imageArrierePlan, 0, 0);


    // gestion des tuyaux

    for(let i=0; i < tabTuyaux.length; i++){

        tabTuyaux[i].x--;


        //dessin du tuyau

        ctx.drawImage(imageTuyauBas, tabTuyaux[i].x, tabTuyaux[i].y);
        ctx.drawImage(imageTuyauHaut, tabTuyaux[i].x, tabTuyaux[i].y - ecartTuyau - imageTuyauHaut.height);
        if(tabTuyaux[i].x === 100){
            tabTuyaux.push({
                x: cvs.width,
                y: Math.floor(100 + Math.random() * 180)
            })
        } else if (tabTuyaux[i].x+ largeurTuyau < 0){
            tabTuyaux.splice(i, 1);
        }


        // gestion des colisions 

        if (yOiseau < 0 || yOiseau + hauteurOiseau > 300 || (xOiseau + largeurOiseau >= tabTuyaux[i].x && xOiseau <= tabTuyaux[i].x + largeurTuyau
        && (yOiseau + hauteurOiseau >= tabTuyaux[i].y || yOiseau + ecartTuyau <= tabTuyaux[i].y ))){
            sonChoc.play();
            FinDuJeu = true;
        }
// gestion du score

        if(xOiseau === tabTuyaux[i].x + largeurTuyau + 5){
            score++;
            sonScore.play();
        }
    }

ctx.drawImage(imageAvantPlan, 0, cvs.height - imageAvantPlan.height);


// mùouvement de l'oiseau

yOiseau = yOiseau + gravite;
if(oiseauMonte > 0){
    oiseauMonte --;
    ctx.drawImage(imageOiseau2, xOiseau, yOiseau);

}else{
    ctx.drawImage(imageOiseau1, xOiseau, yOiseau);
}
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, cvs.width, cvs.height);
    if(FinDuJeu === false){
        requestAnimationFrame(dessine);
    }
    
    
    

}
dessine();