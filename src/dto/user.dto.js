export default class UserDTO {
  constructor(user) {
    this.fullname = `${user.name} ${user.lastname}`;
    this.email = user.email;
    this.cart = user.cart;
    this.role = user.role;
  }
}
