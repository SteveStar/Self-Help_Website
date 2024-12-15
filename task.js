const urlParams = new URLSearchParams(window.location.search);
let questId = urlParams.get('questId');
let tasksId = `tasks_${questId}`;
let tasks = JSON.parse(localStorage.getItem(tasksId));
let index = parseInt(urlParams.get('index'));
let task = tasks[index];
let completed = task.completed;
const form = document.getElementById('taskForm');
form.querySelector('#title').value = task.title;
form.querySelector('#content').value = task.content;
form.querySelector('#dueDate').value = task.dueDate;
form.querySelector('#points').value = task.points;
form.querySelector('#notif1').value = task.notif1;

function saveTask(){
const title = document.getElementById('title').value;
const content = document.getElementById('content').value;
const dueDate = document.getElementById('dueDate').value;
const points = document.getElementById('points').value;
const notif1 = document.getElementById('notif1').value;

tasks[index] = {
  title,
  content, 
  dueDate, 
  points, 
  completed, 
  notif1
};
  tasks.sort((a, b) => {
const dateA = new Date (a.dueDate);
const dateB = new Date (b.dueDate);
return dateA - dateB;
});
localStorage.setItem(tasksId, JSON.stringify(tasks));
  window.location.href = 'tasks.html?questId='+`${questId}`;
}

function completeTask() {
task.completed = "true";
tasks.sort((a, b) => {
const dateA = new Date (a.dueDate);
const dateB = new Date (b.dueDate);
return dateA - dateB;
});
localStorage.setItem(tasksId, JSON.stringify(tasks));
window.location.href = "tasks.html?questId="+`${questId}`;
}

function undoComplete() {
task.completed = "false";
tasks.sort((a, b) => {
const dateA = new Date (a.dueDate);
const dateB = new Date (b.dueDate);
return dateA - dateB;
});
localStorage.setItem(tasksId, JSON.stringify(tasks));
window.location.href = 'tasks.html?questId='+`${questId}`;
}


function deleteTask() {
  tasks.splice(index, 1);
  localStorage.setItem(tasksId, JSON.stringify(tasks));
  window.location.href = 'tasks.html?questId='+`${questId}`;
}