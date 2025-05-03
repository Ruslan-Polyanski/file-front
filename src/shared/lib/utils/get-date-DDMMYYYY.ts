export const getDateDDMMYYYY = (date: Date) => {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};
