// This file is used to format the date for the post and comment timestamps
module.exports = {
    // Format the date as MM/DD/YYYY by passing a variable that creates a new Date object
    format_date: () => {
        const currentDate = new Date();
        return `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    }
}