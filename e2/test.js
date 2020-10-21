/* E2 Library - JS */

/*-----------------------------------------------------------*/
/* Starter code - DO NOT edit the code below. */
/*-----------------------------------------------------------*/

// global counts
let numberOfBooks = 0; // total number of books
let numberOfPatrons = 0; // total number of patrons

// global arrays
const libraryBooks = [] // Array of books owned by the library (whether they are loaned or not)
const patrons = [] // Array of library patrons.

// Book 'class'
class Book {
	constructor(title, author, genre) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.patron = null; // will be the patron objet

		// set book ID
		this.bookId = numberOfBooks;
		numberOfBooks++;
	}

	setLoanTime() {
		// Create a setTimeout that waits 3 seconds before indicating a book is overdue

		const self = this; // keep book in scope of anon function (why? the call-site for 'this' in the anon function is the DOM window)
		setTimeout(function() {
			
			console.log('overdue book!', self.title)
			changeToOverdue(self);

		}, 3000)

	}
}

// Patron constructor
const Patron = function(name) {
	this.name = name;
	this.cardNumber = numberOfPatrons;

	numberOfPatrons++;
}


// Adding these books does not change the DOM - we are simply setting up the 
// book and patron arrays as they appear initially in the DOM.
libraryBooks.push(new Book('Harry Potter', 'J.K. Rowling', 'Fantasy'));
libraryBooks.push(new Book('1984', 'G. Orwell', 'Dystopian Fiction'));
libraryBooks.push(new Book('A Brief History of Time', 'S. Hawking', 'Cosmology'));

patrons.push(new Patron('Jim John'))
patrons.push(new Patron('Kelly Jones'))

// Patron 0 loans book 0
libraryBooks[0].patron = patrons[0]
// Set the overdue timeout
libraryBooks[0].setLoanTime()  // check console to see a log after 3 seconds


/* Select all DOM form elements you'll need. */ 
const bookAddForm = document.querySelector('#bookAddForm');
const bookInfoForm = document.querySelector('#bookInfoForm');
const bookLoanForm = document.querySelector('#bookLoanForm');
const patronAddForm = document.querySelector('#patronAddForm');

/* bookTable element */
const bookTable = document.querySelector('#bookTable')
/* bookInfo element */
const bookInfo = document.querySelector('#bookInfo')
/* Full patrons entries element */
const patronEntries = document.querySelector('#patrons')

/* Event listeners for button submit and button click */

bookAddForm.addEventListener('submit', addNewBookToBookList);
bookLoanForm.addEventListener('submit', loanBookToPatron);
patronAddForm.addEventListener('submit', addNewPatron)
bookInfoForm.addEventListener('submit', getBookInfo);

/* Listen for click patron entries - will have to check if it is a return button in returnBookToLibrary */
patronEntries.addEventListener('click', returnBookToLibrary)

/*-----------------------------------------------------------*/
/* End of starter code - do *not* edit the code above. */
/*-----------------------------------------------------------*/


/** ADD your code to the functions below. DO NOT change the function signatures. **/


/*** Functions that don't edit DOM themselves, but can call DOM functions 
     Use the book and patron arrays appropriately in these functions.
 ***/

// Adds a new book to the global book list and calls addBookToLibraryTable()
function addNewBookToBookList(e) {
	e.preventDefault();

	// Add book book to global array
	const bookName = document.querySelector('#newBookName').value;
	const bookAuthor = document.querySelector('#newBookAuthor').value;
	const bookGenre = document.querySelector('#newBookGenre').value;
	const newBook = new Book(bookName, bookAuthor, bookGenre)
	libraryBooks.push(newBook);

	


	// Call addBookToLibraryTable properly to add book to the DOM
	addBookToLibraryTable(newBook);
	
}

