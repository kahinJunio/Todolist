const btn = document.querySelector('button');
const div = document.querySelector('.task');
const input = document.querySelector('#task');
const form = document.querySelector('form');
const list = document.querySelector('.list');

//indexed db set up
const request = indexedDB.open('todo-app');
let db; 

//db doesn't exist so create object store and indexes
request.onupgradeneeded = function(){
    const db = request.result;
    const store = db.createObjectStore("todo-os",{keyPath: 'id',autoIncrement:true});
    store.createIndex('by_name','title',{unique:false});
}

request.onsuccess = function(){
    db = request.result;
    disPlayTasks()
}

form.addEventListener('submit',addData);

function addData(e){
    e.preventDefault();

    const tx = db.transaction('todo-os','readwrite');
    const store = tx.objectStore('todo-os');
    const addreq = store.add({title: input.value});
    
    addreq.onsuccess = function(){
        input.value = ''
    }

    tx.oncomplete = function() {
        console.log('New task added');
        disPlayTasks();
    }
}

function disPlayTasks(){
  while(list.firstChild){
    list.remove(list.firstChild);
  }
   
  const store = db.transaction('todo-os').objectStore('todo-os');
  const request = store.openCursor();

  request.onsuccess = function(){
    const cursor = request.result;
    if(cursor){
        const li = document.createElement('li');
        const span = document.createElement('span');
        const cb = document.createElement('input');

        cb.setAttribute('type','checkbox');
        li.appendChild(cb);
        li.appendChild(span);
        list.prepend(li);
        span.textContent = cursor.value.title;
        li.setAttribute('data-node-id',cursor.value.id);
        cursor.continue();
    }
  }
}