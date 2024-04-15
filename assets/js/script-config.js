$(document).ready(function() {  /* chargement du DOM */
    
    /*Requête AJAX pour récupérer la liste des catégories
    *********************************************************/
   // fectch pour récupérer les données de la BDD JSON
   fetch('../assets/bdd/BDDpictos.json')
   .then(response => response.json())
   .then(BanquePictos => {
        // enregistrement du nombre de catégories dans le HTML (#parametresConfig)
       var NbCategories = BanquePictos.categories.length;
       $('#parametresConfig').append('<div id="NbCategories">'+NbCategories+'</div>');
       // enregistrement des titres des catégories dans le HTML (#parametresConfig)
       for ($i=0; $i<NbCategories; $i++){
        //console.log(BanquePictos.categories[$i].nom);
        $('#parametresConfig').append('<div id="categorie'+$i+'">'+BanquePictos.categories[$i].nom+'</div>');
       }
    })
    .catch(error => console.error('Erreur lors du chargement du fichier BDDpictos.JSON :', error));



    /* Fonctions 
    *********************************************************/
    function fonctionLectureConfig(){
        if (localStorage.getItem("ConfigCustom")===null){
            
            var requeteConfig=new XMLHttpRequest();
            requeteConfig.open('GET', '../assets/bdd/config.json', true);
            requeteConfig.send();
            requeteConfig.onload = function(){
            if (requeteConfig.status === 200){
                var FichierConfig=JSON.parse(requeteConfig.response);
                // Enregistrement des données sous forme de chaîne JSON, dans le localstorage
                localStorage.setItem("ConfigCustom", JSON.stringify(FichierConfig));
            }
        }
        }
    }

    function fonctionEcritureConfig(){

        /* Solution proposée par chatgpt : */
        fetch('../assets/bdd/config.json')
            .then(response => response.json())
            .then(data => {
                // Modifications
                    //Nb de colonnes :
                    data.options.nbColonnes = $('#NbColonnesSelect').val();
                    //Nb de pictos par colonne :
                    data.options.hauteurColonnes = $('#NbPictosSelect').val();
                    // catégories sélectionnées dans les colonnes :
                    for ($i=0 ; $i<10; $i++){
                        data.colonnes[$i]=$("#Colonne"+$i+"Select").val();
                    }
                    // largeur des colonnes :
                    for ($i=0 ; $i<10; $i++){
                        data.largeurColonnes[$i]=$("#Colonne"+$i+"Largeur").val();
                    }
                    // catégories sélectionnées dans les boutons :
                    for ($i=0 ; $i<5 ; $i++){
                        data.boutons[$i]=$("#Bouton"+$i+"Select").val();
                    }

                // Enregistrement des données sous forme de chaîne JSON, dans le localstorage (source : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#utiliser_json.stringify_avec_localstorage)
                localStorage.setItem("ConfigCustom", JSON.stringify(data));
                
            })
            .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));

    }

    function fonctionLectureConfigCustom(){
        var sessionConfigCustom = JSON.parse(localStorage.getItem("ConfigCustom"));
        console.log(sessionConfigCustom);
        // Affichage des valeurs sauvegardées :
            //Nb de colonnes :
                // affichage de la valeur sauvegardée :
                $('#NbColonnesSelect').append('<option value="'+sessionConfigCustom.options.nbColonnes+'" selected>'+sessionConfigCustom.options.nbColonnes+'</option>');
                // Affichage des autres options :
                for ($i=8; $i<15; $i++){
                    if ($i!=sessionConfigCustom.options.nbColonnes){
                        $('#NbColonnesSelect').append('<option value="'+$i+'">'+$i+'</option>');
                    }
                }

            //Nb pictos/col :
                // affichage de la valeur sauvegardée :
                $('#NbPictosSelect').append('<option value="'+sessionConfigCustom.options.hauteurColonnes+'" selected>'+sessionConfigCustom.options.hauteurColonnes+'</option>');
                // Affichage des autres options :
                for ($i=3; $i<9; $i++){
                    if ($i!=sessionConfigCustom.options.hauteurColonnes){
                        $('#NbPictosSelect').append('<option value="'+$i+'">'+$i+'</option>');
                    }
                }

            //Catégories sélectionnées :
            for ($i=0; $i<10; $i++){
                //Affichage des valeurs sauvegardées :
                $('#Colonne'+$i+'Select').append('<option value="'+sessionConfigCustom.colonnes[$i]+'" selected>'+sessionConfigCustom.colonnes[$i]+'</option>');
                // Affichage des autres options :
                    /************************************A creuser plus tard ! ********/
            }

            // Taille des colonnes :
            for ($i=0; $i<10; $i++){
                // affichage de la valeur sauvegardée :
                $('#Colonne'+$i+'Largeur').append('<option value="'+sessionConfigCustom.largeurColonnes[$i]+'" selected>'+sessionConfigCustom.largeurColonnes[$i]+'</option>');
                // Affichage des autres options :
                for ($j=1; $j<4; $j++){
                    if ($j!=sessionConfigCustom.largeurColonnes[$i]){
                        $('#Colonne'+$i+'Largeur').append('<option value="'+$j+'">'+$j+'</option>');
                    }
                }
            }

            // Boutons sélectionnés :
            for ($i=0; $i<5; $i++){
                //Affichage des valeurs sauvegardées :
                $('#Bouton'+$i+'Select').append('<option value="'+sessionConfigCustom.boutons[$i]+'" selected>'+sessionConfigCustom.boutons[$i]+'</option>');
            }
                

            

    }

    /* Sélection des zones */
    $BoutonSauvegarder=$(".ConfigBoutonEnregistrer");
    
    /* Injection du HTML pour sélectionner les colonnes */
        $ZoneColonnes=$('#selectionColonnes');
        for ($i=0 ; $i<10; $i++){
            $ZoneColonnes.append('<div class="selectionColonne"><label for="Colonne'+$i+'Select">Colonne '+($i+1)+' :</label><select id="Colonne'+$i+'Select"><option value="Phrases">Phrases</option><option value="Personnes">Personnes</option><option value="Actions">Actions</option><option value="Questions">Questions</option><option value="Aliments">Aliments</option><option value="Objets">Objets</option><option value="Decrire">Decrire</option><option value="Maths">Maths</option><option value="Lieux">Lieux</option><option value="Couleurs">Couleurs</option><option value="Moments">Moments</option><option value="Animaux">Animaux</option><option value="Le_corps">Le_corps</option><option value="Habits">Habits</option><option value="Jouets">Jouets</option><option value="Vehicules">Vehicules</option><option value="Mots">Mots</option><option value=""></option></select><label for="Colonne'+$i+'Largeur">largeur :</label><select id="Colonne'+$i+'Largeur"></select></div>');
        }

    /* Injection du HTML pour sélectionner les boutons */
    $ZoneBoutons=$('#selectionBoutons');
    for ($i=0 ; $i<5 ; $i++){
        $ZoneBoutons.append('<div class="colonne selectionBouton"><label for="Bouton'+$i+'Select">Bouton '+($i+1)+' :</label><select id="Bouton'+$i+'Select"><option value="Phrases">Phrases</option><option value="Personnes">Personnes</option><option value="Actions">Actions</option><option value="Questions">Questions</option><option value="Aliments">Aliments</option><option value="Objets">Objets</option><option value="Decrire">Decrire</option><option value="Maths">Maths</option><option value="Lieux">Lieux</option><option value="Couleurs">Couleurs</option><option value="Moments">Moments</option><option value="Animaux">Animaux</option><option value="Le_corps">Le_corps</option><option value="Habits">Habits</option><option value="Jouets">Jouets</option><option value="Vehicules">Vehicules</option><option value="Mots">Mots</option><option value=""></option></select></div>');
    }


    /* Fonctions */
    fonctionLectureConfig();
    fonctionLectureConfigCustom();

    $BoutonSauvegarder.on("click", function(){
        // fonction écriture
        fonctionEcritureConfig();
        setTimeout(() =>{
            document.location.href="../index.html";
        },200)
        
    })

});