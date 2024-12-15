const urlParams = new URLSearchParams(window.location.search);
    const questId = parseInt(urlParams.get('questId'));
    const quests = JSON.parse(localStorage.getItem('quests'));
    const quest = quests[questId];
    if (!quest) {
      window.location.href = 'PageOne.html';
    }

    const form = document.getElementById('questForm');
    form.querySelector('#title').value = quest.title;
    form.querySelector('#content').value = quest.content;
	

    function saveQuest(){

      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;   
	
      quests[questId] = {title, content};
      localStorage.setItem('quests', JSON.stringify(quests));

      window.location.href = 'PageOne.html';
    }
	

    function deleteQuest() {
      quests[questId] = {title: 'deleted', content: 'deleted'};
      localStorage.setItem('quests', JSON.stringify(quests));
      let tasksId = `tasks_${questId+1}`;
      localStorage.removeItem(tasksId) || '';
      window.location.href = 'PageOne.html';
    }	