$(document).ready(function() {  /* chargement du DOM */

    /*Requête AJAX chargement des paramètres du fichier config
    *********************************************************/
    function fonctionLectureConfig(){

        // fectch pour récupérer les données du JSON config
        fetch('assets/bdd/config.json')
            .then(response => response.json())
            .then(ParametresConfig => {

                // Lecture du nb de colonnes à afficher et stockage dans le html (#parametresConfig)
                var nbColonnes = ParametresConfig.options.nbColonnes;
                $('#parametresConfig').append('<div id="nbColonnes">'+nbColonnes+'</div>');
                
                // Lecture de la hauteur et stockage dans le html (#parametresConfig)
                    var hauteurColonnes = ParametresConfig.options.hauteurColonnes;
                    $('#parametresConfig').append('<div id="hauteurColonnes">'+hauteurColonnes+'</div>');

                // Lecture et affichage dans le html "#ZoneSelectionPictos" des contenus des colonnes + stockage dans le html (#parametresConfig) + injection des popups correspondants

                    for ($i=0; $i<10; $i++){
                        var colonne = ParametresConfig.colonnes[$i];
                        $('#ZoneSelectionPictos').append('<div class="ColonnePictos ColonnePictos'+colonne+'"></div>');
                        $('#parametresConfig').append('<div id="categColonne'+$i+'">'+colonne+'</div>');
                        $('#ZonePopups').append('<div class="popup popupGauche Popup'+colonne+'"></div>');
                    }
                    

                // Lecture et stockage des largeurs de colonnes

                    for ($i=0; $i<10; $i++){
                        var largeurColonne = ParametresConfig.largeurColonnes[$i];
                        $('#parametresConfig').append('<div id="largeurColonne'+$i+'">'+largeurColonne+'</div>');
                    }

                // Ajout de la colonne Boutons
                    $('#ZoneSelectionPictos').append('<div id="ColonnePictosBoutons" class="ColonnePictos ColonnePictosBoutons"></div>');

                // Lecture et affichage dans le html "#ZoneSelectionPictos" des contenus des boutons + stockage dans le html (#parametresConfig) + injection des popups correspondants   
                
                    for ($i=0; $i<5; $i++){
                        var bouton = ParametresConfig.boutons[$i];
                        $('#ColonnePictosBoutons').append('<div class="ColonnePictos ColonnePictos'+bouton+'"></div>');
                        $('#parametresConfig').append('<div id="bouton'+$i+'">'+bouton+'</div>');
                        $('#ZonePopups').append('<div class="popup popupDroite Popup'+bouton+'"></div>');
                    }
                
            })
            .catch(error => console.error('Erreur lors du chargement du fichier config.JSON :', error));
    }

    function fonctionLectureConfigCustom(){
        // récupération des données de config stockées en local (localStorage / ConfigCustom)
        var sessionConfigCustom = JSON.parse(localStorage.getItem("ConfigCustom"));
        console.log(sessionConfigCustom);
        console.log(sessionConfigCustom.options.hauteurColonnes);

        // Lecture du nb de colonnes à afficher et stockage dans le html (#parametresConfig)
        var nbColonnes = sessionConfigCustom.options.nbColonnes;
        $('#parametresConfig').append('<div id="nbColonnes">'+nbColonnes+'</div>');

        // Lecture de la hauteur et stockage dans le html (#parametresConfig)
        var hauteurColonnes = sessionConfigCustom.options.hauteurColonnes;
        $('#parametresConfig').append('<div id="hauteurColonnes">'+hauteurColonnes+'</div>');

        // Lecture et affichage dans le html "#ZoneSelectionPictos" des contenus des colonnes + stockage dans le html (#parametresConfig) + injection des popups correspondants

            for ($i=0; $i<10; $i++){
                var colonne = sessionConfigCustom.colonnes[$i];
                $('#ZoneSelectionPictos').append('<div class="ColonnePictos ColonnePictos'+colonne+'"></div>');
                $('#parametresConfig').append('<div id="categColonne'+$i+'">'+colonne+'</div>');
                $('#ZonePopups').append('<div class="popup popupGauche Popup'+colonne+'"></div>');
            }
            

        // Lecture et stockage des largeurs de colonnes

            for ($i=0; $i<10; $i++){
                var largeurColonne = sessionConfigCustom.largeurColonnes[$i];
                $('#parametresConfig').append('<div id="largeurColonne'+$i+'">'+largeurColonne+'</div>');
            }

        // Ajout de la colonne Boutons
            $('#ZoneSelectionPictos').append('<div id="ColonnePictosBoutons" class="ColonnePictos ColonnePictosBoutons"></div>');

        // Lecture et affichage dans le html "#ZoneSelectionPictos" des contenus des boutons + stockage dans le html (#parametresConfig) + injection des popups correspondants   
        
            for ($i=0; $i<5; $i++){
                var bouton = sessionConfigCustom.boutons[$i];
                $('#ColonnePictosBoutons').append('<div class="ColonnePictos ColonnePictos'+bouton+'"></div>');
                $('#parametresConfig').append('<div id="bouton'+$i+'">'+bouton+'</div>');
                $('#ZonePopups').append('<div class="popup popupDroite Popup'+bouton+'"></div>');
        }
    }

    fonctionLectureConfigCustom();
    

    
    
    /*Requête AJAX + fonctions d'affichage des pictos
    *********************************************************/
    function fonctionAffichageColonne(categorie,largeur){

        // fectch pour récupérer les données de la BDD JSON
        fetch('assets/bdd/BDDpictos.json')
            .then(response => response.json())
            .then(BanquePictos => {

                //récupération de la hauteur de colonne stockée dans le html (#parametresConfig)
                //var dimension = 97/$('#nbColonnes').text();
                //console.log(dimension);
                //var hauteur = $('#hauteurColonnes').text();

                var NbCategories = BanquePictos.categories.length;
                var colonne = $('.ColonnePictos'+categorie);
                var popup = $('.Popup'+categorie);

                //ajustement de la hauteur css de colonne
                //colonne.css('height',(hauteur*(dimension+0.5))+'vw');
                        
                // extraction de la bonne catégorie
                for (var i=0 ; i<NbCategories; i++){
                    if (BanquePictos.categories[i].nom==categorie){
                        var BanquePictosCategorie=BanquePictos.categories[i];
                    }
                }
                var couleur = BanquePictosCategorie.couleur;
                var NbPictos1 = BanquePictosCategorie.pictos1.length;
                var NbPictos2 = BanquePictosCategorie.pictos2.length;
                var NbPictos = NbPictos1+NbPictos2;

                // injection des pictos 1 dans la colonne
                    // Nb de pictos en fonction de la hauteur et largeur choisies
                    for (var i=0; i<((largeur*hauteur)-1); i++){
                        var mot=BanquePictosCategorie.pictos1[i];
                        colonne.append('<div id="'+mot+'" class="CarteCliquable CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot">'+mot+'</p><img class="picto" src="assets/images/pictos/'+mot+'.png"><audio src="assets/sons/'+mot+'.mp3" id="audio-'+mot+'"></audio></div></div>');
                        }
                        // Ajustement de la largeur
                        colonne.css('width', (largeur*dimension)+'vw');
                    
                    
                //Ajout du bouton + pour la catégorie
                colonne.append('<div id="'+categorie+'" class="CarteCliquableCategorie CarteCliquable'+categorie+' CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot MotGras">'+categorie+'</p><img class="picto" src="assets/images/pictos/'+categorie+'.png"></div></div>');

                // injection des pictos 1 dans le popup
                for (var i=0; i<NbPictos1; i++){
                    var mot=BanquePictosCategorie.pictos1[i];
                    popup.append('<div id="'+mot+'" class="CarteCliquable CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot">'+mot+'</p><img class="picto" src="assets/images/pictos/'+mot+'.png"><audio src="assets/sons/'+mot+'.mp3" id="audio-'+mot+'"></audio></div></div>');
                }

                // injection des pictos 2 dans le popup
                for (var i=0; i<NbPictos2; i++){
                    var mot=BanquePictosCategorie.pictos2[i];
                    popup.append('<div id="'+mot+'" class="CarteCliquable CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot">'+mot+'</p><img class="picto" src="assets/images/pictos/'+mot+'.png"><audio src="assets/sons/'+mot+'.mp3" id="audio-'+mot+'"></audio></div></div>');
                }    
                
                //Ajustement de la hauteur et largeur des popups
                //popup.css('height',(hauteur*(dimension+0.5))+'vw');
                popup.css('width',Math.ceil(NbPictos/hauteur)*dimension+'vw');

        })
        .catch(error => console.error('Erreur lors du chargement du fichier BDDpictos.JSON :', error));
    }
    

    function fonctionAffichageBouton(categorie){

        // fectch pour récupérer les données de la BDD JSON
        fetch('assets/bdd/BDDpictos.json')
            .then(response => response.json())
            .then(BanquePictos => {

                //récupération de la hauteur de colonne stockée dans le html (#parametresConfig)
                var hauteur = $('#hauteurColonnes').text();
                //var dimension = 100/$('#nbColonnes').text();

                var NbCategories = BanquePictos['categories'].length;
                var colonne = $('#ColonnePictosBoutons');
                var popup = $('.Popup'+categorie);
                        
                // extraction de la bonne catégorie
                for (var i=0 ; i<NbCategories; i++){
                    if (BanquePictos['categories'][i]['nom']==categorie){
                        var BanquePictosCategorie=BanquePictos['categories'][i];
                    }
                }
                var couleur = BanquePictosCategorie['couleur'];
                var NbPictos1 = BanquePictosCategorie['pictos1'].length;
                var NbPictos2 = BanquePictosCategorie['pictos2'].length;
                var NbPictos = NbPictos1+NbPictos2;

                //Ajout du bouton + pour la catégorie
                colonne.append('<div id="'+categorie+'" class="CarteCliquableCategorie CarteCliquable'+categorie+' CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot MotGras">'+categorie+'</p><img class="picto" src="assets/images/pictos/'+categorie+'.png"></div></div>');

                // injection des pictos 1 dans le popup
                for (var i=0; i<NbPictos1; i++){
                    var mot=BanquePictosCategorie['pictos1'][i];
                    popup.append('<div id="'+mot+'" class="CarteCliquable CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot">'+mot+'</p><img class="picto" src="assets/images/pictos/'+mot+'.png"><audio src="assets/sons/'+mot+'.mp3" id="audio-'+mot+'"></audio></div></div>');
                }

                // injection des pictos 2 dans le popup
                for (var i=0; i<NbPictos2; i++){
                    var mot=BanquePictosCategorie['pictos2'][i];
                    popup.append('<div id="'+mot+'" class="CarteCliquable CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot">'+mot+'</p><img class="picto" src="assets/images/pictos/'+mot+'.png"><audio src="assets/sons/'+mot+'.mp3" id="audio-'+mot+'"></audio></div></div>');
                }    
                
                //Ajustement de la hauteur et largeur des popups
                //popup.css('height',(hauteur*(dimension+0.5))+'vw');
                popup.css('width',Math.ceil(NbPictos/hauteur)*dimension+'vw'); 
        })
        .catch(error => console.error('Erreur lors du chargement du fichier BDDpictos.JSON :', error));
    }
    

    /* Ajustement du CSS */
    // création de la variable dimension selon le nb de colonnes à afficher :
    var dimension = 97/$('#nbColonnes').text();
    console.log(dimension);

    // récupération du nb de pictos par colonne :
    var hauteur = $('#hauteurColonnes').text();

    //ajustement de la hauteur de colonne :
    $('.ColonnePictos').css('height',(hauteur*(dimension+0.5))+'vw');

    //Ajustement de la hauteur et largeur des popups
    $('.popup').css('height',(hauteur*(dimension+0.5))+'vw');
    //$('.popup').css('width',Math.ceil(NbPictos/hauteur)*dimension+'vw'); 

    // Ajustement des dimensions des cartes pictos :
    $('.CartePicto').css('width',(0.8*dimension)+'vw');
    $('.CartePicto').css('height',(0.8*dimension)+'vw');
        // --> non fonctionnel *******************************************//


    
    /* Appels */

    setTimeout(() =>{   //Ajout d'un timer pour attendre le chargement de l'appel ajax (sinon le mappage des carte cliquables ne fonctionne pas)

        // lecture des catégories et largeurs sélectionnées, stockées dans le html (#parametresConfig)
        var largeurColonne0 =$('#largeurColonne0').text();
        var categColonne0=$('#categColonne0').text();
        var largeurColonne1 =$('#largeurColonne1').text();
        var categColonne1=$('#categColonne1').text();
        var largeurColonne2 =$('#largeurColonne2').text();
        var categColonne2=$('#categColonne2').text();
        var largeurColonne3 =$('#largeurColonne3').text();
        var categColonne3=$('#categColonne3').text();
        var largeurColonne4 =$('#largeurColonne4').text();
        var categColonne4=$('#categColonne4').text();
        var largeurColonne5 =$('#largeurColonne5').text();
        var categColonne5=$('#categColonne5').text();
        var largeurColonne6 =$('#largeurColonne6').text();
        var categColonne6=$('#categColonne6').text();
        var largeurColonne7 =$('#largeurColonne7').text();
        var categColonne7=$('#categColonne7').text();
        var largeurColonne8 =$('#largeurColonne8').text();
        var categColonne8=$('#categColonne8').text();
        var largeurColonne9 =$('#largeurColonne9').text();
        var categColonne9=$('#categColonne9').text();

        // affichage des colonnes
        fonctionAffichageColonne(categColonne0,largeurColonne0);
        fonctionAffichageColonne(categColonne1,largeurColonne1);
        fonctionAffichageColonne(categColonne2,largeurColonne2);
        fonctionAffichageColonne(categColonne3,largeurColonne3);
        fonctionAffichageColonne(categColonne4,largeurColonne4);
        fonctionAffichageColonne(categColonne5,largeurColonne5);
        fonctionAffichageColonne(categColonne6,largeurColonne6);
        fonctionAffichageColonne(categColonne7,largeurColonne7);
        fonctionAffichageColonne(categColonne8,largeurColonne8);
        fonctionAffichageColonne(categColonne9,largeurColonne9);
        
        // lecture des catégories de boutons, stockées dans le html (#parametresConfig)
        var bouton0=$('#bouton0').text();
        var bouton1=$('#bouton1').text();
        var bouton2=$('#bouton2').text();
        var bouton3=$('#bouton3').text();
        var bouton4=$('#bouton4').text();


        // affichage des boutons
        fonctionAffichageBouton(bouton0);
        fonctionAffichageBouton(bouton1);
        fonctionAffichageBouton(bouton2);
        fonctionAffichageBouton(bouton3);
        fonctionAffichageBouton(bouton4);

    },100)
    
});