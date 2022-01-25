const users:any = [];

class Users
{

// Join user to chat
public  userJoin(id:any, username:any, room:any) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
public getCurrentUser(id:any) {
  return users.find((user:any) => user.id === id);
}
public getAllUsers() {
  return users;
}

// User leaves chat
public userLeave(id:any) {
  const index = users.findIndex((user:any) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
public getRoomUsers(name:any) {
  return users.filter((user:any) => user.username === name);
}
}
export default Users