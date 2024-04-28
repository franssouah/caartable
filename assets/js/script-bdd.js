$(document).ready(function() {  /* chargement du DOM */

    /* Chargement des paramètres de configuration
    *********************************************************/
    
    function fonctionLectureConfig(){
        // récupération des données du fichier config.json
        fetch('assets/bdd/config.json')
            .then(response => response.json())
            .then(config => {
                // Enregistrement dans le localstorage
                localStorage.setItem("ConfigCustom", JSON.stringify(config));
            })
            .catch(error => console.error('Erreur lors du chargement du fichier config.JSON :', error));
    }

    function fonctionLectureConfigCustom(){
        // récupération des données de config stockées en local (localStorage / ConfigCustom)
        var sessionConfigCustom = JSON.parse(localStorage.getItem("ConfigCustom"));
        //console.log(sessionConfigCustom);
        //console.log(sessionConfigCustom.options.hauteurColonnes);

        // Lecture du nb de colonnes à afficher et stockage dans le html (#parametresConfig)
        var nbColonnes = sessionConfigCustom.options.nbColonnes;
        $('#parametresConfig').append('<div id="nbColonnes">'+nbColonnes+'</div>');

        // Lecture de la hauteur et stockage dans le html (#parametresConfig)
        var hauteurColonnes = sessionConfigCustom.options.hauteurColonnes;
        $('#parametresConfig').append('<div id="hauteurColonnes">'+hauteurColonnes+'</div>');

        // Lecture de la complexité choisie
        var complexite = sessionConfigCustom.options.complexite;
        $('#parametresConfig').append('<div id="complexite">'+complexite+'</div>');

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
        
            for ($i=0; $i<10; $i++){
                var bouton = sessionConfigCustom.boutons[$i];
                $('#ColonnePictosBoutons').append('<div class="ColonnePictos ColonnePictos'+bouton+'"></div>');
                $('#parametresConfig').append('<div id="bouton'+$i+'">'+bouton+'</div>');
                $('#ZonePopups').append('<div class="popup popupDroite Popup'+bouton+'"></div>');
        }
    }
    if (localStorage.getItem("ConfigCustom")===null){
        fonctionLectureConfig();
    }
    fonctionLectureConfigCustom();
    

    /* Requête fetch pour récupérer la BDD
    *********************************************************/
    function fonctionAccesBDD(){
        fetch('assets/bdd/BDDpictos.json')
            .then(response => response.json())
            .then(data => {
                BanquePictos = data;
                NbCategories = BanquePictos.categories.length;
            })
            .catch(error => console.error('Erreur lors du chargement du fichier BDDpictos.JSON :', error));
    }

    var BanquePictos;
    var NbCategories;
    fonctionAccesBDD();
    
    
    
    /* fonctions d'affichage des pictos
    *********************************************************/
    function fonctionAffichageColonne(categorie,largeur){
        
        //variables liées à la catégorie
        var colonne = $('.ColonnePictos'+categorie);
        var popup = $('.Popup'+categorie);
                
        // extraction de la bonne catégorie
        for (var i=0 ; i<NbCategories; i++){
            if (BanquePictos.categories[i].nom==categorie){
                var BanquePictosCategorie=BanquePictos.categories[i];
            }
        }
        var couleur = BanquePictosCategorie.couleur;

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

        //Remplissage du popup --> appel fonction
        fonctionRemplissagePopup(popup,BanquePictosCategorie,couleur);
    }
    

    function fonctionAffichageBouton(categorie){
        
        var colonne = $('#ColonnePictosBoutons');
        var popup = $('.Popup'+categorie);
                
        // extraction de la bonne catégorie
        for (var i=0 ; i<NbCategories; i++){
            if (BanquePictos['categories'][i]['nom']==categorie){
                var BanquePictosCategorie=BanquePictos['categories'][i];
            }
        }
        var couleur = BanquePictosCategorie['couleur'];

        //Ajout du bouton + pour la catégorie
        colonne.append('<div id="'+categorie+'" class="CarteCliquableCategorie CarteCliquable'+categorie+' CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot MotGras">'+categorie+'</p><img class="picto" src="assets/images/pictos/'+categorie+'.png"></div></div>');

        //Remplissage du popup --> appel fonction
        fonctionRemplissagePopup(popup,BanquePictosCategorie,couleur);
    }
    

    function fonctionRemplissagePopup(popup,BanquePictosCategorie,couleur){
        // comptage nb de pictos à afficher
        var NbPictos1 = BanquePictosCategorie.pictos1.length;
        var NbPictos2 = BanquePictosCategorie.pictos2.length;
        var NbPictos3 = BanquePictosCategorie.pictos3.length;
        
        if ($('#complexite').text()==1){var NbPictos = NbPictos1;}
        if ($('#complexite').text()==2){var NbPictos = NbPictos1+NbPictos2;}
        if ($('#complexite').text()==3){var NbPictos = NbPictos1+NbPictos2+NbPictos3;}
        // injection des pictos 1 dans le popup
        for (var i=0; i<NbPictos1; i++){
            var mot=BanquePictosCategorie['pictos1'][i];
            popup.append('<div id="'+mot+'" class="CarteCliquable CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot">'+mot+'</p><img class="picto" src="assets/images/pictos/'+mot+'.png"><audio src="assets/sons/'+mot+'.mp3" id="audio-'+mot+'"></audio></div></div>');
        }

        // injection des pictos 2 dans le popup
        if ($('#complexite').text()>1){
            for (var i=0; i<NbPictos2; i++){
                var mot=BanquePictosCategorie['pictos2'][i];
                popup.append('<div id="'+mot+'" class="CarteCliquable CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot">'+mot+'</p><img class="picto" src="assets/images/pictos/'+mot+'.png"><audio src="assets/sons/'+mot+'.mp3" id="audio-'+mot+'"></audio></div></div>');
            }    
        }

        // injection des pictos 3 dans le popup
        if ($('#complexite').text()>2){
            for (var i=0; i<NbPictos3; i++){
            var mot=BanquePictosCategorie.pictos3[i];
            popup.append('<div id="'+mot+'" class="CarteCliquable CartePicto Carte'+couleur+' colonne"><div class="colonne"><p class="Mot">'+mot+'</p><img class="picto" src="assets/images/pictos/'+mot+'.png"><audio src="assets/sons/'+mot+'.mp3" id="audio-'+mot+'"></audio></div></div>');
            }    
        }

        // injection du bouton retour <--
        popup.append('<div class="CarteCliquable colonne"><div class="colonne"><img class="pictoRetour" src="assets/images/interface/retour.png"></div></div>');
        
        //Ajustement de la largeur des popups
        popup.css('width',Math.ceil((NbPictos+1)/hauteur)*dimension+'vw'); 
    }


    /* Ajustement du CSS 
    *****************************************************/
        // création de la variable dimension selon le nb de colonnes à afficher :
        var dimension = 97/$('#nbColonnes').text();
        //console.log(dimension);

        // récupération du nb de pictos par colonne :
        var hauteur = $('#hauteurColonnes').text();

        //ajustement de la hauteur de colonne :
        $('.ColonnePictos').css('height',(hauteur*(dimension+0.5))+'vw');

        //Ajustement de la hauteur et largeur des popups
        $('.popup').css('height',(hauteur*(dimension+0.3))+'vw');
        //$('.popup').css('width',Math.ceil(NbPictos/hauteur)*dimension+'vw'); 

        // Ajustement des dimensions des cartes pictos :
        $('.CartePicto').css('width',(0.8*dimension)+'vw');
        $('.CartePicto').css('height',(0.8*dimension)+'vw');
            // --> non fonctionnel *******************************************//
 

    /* Appels 
    **************************************************/

    setTimeout(() =>{   //Ajout d'un timer pour attendre le chargement de l'appel ajax (sinon le mappage des cartes cliquables ne fonctionne pas)

        // affichage des colonnes --> appel fonctionAffichageColonne
        for ($i=0; $i<10; $i++){
            // vérification du remplissage de la colonne pour éviter traitement inutile (et bloquant pour la fonction suivante!)
            if ($('#categColonne'+$i).text() != ""){
                // Appel fonction avec lecture des catégories et largeurs sélectionnées, stockées dans le html (#parametresConfig)
                fonctionAffichageColonne($('#categColonne'+$i).text(),$('#largeurColonne'+$i).text());
            }      
        }

        // affichage des boutons --> appel fonctionAffichageBouton
        for ($i=0; $i<10; $i++){
            // vérification du remplissage de la colonne pour éviter traitement inutile
            if ($('#bouton'+$i).text() != ""){
                // Appel fonction avec lecture des catégories sélectionnées, stockées dans le html (#parametresConfig)
                fonctionAffichageBouton($('#bouton'+$i).text());
            }
        }

    },100)
    
});