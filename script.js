let data = [];

window.onload = getFromCrud;

function getFromCrud() {
  axios.get("https://crudcrud.com/api/24075e42b098458085515535d9e7d740/products")
  .then((response) => {
    const products = response.data;
    render(products);
  })
  .catch((err) => {
    console.log(err);
  });
}

function postToCrud(obj) {
  axios.post("https://crudcrud.com/api/24075e42b098458085515535d9e7d740/products", obj)
  .then((response) => {
    const newProduct = response.data;
    data.push(newProduct);
    render(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

function deleteFromCrud(id) {
  axios.delete(`https://crudcrud.com/api/24075e42b098458085515535d9e7d740/products/${id}`)
  .then((response) => {
    console.log(`Product with ID ${id} deleted`);
    getFromCrud(); // refresh the list
  })
  .catch((err) => {
    console.log(err);
  });
}

const submitbtn = document.getElementById("submitbtn");
submitbtn.addEventListener("click", (event) => add(event));

function add(event) {

    event.preventDefault();
    const name = document.getElementById("name");
    const price = document.getElementById("price");
    const category = document.getElementById("category");

    if (name && price && category) {
        const dataObj = {
        name: name.value,
        price: price.value,
        category: category.value,
        };
        postToCrud(dataObj);
    } else {
        console.error("One or more form elements are missing");
    }
    getFromCrud()
}

function render(products) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    products.forEach((product) => {
      const tablerow = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = product.name;
      const priceCell = document.createElement("td");
      priceCell.textContent = product.price;
      const categoryCell = document.createElement("td");
      categoryCell.textContent = product.category;
      const deleteCell = document.createElement("td");
      const deletebtn = document.createElement("button");
      deletebtn.textContent = "Delete";
      deletebtn.setAttribute("productId", product._id);
      deletebtn.addEventListener("click", () => {
        deleteFromCrud(product._id);
      });
      deleteCell.appendChild(deletebtn);
      tablerow.appendChild(nameCell);
      tablerow.appendChild(priceCell);
      tablerow.appendChild(categoryCell);
      tablerow.appendChild(deleteCell);
      tableBody.appendChild(tablerow);
    });
  }
  