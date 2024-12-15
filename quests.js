const quests = JSON.parse(localStorage.getItem('quests')) || [];
  function displayQuests() {
    const questList = document.getElementById('questList');
    questList.innerHTML = ''; // Clear existing content
    quests.forEach((quest, index) => {
      if (quest.title !== ''){
     let li = document.createElement('li');
     let h2 = document.createElement('h2');
     h2.textContent= `${quest.title}`;
     li.appendChild(h2);
     let p = document.createElement('p');
     p.textContent = `${quest.content}`;
     li.appendChild(p);
    
     let a = document.createElement('a');
     a.classList.add('quest-btn');
     a.textContent = "Enter Quest";
     a.href = `tasks.html?questId=${index + 1}`;
     li.appendChild(a);
     let a2 = document.createElement('a');
     a2.classList.add('quest-btn');
     a2.textContent = "Edit";
     a2.href = `quest.html?questId=${index}`;
     li.appendChild(a2);
     questList.appendChild(li);
      } else {
        console.log("Hidden quest(s)! Enter the indices of deleted quests in URL of the edit page and use them when creating new quest. Bug caused by two indices and a general division between page scripts. To be addressed.")
      }
    });
  }

  displayQuests();