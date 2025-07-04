const cards = document.querySelector(".cards");
let totalItemsInCart = 0;
const CountCart = document.querySelector(".CountCart");
const cartBox = document.querySelector(".CartBox");
const OrderTotal = document.querySelector(".OrderTotal");
const OrderTotal2 = document.querySelector(".OrderTotal2");
const cartItems = new Map();
const ConfirmOrder = document.querySelector(".ConfirmOrder");
const OrderPass = document.querySelector(".OrderPass");
const bluur = document.querySelector(".bluur");

function updateTotalOrderPrice() {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.count;
  });
  OrderTotal2.innerHTML = `$${total.toFixed(2)}`;
}

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element, index) => {
      const card = document.createElement("div");
      card.className =
        "card sm:w-[90%] md:w-[48%] lg:w-[50%] xl:w-[53%] 2xl:w-[235px]";
      card.innerHTML = `
        <div class="2xl:w-[235px] xl:w-[260px] lg:w-[350px] md:w-[350px] w-[250px]">
          <div class="relative w-full flex justify-center items-center">
            <img src="${element.image.desktop}" alt="imageProduct"
              class="rounded-lg addBod w-full md:max-w-[500px] lg:max-w-[500px] max-w-[500px] h-[160px] md:h-[220px] lg:h-[220px] xl:max-w-[260px] 2xl:max-w-[235px]" />
            <div class="addCartBlock transition-all duration-300 opacity-100 absolute -bottom-5 left-1/2 -translate-x-1/2 mb-2 lg:py-2 md:py-3 py-2 px-6 2xl:w-[140px] xl:w-[120px] lg:w-[190px] md:w-[190px] w-[170px] items-center z-10 bg-white border-rose-300 border-1 hover:border-rose-700 2xl:p-2 xl:p-1 2xl:px-4 xl:px-3 rounded-full cursor-pointer">
              <div class="flex items-center gap-2 addCartBu justify-center">
                <img draggable="false" src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart.svg" class="2xl:w-[18px] xl:w-[15px] lg:w-[14px] sm:w-[14px]">
                <button class="font-semibold 2xl:text-sm xl:text-[12px] lg:text-[11px] sm:text-[11px] cursor-pointer">Add To Cart</button>
              </div>
            </div>
            <div class="toggleCard transition-all duration-300 opacity-0 absolute -bottom-5 left-1/2 -translate-x-1/2 mb-2 lg:py-2 2xl:w-[140px] xl:w-[120px] lg:w-[100px] w-[170px] md:py-2 z-10 bg-[hsl(14,86%,42%)] p-2 px-4 rounded-full hidden">
              <div class="flex items-center justify-between gap-2 lg:gap-x-3">
                <img draggable="false" src="assets/images/icon-decrement-quantity.svg" class="dec cursor-pointer border-1 rounded-full w-5 h-5 border-white p-1">
                <p class="text-white font-bold text-sm count">1</p>
                <img draggable="false" src="assets/images/icon-increment-quantity.svg" class="inc cursor-pointer border-1 border-white w-5 h-5 rounded-full p-1 bg-[hsl(14,86%,42%)]">
              </div>
            </div>
          </div>
          <div class="mt-7 flex flex-col w-full !text-start !items-start">
            <p class="opacity-60 text-sm lg:text-[12px]">${element.category}</p>
            <h4 class="font-semibold lg:text-[14px]">${element.name}</h4>
            <p class="text-[hsl(14,86%,42%)] font-bold lg:text-[13px]">$${element.price.toFixed(2)}</p>
          </div>
        </div>
      `;

      cards.appendChild(card);

      const addCartBlock = card.querySelector(".addCartBlock");
      const toggleCard = card.querySelector(".toggleCard");
      const inc = card.querySelector(".inc");
      const dec = card.querySelector(".dec");
      const countText = card.querySelector(".count");
      const item = document.querySelector(".ListItem");
      const addBod = card.querySelector(".addBod");

      let piece, spanQuan, spanProduct, hr;
      let count = 1;
      const productId = element.id || index;

      addCartBlock.addEventListener("click", () => {
        count = 1;
        countText.textContent = count;

        addCartBlock.classList.add("opacity-0", "hidden");
        toggleCard.classList.remove("hidden");
        addBod.classList.add("border-2", "border-rose-800");
        cartBox.style.display = "none";
        OrderTotal.style.display = "block";
        item.classList.remove("hidden");

        piece = document.createElement("div");
        piece.className = "flex justify-between items-center mt-6";
        piece.innerHTML = `
          <div class="part1">
            <h4 class="font-semibold">${element.name}</h4>
            <div class="flex gap-x-5 mt-1">
              <span class="text-[hsl(14,86%,42%)] font-bold"><span class="spanQuan">${count}</span>x</span>
              <span class="opacity-60 font-semibold">@\$${element.price.toFixed(2)}</span>
              <span class="font-bold opacity-80">\$<span class="spanProduct">${(element.price * count).toFixed(2)}</span></span>
            </div>
          </div>
          <div class="part2 w-6 h-6 border-1 cursor-pointer rounded-full flex p-1">
            <img src="assets/images/icon-remove-item.svg" class="removeItem" />
          </div>
        `;

        spanQuan = piece.querySelector(".spanQuan");
        spanProduct = piece.querySelector(".spanProduct");
        const removeItem = piece.querySelector(".removeItem");

        hr = document.createElement("hr");
        hr.className = "mt-4 text-gray-300";

        cartItems.set(productId, {
          price: element.price,
          count,
          name: element.name,
          image: element.image.desktop,
        });

        item.appendChild(piece);
        item.appendChild(hr);

        totalItemsInCart += count;
        CountCart.textContent = totalItemsInCart;
        updateTotalOrderPrice();

        removeItem.addEventListener("click", () => {
          totalItemsInCart -= cartItems.get(productId).count;
          CountCart.textContent = totalItemsInCart;
          addBod.classList.remove("border-2", "border-rose-800");
          cartItems.delete(productId);
          updateTotalOrderPrice();

          piece.remove();
          hr.remove();
          toggleCard.classList.add("hidden");
          addCartBlock.classList.remove("opacity-0", "hidden");

          if (totalItemsInCart === 0) {
            cartBox.style.display = "flex";
            OrderTotal.style.display = "none";
            item.classList.add("hidden");
          }
        });

        setTimeout(() => {
          toggleCard.classList.add("opacity-100");
        }, 10);
      });

      inc.addEventListener("click", () => {
        if (count < 15) {
          count++;
          countText.textContent = count;
          totalItemsInCart++;
          CountCart.textContent = totalItemsInCart;

          if (spanQuan && spanProduct) {
            spanQuan.textContent = count;
            spanProduct.textContent = (element.price * count).toFixed(2);
          }

          cartItems.set(productId, {
            price: element.price,
            count,
            name: element.name,
            image: element.image.desktop,
          });

          updateTotalOrderPrice();
        }
      });

      dec.addEventListener("click", () => {
        if (count > 1) {
          count--;
          countText.textContent = count;
          totalItemsInCart--;
          CountCart.textContent = totalItemsInCart;

          if (spanQuan && spanProduct) {
            spanQuan.textContent = count;
            spanProduct.textContent = (element.price * count).toFixed(2);
          }

          cartItems.set(productId, {
            price: element.price,
            count,
            name: element.name,
            image: element.image.desktop,
          });

          updateTotalOrderPrice();
        }
      });

      const startOrder = document.querySelector(".startOrder");
      startOrder.addEventListener("click", () => {
        OrderPass.classList.add("hidden");
        bluur.classList.add("hidden");
        toggleCard.classList.add("hidden");
        addCartBlock.classList.remove("opacity-0", "hidden");
        addBod.classList.remove("border-2", "border-rose-800");
        cartBox.style.display = "flex";
        OrderTotal.style.display = "none";
        item.classList.add("hidden");
        cartItems.delete(productId);
        totalItemsInCart = 0;
        CountCart.textContent = totalItemsInCart;
        piece.remove();
        hr.remove();
      });
    });
  });

