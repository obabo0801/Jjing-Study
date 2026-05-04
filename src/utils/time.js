export function getDate() {
    return `${getYear()}-`
        + `${getMonth()}-`
        + `${getDay()}`;
}

export function getYear() {
    return new Date()
        .getFullYear();
}

export function getMonth() {
    return String(new Date()
        .getMonth() + 1)
        .padStart(2, '0');
}

export function getDay() {
    return String(new Date()
        .getDate())
        .padStart(2, '0');
}

export function getTime() {
    return new Date()
        .toTimeString()
        .split(' ')[0];
}