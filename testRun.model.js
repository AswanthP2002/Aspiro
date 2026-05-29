const print = (r) => console.log('Result ', r)
const sum = (n1, n2, cb) => {
    const result = n1 + n2
    cb(result)
}

sum(10, 20, print)