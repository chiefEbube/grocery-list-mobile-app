// import necessary functions from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const addBtn = document.querySelector("#add-btn")
const inputBtn = document.querySelector("#input-field")
const shoppingList = document.querySelector("#shopping-list")

// databaseURL from firebase realtime database
const appSettings = {
    databaseURL: "https://realtime-database-81329-default-rtdb.firebaseio.com/"
}

// initialize our app to firebase
const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDb = ref(database, "grocery-items") // ref needs to store our items to the firebase database

function clearInputField(inputField) {
    inputField.value = ""
}

function appendToList(listELement, listItem) {
    listELement.innerHTML += `
            <li>${listItem}</li>
        `
}

addBtn.addEventListener("click", function () {
    if (inputBtn.value) {
        let inputValue = inputBtn.value
        push(itemsInDb, inputValue) // push takes the input value and add it to the grocery items list

        appendToList(shoppingList, inputValue)
        clearInputField(inputBtn)
    }
})








// function generateSentence(desc, arr){
//     let str = `The ${arr.length} ${desc} are `
//     for (i = 0; i < arr.length - 1; i++){
//         str += `${arr[i]}, `
//     }
//     str += `${arr[i]}.`
//     return str
// }

// const myNames = ["Anyanwu"]
// const describe = "names I have"
// let say = generateSentence(describe, myNames)

// console.log(say)