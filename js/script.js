'use strict';

//set theme
window.onload = function() {
  document.querySelector("body").classList.add("dark-theme");
  document.querySelector("body").classList.add("light-theme");

}

function switchTheme() {
  document.querySelector("body").classList.toggle("light-theme");

}

let id = 0;
class Task {
  constructor(text) {
    this.id = id;
    ++id;
    this.text = text;
    this.done = false;
  }
}

let list = [];

function onTextInput() {

  let i = document.getElementById('inputTask');
  i.placeholder = "Currently typing ";
  i.classList.add("input__active");
}
function restore() {
  let i = document.getElementById('inputTask')
  i.placeholder = "Create a new todo...";
  i.classList.remove("input__active");

}

function markDone(btn) {
  btn.classList.add("selected");
  btn.querySelector("img").src = "/images/icon-check.svg"
  let task__box = btn.parentElement;
  task__box.classList.add("done");
  for(let t of list) {
    if(t.id == task__box.id) {
      t.done = !t.done;
      break;
    }
  }
  btn.onclick = function() {
    btn.classList.remove("selected");
    btn.querySelector("img").src = ""
    let task__box = btn.parentElement;
    task__box.classList.remove("done");
    for(let t of list) {
      if(t.id == task__box.id) {
        t.done = !t.done;
        break;
      }
    }
    btn.onclick = function () {
      markDone(btn);
    };
  }
}

function addTasksToList() {
  for(let task of list) {
    addTask(task);
  }
}

function addTask(task) {
  let li = document.getElementById("strain").cloneNode(true);
  let list = document.querySelector("#tasksList");
  li.classList.remove("hidden");
  li.setAttribute("id", task.id);
  li.querySelector(".task").innerText = task.text;
  list.appendChild(li);
}

function addNewTask() {
  console.log("Hi my name is Igor and I made this.");
  let input = document.getElementById("inputTask");
  let text = input.value;
  input.value = "";
  if(text === "") {
    return;
  }
  let t = new Task(text);
  list.push(t);
  addTask(t);
  updateCount();
}

function updateCount() {
  let count = document.getElementById("itemsLeft");
  count.innerText = list.length;
}

function removeFromArray(id) {
  for(let i = 0; i < list.length; ++i ) {
     if (list[i].id == id) {
       list.splice(i,1);
       return;
     }
  }

}

function removeTask(btn) {
  let task__box = btn.parentElement;
  removeFromArray(task__box.id);
  task__box.remove();
  updateCount();
}


function setActvie(btn) {
  if(!btn.classList.contains("btn-active")) {
    document.querySelector(".btn-active").classList.remove("btn-active");
    btn.classList.add("btn-active");
  }
}

function showAll(btn) {
  setActvie(btn);
  let ul = document.getElementById("tasksList");
  let boxes = ul.childNodes;
  for (let i= 1; i < boxes.length; ++i) {
    boxes[i].classList.remove("hidden");
  }
}


function showActiveCompleted(btn, active) {
  setActvie(btn);
  for (const t of list) {
    if(t.done === !active) {
      document.getElementById(t.id).classList.add("hidden");
    } else {
      document.getElementById(t.id).classList.remove("hidden");
    }
  }
}

function clearDone() {
  for(let i = 0; i < list.length; ++i) {
    if(list[i].done) {
      document.getElementById(list[i].id).remove();
      removeFromArray(list[i].id);
      --i;
    }
  }
  updateCount();
}

//drag section


let ul = document.getElementById("tasksList");

ul.addEventListener("dragover", (event) => {
    const draged = ul.querySelector(".dragging");
    if (draged) {
      const siblings = [...ul.querySelectorAll("li:not(.dragging)")];
      let nextSibling = siblings.find( sib => event.clientY <=  sib.offsetTop + sib.offsetHeight / 2 );
      ul.insertBefore(draged, nextSibling);
    }
});

function drag(li) {
  li.classList.add("dragging");
}

function drop(li) {
  li.classList.remove("dragging");
}

