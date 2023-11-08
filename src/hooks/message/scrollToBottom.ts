"use client"
export const scrollToBottom = (behavior?: ScrollBehavior) => {
    const element = document.getElementById("end-list-message")
    if (element) {
        element.scrollIntoView({ behavior: behavior || "smooth" })
    }
}