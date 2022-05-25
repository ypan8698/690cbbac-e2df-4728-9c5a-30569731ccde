function dateFormat(date){
    let newDate = date //input date is in the format as 14/12/2020 10:31:00
    let transformedDate = newDate.split(' ')[0] // extract date 14/12/2020
    const time = date.split(' ')[1] //  extract time 10:31:00
    transformedDate = transformedDate.split('/') // split date by '/'
    const year = transformedDate[transformedDate.length-1]
    const month = transformedDate[transformedDate.length-2]
    const day = transformedDate[0]
    newDate = [year, month, day].join("-") // rejoin year, month, day by '-' and reformated as 2020-12-14
    newDate = [newDate, time].join(" ") // join date and time date and reformated as: YYYY-MMM-DDD HH:mm:ss
    const formattedDate = new Date(newDate); // date format
    return formattedDate
}

module.exports = dateFormat