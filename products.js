import supabase from "./config.js";

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";

    animateSkills();
    animateStats();

    

  }, 1200); 
};


const btn1 = document.querySelector('#bg1');
const btn2 = document.querySelector('#bg2');
const btn3 = document.querySelector('#bg3');

btn1.onclick = () => document.body.style.background = "url('images/bg1.gif') no-repeat center/cover fixed";
btn2.onclick = () => document.body.style.background = "url('images/bg4.gif') no-repeat center/cover fixed";
btn3.onclick = () => document.body.style.background = "url('images/bg3.gif') no-repeat center/cover fixed";

document.addEventListener("mousemove", function(e) {
  const ring = document.createElement("div");
  ring.classList.add("ring");

  ring.style.left = e.clientX - 12.5 + "px";
  ring.style.top = e.clientY - 12.5 + "px";

  document.body.appendChild(ring);
  setTimeout(() => ring.remove(), 1000);
});


const products = [
  { name: "BTS Hoodie Purple", img: "images/purple.jpg", price: 5500 },
  { name: "BTS Hoodie Black", img: "images/black.webp", price: 5200 },
  { name: "BTS Album Proof", img: "images/album.jpg", price: 4200 },
  { name: "BTS Lightstick", img: "images/lightstick.jpeg", price: 6500 },

  { name: "BLACKPINK Hoodie Pink", img: "images/bpink.jpg", price: 5400 },
  { name: "BLACKPINK Hoodie Black", img: "images/bblack.jpg", price: 5300 },
  { name: "BLACKPINK Album Born Pink", img: "images/blackpinkalbulm.jfif", price: 4100 },
  { name: "BLACKPINK Lightstick", img: "images/blight.jpg", price: 6400 },

  { name: "BT21 Hoodie Cooky", img: "images/bt21hoodie.jfif", price: 5000 },
  { name: "BT21 Hoodie Tata", img: "images/bt21tata.webp", price: 5000 },
  { name: "BT21 Plush", img: "images/bt21plush.webp", price: 2800 },
  { name: "BT21 Bag", img: "images/bt21bag.jpg", price: 3200 },

  { name: "BTS T-Shirt", img: "images/btst-shirt.webp", price: 2200 },
  { name: "BLACKPINK T-Shirt", img: "images/blackpinkt-shirt.webp", price: 2300 },
  { name: "BTS Cap", img: "images/btscap.jpg", price: 1800 },
  { name: "BLACKPINK Cap", img: "images/blackpinkcap.jpg", price: 1800 },

  { name: "BTS Phone Case", img: "images/btscase.webp", price: 1500 },
  { name: "BLACKPINK Phone Case", img: "images/blackpinkphone.jpeg", price: 1500 },

  { name: "BTS Poster Set", img: "images/btsposter.jpg", price: 1200 },
  { name: "BLACKPINK Poster Set", img: "images/blackpinkposter.jpg", price: 1200 },
  { name: "BT21 Keychain", img: "images/bt21key.jpg", price: 900 },
  { name: "BT21 Mug", img: "images/bt21mug.jpg", price: 1600 },

  { name: "BTS Notebook", img: "images/btsnote.jpg", price: 1100 },
  { name: "BLACKPINK Notebook", img: "images/blackpinknote.webp", price: 1100 },
  { name: "BTS Badge Pack", img: "images/btspack.jpg", price: 800 },
  { name: "BLACKPINK Badge Pack", img: "images/blackpinkbadge.webp", price: 800 },

  { name: "BT21 Stickers", img: "images/bt21stick.jpg", price: 600 },
  { name: "BTS Pouch", img: "images/btspouch.jfif", price: 1700 },
  { name: "BLACKPINK Pouch", img: "images/blackpinkpouch.webp", price: 5600 }
];

const container = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");


function renderProducts(list) {
  container.innerHTML = "";

  list.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="product-card">
        <img src="${product.img}" class="w-100 mb-3">
        <h5>${product.name}</h5>
         <p class="price">PKR ${product.price}</p>
        <button class="btn btn-cart w-100 mt-2"
          onclick="addToCart('${product.name}')">
          Add to Cart 🛒
        </button>
      </div>
    `;

    container.appendChild(col);
  });
}


searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
});


async function addToCart(productName) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    Swal.fire("Login Required", "Please login first 💜", "warning");
    return;
  }

  const product = products.find(p => p.name === productName);

  if (!product) return;

  const { error } = await supabase.from("cart").insert({
    userId: user.id,
    product_name: product.name,
    product_img: product.img,
    product_price: product.price
  });

  if (error) {
    console.error(error);
    Swal.fire("Error", "Could not add to cart", "error");
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Added to Cart 🛒",
    text: product.name
  });
}

window.addToCart = addToCart;






async function greetUser() {
  const { data, error } = await supabase.auth.getUser()

  if(error){
    console.log("Error fetching user:", error)
    return
  }

  if(data && data.user){
    const userName = data.user.user_metadata.userName || "K-POP Fan"
    const nameSpan = document.getElementById('name')
    if(nameSpan) nameSpan.textContent = userName
  }
}



greetUser()



