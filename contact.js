import supabase from './config.js'

let namee = document.getElementById('name')
let email = document.getElementById('email')
let msg = document.getElementById('message')

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let formMsg = document.getElementById("formMessage");


    const { error } = supabase
  .from('contact')
  .insert({
    namee: namee.value,
     email:  email.value,
   message:  message.value 
   })

if(error) {
  console.log(error);

  
}

else {

   console.log('data sent');
}
    formMsg.innerText = "Your message has been sent successfully!";
    namee.value = ''
    email.value = ''
    message.value = ''


    
});



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