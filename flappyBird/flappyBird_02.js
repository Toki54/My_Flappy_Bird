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

let tabTuyaux =[];

tabTuyaux[0] = {
    x:cvs.width,
    y:cvs.height - 150
}

// parametre de l'oiseau
 let xOiseau = 100;
 let yOiseau = 150;
 const gravite = 2.1;
 let oiseauMonte = 0;

 document.addEventListener("click", monte);
 function monte(){
    oiseauMonte = 10;
    yOiseau = yOiseau - 43;
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


    

    
    
    
    requestAnimationFrame(dessine);

}
dessine();