// Changes book patron information, and calls 
function loanBookToPatron(e) {
	e.preventDefault();

	// Get correct book and patron
	const strBookId = document.querySelector('#loanBookId').value
	const bookId = parseInt(strBookId, 10)
	const strCardNum = document.querySelector('#loanCardNum').value
	const cardNum = parseInt(strCardNum, 10)
	const book = libraryBooks[bookId]
	const patron = patrons[cardNum]



	// Add patron to the book's patron property
	book.patron = patron;

	// Add book to the patron's book table in the DOM by calling addBookToPatronLoans()
	if(book.patron == null){
		addBookToPatronLoans(book)
		book.setLoanTime()
	}else{
		console.log('Books has already been loaned out')
	}
	
	// Start the book loan timer.



	

}

// Changes book patron information and calls returnBookToLibraryTable()
function returnBookToLibrary(e){
	e.preventDefault();
	// check if return button was clicked, otherwise do nothing.
	if (e.target.classList.contains('return')) {
		// figure out which book it is clicking on 
		const strIndex = e.target.parentElement.parentElement.children[0].innerText;
		const index = parseInt(strIndex, 10);
		const book = libraryBooks[index];
	// Call removeBookFromPatronTable()
		// this call also needs to remove patron from library table
		removeBookFromPatronTable(book);

	// Change the book object to have a patron of 'null'
		book.patron = null;
	}


}

// Creates and adds a new patron
function addNewPatron(e) {
	e.preventDefault();

	// Add a new patron to global array
	const patronName = document.querySelector('#newPatronName').value;
	const patron = new Patron(patronName);
	patrons.push(patron);
	

	// Call addNewPatronEntry() to add patron to the DOM
	addNewPatronEntry(patron);

}

// Gets book info and then displays
function getBookInfo(e) {
	e.preventDefault();

	// Get correct book
	const strBookId = document.querySelector('#bookInfoId').value;
	const bookId = parseInt(strBookId, 10);
	const book = libraryBooks[bookId];
	// Call displayBookInfo()
	displayBookInfo(book);	

}


/*-----------------------------------------------------------*/
/*** DOM functions below - use these to create and edit DOM objects ***/

// Adds a book to the library table.
function addBookToLibraryTable(book) {
	// Add code here
	// obtain information from book 
	const bookId = libraryBooks.indexOf(book);
	const title = libraryBooks[bookId].title;
	var patronCardNumber = '';
	patronCardNumber = '';

	// create DOM objects and edit 
	const tableRow = document.createElement('tr');
	// bookId coloum 
	const bookIDLabel = document.createElement('td');
	const bookIDLabelText = document.createTextNode(bookId.toString());
	bookIDLabel.appendChild(bookIDLabelText);
	tableRow.appendChild(bookIDLabel);
	// title coloumn 
	const bookTitleLabel = document.createElement('td');
	const strong = document.createElement('STRONG');
	const bookTitleLabelText = document.createTextNode(title);
	bookTitleLabel.appendChild(strong);
	strong.appendChild(bookTitleLabelText);
	tableRow.appendChild(bookTitleLabel);
	// patron card number coloumn
	const bookPatronCardLabel = document.createElement('td');
	const bookPatronCardLabelText = document.createTextNode(patronCardNumber);
	bookPatronCardLabel.appendChild(bookPatronCardLabelText);
	tableRow.appendChild(bookPatronCardLabel);
	// add to the book library 
	const booktable = document.querySelector('#bookTable');
	const tableBody = booktable.children[0];
	tableBody.appendChild(tableRow);

	


}


