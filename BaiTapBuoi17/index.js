function isEvenNumber(a) {
    return a % 2 === 0;
}
console.log(isEvenNumber(10))


function getElectricityBill(kwh) {
    let bill = 0;

    if (kwh <= 50) {
        bill = kwh * 1678;
    } else if (kwh <= 100) {
        bill = (50 * 1678) + ((kwh - 50) * 1734);
    } else if (kwh <= 200) {
        bill = (50 * 1678) + (50 * 1734) + ((kwh - 100) * 2014);
    } else if (kwh <= 300) {
        bill = (50 * 1678) + (50 * 1734) + (100 * 2014) + ((kwh - 200) * 2536);
    } else if (kwh <= 400) {
        bill = (50 * 1678) + (50 * 1734) + (100 * 2014) + (100 * 2536) + ((kwh - 300) * 2834);
    } else if (kwh > 400) {
        bill = (50 * 1678) + (50 * 1734) + (100 * 2014) + (100 * 2536) + (100 * 2834) + ((kwh - 400) * 2927);
    }
    return bill;
}
console.log(getElectricityBill(120));


function cleanName(name, keyword) {
    return name.trim().toLowerCase().includes(keyword.toLowerCase());
}
console.log(cleanName('   NGUYEN Van An   ', 'an'))