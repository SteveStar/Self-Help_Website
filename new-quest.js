function createQuest() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value; 

    const newQuest = {title, content};

    const quests = JSON.parse(localStorage.getItem('quests')) || [];
    quests.push(newQuest);
    localStorage.setItem('quests', JSON.stringify(quests));

    window.location.href = 'PageOne.html';
  }
  

  document.getElementById('quest-form').addEventListener('submit', (event) => {
    event.preventDefault();
    createQuest();
  });