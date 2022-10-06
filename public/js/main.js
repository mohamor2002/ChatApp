const socket=io();
const chat = document.getElementById('chat-form');
const chatmessages=document.querySelector('.chat-messages');

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true});

socket.emit('joinRoom',{username,room});

socket.on('message', message=>{
  console.log(message);
  opmessage(message);
  chatmessages.scrollTop=chatmessages.scrollHeight;
  
})
socket.on('users',(users)=>{
  console.log(users);
  opRoom(users.room);
  opUsers(users.users);
})

chat.addEventListener('submit',e=>{
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit('chat-message',msg);
  e.target.elements.msg.value='';
  e.target.elements.msg.focus();
  
})

const leaveBtn=document.getElementById('leave-btn');
leaveBtn.addEventListener('onclick',()=>{
  socket.emit('disconnect');
})
function opmessage(msg){
  const div=document.createElement('div');
  div.classList.add('message');
  div.innerHTML=`<p class="meta">${msg.username} <span>${msg.time}</span></p>
  <p class="text">${msg.text}</p>`
  document.querySelector('.chat-messages').appendChild(div);
}
function opRoom(room){
  const roomName = document.getElementById('room-name');
  roomName.innerHTML=`${room}`;
}
function opUsers(users){
  const usersList=document.getElementById('users');
  usersList.innerHTML=`${users.map(user=>`
  <li>${user.username===username?`<b>${user.username}</b>`:user.username}</li>
  `).join('')}`
}