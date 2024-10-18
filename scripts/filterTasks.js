const filterButtons = document.querySelectorAll('.filter-button');

let timesClicked = 0;

filterButtons.forEach(button => {
    button.addEventListener('click', ()=>selectedFilter(button))
})

const selectedFilter = el => {
    const allButton = document.getElementById('default-filter');
    const section = document.getElementById(`hideable-section-${el.classList[2]}`);

    [...filterButtons].map(butt => {
        butt.classList.remove('active-filter');
        butt.style.backgroundColor = '#2959D1';
    });
    el.classList.add('active-filter');
    timesClicked++;
    if (timesClicked) allButton.style.backgroundColor = '#2959D1';
    el.style.backgroundColor = '#170F82';
    filterTasks(el.innerText);
};

const filterTasks = filter => {
    filter = filter.toLowerCase();
    const tasks = document.querySelectorAll('.task');
    [...tasks].filter(task => !task.classList.contains(`${filter}`)).map(task => task.style.display = 'none');
    [...tasks].filter(task => task.classList.contains(`${filter}`)).map(task => task.style.display = 'flex');
};