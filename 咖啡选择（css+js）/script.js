// querySelector()方法不用额外的jQuery，
// 仅仅返回匹配指定的选择器的第一个元素

const coffee_name = document.querySelector(".coffee_name");
const coffee_filling = document.querySelector(".filling");
const buttons = document.querySelectorAll("button");
let current_element = null;

const changeCoffeeType = (selected) => {
  if (current_element) {
    current_element.classList.remove("selected");
    coffee_filling.classList.remove(current_element.id);
  }
  current_element = selected;
  coffee_filling.classList.add(current_element.id);
  current_element.classList.add("selected");
  coffee_name.innerText = selected.innerText;
};

const setActiveType = (element) => {
  element.toggleClass("selected");
};

[...buttons].forEach((button) => {
  button.addEventListener("click", () => {
    changeCoffeeType(button);
  });
});