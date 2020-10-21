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
	const book_name = document.querySelector('#newBookName').value;
	const book_author = document.querySelector('#newBookAuthor').value;
	const book_genre = document.querySelector('#newBookGenre').value;
	const new_book = new Book(book_name, book_author, book_genre)
	libraryBooks.push(new_book);


	// Call addBookToLibraryTable properly to add book to the DOM
	addBookToLibraryTable(new_book);
	
}

// Changes book patron information, and calls 
function loanBookToPatron(e) {
	e.preventDefault();

	// Get correct book and patron
	const str_BookId = document.querySelector('#loanBookId').value;
	const bookId = parseInt(str_BookId, 10);
	const str_card = document.querySelector('#loanCardNum').value;
	const card = parseInt(str_card, 10);
	const book = libraryBooks[bookId];
	const patron = patrons[card];

	// Add patron to the book's patron property
	

	// Add book to the patron's book table in the DOM by calling addBookToPatronLoans()
	if (book.patron == null){
		book.patron = patron
		addBookToPatronLoans(book)
		book.setLoanTime()
	}else{
		console.log('Book has been loaned out')
	}
	

	// Start the book loan timer.
	

}

// Changes book patron information and calls returnBookToLibraryTable()
function returnBookToLibrary(e){
	e.preventDefault();
	// check if return button was clicked, otherwise do nothing.
	if (e.target.classList.contains('return')) {
		console.log('Return this book to library')
		const strIndex = e.target.parentElement.parentElement.children[0].innerText;
		const index = parseInt(strIndex, 10);
		const book = libraryBooks[index];
	// Call removeBookFromPatronTable()
		removeBookFromPatronTable(book);

	// Change the book object to have a patron of 'null'
		book.patron = null;
	}
}

// Creates and adds a new patron
function addNewPatron(e) {
	e.preventDefault();

	// Add a new patron to global array
	const patron_name = document.querySelector('#newPatronName').value
	const patron = new Patron(patron_name)
	patrons.push(patron)

	// Call addNewPatronEntry() to add patron to the DOM'
	addNewPatronEntry(patron)

}

// Gets book info and then displays
function getBookInfo(e) {
	e.preventDefault();

	// Get correct book
	const str_id = document.querySelector('#bookInfoId').value
	const book_id = parseInt(str_id, 10)
	const book = libraryBooks[book_id]	


	// Call displayBookInfo()
	displayBookInfo(book)	

}


/*-----------------------------------------------------------*/
/*** DOM functions below - use these to create and edit DOM objects ***/

// Adds a book to the library table.
function addBookToLibraryTable(book) {
	// Add code here
	const row = bookTable.insertRow(libraryBooks.length)
	const id = row.insertCell(0)
	id.appendChild(document.createTextNode(book.bookId))
	const title = row.insertCell(1)
	const bold = document.createElement('strong')
	const bold_title = document.createTextNode(book.title)
	bold.appendChild(bold_title)
	title.appendChild(bold)
	
	const patron = row.insertCell(2)
	//patron.appendChild(document.createTextNode(book.patron))

}

// Helper function to create span
function create_span(text){
	const span = document.createElement('span')
	const span_text = document.createTextNode(text)
	span.appendChild(span_text)
	return span
}
// Displays deatiled info on the book in the Book Info Section
function displayBookInfo(book) {
	 // Add code here
	    const current_e = document.querySelector('#bookInfo')

	    //Book Id
	    const bookId = current_e.children[0].children[0]
		console.log(book)
	    current_e.children[0].replaceChild(create_span(book.bookId), bookId)
	
	    //Book Title
	    const bookTitle = current_e.children[1].children[0]
	    current_e.children[1].replaceChild(create_span(book.title), bookTitle)
	
	    //Book Author
	    const bookAuthor = current_e.children[2].children[0]
	    current_e.children[2].replaceChild(create_span(book.author), bookAuthor)
	
	    //Book Genre
	    const bookGenre = current_e.children[3].children[0]
	    current_e.children[3].replaceChild(create_span(book.genre), bookGenre)
	
	    //Book Patron
	    const bookPatron = current_e.children[4].children[0]
	    if (book.patron != null) {
	        current_e.children[4].replaceChild(create_span(book.patron.name), bookPatron)
	    } else {
	        current_e.children[4].replaceChild(create_span('N/A'), bookPatron)
	    }

}

