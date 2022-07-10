const btn = document.querySelector('button');
const div = document.querySelector('.task');
const input = document.querySelector('#task');

btn.addEventListener('click',createTask);

function createTask(){
    if(!input.value ==''){
        const li = document.createElement('li');
        const span = document.createElement('span');
        const checkbox = document.createElement('input');

        checkbox.setAttribute('type','checkbox')
        checkbox.setAttribute('id','cb');

        span.textContent = `${input.value}`;
        li.appendChild(checkbox);
        li.appendChild(span);
        div.prepend(li)
        input.value = '';
        input.focus()

        li.addEventListener('click',e=>{
            if(e.target.checked){
                li.style.textDecoration = 'line-through'
            }
            else {
                li.style.textDecoration = 'none'
            }
        })
    }
}