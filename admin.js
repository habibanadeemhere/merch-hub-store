import supabase from "./config.js";

async function checkRole() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    Swal.fire({
      icon: "warning",
      title: "Please login first",
      text: "You must login to access this page",
      confirmButtonColor: "#FF4ECF"
    }).then(() => {
      window.location.href = "login.html";
    });
    return;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("role")
    .eq("userId", user.id)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  if (profile.role !== "admin") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Access Denied!",
      confirmButtonColor: "#FF4ECF"
    }).then(() => {
      window.location.href = "home.html";
    });
    return;
  }

  loadUsers(); 
}

async function loadUsers() {
  const { data: users, error } = await supabase
    .from('users')
    .select('user_id, username, email, created_at');

  if (error) {
    console.log("Error fetching users:", error);
    return;
  }

  const table = document.getElementById('usersTable');
  table.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.user_id}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
       <td>${user.created_at}</td>
    `;
    table.appendChild(row);
  });
}

checkRole();
