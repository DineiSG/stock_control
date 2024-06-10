export const sortAlphabetically = (data, key) => {
    return data.sort((a, b) => a[key].localeCompare(b[key]));
};