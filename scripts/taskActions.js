let tasks = 0;

let input = document.getElementById('header__search');
let button = document.getElementById('header__form__submit-btn');
const mainBlock = document.getElementById('main');

const buttonBackgrounds = {
    defaultFav:  'url("images/default-star.png")',
    markedFav: 'url("images/filled-star.png")',
    defaultComplete: 'url("images/default-complete.png")',
    markedComplete: 'url("images/filled-complete.png")'
};

const setButtonEvents = el => {
    if (el.target.classList.contains('fav-button')) changeFavStatus(el.target);
    else if (el.target.classList.contains('complete-button')) changeCompleteStatus(el.target);
    else if (el.target.classList.contains('del-button')) alertDel(el.target);
};

mainBlock.addEventListener('click', setButtonEvents);
button.addEventListener('click', ()=>processInput());

const alertDel = el => {
    let ans = confirm('Are you sure you want to delete this task?');
    if (ans) deleteTask(el);
};

const deleteTask = async el => {
    const section = document.getElementById(`hideable-section-${el.classList[2]}`)
    const sectionHideDiv1 = document.getElementById(`hideable-div-${el.classList[2]}-1`);
    const sectionHideDiv2 = document.getElementById(`hideable-div-${el.classList[2]}-2`);

    sectionHideDiv1.style.display = 'none';
    sectionHideDiv2.style.display = 'none';

    let seconds = 5;
    const warning = document.createElement("p");
    let warningText = document.createTextNode(`This task will disappear in ${seconds} seconds`);

    warning.style.fontWeight = '700';
    warning.style.color = 'red';
    warning.appendChild(warningText);
    section.appendChild(warning);
    const intervalid = setInterval(() => {
        seconds--;
        warning.textContent = `This task will disappear in ${seconds} seconds`;
        if (!seconds) {
            clearInterval(intervalid);
            section.remove();
        }
    }, 1000);
};

const changeFavStatus = el => {
    const section = document.getElementById(`hideable-section-${el.classList[2]}`);
    if (section.classList.contains('favourite')) el.style.backgroundImage = buttonBackgrounds.defaultFav;
    else el.style.backgroundImage = buttonBackgrounds.markedFav;

    section.classList.toggle('favourite');
}

const changeCompleteStatus = el => {
    const section = document.getElementById(`hideable-section-${el.classList[2]}`);
    if (section.classList.contains('completed')) el.style.backgroundImage = buttonBackgrounds.defaultComplete;
    else el.style.backgroundImage = buttonBackgrounds.markedComplete;

    section.classList.toggle('completed');
};

//---------------------------------------------
//createTask
//---------------------------------------------

const startCreatingTaskBtn = document.getElementById('start-creating-task');
const divForBlur = document.getElementById('blur-panel');
const frameDiv = document.getElementById('create-task');

let clicks = 0;

startCreatingTaskBtn.addEventListener('click', ()=>blurMain());

const blurMain = () => {
    divForBlur.style.filter = 'blur(2px)';
    frameDiv.style.display = 'block';
};
const unBlurMain = () => {
    divForBlur.style.filter = 'blur(0)';
    frameDiv.style.display = 'none';
};

const userInput = document.querySelectorAll('.user-input');
const createTaskBtn = document.getElementById('create-task__button');

createTaskBtn.addEventListener('click',()=>taskBtnHandler());

const taskBtnHandler = () => {
    unBlurMain();
    const values = [...userInput].map(el => el.value);
    createTask(values);
};

const createTask = values => {
    const section = document.createElement('section');
    const divTaskDesc = document.createElement('div');
    const taskDesc = document.createElement('p');
    const taskDescText = document.createTextNode(`Due to: ${values[1]} ${values[2]} ${values[0]}`);
    const divTaskActions = document.createElement('div');
    const favButton = document.createElement('button');
    const completeButton = document.createElement('button');
    const delButton = document.createElement('button');

    clicks++;

    taskDesc.appendChild(taskDescText);

    section.classList.add('task', 'all');
    section.setAttribute('id', `hideable-section-${clicks}`);
    divTaskDesc.classList.add('task-desc');
    divTaskActions.classList.add('task-actions');

    divTaskDesc.setAttribute('id', `hideable-div-${clicks}-1`);
    divTaskActions.setAttribute('id', `hideable-div-${clicks}-2`);

    taskDesc.classList.add('task-description', clicks);
    favButton.classList.add('action-button', 'fav-button', clicks);
    completeButton.classList.add('action-button', 'complete-button', clicks);
    delButton.classList.add('action-button', 'del-button', clicks);

    divTaskDesc.appendChild(taskDesc);

    divTaskActions.appendChild(favButton);
    divTaskActions.appendChild(completeButton);
    divTaskActions.appendChild(delButton);

    section.appendChild(divTaskDesc);
    section.appendChild(divTaskActions);

    mainBlock.appendChild(section);

    const actionButtons = [favButton, completeButton, delButton];
    actionButtons.forEach(button => {
        button.style.width = '25px';
        button.style.height = '25px';
    });
};
//----------------------
//search
//----------------------

const processInput = () => {
    if (input.value) {
        const tasksDesc = document.querySelectorAll('.task-description');
        const inputValue = input.value;
        for (let taskDesc of tasksDesc) {
            const pattern = new RegExp(`(.${inputValue}.)|(${inputValue}.)|(.${inputValue})`, `i`);
            const currSection = document.getElementById(`hideable-section-${taskDesc.classList[1]}`);
            taskDesc.textContent.search(pattern)===-1 ? 
            currSection.style.display = 'none' : currSection.style.display = 'flex';
        }
    }
};