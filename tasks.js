import {notificationSystem, scheduleNotification} from './notifications.js';

const urlParams = new URLSearchParams(window.location.search);
let questId = urlParams.get('questId');
console.log(questId);
let tasksId = `tasks_${questId}`;
console.log(tasksId);
let tasks = JSON.parse(localStorage.getItem(tasksId)) || [];
let pointsCounter = 0;

    function displayTasks() {
    let taskList = document.getElementById('taskList');
	let createTask = document.getElementById('createTask');
      taskList.innerHTML = ''; // Clear existing content

      tasks.forEach((task, index) => {
        let li = document.createElement('li');
        let h2 = document.createElement('h2');
        h2.textContent= `${task.title}`;
        li.appendChild(h2)
        let p = document.createElement('p');
        p.textContent = `${task.content}`;
        li.appendChild(p);
        let p2 = document.createElement('p');
        p2.textContent = Intl.DateTimeFormat('en-US', {weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date(task.dueDate)).toString();
        li.appendChild(p2);
        let p3 = document.createElement('p')
        p3.textContent = `XP=${task.points}`;
        li.appendChild(p3);
        let a = document.createElement('a');
        a.textContent = "Edit";
        a.href = `task.html?questId=${questId}&index=${index}`;
        a.classList.add('quest-btn');
        li.appendChild(a);
        

			if (task.completed === "true") {
				li.classList.add("completed");
				pointsCounter = pointsCounter + parseFloat(task.points);
      } else if (task.completed === "false"){
        li.classList.add("incomplete");
      } else {
        console.log("Class error");
      }
        taskList.appendChild(li);
	});

	  let link = document.createElement('a');
	  link.textContent = "Create task";
	  link.href = 'new-task.html?questId='+`${questId}`;
	  createTask.appendChild(link);
	  document.getElementById('xp').textContent = pointsCounter;
    }

    displayTasks();


    //Start notifications
    if (Notification.permission !== "granted") {
      // Request permission if not already granted
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          notificationSystem(tasks);
        }
      });
    } else if (Notification.permission === "granted") {
      //Permission granted, set cycle
      notificationSystem(tasks);
    } else {
      //Permission error
      console.log("Enable notifications, or something...");
    };


let questIntervals=[];

function startNotificationCycle (notifDelay, hoursBefore) {
  if (notifDelay > 0 && hoursBefore > 0) {
    checkNotifications(hoursBefore);
    questIntervals[questId] = setInterval(() => {
      checkNotifications(hoursBefore);
    }, notifDelay * 60000);
  }
}

function checkNotifications(hoursBefore) {
  for (let i = 0; i < tasks.length; i++) {
        let due = new Date(tasks[i].dueDate);
        console.log(due)
        let now = Date.now();
        let timeDifference = due-now;
        console.log("valid notification cycle");
        if (0 >= timeDifference) {
          // Send notification for the overdue task
          new Notification("Urgency Note", { body: `${tasks[i].title} is overdue`});
        } else if ((3600000*hoursBefore >= timeDifference) && (timeDifference > 0)) {
          // Send notification for tasks within notification timeframe
          new Notification("Urgency Note", { body: `${tasks[i].title} is due in ${Math.ceil((timeDifference)/60000)} minutes`});
        } else {
          console.log("notification error")
        }
}
}

function stopNotifications(questId) {
    clearInterval(questIntervals[questId]);
    delete questIntervals[questId];
}
document.getElementById("stopNotifications").addEventListener('click', () => {
stopNotifications();
});

function setCycle() {
  // Get values from input fields
  const notifDelay = document.getElementById('notifDelay').value;
  const hoursBefore = document.getElementById('hoursBefore').value;

  //Clear notification cycles
  stopNotifications(questId);

  if (Notification.permission !== "granted") {
    // Request permission if not already granted
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        startNotificationCycle(notifDelay, hoursBefore);
      }
    });
  } else if (Notification.permission === "granted") {
    //Permission granted, set cycle
    startNotificationCycle(notifDelay, hoursBefore);
  } else {
    //Permission error
    console.log("Enable notifications, or something...");
  }
}

document.getElementById("setCycle").addEventListener('click', () => {
setCycle();
});
  