// Helper function to create strong
function create_strong(text){
	const strong = document.createElement('strong')
	const text_name = document.createTextNode(text)
	strong.appendChild(text_name)
	return strong
}
// Adds a book to a patron's book list with a status of 'Within due date'. 
// (don't forget to add a 'return' button).
function addBookToPatronLoans(book) {
	// Add code here
	const patrons = document.querySelector('#patrons');
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
	td2.appendChild(create_strong(book.title));
	// due date 
	const td3 = document.createElement('td');
	const span = create_span('Within due date')
	span.className = 'green'
	td3.appendChild(span);
	// return button 
	const td4 = document.createElement('td');
	const button = document.createElement('button');
	button.className = 'return';
	const return_label = document.createTextNode('return');
	button.appendChild(return_label);
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
// and blank book list (with only the <th> headers: _id, Title, Status).
function addNewPatronEntry(patron) {
	// Add code here
	const new_patron = document.createElement('div')
	new_patron.className = 'patron'
	
	// name 
	const patron_object = document.createElement('p')
	const patron_object_text = document.createTextNode('Name: ')
	patron_object.appendChild(patron_object_text)
	const span_name = create_span(patron.name)
	span_name.className = 'bold'
	patron_object.appendChild(span_name)
	new_patron.appendChild(patron_object)

	// card number 
	const patron_object1 = document.createElement('p')
	const patron_object_text1 = document.createTextNode('Card Number: ')
	patron_object1.appendChild(patron_object_text1)
	const span_name1 = create_span(patron.cardNumber.toString())
	span_name1.className = 'bold'
	patron_object1.appendChild(span_name1)
	new_patron.appendChild(patron_object1)

	// label 
	const h4Object = document.createElement('h4')
	const h4Text = document.createTextNode('Books on loan:')
	h4Object.appendChild(h4Text)
	new_patron.appendChild(h4Object)

	// loan table
	const table = document.createElement('table')
	table.className = 'patronLoansTable'
	const tableBody = document.createElement('tbody')
	table.appendChild(tableBody)
	const tableRow = document.createElement('tr')
	tableBody.appendChild(tableRow)
	const _id = document.createElement('th')
	const title = document.createElement('th')
	const status = document.createElement('th')
	const Return = document.createElement('th')
	const _id_text = document.createTextNode('BookID')
	const title_text = document.createTextNode('Title')
	const status_text = document.createTextNode('Status')
	const Return_text = document.createTextNode('Return')
	_id.appendChild(_id_text)
	title.appendChild(title_text)
	status.appendChild(status_text)
	Return.appendChild(Return_text)
	tableRow.appendChild(_id)
	tableRow.appendChild(title)
	tableRow.appendChild(status)
	tableRow.appendChild(Return)
	new_patron.appendChild(table)



	// appendChild patron to patrons 
	const patrons = document.querySelector('#patrons')
	patrons.appendChild(new_patron)


}


// Removes book from patron's book table and remove patron card number from library book table
function removeBookFromPatronTable(book) {
	// Add code here
	const patrons = document.querySelector('#patrons')
	const patron = patrons.children[book.patron.cardNumber]
	const table = patron.children[3]
	const body = table.children[0]
	for (let i = 0; i < body.children.length; i++) {
		const tr = body.children[i]
		const td = tr.children[0]
		if (parseInt(td.innerText,10) == book.bookId) {
			const book_row = bookTable.children[0].children[book.bookId + 1]
			const book_td = document.createElement('td')
			book_row.replaceChild(book_td, book_row.children[2])
			table.children[0].deleteRow(i)
			book.patron = null
		}
	}

}

// Set status to red 'Overdue' in the book's patron's book table.
function changeToOverdue(book) {
	// Add code here
	const patrons = document.querySelector('#patrons')
	const patron = patrons.children[book.patron.cardNumber]
	const table = patron.children[3]
	const body = table.children[0]
	for (let i = 0; i < body.children.length; i++) {
		const tr = body.children[i]
		const td = tr.children[0]
		if (parseInt(td.innerText,10) == book.bookId) {
			const status = tr.children[2]
			const span = create_span('Overdue')
			span.className = 'red'
			const mid_span = document.createElement('td')
			mid_span.appendChild(span)
			tr.replaceChild(mid_span, status)
		}
	}


}