const List2Items = document.querySelector(".List2Items");
ConfirmOrder.addEventListener("click", () => {
  List2Items.innerHTML = "";
  OrderPass.classList.remove("hidden");
  document.querySelector(".blur-bg").classList.remove("hidden");
  let totalPrice = 0;
  setTimeout(()=>{
    OrderPass.classList.remove("opacity-0","scale-90");
    OrderPass.classList.add("opacity-100", "scale-100");
  },200)
  cartItems.forEach((item) => {
    const { price, count, name, image } = item;
    totalPrice += price * count;

    const ListItem2 = document.createElement("div");
    ListItem2.className = "p-3 flex items-center justify-between w-full";
    ListItem2.innerHTML = `
      <div class="flex gap-x-4 items-start">
        <div class="2xl:w-13 2xl:h-13 w-10 h-10 shrink-0">
          <img src="${image}" alt="picItem" class="mt-1 rounded-lg w-full h-full object-cover" />
        </div>
        <div class="flex flex-col items-start justify-start">
          <h4 class="font-semibold 2xl:text-md text-[14px]">${name}</h4>
          <div class="flex gap-x-3 mt-1">
            <span class="text-[hsl(14,86%,42%)] font-bold text-sm">${count}x</span>
            <span class="opacity-60 font-semibold 2xl:text-md text-sm">\$${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div>
        <span class="font-bold 2xl:text-lg text-sm">\$${(price * count).toFixed(2)}</span>
      </div>
    `;

    const hr2 = document.createElement("hr");
    hr2.classList.add("border-t", "border-gray-300", "w-full");

    List2Items.appendChild(ListItem2);
    List2Items.appendChild(hr2);
  });

  const PriceTotal = document.querySelector(".PriceTotal");
  PriceTotal.innerHTML = `$${totalPrice.toFixed(2)}`;
});
