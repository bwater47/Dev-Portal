// Export the format_date function which takes in a timestamp and returns a string with only the date
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
    }
}