// Displays deatiled info on the book in the Book Info Section
function displayBookInfo(book) {
	// Add code here
	const bookInfo = document.querySelector('#bookInfo');
	// change book id
	const oldBookId = bookInfo.children[0].children[0];
	bookInfo.children[0].removeChild(oldBookId);
	const span = document.createElement('span');
	const newBookId = document.createTextNode(book.bookId.toString());
	span.appendChild(newBookId);
	bookInfo.children[0].appendChild(span);
	
	// change title
	const oldBookTitle = bookInfo.children[1].children[0];
	bookInfo.children[1].removeChild(oldBookTitle);
	const span1 = document.createElement('span');
	const newBookTitle = document.createTextNode(book.title);
	span1.appendChild(newBookTitle);
	bookInfo.children[1].appendChild(span1);

	
	// change author
	const oldBookAuthor = bookInfo.children[2].children[0];
	bookInfo.children[2].removeChild(oldBookAuthor);
	const span2 = document.createElement('span');
	const newBookAuthor = document.createTextNode(book.author);
	span2.appendChild(newBookAuthor);
	bookInfo.children[2].appendChild(span2);

	// change genre
	const oldBookGenre = bookInfo.children[3].children[0];
	bookInfo.children[3].removeChild(oldBookGenre);
	const span3 = document.createElement('span');
	const newBookGenre = document.createTextNode(book.genre);
	span3.appendChild(newBookGenre);
	bookInfo.children[3].appendChild(span3);

	// change currently loaned out to
	const oldBookPatron = bookInfo.children[4].children[0];
	bookInfo.children[4].removeChild(oldBookPatron);
	const span4 = document.createElement('span');
	// see if patron is null for a book 
	var patronName = '';
	if (book.patron != null) {
		patronName = book.patron.name;
	}
	const newBookPatron = document.createTextNode(patronName);
	span4.appendChild(newBookPatron);
	bookInfo.children[4].appendChild(span4);




	



}

// Adds a book to a patron's book list with a status of 'Within due date'. 
// (don't forget to add a 'return' button).
function addBookToPatronLoans(book) {
	// Add code here
	const patrons = document.getElementById('patrons');
	const patron = patrons.children[book.patron.cardNumber];
	// change this patron's loan table
	const table = patron.children[3];
	const tableBody = table.children[0];
	// prepare table row
	
	const tableRow = document.createElement('tr');
	// book id 
	const td1 = document.createElement('td');
	const bookId = document.createTextNode(parseInt(book.bookId, 10));
	td1.appendChild(bookId);
	// book name 
	const td2 = document.createElement('td');
	const strong = document.createElement('strong');
	const bookName = document.createTextNode(book.title);
	strong.appendChild(bookName);
	td2.appendChild(strong);
	// due date 
	const td3 = document.createElement('td');
	const span = document.createElement('span');
	span.className = 'green';
	const dueDateLabel = document.createTextNode('Within due date');
	span.appendChild(dueDateLabel);
	td3.appendChild(span);
	// return button 
	const td4 = document.createElement('td');
	const button = document.createElement('button');
	button.className = 'return';
	const returnLabel = document.createTextNode('return');
	button.appendChild(returnLabel);
	td4.appendChild(button);
	// add all td to row
	tableRow.appendChild(td1);
	tableRow.appendChild(td2);
	tableRow.appendChild(td3);
	tableRow.appendChild(td4);

	// add table row to table body
	tableBody.appendChild(tableRow);
	
	// update the library table
	const index = book.bookId;
	const booktable = document.querySelector('#bookTable');
	const tableBody2 = booktable.children[0];
	const tableRow2 = tableBody2.children[index + 1];
	const tableData = tableRow2.children[2];
	tableRow2.removeChild(tableData);
	const newPatronCard = book.patron.cardNumber.toString();	
	const newText = document.createTextNode(newPatronCard);
	const newTd = document.createElement('td');
	newTd.appendChild(newText);
	tableRow2.append(newTd);










}

