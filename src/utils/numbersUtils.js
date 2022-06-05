// Convert 10000 to 10,000
const formatNumber = (value) => {
    if (typeof value == 'number') {
        value = value.toString();
    }
    if (value != null) {
        let outPut = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return outPut
    }
}

// Convert Persion or arabic number to english number
const toEnglishDigits = number => number.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))


export { formatNumber, toEnglishDigits }