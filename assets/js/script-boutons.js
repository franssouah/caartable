$(document).ready(function() {  /* chargement du DOM */

setTimeout(() =>{   //Ajout d'un timer pour attendre le chargement de l'appel ajax (sinon le mappage des carte cliquables ne fonctionne pas)

    /* sélection des boutons
    ***************************************************/
    const BoutonParler=$(".BoutonParler");
    const BoutonEffacer=$(".BoutonEffacer");
    const BoutonEffacerTout=$(".BoutonEffacerTout");

    /* sélection des zones
    ***************************************************/
    const ZoneAffichagePictos=$(".ZoneAffichagePictos");

    /* Au clic sur un picto
    ***************************************************/
    $(".CarteCliquable").on("click", function(){
        //récupération id et contenu carte cliquée
            var idClick=this.getAttribute('id');
            var CarteCliquee = $('#'+idClick);
            var ContenuCarte = CarteCliquee[0].innerHTML;


        //affichage dans la zoneAffichagePictos
            var NbCartesChoisies = ZoneAffichagePictos.children().length;
            if (NbCartesChoisies<10){
                ZoneAffichagePictos.append(ContenuCarte);
            }
        
        //lecture fichier audio
            $("#audio-"+idClick)[0].play();
    })


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
        //définition de la longueur de la zone affichage
        var NbPictos=ZoneAffichagePictos.children().length;

        // source : https://forum.alsacreations.com/topic-2-88721-1-Lire-plusisieurs-mp3-en-html-css-ou-js.html
        var audios=[];
        for ($i=0; $i<NbPictos; $i++){
            var IdAudioPictoI=ZoneAffichagePictos.children()[$i].lastElementChild.getAttribute('id');
            audios[$i]=$("#"+IdAudioPictoI)[0];
        }
        console.log(audios[0]);
        audios[0].play();
        setTimeout(() =>{
            audios[1].play();
            setTimeout(() =>{
                audios[2].play();
                setTimeout(() =>{
                    audios[3].play();
                    setTimeout(() =>{
                        audios[4].play();
                        setTimeout(() =>{
                            audios[5].play();
                            setTimeout(() =>{
                                audios[6].play();
                                setTimeout(() =>{
                                    audios[7].play();
                                    setTimeout(() =>{
                                        audios[8].play();
                                        setTimeout(() =>{
                                            audios[9].play();
                                        },1000)
                                    },1000)
                                },1000)
                            },1000)
                        },1000)
                    },1000)
                },1000)
            },1000)
        },1000)
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