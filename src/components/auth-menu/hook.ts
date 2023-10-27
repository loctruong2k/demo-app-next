export const onOpen = () => {
    const element = document.getElementById("auth-menu")
    if(element){
        element.classList.remove("hidden")
    }
}

export const onClose = () => {
    const element = document.getElementById("auth-menu")
    if(element){
        element.classList.remove("flex")
        element.classList.add("hidden")
    }
}