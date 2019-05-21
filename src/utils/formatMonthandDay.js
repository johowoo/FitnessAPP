export const formatMonthandDay = num => {
    if (num < 10) {
        return `0${num}`;
    }
    return num;
};
export const formatYYYYMMDDFromDate = date => {
    return `${date.getFullYear()}${formatMonthandDay(
        date.getMonth() + 1
    )}${formatMonthandDay(date.getDate())}`
};
export const formatYYYY_MM_DDFromDate = date => {
    return `${date.getFullYear()}-${formatMonthandDay(
        date.getMonth() + 1
    )}-${formatMonthandDay(date.getDate())}`
};

export const formatYYYY_MM_DD_HHMMFromParams = date => {
    return `${date.year.toString()}-${formatMonthandDay(date.month).toString()}-${formatMonthandDay(date.day).toString()} ${date.hour < 10 ? '0' + date.hour : date.hour}:${date.minute < 10 ? '0' + date.minute : date.minute}`
};
