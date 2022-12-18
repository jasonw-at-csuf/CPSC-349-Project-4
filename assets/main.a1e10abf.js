import{A as u,r as n,j as e,a as c,c as g,F as p,b as w,R as S}from"./index.cc80b2e2.js";const y=()=>{const o=new u("https://cpsc349project4.fly.dev"),[r,l]=n.exports.useState(""),i=async t=>{const a=await o.collection("games").create({board_state:JSON.stringify(g(3)),player_1:[o.authStore.model.id],turn:"X"});window.location.href=`game.html?gameId=${a.id}`};return e("div",{className:"bg-amber-100 outline outline-amber-900 outline-8 w-5/6 sm:w-2/5 p-5 flex flex-col justify-center items-center",children:c("form",{className:"flex flex-col",onSubmit:async t=>{t.preventDefault();try{const a=await o.collection("games").getOne(r);if(console.debug(`Joining room ${a.id}`),console.log(a),a.player_2.length==0||a.player_1[0]==o.authStore.model.id)a.player_1[0]!=o.authStore.model.id&&await o.collection("games").update(a.id,{player_2:[o.authStore.model.id]}),window.location.href=`game.html?gameId=${a.id}`;else throw Error("Room is full")}catch(a){alert(`An error occured while joining room: ${a}`)}},children:[c("p",{className:"text-m font-bold outline rounded outline-amber-900 w-64 my-5",children:["Authenticated as: ",o.authStore.model.email]}),e("button",{className:"btn w-full m-0",onClick:t=>{t.preventDefault(),i()},children:"Create Room"}),e("div",{className:"text-xl my-2",children:"OR"}),e("input",{value:r,onChange:t=>l(t.target.value),type:"text",className:"form-input w-full mx-0"}),e("input",{type:"submit",id:"submitBtn",value:"Join with code",className:"btn w-full mx-0"}),e("button",{className:"btn w-full m-0 bg-transparent text-xs",onClick:t=>{t.preventDefault(),o.authStore.clear(),window.location.href="/"},children:"Logout"})]})})},v=o=>{const r=new u("https://cpsc349project4.fly.dev"),[l,i]=n.exports.useState(""),[s,t]=n.exports.useState("");return e(p,{children:c("div",{className:"form-container",children:[c("form",{onSubmit:async m=>{m.preventDefault(),await r.collection("users").authWithPassword(l,s)!=400?(console.log("isLoggedIn"),o.checkLogin("true")):alert("ERROR")},className:"form",children:[e("h2",{className:"form-h2",children:"Log In"}),c("label",{htmlFor:"email",className:"form-label",children:["Email"," "]}),e("input",{value:l,onChange:m=>i(m.target.value),type:"email",placeholder:"Email Address",id:"email",name:"email",className:"form-input"}),e("label",{htmlFor:"password",className:"form-label",children:"Password"}),e("input",{value:s,onChange:m=>t(m.target.value),type:"password",placeholder:"Password",id:"password",name:"password",className:"form-input"}),e("input",{type:"submit",id:"submitBtn",value:"Submit",className:"btn"})]}),e("button",{onClick:()=>o.onFormSwitch("SignUp"),type:"button",className:"btn",children:"Don't have an account? Register"})]})})},N=o=>{const r=new u("https://cpsc349project4.fly.dev"),[l,i]=n.exports.useState(""),[s,t]=n.exports.useState(""),[a,m]=n.exports.useState("");return e(p,{children:c("div",{className:"form-container",children:[c("form",{onSubmit:async d=>{if(d.preventDefault(),s.length<8||a.length<8)alert("Password needs to be over 8 characters");else if(s!=a)alert("Confirm password must match password");else try{await r.collection("users").create({email:l,password:s,passwordConfirm:a}),alert("Account Created"),window.location.href="/"}catch(b){alert(`Error occured while creating account: ${b}`)}},className:"form",children:[e("h2",{className:"form-h2",children:"Sign Up"}),c("label",{htmlFor:"email",className:"form-label",children:["Email"," "]}),e("input",{value:l,onChange:d=>i(d.target.value),type:"email",id:"email",placeholder:"Email Address",className:"form-input"}),e("label",{htmlFor:"password",className:"form-label",children:"Password"}),e("input",{value:s,onChange:d=>t(d.target.value),type:"password",id:"password",placeholder:"Password",className:"form-input"}),e("label",{htmlFor:"passwordConfirm",className:"form-label",children:"Confirm Password"}),e("input",{value:a,onChange:d=>m(d.target.value),type:"password",id:"conPassword",placeholder:"Confirm Password",className:"form-input"}),e("input",{type:"submit",id:"submitBtn",value:"Submit",className:"btn"})]}),e("button",{onClick:()=>o.onFormSwitch("login"),type:"button",className:"btn",children:"Already have an account? Login"})]})})},h=new u("https://cpsc349project4.fly.dev");function x(){const[o,r]=n.exports.useState("login"),[l,i]=n.exports.useState(!1),s=t=>{r(t)};return n.exports.useEffect(()=>{var t;console.log(h.authStore.isValid),i((t=h.authStore.isValid)!=null?t:!1)},[]),e("div",{className:"min-h-screen flex items-center justify-center text-center bg-cyan-700",children:l===!1?o==="login"?e(v,{onFormSwitch:s,checkLogin:i}):e(N,{onFormSwitch:s}):e(y,{})})}w.createRoot(document.getElementById("root")).render(e(S.StrictMode,{children:e(x,{})}));