
/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

/**
 * Fonction qui s'ocuupe de donner les propositions à saisir aux joueurs
 * @param {string} proposition 
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Fonction de partage de nos stats à un ami par e-mail
 * @param {string} nom 
 * @param {string} email 
 * @param {string} score 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Fonction de validation du nom
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court.")
    }
}

/**
 * Fonction de valdation de l'email
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'e-mail n'est pas valide.")
    } 
}

/**
 * Fonction qui affiche un message d'erreur dans la popup en fonction de la nature de l'erreur
 * @param {string} message 
 */
function afficherMessageErreur(message) {
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        popup.append(spanErreurMessage)
    }

    spanErreurMessage.innerText = message
}

/**
 * Fonction de gestion du formulaire de la popup
 * @param {number} score 
 */
function gererFormulaire(score) {
    try {
    let nom = document.getElementById("nom").value
    validerNom(nom)

    let email = document.getElementById("email").value
    validerEmail(email)
    afficherMessageErreur("")
    afficherEmail(nom, email, score)
    } catch(erreur) {
        afficherMessageErreur(erreur.message)
    }
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listePropositions = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")
    afficherProposition(listePropositions[i])
    btnValiderMot.addEventListener("click", () => {
        console.log(inputEcriture.value)
        if (inputEcriture.value === listePropositions[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listePropositions[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listePropositions[i])
        }
        
    })

    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let j=0; j < listeBtnRadio.length; j++) {
        listeBtnRadio[j].addEventListener("change", (event) => {
            console.log(event.target.value)
            if (event.target.value === "Mots") {
                listePropositions = listeMots
            } else {
                listePropositions = listePhrases
            }
            afficherProposition(listePropositions[i])
        })
    }

    let form = document.querySelector("form")
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            gererFormulaire(score)
        })

    afficherResultat(score, i)
}