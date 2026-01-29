import supabase from './config.js'

const userName = document.getElementById('name')
const email = document.getElementById('exampleInputEmail1')
const password = document.getElementById('exampleInputPassword1')
const signupForm = document.getElementById('myForm')

async function register(e) {
  e.preventDefault()

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        userName: userName.value,
        role: 'user' 
      }
    }
  })

  if (error) {
    alert(error.message)
    return
  }

  const user = data.user

  const { error: dbError } = await supabase
    .from('users')
    .insert({
      user_id: user.id,       
       userId: user.id,       
      username: user.user_metadata.userName,
      email: user.email,
      role: user.user_metadata.role
    })

  if (dbError) {
    console.log(dbError.message)
  } else {
    alert('Signup successful! Now login.')
    window.location.href = 'login.html'
  }
}

signupForm.addEventListener('submit', register)
