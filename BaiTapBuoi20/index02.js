const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

// Step 1 & 2: [15, 2, 8, 10, 11, 5, 9]
// Step 3: Quick Sort -> [2, 5, 8, 9, 10, 11, 15]


const mergedClass = [...classA, ...classB];

const uniqueMap = {}
const uniqueArr = []

for (let number of mergedClass) {
    if (!uniqueMap[number]) {
        uniqueMap[number] = true
        uniqueArr.push(number)
    }
}

function quickSort(arr) {
    if (arr.length <= 1) return arr

    const pivot = arr[arr.length - 1]
    const left = []
    const right = []

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)]
}

const sortedArr = quickSort(uniqueArr)
console.log(sortedArr)