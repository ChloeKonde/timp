let bubbleSort = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
};

let insertionSort = (arr) => {
    let length = arr.length;
    for (let i = 1; i < length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
};

let merge = (left, right) => {
    let result = [],
        leftLen = left.length,
        rightLen = right.length,
        l = 0,
        r = 0;
    while (l < leftLen && r < rightLen) {
        if (left[l] < right[r]) {
            result.push(left[l]);
            l++;
        } else {
            result.push(right[r]);
            r++;
        }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
};

let mergeSort = (arr) => {
    let len = arr.length;
    if (len < 2) {
        return arr;
    }
    let mid = Math.floor(len / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
};

let selectionSort = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
}

const firstArray = Array.from({length: 1000}, () => Math.floor(Math.random() * 593));
const secondArray = firstArray;
const thirdArray = firstArray;
const fourthArray = firstArray;


const usedBeforeBubble = process.memoryUsage().heapUsed / 1024 / 1024;

console.time("Bubble sort time")
let b = bubbleSort(firstArray)
console.timeEnd("Bubble sort time")

const usedAfterBubble = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Bubble sort uses approximately ${usedAfterBubble - usedBeforeBubble} MB`);


console.time("Insertion sort time")
let a = insertionSort(secondArray)
console.timeEnd("Insertion sort time")

const usedAfterInsertion = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Insertion sort uses approximately ${usedAfterInsertion - usedAfterBubble} MB`);


console.time("Merge sort time")
let merges = mergeSort(thirdArray)
console.timeEnd("Merge sort time")

const usedAfterMerge = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Merge sort uses approximately ${usedAfterMerge - usedAfterInsertion} MB`);


console.time("Selection sort time")
let select = selectionSort(fourthArray)
console.timeEnd("Selection sort time")

const usedAfterSelection = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Selection sort uses approximately ${usedAfterSelection - usedAfterMerge} MB`);