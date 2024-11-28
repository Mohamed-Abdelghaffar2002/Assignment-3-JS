let siteName = document.getElementById("siteName");
let siteURL = document.getElementById("siteURL");

let bookList = [];

if (localStorage.getItem("allBooks")) {
  bookList = JSON.parse(localStorage.getItem("allBooks"));
  displayBooks(bookList);
}

function addBook() {
  if (validName() && validateURL()) {
    let book = {
      name: siteName.value,
      URL: siteURL.value,
    };
    bookList.push(book);
    localStorage.setItem("allBooks", JSON.stringify(bookList));
    displayBooks(bookList);
    clearData();
  } else {
    window.alert(`
 + Site Name or Url is not valid, Please follow the rules below :

     - Site name must contain at least 3 characters
     - Site URL must be a valid one`);
  }
}

function displayBooks(list) {
  let container = "";
  for (let i = 0; i < list.length; i++) {
    container += `  <div
          class="table-header d-flex p-3 justify-content-around align-items-center"
        >
          <p class="sec text-center">${i + 1}</p>
          <p class="sec text-center">${list[i].name}</p>
          <div class="sec text-center">
            <button class="btn btn-success" onclick="visitURL(${i})">
              <i class="fa-regular fa-eye"></i> <a target="_blank" href="${list[i].URL}">Visit</a>
            </button>
          </div>
          <div class="sec text-center">
            <button class="btn btn-danger"  onclick="deleteItem(${i})">
              <i class="fa-solid fa-trash-can"></i> Delete
            </button>
          </div>
        </div>`;
  }
  document.getElementById("myData").innerHTML = container;
}

function clearData() {
  siteName.value = "";
  siteURL.value = "";

  siteName.classList.remove("is-invalid");
  siteName.classList.remove("is-valid");

  siteURL.classList.remove("is-invalid");
  siteURL.classList.remove("is-valid");
}

function deleteItem(index) {
  bookList.splice(index, 1);
  localStorage.setItem("allBooks", JSON.stringify(bookList));
  displayBooks(bookList);
}

function visitURL(index) {
    window.open(`${bookList[index].URL}`, "_blank");
}

function validName() {
  var regex = /^[a-zA-Z]{3,}$/;
  if (siteName.value == "") {
    siteName.classList.remove("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  } else if (regex.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    return false;
  }
}

function validateURL() {
  var regex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (siteURL.value == "") {
    siteURL.classList.remove("is-invalid");
    siteURL.classList.remove("is-valid");
    return false;
  } else if (regex.test(siteURL.value)) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
    return true;
  } else {
    siteURL.classList.remove("is-valid");
    siteURL.classList.add("is-invalid");
    return false;
  }
}
