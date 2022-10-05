const socket=io();
const chat = document.getElementById('chat-form');
const chatmessages=document.querySelector('.chat-messages');

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true});
console.log(username,room);

socket.emit('joinRoom',{username,room});

socket.on('message', message=>{
  console.log(message);
  opmessage(message);
  chatmessages.scrollTop=chatmessages.scrollHeight;
})

chat.addEventListener('submit',e=>{
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit('chat-message',msg);
  e.target.elements.msg.value='';
  e.target.elements.msg.focus();
  
})

function opmessage(msg){
  const div=document.createElement('div');
  div.classList.add('message');
  div.innerHTML=`<p class="meta">${msg.username} <span>${msg.time}</span></p>
  <p class="text">${msg.text}</p>`
  document.querySelector('.chat-messages').appendChild(div);
}