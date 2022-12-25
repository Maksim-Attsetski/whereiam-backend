class UserDto {
  email;
  name;
  phoneNumber;
  isVerify;
  avatar;
  activationLink;
  places;

  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.phoneNumber = model.phoneNumber;
    this.isVerify = false;
    this.avatar = null;
    this.activationLink = model.activationLink;
    this.places = null;
  }
}

export default UserDto;
