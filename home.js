import supabase from './config.js'

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


 const roles=[  "Welcome to K-POP Merch Hub",
  "Premium K-POP Merchandise",
  "Designed for Global Fans",
  "Authentic • Trendy • Stylish",
  "Your Ultimate K-POP Store"];
let i=0,j=0,del=false;
const typing=document.getElementById("typing");
setInterval(()=>{
  typing.innerText=roles[i].slice(0,j);
  if(!del) j++; else j--;
  if(j===roles[i].length) del=true;
  if(j===0 && del){del=false;i=(i+1)%roles.length;}
},120);






function animateSkills(){
  const bars=document.querySelectorAll(".bar div");
  bars[0].style.width="95%";
  bars[1].style.width="92%";
  bars[2].style.width="88%";
  bars[3].style.width="90%";
  bars[4].style.width="80%";
}



const themeToggle=document.getElementById("themeToggle");
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("light-mode");
});




