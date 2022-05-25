function dateFormat(date){
    let newDate= date
    let transformedDate = newDate.split(' ')[0] 
    const time = date.split(' ')[1] 
    transformedDate = transformedDate.split('/')
    const year = transformedDate[transformedDate.length-1]
    const month = transformedDate[transformedDate.length-2]
    const day = transformedDate[0]
    newDate = [year, month, day].join("-")
    newDate = [newDate, time].join(" ") // date is in the format: YYYY-MMM-DDD HH:mm:ss
    const formattedDate = new Date(newDate);
    return formattedDate
}

module.exports = dateFormat