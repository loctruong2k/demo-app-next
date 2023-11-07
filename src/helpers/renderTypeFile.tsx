export const renderFileType = (name: string) => {
    if (name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png")) {
        return "/assets/file-type/picture.png"
    }
    if (name.endsWith(".pdf")) {
        return "/assets/file-type/pdf.png"
    }
    if (name.endsWith(".json")) {
        return "/assets/file-type/json.png"
    }
    if (name.endsWith(".rar")) {
        return "/assets/file-type/rar.png"
    }
    if (name.endsWith(".zip")) {
        return "/assets/file-type/zip.png"
    }
    return "/assets/file-type/file.png"
}

export const getFileType = (name: string) =>{
    if (name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png")) {
        return "image"
    }
    return "file"
}