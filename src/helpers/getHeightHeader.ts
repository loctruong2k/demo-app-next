"use client"
export const getHeightHeader = () => {
    const element = document.getElementById("header-app")
    if (element) {
        return element.offsetHeight
    }
    return 56
}