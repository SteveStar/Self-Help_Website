const urlParams = new URLSearchParams(window.location.search);
let questId = urlParams.get('questId');
let tasksId = `tasks_${questId}`;
let tasks = JSON.parse(localStorage.getItem(tasksId)) || [];

console.log(questId);
console.log(tasksId);

   function createTask() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value; 
	const dueDate = document.getElementById('dueDate').value; 
	const points = document.getElementById('points').value;
    const notif1 = document.getElementById('notif1').value;

    const newTask = {
    title,
    content,
	dueDate,
	points,
	completed: "false",
    notif1
      };

      tasks.push(newTask);
	    tasks.sort((a, b) => {
    const dateA = new Date (a.dueDate);
    const dateB = new Date (b.dueDate);
    return dateA - dateB;
  });
      localStorage.setItem(tasksId, JSON.stringify(tasks));

      window.location.href = 'tasks.html?questId='+`${questId}`;
    }
	
    document.getElementById('task-form').addEventListener('submit', (event) => {
      event.preventDefault();
      createTask();
    });