const myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.ID = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
    console.log(`${this.title} 的阅读状态已切换为: ${this.read ? '已读' : '未读'}`);
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

const book1 = new Book('四世同堂', '老舍', true);
const book2 = new Book('生死疲劳', '莫言', false);

addBookToLibrary(book1);
addBookToLibrary(book2);

function displayBooks() {
    const bookContainer = document.querySelector('#book-container');

    // 清空容器，避免重复显示
    bookContainer.innerHTML = '';

    // 遍历书籍数组并显示每一本书
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index); // 保存索引，便于后续操作
        
        // 创建书籍信息HTML
        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.read ? '已读' : '未读'}</p>
        <button class="toggle-read-btn">标记为${book.read ? '未读' : '已读'}</button>
        <button class="remove-btn">删除</button>
        `;

        bookContainer.appendChild(bookCard);
    })
}

const addBookBtn = document.querySelector('#add-book-btn');
const dialog = document.querySelector('#book-form-dialog');
const bookForm = document.querySelector('#add-book-form');
const cancelDialogBtn = document.querySelector('#cancel-dialog-btn');

// 打开dialog
addBookBtn.addEventListener('click', () => {
    dialog.showModal();
})

// 关闭dialog
cancelDialogBtn.addEventListener('click', () => {
    dialog.close();
    bookForm.reset();
})

// 表单提交处理
bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 阻止表单默认提交

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const read = document.querySelector('#read').checked;

    const newBook = new Book(title, author, read);
    addBookToLibrary(newBook);
    displayBooks();

    dialog.close();
    bookForm.reset();
})


const bookContainer = document.querySelector('#book-container');

bookContainer.addEventListener('click', (e) => {
    // 删除选择的书籍
    if (e.target.classList.contains('remove-btn')) {
        const bookCard = e.target.closest('.book-card');
        const bookIndex = bookCard.dataset.index;

        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }

    // 切换阅读状态
    if (e.target.classList.contains('toggle-read-btn')) {
        const bookCard = e.target.closest('.book-card');
        const bookIndex = bookCard.dataset.index;
    
        myLibrary[bookIndex].toggleReadStatus();
        displayBooks();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
})