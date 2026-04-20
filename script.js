 // Exercise 1.4 - Student grade analyser

const scores = [42, 78, 55, 91, 63, 88, 34, 70, 95, 60];

// 1
console.log(scores.length);

// 2
const pass = scores.filter(s => s >= 70);
console.log(pass);

// 3
const fail = scores.filter(s => s < 70);
console.log(fail);

// 4
const scaled = scores.map(s => Math.round(s * 1.05));
console.log(scaled);

// 5
const firstAbove90 = scores.find(s => s > 90);
console.log(firstAbove90);

// Bonus
let sum = 0;

for (let i = 0; i < scores.length; i++) {
  sum = sum + scores[i];
}

let average = sum / scores.length;
console.log(average);

// Exercise 2.4 - Library catalogue

const library = [
  { title: "Harry Potter", author: "J.K. Rowling", year: 1997, available: true },
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, available: true },
  { title: "1984", author: "George Orwell", year: 1949, available: false },
  { title: "Clean Code", author: "Robert Martin", year: 2008, available: true }
];

// 1
console.log(library[0].title);

// 2
const availableBooks = library.filter(b => b.available);
console.log(availableBooks);

// 3
const booksList = library.map(b => b.title + " by " + b.author + " (" + b.year + ")");
console.log(booksList);

// 4
library.push({
  title: "The Alchemist",
  author: "Paulo Coelho",
  year: 1988,
  available: true
});
console.log(library);

// 5
const findBook = library.find(b => b.title === "1984");
console.log(findBook);

// Bonus
library[1].summary = function() {
  return this.title + " by " + this.author + " (" + this.year + ")";
};

console.log(library[1].summary());

// Exercise 3.4 - Dynamic product list

const products = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 29 },
  { name: "Keyboard", price: 79 }
];

// 1
const productList = document.getElementById("list");

// 5 (I changed title first)
const title = document.getElementById("title");
title.textContent = "Product Catalogue";

// 2 + 3 + 4
products.forEach(p => {
  const li = document.createElement("li");

  li.textContent = p.name + " - $" + p.price;

  // bonus
  if (p.price > 500) {
    li.style.color = "red";
  }

  productList.appendChild(li);
});

// Exercise 4.4 - Interactive to-do list

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn"); 
const taskList = document.getElementById("tasks");

// click button
addBtn.addEventListener("click", function () {

    const value = input.value;

    // check empty
    if (value === "") {
        return;
    }

    const li = document.createElement("li");
    li.textContent = value;

    taskList.appendChild(li);

    // clear input
    input.value = "";
});

// click on list (event delegation)
taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.style.textDecoration = "line-through";
    }
});

// bonus – press enter
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

//Exercise 5.4 — User card generator

const userBtn = document.getElementById("btn");
const userList = document.getElementById("list");   
const userTitle = document.getElementById("title"); 

async function showUsers() {
    console.log("clicked");

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await res.json();

        userList.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name + " - " + user.email;
            userList.appendChild(li);
        });

        userTitle.textContent = users.length + " Users Loaded";

    } catch (error) {
        console.log(error);
        userTitle.textContent = "Error loading users";
    }
}

userBtn.addEventListener("click", showUsers);