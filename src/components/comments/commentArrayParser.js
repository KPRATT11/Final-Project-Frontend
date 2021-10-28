const parseArray = (array, level = 0) => {
    return array.map(elem => {
        if (elem.replies.length > 0) {
            return [{
                content: elem.content,
                level: level}, 
                parseArray(elem.replies, level + 1)]
        }else{
            return {
                content: elem.content,
                level: level
            }
        }
    }).flat(5)
}

export default parseArray