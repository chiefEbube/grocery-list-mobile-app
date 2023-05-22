// import necessary functions from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


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

addBtn.addEventListener("click", function () {
    if (inputBtn.value) {
        let inputValue = inputBtn.value
        push(itemsInDb, inputValue) // push takes the input value and add it to the grocery items list
        clearInputField(inputBtn)
    }
})

// updating items in real time

onValue(itemsInDb, function (snapshot) {
    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendToList(currentItem)
        }
    }

    else{
        shoppingList.innerHTML = "Oops! There are no items here yet";

    }
})


function clearShoppingListEl() {
    shoppingList.innerHTML = ""
}

function clearInputField(inputField) {
    inputField.value = ""
}

function appendToList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newElement = document.createElement("li")
    newElement.textContent = itemValue

    newElement.addEventListener("dblclick", function () {
        let exactLocationOfItemInDB = ref(database, `grocery-items/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingList.append(newElement)
}






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