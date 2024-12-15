export function scheduleNotification(message, timestamp) {
    // Calculate delay and schedule notification
    if (Date.now() < timestamp) {
      const delay = timestamp - Date.now();
    setTimeout(() => {
      new Notification(message);
    }, delay);
  } else {
    console.log(`Notification for ${message} passed`)
  };
  }
  
  export function notificationSystem() {
    // Sort tasks by their notification timestamps (assuming notif1 property)
    tasks.sort((a, b) => (a.notif1 - b.notif1));
  
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
  
        // Skip tasks without a notification
        if (!task.notif1) {
          continue;
        }
  
        // Extract message and timestamp from task
        const message = task.title.toString();
        const timestamp = new Date (task.notif1);
        scheduleNotification(message, timestamp)
  };
  }
  