// Adds a new patron with no books in their table to the DOM, including name, card number,
// and blank book list (with only the <th> headers: BookID, Title, Status).
function addNewPatronEntry(patron) {
	// Add code here
	const newPatronClass = document.createElement('div');
	newPatronClass.className = 'patron';
	
	// name 
	const pObject = document.createElement('p');
	const pObjecttext = document.createTextNode('Name: ');
	pObject.appendChild(pObjecttext);
	const nameSpan = document.createElement('span');
	nameSpan.className = 'bold';
	const nameText= document.createTextNode(patron.name);
	nameSpan.appendChild(nameText);
	pObject.appendChild(nameSpan);
	newPatronClass.append(pObject);

	// card number 
	const pObject1 = document.createElement('p');
	const pObjecttext1 = document.createTextNode('Card Number: ');
	pObject1.appendChild(pObjecttext1);
	const nameSpan1 = document.createElement('span');
	nameSpan1.className = 'bold';
	const nameText1 = document.createTextNode(patron.cardNumber.toString());
	nameSpan1.appendChild(nameText1);
	pObject1.appendChild(nameSpan1);
	newPatronClass.append(pObject1);

	// label 
	const h4Object = document.createElement('h4');
	const h4Text = document.createTextNode('Books on loan:');
	h4Object.appendChild(h4Text);
	newPatronClass.append(h4Object);

	// loan table
	const table = document.createElement('table');
	table.className = 'patronLoansTable';
	const tableBody = document.createElement('tbody');
	table.append(tableBody);
	const tableRow = document.createElement('tr');
	tableBody.append(tableRow);
	const tableHeader1 = document.createElement('th');
	const tableHeader2 = document.createElement('th');
	const tableHeader3 = document.createElement('th');
	const tableHeader4 = document.createElement('th');
	const headerText1 = document.createTextNode('BookID');
	const headerText2 = document.createTextNode('Title');
	const headerText3 = document.createTextNode('Status');
	const headerText4 = document.createTextNode('Return');
	tableHeader1.append(headerText1);
	tableHeader2.append(headerText2);
	tableHeader3.append(headerText3);
	tableHeader4.append(headerText4);
	tableRow.append(tableHeader1);
	tableRow.append(tableHeader2);
	tableRow.append(tableHeader3);
	tableRow.append(tableHeader4);
	newPatronClass.append(table);



	// append patron to patrons 
	const patrons = document.querySelector('#patrons                    ');
	patrons.appendChild(newPatronClass);
	


}


// Removes book from patron's book table and remove patron card number from library book table
function removeBookFromPatronTable(book) {
	// Add code here
	
	// update the library table first
	const index = book.bookId;
	const booktable = document.querySelector('#bookTable');
	const tableBody2 = booktable.children[0];
	const tableRow2 = tableBody2.children[index + 1];
	const tableData = tableRow2.children[2];
	tableRow2.removeChild(tableData);
	const newPatronCard = '';	
	const newText = document.createTextNode(newPatronCard);
	const newTd = document.createElement('td');
	newTd.appendChild(newText);
	tableRow2.append(newTd);

	// update patron table; 
	const patrons = document.querySelector('#patrons');
	const patron = patrons.children[book.patron.cardNumber];
	const table = patron.children[3];
	const body = table.children[0];
	for (var i = 0; i < body.children.length; i++) {
		const tr = body.children[i];
		const td = tr.children[0];
		if (parseInt(td.innerText,10) == book.bookId) {
			body.removeChild(tr);
		}
	}

}

// Set status to red 'Overdue' in the book's patron's book table.
function changeToOverdue(book) {
	// Add code here

	// update patron table; 
	const patrons = document.querySelector('#patrons');
	const patron = patrons.children[book.patron.cardNumber];
	const table = patron.children[3];
	const body = table.children[0];
	for (var i = 0; i < body.children.length; i++) {
		const tr = body.children[i];
		const td = tr.children[0];
		if (parseInt(td.innerText,10) == book.bookId) {
			const status = tr.children[2];
			tr.removeChild(status);
			const span = document.createElement('span');
			span.className = 'red';
			// const label = document.createTextNode('Overdue');
			// span.appendChild(label);
			tr.insertBefore(span, tr.children[2]);
		}
	}

}