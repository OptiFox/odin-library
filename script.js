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
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
// console.log(theHobbit.info());

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Title Test", "Test Author", 80, true);
addBookToLibrary("Title Test 2", "Test Author 2", 90, true);
addBookToLibrary("Title Test 3", "Test Author 3", 100, false);
addBookToLibrary("Title Test 4", "Test Author 4", 110, true);
addBookToLibrary("Title Test 5", "Test Author 5", 120, false);
console.log(myLibrary);

function createCard() {
  const container = document.querySelector(".container");
  const card = document.createElement("div");
  card.classList.add("card");
  container.appendChild(card);
}

function createCardItems(i) {
  const cardContainer = document.querySelectorAll('.card');

  const paraId = document.createElement('p');
  paraId.classList.add('id');

  const headerTitle = document.createElement('h1');
  headerTitle.classList.add('title');

  const headerAuthor = document.createElement('h2');
  headerAuthor.classList.add('author');

  const paraPages = document.createElement('p');
  paraPages.classList.add('pages');

  const paraRead = document.createElement('p');
  paraRead.classList.add('read');

  const indicator = document.createElement('span');
  indicator.classList.add('indicator');

  // loop through each card to add id
  cardContainer.forEach((card) => {
    card.appendChild(paraId);
    paraId.textContent = myLibrary[i].id;

    card.appendChild(headerTitle);
    headerTitle.textContent = myLibrary[i].title;

    card.appendChild(headerAuthor);
    headerAuthor.textContent = myLibrary[i].author;

    card.appendChild(paraPages);
    paraPages.textContent = `Pages: ${myLibrary[i].pages}`;

    card.appendChild(paraRead);
    paraRead.textContent = "Read Status:";
    paraRead.appendChild(indicator);
  });

  // Change read indicator
  if (myLibrary[i].read) {
    indicator.classList.add("read");
  } else {
    indicator.classList.remove("read");
  }
}

// testing for loops to display obj from myLibrary
for (let i = 0; i < myLibrary.length; i++) {
  // Create card inside container
  createCard()
  
  // Create elements within cards
  createCardItems(i);
}
