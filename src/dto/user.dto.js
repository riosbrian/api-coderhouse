export default class UserDTO {
  constructor(user) {
    this.fullname = `${user.name} ${user.lastname}`;
    this.email = user.email;
    this.role = user.role;
  }
}
