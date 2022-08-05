const pathImg = (path, size = '500') => {
    if(path){
        return `https://image.tmdb.org/t/p/w${size}${path}`
    }

}

export default pathImg;