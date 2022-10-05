const users=[];
function userJoin(id,username,room){
    const user={id,username,room};
    users.push(user);
    return user;
}
function getCurrentUser(id){
    return users.find(user=>user.id===id)
}
function userDisconnect(id){
    const Index =users.findIndex(user=>user.id===id);
    if(Index!==-1){
        return users.splice(Index,1)[0]; 
    }
}

function getRoomUser(room){
    return users.filter(user=>user.room===room);
}

module.exports={
    userJoin,
    getCurrentUser,
    userDisconnect,
    getRoomUser
}