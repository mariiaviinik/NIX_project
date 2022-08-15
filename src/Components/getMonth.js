const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July' ,'August', 'September', 'October', 'November', 'December'];

export const getMonthName = (date) => {
    return months[date.getMonth()];
}