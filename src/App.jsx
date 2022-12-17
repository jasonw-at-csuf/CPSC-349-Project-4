// function App() {
//   return (
//     <div className=" text-xl">
//       asdf
//     </div>
//   )
// }

// export default App

const USERNAME = 'email@email.com'
const PASSWORD = 'poggers123'

const pb = new PocketBase('https://cpsc349project4.fly.dev')
const root = ReactDOM.createRoot(document.getElementById('root'))

let isLoggedIn = false

root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
)

function App () {
  return (
    <div className='App'>
      <h1>Welcome to Tic Tac Toe</h1>
      {/* <h3>Hello, {authData.record.email}</h3> */}
    </div>
  )
}

function SignUp () {
    let email, password, confirmPassword = ''
    
    const handleSubmit = async event => {
      event.preventDefault();
      console.log('Sign Up Submitted');
      console.log(email)
      console.log(password)

      
      let data = await pb.collection('users').create({
        email:            email,
        password:         password,
        passwordConfirm:  confirmPassword,
      })

      console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            {/* Email */}
            <label for="email">Email </label>
            <input type="email" id="email" placeholder="Email Address"
            onChange={event=>email=event.target.value}></input>

            {/* Password */}
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password"
            onChange={event=>password=event.target.value}></input>

            {/* Confirm Password */}
            <label for="passwordConfirm">Confirm Password</label>
            <input type="password" id="password" placeholder="Confirm Password"
            onChange={event=>confirmPassword=event.target.value}></input>

            {/* Submission */}
            <input type="submit" id="submitBtn" value="Submit"></input>
        </form>
    )
}

function Login () {
  let email, password = ''
    
  const handleSubmit = async event => {
    event.preventDefault();
    console.log('Log In Submitted');
    console.log(email)
    console.log(password)

    let authData = await pb.collection('users').authWithPassword(
      email, 
      password
      );
    if(authData != 400){
      console.log("isLoggedIn")
      isLoggedIn = true
    }
  }

  return (
      <>
      <form onSubmit={handleSubmit}>
          <h2>Log In</h2>

          {/* Email */}
          <label for="email">Email </label>
          <input type="email" id="email" placeholder="Email Address"
          onChange={event=>email=event.target.value}></input>

          {/* Password */}
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password"
          onChange={event=>password=event.target.value}></input>

          {/* Submission */}
          <input type="submit" id="submitBtn" value="Submit"></input>
      </form>
      <button type="button">Register</button>
      </>
  )
}
