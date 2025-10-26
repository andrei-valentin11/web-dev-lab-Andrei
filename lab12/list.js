const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
const fruitList = document.getElementById("fruit-list");

for (let i = 0; i < fruits.length; i++) {
  const li = document.createElement("li");
  li.innerText = fruits[i];
  fruitList.appendChild(li);
}
