/**
 * Fonction d'affichage du popup(fenêtre contextuelle)
 */
function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.add("active")
}

/**
 * Fonction pour cacher la popup
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.remove("active")
}

/**
 * Fonction d'affichage du popup lorsqu'on clique sur le bouton Partager
 * Fonction pour cacher le Popup lorsqu'on clique en dehors du Popup
 */
function initAddEventListenerPopup() {
    let btnPartage = document.querySelector(".zonePartage button")
    let popupBackground = document.querySelector(".popupBackground")

    btnPartage.addEventListener("click", () => {
        afficherPopup()
    })

    /popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground ) { // Pourquoi event.target === popupBackground
            cacherPopup()                        // Le popupBackground concerne uniquement la div qui contient la popup et non elle même
                                                 // Donc Lorsqu'on clique sur la popup même, elle n'est pas caché mais lorsqu'on clique en dehors de la popup
                                                 // C'est-à-dire dans la div popupBackground, la popup est caché
        }
    })
}