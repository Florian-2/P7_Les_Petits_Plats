export function formatStr(str: string) {
    let formatStr = str.toLowerCase().trim();
    formatStr = formatStr.replace(/[éèêë]/g, 'e');
    formatStr = formatStr.replace(/[àâ]/g, 'a');
    formatStr = formatStr.replace(/[ùû]/g, 'u');
    formatStr = formatStr.replace(/[îï]/g, 'i');
    formatStr = formatStr.replace(/[ç]/g, 'c');

    return formatStr;
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length).toLowerCase().concat('s');
}
