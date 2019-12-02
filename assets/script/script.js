console.log('momento clone')

const time = document.querySelector('.time');
const nameInput = document.querySelector('.name');
const mainTodo = document.querySelector('.main-todo-input');
const mainTodoParent = document.querySelector('.main-todo');
const welcome = document.createElement('p');
welcome.classList.add('welcome');
const mainTodoPara = document.createElement('p');
const mainFocus = document.querySelector('.main-focus');
mainTodoPara.classList.add('mainTodoPara');
const checkMain = document.querySelector('#checkmain');
const secondTodoInput = document.querySelector('.secondTodoInput');
const ul = document.querySelector('.ul');
const toggleTodo = document.querySelector('.toggleTodo');
var p = false;
const todoIt = document.querySelector('.todoIt');
const secondTodoBlock = document.querySelector('.secondTodo'); 
const bodybg = document.body;
// const bgnames = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','8.jpg','9.jpg','10.jpg'];
function changebg(){
  return (bgnames.sort((a,b) => Math.random()-0.5))[0];
}
// bodybg.style.backgroundColor = `black`;
// bodybg.style.backgroundImage = `url(./assets/media/${changebg()})`;

function randomId(){
  return('qwerty123pun'.split('').sort(() => Math.random() - 0.5).join('') + Math.floor(Math.random()*1000) );
}

function changeFocus(){
  if(mainTodoPara.textContent){
  mainFocus.textContent = 'Let\'s do it today';
  }
}


function hideTodo(e){
  if(p==false){
  secondTodoBlock.style.display = 'block'
  createUI(state);
 }
 else (secondTodoBlock.style.display ='none');

 p =!p;
}




let state = JSON.parse(localStorage.getItem('data'))|| {};
state['secondTodo']==null?state['secondTodo']=[]:state['secondTodo'] = JSON.parse(localStorage.getItem('data')).secondTodo;


function createUI(data){

  ul.innerHTML = '';
  function updateTime(){
  const today = new Date;
  time.textContent = today.getHours() +':'+  (today.getMinutes()<10?'0'+ today.getMinutes(): today.getMinutes())+ ':' +   (today.getSeconds()<10?'0'+ today.getSeconds(): today.getSeconds()) + `${today.getHours()>=12?'  pm':'  am'}`}
  setInterval(updateTime,100);  
  function retainCheckIt(){
    if(state['maintodo']){
      checkMain.checked = true;
      mainTodoPara.style.textDecorationLine = 'line-through';
      mainTodoPara.style.opacity = 0.5;
    }
  }
  retainCheckIt();
  changeFocus();

  state.secondTodo.forEach(todo =>{
    const li = document.createElement('li');
    li.classList.add('todoLi');
    const secondCheckBox = document.createElement('input');
    secondCheckBox.setAttribute('type','checkbox');
    secondCheckBox.setAttribute('data-id',todo.id);
    secondCheckBox.checked = todo.completed;
    const todop = document.createElement('p');
    secondCheckBox.checked?todop.classList.add('todopcut'):todop.classList.add('todop');
    todop.textContent = todo.todoText;
    const buttonx = document.createElement('button');
    buttonx.classList.add('buttonx')
    buttonx.setAttribute('data-id',todo.id);
    buttonx.textContent = 'X';
    li.append(secondCheckBox,todop,buttonx);
    ul.append(li);

    function doneToDO(event){
      state.secondTodo = state.secondTodo.map(todos =>  {
       if(event.target.dataset.id == todos.id) {
         if(event.target.checked){
        // event.target.checked == true? (todos.completed = true) : todos.completed = false ;
        todos.completed = true;
        return todos;
         }
         else{
          todos.completed = false;
          // todop.classList.remove('todopcut');
          // todop.classList.add('todopcut');
          return todos;
         }
     }
      else return todos;
    })
    localStorage.setItem('data',JSON.stringify(state));
    return createUI(state);
    }
    secondCheckBox.addEventListener('click', doneToDO);


    function deleteTodo(event) {
       state.secondTodo = state.secondTodo.filter(todo => event.target.dataset.id != todo.id);
       localStorage.setItem('data',JSON.stringify(state));
       return createUI(state);
      }
    buttonx.addEventListener('click',deleteTodo)
    localStorage.setItem('data',JSON.stringify(state));
    // createUI(state);
  })

  }

function addPriortyTodo({keyCode}){
  if(keyCode == 13){
    state['mainTodoData'] = mainTodo.value;
    mainTodoParent.replaceChild(mainTodoPara, mainTodo);
    mainTodoPara.textContent = state['mainTodoData'];
    mainFocus.textContent = 'Let\'s do it today';
    localStorage.setItem('data',JSON.stringify(state));
  }
}

const replaceIt = function({keyCode}){
  if(keyCode == 13){
    nameInput.parentElement.replaceChild(welcome,nameInput);
    state['name'] = nameInput.value;
    welcome.textContent = `Welcome ${state['name']}`;
    localStorage.setItem('data',JSON.stringify(state));
  }
}


const cutMainTodo = function(event){
  if(checkMain.checked){
    state['maintodo'] = true;
    localStorage.setItem('data',JSON.stringify(state));
    mainTodoPara.style.textDecorationLine = 'line-through';
    mainTodoPara.style.opacity = 0.5;
    createUI(state);
  }
  else {
    state['maintodo'] = false;
    localStorage.setItem('data',JSON.stringify(state));
    checkMain.checked = false;
    mainTodoPara.style.textDecorationLine = 'none';
    mainTodoPara.style.opacity = 1;
    createUI(state);
  }
}

function welcomeTask(){
  if(state['name']){
    nameInput.parentElement.replaceChild(welcome,nameInput);
    welcome.textContent = `Welcome ${state['name']}`;
    if(state['mainTodoData']){
      mainTodoParent.replaceChild(mainTodoPara, mainTodo);
      mainTodoPara.textContent = state['mainTodoData'];
    }
  }
  else {
    nameInput.focus() ;
  }
}



welcomeTask();
checkMain.addEventListener('click',cutMainTodo);
mainTodo.addEventListener('keyup',addPriortyTodo);
nameInput.addEventListener('keyup', replaceIt);



const addSecTodo = function({keyCode}){
  if(keyCode == 13){
    state.secondTodo.push({'todoText': secondTodoInput.value, 'completed': false, 'id': randomId()});
    localStorage.setItem('data',JSON.stringify(state));
    // const li = document.createElement('li');
    // li.classList.add('todoLi');
    // const secondCheckBox = document.createElement('input');
    // secondCheckBox.setAttribute('type','checkbox');
    // const todop = document.createElement('p');
    // const buttonx = document.createElement('button');
    // buttonx.textContent = 'X';
    // li.append(secondCheckBox,todop,buttonx);
    // todop.textContent = secondTodoInput.value

    // ul.append(li);

    createUI(state)
    secondTodoInput.value = '';
  }
}
secondTodoInput.addEventListener('keyup',addSecTodo);
todoIt.addEventListener('click',hideTodo);

createUI(state);