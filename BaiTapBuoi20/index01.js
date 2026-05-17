const numbers = [9, 8, 3, 5, 6, 2, 7, 9];

const getSecondMaxValue = (arr) => {
    let maxValue = null
    let secondMaxValue = null

    if (arr.length < 2)  return null

    maxValue = arr[0]

    for (const number of arr) {
        if (number > maxValue) {
            secondMaxValue = maxValue
            maxValue = number
        } else if (number > secondMaxValue && number !== maxValue) secondMaxValue = number
    }

    return secondMaxValue
}

console.log(getSecondMaxValue(numbers))

