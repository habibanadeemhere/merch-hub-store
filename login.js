import supabase from './config.js'

let email = document.getElementById('exampleInputEmail')
let password = document.getElementById('exampleInputPassword')
let loginForm = document.getElementById('loginForm')

async function login(e){
  e.preventDefault()
  console.log(email.value, password.value)

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password!',
        background: '#1C1C27',
        color: '#FF4ECF',
        confirmButtonColor: '#FF4ECF'
      })
      return
    }

    if(data.user){
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'Login successful 💜',
        background: '#1C1C27',
        color: '#FF4ECF',
        confirmButtonColor: '#FF4ECF'
      }).then(() => {
        email.value = ''
        password.value = ''
        location.href = 'home.html'
      })
    }

  } catch(err){
    console.log(err)
  }
}

loginForm.addEventListener('submit', login)
