function formatDate(dateString) {
    let pastDate = new Date(dateString)
    let currentDate = new Date()
    let formattedDate = (currentDate - pastDate) / 1000 / 60
    if (formattedDate < 1){
        return '< 1 min ago'
    }
    else if (formattedDate < 60) {
        return (`${Math.floor(formattedDate)} mins ago`)
    }
    else if (formattedDate < (60 * 24)){
        return (`${Math.floor(formattedDate / 60)} hours ago`)
    }else {
        return (`${Math.floor(formattedDate / 60 / 24)} days ago`)
    }
}

export default formatDate