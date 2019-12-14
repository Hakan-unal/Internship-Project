// dom variables
let submit, deleteButon;
submit = document.querySelector("#new-course");
deleteButon = document.getElementById("table");
editButon = document.getElementsByClassName("table");

// function variables
let addPersonel, deletePersonel, events;

class Personel {
    constructor(title, personel, image) {
        this.title = title;
        this.personel = personel;
        this.image = image;
        this.id = Math.round(Math.random() * 1000);
    }
}

class UI {
    constructor() { }

    addToTable = (obj) => {

        // dom variables
        let table;

        // variables
        let html, url;
        url = "http://jsonplaceholder.typicode.com/photos/?results=10";

        // object variables xhr
        let xhr;
        xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = () => {

            //variables
            let photos;

            photos = JSON.parse(xhr.responseText);
            table = document.querySelector("#table");
            html = `
                        <tr>
                            <td>${obj.title}</td>
                            <td>${obj.personel}</td>
                            <td><img src="avatar/${[obj.image]}.jfif"></td>
                            <td>
                            <a href="#"data-id="${obj.id}"id="delete"class="btn btn-danger btn-sm delete">Delete</a>
                            </td>
                        </tr>
        `;
            table.innerHTML += html;
        }
        xhr.send();

    }
    clearBox = () => {

        //dom variables
        let title, personel, image;
        title = document.querySelector("#title");
        personel = document.querySelector("#personel");
        image = document.querySelector("#image");

        title.value = "";
        personel.value = "";
        image.value = "";
    }

    showAlert = (message, warn) => {

        // variables
        let alert, row;

        alert = `
        <div class="alert alert-${warn}">${message}</div>
        `;

        row = document.querySelector(".row");
        row.insertAdjacentHTML("beforeBegin", alert);

        setTimeout(() => {

            document.querySelector(".alert").remove();

        }, 2000);
    }
    deleteItem = (personel) => {

        //object variables
        let ui;
        ui = new UI();

        if (personel.classList.contains("delete")) {

            if (confirm("Are you sure?")) {

                personel.parentElement.parentElement.remove();

                return true;

            }
        }
    }
}

class Storage {

    static addStorage(object) {

        //variables
        let personels;
        personels = Storage.getStorage();
        personels.push(object);
        localStorage.setItem("personels", JSON.stringify(personels));
    }

    static getStorage() {

        //variables
        let personels;

        if (localStorage.getItem("personels") === null) {
            personels = [];
        }

        else {
            personels = JSON.parse(localStorage.getItem("personels"));
        }
        return personels;
    }

    static display() {
        // variables
        let personels;
        personels = Storage.getStorage();

        personels.forEach(personel => {
            //object variables
            let ui;

            ui = new UI();
            ui.addToTable(personel);
        });
    }

    static deleteStorage(itemTarget) {

        // variables
        let id;
        id = itemTarget.getAttribute("data-id");

        // object variables
        let personels;
        personels = Storage.getStorage();

        personels.forEach((personel, index) => {
            if (personel.id == id) {
                personels.splice(index, 1);
            }
            localStorage.setItem("personels", JSON.stringify(personels));
        });
    }
}


addPersonel = (item) => {

    // dom variables
    let title, personel, image;

    // object variables
    let personel_obj, ui_obj;

    title = document.querySelector("#title").value;
    personel = document.querySelector("#personel").value;
    image = document.querySelector("#image").value;

    // create Personel object
    personel_obj = new Personel(title, personel, image);

    // create UI object    
    ui_obj = new UI();

    if (title === "" || personel === "" || image === "") {

        // call alert functions
        ui_obj.showAlert("Please complate the form", "warning");
    }
    else {

        // call and add item to table function
        ui_obj.addToTable(personel_obj);

        // item add to LS
        Storage.addStorage(personel_obj);

        // show alert (add success)
        ui_obj.showAlert("The personel has been added", "success");

    }

    // add item after clear box
    ui_obj.clearBox();


    // not refresh
    item.preventDefault();
}

deletePersonel = (item) => {
    //object variables
    let ui;
    ui = new UI();

    if (ui.deleteItem(item.target)) {

        // Delete Storage
        Storage.deleteStorage(item.target);

        //display alert after delete
        ui.showAlert("The personel has been deleted", "danger");
    }

    item.preventDefault();
};

// events functions contains all event and when the page is first loaded call
events = () => {

    submit.addEventListener("submit", addPersonel);
    document.addEventListener('DOMContentLoaded', Storage.display);
    deleteButon.addEventListener("click", deletePersonel);
}

events();

