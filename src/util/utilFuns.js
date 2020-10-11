export const capitalize = (text) => {
    return text.replace(text[0], text[0].toUpperCase());   
}

export const getSlideName = (sprite) => {
    switch(sprite) {
        case 0:
            return "front_default"
        case 1:
            return "back_default"
        case 2:
            return "front_shiny"
        case 3:
            return "back_shiny"
        default: 
            return "front_default"
    }
}