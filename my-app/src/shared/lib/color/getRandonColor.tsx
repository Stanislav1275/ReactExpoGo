export function getRandomColor() {
    // Генерируем случайное число в диапазоне от 0 до 16777215 (FFFFFF в шестнадцатеричном формате)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // Дополняем строку нулями слева, если она короче 6 символов
    return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
}
