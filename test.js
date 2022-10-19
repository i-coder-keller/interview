const requests = []
let pendings = []
const max = 5
const setRequest = () => {
    if (pendings.length < max) {
        for (let index = 0; index < max - pendings.length; index++) {
            const rs = requests.pop()
            if (rs) {
                setPendings(rs)
            }
        }
    }
}
const setPendings = (rs) => {
    const obj = {
        result: false,
        handle: rs,
        runing: false
    }
    pendings.push(obj)
    pendings.forEach(item => {
        if (!item.runing && !item.result) {
            item.runing = true
            item.handle().then(() => {
                item.result = true
                pendings = pendings.filter(c => !c.result)
                setRequest()
            })
        }
    })
}
const mockRequest = (index) => () => new Promise((resolve) => {
    setTimeout(() => {
        console.log(index)
        resolve()
    }, 1000)
})

for (let i = 0; i < 10; i++) {
    requests.push(mockRequest(i))
    setRequest()
}

setTimeout(() => {
    for (let i = 10; i < 20; i++) {
        requests.push(mockRequest(i))
        setRequest()
    }
}, 5000)