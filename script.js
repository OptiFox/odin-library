const myLibrary = [];

function Book(id, title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

Book.prototype.toggleRead = function () {
  if (this.read) this.read = false;
  else this.read = true;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(book);
}

function createCard() {
  const container = document.querySelector(".container");
  const card = document.createElement("div");
  card.classList.add("card");
  container.appendChild(card);
}

function createCardItems(index) {
  const cardContainer = document.querySelectorAll(".card");

  const paraId = document.createElement("p");
  paraId.classList.add("id");

  const headerTitle = document.createElement("h1");
  headerTitle.classList.add("title");

  const headerAuthor = document.createElement("h2");
  headerAuthor.classList.add("author");

  const paraPages = document.createElement("p");
  paraPages.classList.add("pages");

  const paraRead = document.createElement("p");
  paraRead.classList.add("read");

  const indicator = document.createElement("span");
  indicator.classList.add("indicator-" + index);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("buttons");

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("delete");

  const iconDelete = document.createElement("img");
  iconDelete.src = "icons/delete.svg";

  const btnToggle = document.createElement("button");
  btnToggle.classList.add("toggle");

  const iconToggle = document.createElement("img");
  iconToggle.src = "icons/swap-horizontal.svg";

  // Loop through each card to add elements
  cardContainer.forEach((card) => {
    card.appendChild(paraId);
    paraId.textContent = myLibrary[index].id;

    card.appendChild(headerTitle);
    headerTitle.textContent = myLibrary[index].title;

    card.appendChild(headerAuthor);
    headerAuthor.textContent = myLibrary[index].author;

    card.appendChild(paraPages);
    paraPages.textContent = `Pages: ${myLibrary[index].pages}`;

    card.appendChild(paraRead);
    paraRead.textContent = "Read Status:";
    paraRead.appendChild(indicator);

    card.appendChild(btnContainer);
    btnContainer.appendChild(btnDelete);
    btnContainer.appendChild(btnToggle);

    btnDelete.textContent = "Delete";
    btnDelete.appendChild(iconDelete);

    btnToggle.textContent = "Toggle";
    btnToggle.appendChild(iconToggle);

    btnDelete.dataset.indexNumber = myLibrary[index].id;
    btnToggle.dataset.indexNumber = myLibrary[index].id;
  });
}

function readIndicator(index) {
  const indicator = document.querySelector(`.indicator-${index}`);

  // Change read indicator
  if (myLibrary[index].read) {
    indicator.classList.add("done");
  } else {
    indicator.classList.remove("done");
  }
}

function recreateContainer() {
  const deleteContainer = document.querySelector(".container");
  deleteContainer.remove();

  const createContainer = document.createElement("div");
  createContainer.classList.add("container");

  document.body.appendChild(createContainer);

  generateCards();
}

function generateCards() {
  for (let i = 0; i < myLibrary.length; i++) {
    // Create card inside container
    createCard();

    // Create elements within cards
    createCardItems(i);

    readIndicator(i);
  }

  regenerateEventHandlers();
}

function regenerateEventHandlers() {
  deleteBook();
  toggleIndicator();
}

// Add new book dialog
const btnOpenDialog = document.querySelector("#showDialog");
const addBookDialog = document.querySelector("#addBookDialog");

const addBookForm = document.querySelector("#addBookForm");

// Form inputs
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");

const btnConfirm = addBookDialog.querySelector("#btnConfirm");

// Open dialog
btnOpenDialog.addEventListener("click", () => {
  addBookDialog.showModal();
});

// Confirm input
btnConfirm.addEventListener("click", (e) => {
  let isFormValid = addBookForm.checkValidity();
  if (!isFormValid) {
    // e.preventDefault() gets rid of form validity check, so we have to add this
    addBookForm.reportValidity();
  } else {
    e.preventDefault();

    addBookToLibrary(
      String(inputTitle.value),
      String(inputAuthor.value),
      Number(inputPages.value),
      readStatus(),
    );

    recreateContainer();

    // Clear previous input after submitting
    addBookForm.reset();
    addBookDialog.close();
  }
});

function readStatus() {
  const inputRead = document.querySelector('input[name="read"]:checked');

  if (inputRead.value === "yes") {
    return true;
  } else {
    return false;
  }
}

function deleteBook() {
  const btnDelete = document.querySelectorAll(".delete");

  btnDelete.forEach((del) => {
    del.addEventListener("click", () => {
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === del.dataset.indexNumber) {
          myLibrary.splice(i, 1);
          return recreateContainer();
        }
      }
    });
  });
}

function toggleIndicator() {
  const btnToggle = document.querySelectorAll(".toggle");

  btnToggle.forEach((tog) => {
    tog.addEventListener("click", () => {
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === tog.dataset.indexNumber) {
          myLibrary[i].toggleRead();
          return readIndicator(i);
        }
      }
    });
  });
}
