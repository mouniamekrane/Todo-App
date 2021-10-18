const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(months[today.getMonth()]);
let yyyy = today.getFullYear();
today = dd + 'th ' + mm + ', ' + yyyy;
document.getElementById("date").innerHTML = today;

// DOM variables

let search_input = document.querySelector(".search input");
const inputText = document.querySelector("#txt");
const myButton = document.querySelector('.btn-list');
const list = document.querySelector('.tasks-cont ul');

//function
function addToList(text) {
    const myLit = document.createElement('li');
    myLit.className = 'myitem';
    myLit.innerHTML = '<input class ="iputrad" type ="radio">';
    list.appendChild(myLit);

    const mySpan = document.createElement('span');
    mySpan.className = "spanradio";
    mySpan.textContent = text;
    myLit.append(mySpan);
}

//

window.onload = () => {
    console.log(localStorage.getItem('tasks'));
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    if (tasks !== null)
        tasks.forEach((item, index) => {})
    remove();
}

// disable 
inputText.addEventListener('keyup', e => {
    myButton.disabled = e.target.value === '';
})


// add task
myButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputText.value !== "") {

        addToList(inputText.value);

        let oldTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        oldTasks.push(inputText.value);
        localStorage.setItem('tasks', JSON.stringify(oldTasks));
        remove();

    }
    inputText.value = "";
});

// remove task
function remove() {
    const myRadio = document.querySelectorAll('.iputrad');
    const tasks = document.querySelectorAll('.myitem');
    const spans = document.querySelectorAll('.myitem span');
    myRadio.forEach((item, index) => {
        item.addEventListener('click', (e) => {

            Swal.fire({
                title: 'are you sure to delete this task?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `delete`,
                denyButtonText: `Don't delete`,
            }).then((result) => {

                if (result.isConfirmed) {
                    list.removeChild(tasks[index]);
                    let oldTasks = localStorage.getItem('tasks');
                    oldTasks = JSON.parse(oldTasks);

                    let newTasks = oldTasks.filter(function(value, ind, arr) {
                        return value !== spans[index].textContent;
                    });

                    localStorage.setItem('tasks', JSON.stringify(newTasks));

                    Swal.fire('deleted!', '', 'success')
                } else if (result.isDenied) {
                    e.target.checked = false;
                    Swal.fire('task is not deleted', '', 'info')
                }
            })
        })
    });
}

// search for a task
search_input.addEventListener('keyup', function(e) {
    let tasks = document.querySelectorAll("li.myitem span");
    let items = document.querySelectorAll("li.myitem");
    let searchedTask = e.target.value;

    tasks.forEach((item, index) => {
        if (item.textContent.indexOf(searchedTask) !== -1) {
            items[index].style.display = 'block';
        } else {
            items[index].style.display = 'none';
        }
    })

});