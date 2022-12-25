class UserDto {
  _id;
  email;
  phoneNumber;
  name;
  isVerify;
  avatar;
  activationLink;
  places;

  constructor(model) {
    this._id = model._id;
    this.email = model.email;
    this.phoneNumber = model.phoneNumber;
    this.name = model.name;
    this.isVerify = model.isVerify;
    this.avatar = model.avatar;
    this.activationLink = model.activationLink;
    this.places = model.places;
  }
}

export default UserDto;
