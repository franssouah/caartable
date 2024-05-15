$(document).ready(function() {  /* chargement du DOM */

// récupération de la BDD (nécessaire pour le fonctionnement du boutonRecherche)
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


setTimeout(() =>{   //Ajout d'un timer pour attendre le chargement de l'appel ajax (sinon le mappage des carte cliquables ne fonctionne pas)

    /* sélection des boutons
    ***************************************************/
    const BoutonParler=$(".BoutonParler");
    const BoutonParlerStop=$(".BoutonParlerStop");
    const BoutonEffacer=$(".BoutonEffacer");
    const BoutonEffacerTout=$(".BoutonEffacerTout");
    const BoutonRecherche=$(".BoutonRecherche");

    /* sélection des zones
    ***************************************************/
    const ZoneAffichagePictos=$(".ZoneAffichagePictos");

    /* Au clic sur un picto
    ***************************************************/
    $(".CarteCliquable").on("click", function(){
        //récupération id et contenu carte cliquée
            var idClick=this.getAttribute('id');
            var CarteCliquee = $('#'+idClick);
            const ContenuCarte = CarteCliquee[0].innerHTML;
            //console.log(ContenuCarte);

        //affichage dans la zoneAffichagePictos
            var NbCartesChoisies = ZoneAffichagePictos.children().length;
            if (NbCartesChoisies<10){
                ZoneAffichagePictos.append(ContenuCarte);
                console.log(ZoneAffichagePictos.children().last());
                //ZoneAffichagePictos.children().last().addClass('PictoSelect'+NbCartesChoisies);
            }
        
        //lecture fichier audio
            $("#audio-"+idClick)[0].play();
    })

    /* Suppression d'un picto sélectionné :
    *****************************************************/
    /*for($i=0; $i<10; $i++){
        $('.PictoSelect'+$i).on("click", function(){
            this.remove();
        })
    }*/
    //--> ne fonctionne pas : l'event ne peut pas se déclencher car la div n'existait pas au chargement de la page...


    /* Au clic sur BoutonEffacer
    ***************************************************/
    BoutonEffacer.on("click", function(){
        ZoneAffichagePictos.children().last().remove();
    })

    BoutonEffacerTout.on("click", function(){
        ZoneAffichagePictos.html('');
    })

    /* Au clic sur BoutonParler
    ***************************************************/
    BoutonParler.on("click", function(){
        // définition de la longueur de la zone affichage
        var NbPictos=ZoneAffichagePictos.children().length;

        // compilation des audios sélectionnés dans un tableau
        var audios=[];
        for ($i=0; $i<NbPictos; $i++){
            var IdAudioPictoI=ZoneAffichagePictos.children()[$i].lastElementChild.getAttribute('id');
            audios[$i]=$("#"+IdAudioPictoI)[0];
        }

        // Ajout/retrait de classes pour remplacer le boutonParler par Stop
        BoutonParler.addClass('cache');
        BoutonParlerStop.removeClass('cache');

        // fonction gérant la lecture audio et l'arrêt
        function fonctionLectureAudios($i){
            // utilisation d'une condition if car la boucle for ne peut contenir de setTimeOut (synchrone VS asynchrone)
            if($i<NbPictos){
                audios[$i].play();
                $i++;
                //condition d'arrêt :
                BoutonParlerStop.on("click", function(){
                    $i=99;
                })
                //Timer pour passer au suivant (basé sur la durée de l'audio) :
                var audioSuivant = function(){
                    fonctionLectureAudios($i);  
                };
                setTimeout(audioSuivant, ((audios[$i-1].duration)*1000+100));
            }else{
                BoutonParler.removeClass('cache');
                BoutonParlerStop.addClass('cache');
            }
        }
        
        fonctionLectureAudios(0);
    })

    /* Au clic sur le BoutonRecherche 
    **************************************************/
    function fonctionRecherche(PictosCateg, texteRecherche){
        // paramétrage du chemin des sons
        var cheminSons;
        if ($('#voix').text()=== "fille"){
            cheminSons = "sonsF";
        }
        if ($('#voix').text()=== "garçon"){
            cheminSons = "sonsG";
        }
        // parcours des catégories
        var NbPictosCateg = PictosCateg.length;
        for ($j=0 ; $j<NbPictosCateg; $j++){
            if (PictosCateg[$j] === texteRecherche){
                // affichage dans la ZoneAffichagePictos
                    var NbCartesChoisies = ZoneAffichagePictos.children().length;
                    if (NbCartesChoisies<10){
                        ZoneAffichagePictos.append('<div class="colonne"><p class="Mot">'+texteRecherche+'</p><img class="picto" src="assets/images/pictos/'+texteRecherche+'.png"><audio id="audio-'+texteRecherche+'" src="assets/'+cheminSons+'/'+texteRecherche+'.mp3"></audio></div>');
                    }
                //lecture fichier audio
                    $("#audio-"+texteRecherche)[0].play();
                // fin de la recherche
                    $i=999;           
            }
        }
    }
    
    BoutonRecherche.on("click", function(){
        // récupération du texte tapé
            var texteRecherche = $('#recherche').val();
        // recherche dans la BDD
            // parcours catégories
            for ($i=0 ; $i<NbCategories; $i++){
                fonctionRecherche(BanquePictos.categories[$i].pictos1, texteRecherche);
                fonctionRecherche(BanquePictos.categories[$i].pictos2, texteRecherche);
                fonctionRecherche(BanquePictos.categories[$i].pictos3, texteRecherche);
            }   
    })

    
    /* Ouverture des popups au clic sur boutons Catégories
    **************************************************/

    //fonction popup catégorie
    function PopupCategorie(categorie) {
        // ajout d'une condition permettant de refermer un popup ouvert en recliquant sur son bouton +
        if ($("."+categorie).hasClass('visible') === false){
            $(".popup").removeClass('visible');
            $("."+categorie).addClass('visible');
        }else{
            $(".popup").removeClass('visible');
        }
    }

    function FermerPopup(categorie){
        $(categorie).removeClass('visible');
    }

    // Popups
    $(".CarteCliquableCategorie").on("click", function(){
        var idCategorie = this.getAttribute('id');
        PopupCategorie("Popup"+idCategorie);
    })
    $(".popup").on("click", function(){
        FermerPopup(this);
    })


},1000)
});