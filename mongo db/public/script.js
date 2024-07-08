let usersList = document.getElementById("usersList");
let ordersOfUser = document.getElementById("ordersOfUser");
let orders = document.getElementById("orders");

const getUsers = async () => {
  try {
    let response = await fetch("/get-users");
    let data = await response.json();
    data.forEach((element) => {
      let li = document.createElement("li");
      li.innerText = element.name;
      li.addEventListener("click", async () => {
        console.log(element._id);
        let responseOrders = await fetch(`/get-users-orders/${element._id}`);
        let dataOrders = await responseOrders.json();
        console.log(dataOrders);
        ordersOfUser.innerText = dataOrders.name;
        orders.innerHTML = ''
        dataOrders.orders.forEach((order) => {
          let li = document.createElement("li");
          li.innerHTML = `<p>${order.product}</p><p>${order.price}</p><p>${order.quantity}</p>`;
          orders.appendChild(li);
        });
      });
      usersList.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
};

getUsers();
