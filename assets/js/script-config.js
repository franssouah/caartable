$(document).ready(function() {  /* chargement du DOM */
    
    /*Requête AJAX pour récupérer la liste des catégories
    *********************************************************/
    var NbCategories;
    var categories=[];

    function fonctionLectureCategories(){
        // fectch pour récupérer les données de la BDD JSON
        fetch('../assets/bdd/BDDpictos.json')
        .then(response => response.json())
        .then(BanquePictos => {
            // nombre de catégories :
            NbCategories = BanquePictos.categories.length;
            
            // titres des catégories :
            for ($i=0; $i<NbCategories; $i++){
                categories[$i]=BanquePictos.categories[$i].nom;
            }
        })
        .catch(error => console.error('Erreur lors du chargement du fichier BDDpictos.JSON :', error));
   }



    /* Fonctions 
    *********************************************************/
    
    function fonctionEcritureConfig(){

        /* Accès au fichier config.json*/
        fetch('../assets/bdd/config.json')
            .then(response => response.json())
            .then(config => {
                // Modifications
                    //Nb de colonnes :
                    config.options.nbColonnes = $('#NbColonnesSelect').val();

                    //Nb de pictos par colonne :
                    config.options.hauteurColonnes = $('#NbPictosSelect').val();

                    // complexité :
                    config.options.complexite = $('#PictosComplex').val();

                    // catégories sélectionnées dans les colonnes :
                    for ($i=0 ; $i<10; $i++){
                        config.colonnes[$i]=$("#Colonne"+$i+"Select").val();
                    }
                    // largeur des colonnes :
                    for ($i=0 ; $i<10; $i++){
                        config.largeurColonnes[$i]=$("#Colonne"+$i+"Largeur").val();
                    }
                    // catégories sélectionnées dans les boutons :
                    for ($i=0 ; $i<10 ; $i++){
                        config.boutons[$i]=$("#Bouton"+$i+"Select").val();
                    }

                // Enregistrement des données sous forme de chaîne JSON, dans le localstorage (source : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#utiliser_json.stringify_avec_localstorage)
                localStorage.setItem("ConfigCustom", JSON.stringify(config));
                
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

            // Complexité :
                // affichage de la valeur sauvegardée :
                $('#PictosComplex').append('<option value="'+sessionConfigCustom.options.complexite+'" selected>'+sessionConfigCustom.options.complexite+'</option>');
                // Affichage des autres options :
                for ($i=1; $i<4; $i++){
                    if ($i!=sessionConfigCustom.options.complexite){
                        $('#PictosComplex').append('<option value="'+$i+'">'+$i+'</option>');
                    }
                }

            //Catégories sélectionnées :
            for ($i=0; $i<10; $i++){
                //Affichage des valeurs sauvegardées :
                $('#Colonne'+$i+'Select').append('<option value="'+sessionConfigCustom.colonnes[$i]+'" selected>'+sessionConfigCustom.colonnes[$i]+'</option>');
                // Affichage des autres options :
                for ($j=0; $j<NbCategories; $j++){
                    $('#Colonne'+$i+'Select').append('<option value="'+categories[$j]+'">'+categories[$j]+'</option>');
                }
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
            for ($i=0; $i<10; $i++){
                //Affichage des valeurs sauvegardées :
                $('#Bouton'+$i+'Select').append('<option value="'+sessionConfigCustom.boutons[$i]+'" selected>'+sessionConfigCustom.boutons[$i]+'</option>');
                // Affichage des autres options :
                for ($j=0; $j<NbCategories; $j++){
                    $('#Bouton'+$i+'Select').append('<option value="'+categories[$j]+'">'+categories[$j]+'</option>');
                }
            }
    }

    /* Sélection des zones */
    $BoutonSauvegarder=$(".ConfigBoutonEnregistrer");
    
    /* Injection du HTML pour sélectionner les colonnes */
        $ZoneColonnes=$('#selectionColonnes');
        for ($i=0 ; $i<10; $i++){
            $ZoneColonnes.append('<div class="selectionColonne"><label for="Colonne'+$i+'Select">Colonne '+($i+1)+' :</label><select id="Colonne'+$i+'Select"><option value=""></option></select><label for="Colonne'+$i+'Largeur">largeur :</label><select id="Colonne'+$i+'Largeur"></select></div>');
        }

    /* Injection du HTML pour sélectionner les boutons */
    $ZoneBoutons=$('#selectionBoutons');
    for ($i=0 ; $i<10 ; $i++){
        $ZoneBoutons.append('<div class="colonne selectionBouton"><label for="Bouton'+$i+'Select">Bouton '+($i+1)+' :</label><select id="Bouton'+$i+'Select"><option value=""></option></select></div>');
    }


    /* Fonctions */
    fonctionLectureCategories();

    setTimeout(() =>{
        console.log('Nb catég = '+NbCategories);
        console.log(categories[15]);
        fonctionLectureConfigCustom();
    },100)

    

    $BoutonSauvegarder.on("click", function(){
        // fonction écriture
        fonctionEcritureConfig();
        setTimeout(() =>{
            document.location.href="../index.html";
        },200)
        
    })

});