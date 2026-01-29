import supabase from "./config.js";


window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";

    animateSkills();
    animateStats();

    

  }, 1200); 
};


const cartContainer = document.getElementById("cartContainer");

async function loadCart() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    cartContainer.innerHTML = "<p>Please login to view cart 💜</p>";
    return;
  }

  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("userId", user.id);

  if (error) {
    console.error(error);
    return;
  }

  if (data.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 😢</p>";
    return;
  }

  cartContainer.innerHTML = "";

  data.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="product-card">
        <img src="${item.product_img}" class="w-100 mb-3">
        <h5>${item.product_name}</h5>
        <p class="price">PKR ${item.product_price}</p>
      </div>
    `;

    cartContainer.appendChild(col);
  });
}

loadCart();



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

    Swal.fire({
      title: `Hello ${userName}! 💜`,
      text: "Welcome back to K-POP MERCH HUB 🎶✨",
      icon: 'success',
      background: '#1C1C27',
      color: '#FF4ECF',
      confirmButtonColor: '#FF4ECF'
    })
  }
}



greetUser()