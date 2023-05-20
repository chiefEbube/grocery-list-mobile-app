function generateSentence(desc, arr){
    let str = `The ${arr.length} ${desc} are `
    for (i = 0; i < arr.length - 1; i++){
        str += `${arr[i]}, `
    }
    str += `${arr[i]}.`
    return str
}

const myNames = ["Anyanwu"]
const describe = "names I have"
let say = generateSentence(describe, myNames)

console.log(say)