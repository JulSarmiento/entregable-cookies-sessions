const tableBody = document.querySelector('.table-body');
const messageBox = document.querySelector('#messages-box');

const {schema, normalize, denormalize} = normalizr;

const authorSchema = new schema.Entity('author', {}, {idAttribute: 'id'});

// Print products
const createProductRow = (product) => {
  const row = document.createElement('tr');
  row.classList.add('table-row');
  row.innerHTML = `
    <td class="table-cell">${product.productName}</td>
    <td class="table-cell">${product.productPrice}</td>
    <td class="table-cell">
      <img src="${product.productImage}" alt="${product.productName}" class="table-image">
    </td>
  `;
  return row;
}

const printPRoducts = (products) => {  
  products.forEach((product) => {
    tableBody.insertAdjacentElement('beforeend', createProductRow(product));
  });
};

// Print messages
const createMessageRow = (data) => {
  const { author, message, timestamp} = data;
  const row = document.createElement('li');
  row.classList.add('message-row');
  row.innerHTML = `
    <p class="message-email">${author.email}</p>
    <p class="message-time">(${timestamp}): </p>
    <p class="message-message">${message}</p>
    <img src="${author.picture}" height="50px">
  `;
  return row;
}

const printMessages = (messages) => {
  console.log('messages in print', messages)
  messages.forEach((message) => {
    messageBox.insertAdjacentElement('beforeend', createMessageRow(message));
  });
};

const products = fetch('/api/products-test')
  .then((response) => response.json())
  .then(({data}) => {
    console.log('products in fecth', data)
    printPRoducts(data);
  });

const messages = fetch('/api/messages')
  .then((response) => response.json())
  .then(({data: {result, entities}}) => {
    console.log('message in fetch', entities)
    const denormData = denormalize(result, [authorSchema], entities);
    printMessages(denormData);
  });
