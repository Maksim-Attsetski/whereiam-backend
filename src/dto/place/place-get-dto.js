class PlaceDto {
  _id;
  authorID;
  name;
  description;
  location;
  costPerPerson;
  images;
  rating;
  city;
  likes;
  comments;
  savedIds;
  tags;
  createdAt;

  constructor(model) {
    this._id = model._id;
    this.authorID = model.authorID;
    this.name = model.name;
    this.description = model.description;
    this.location = model.location;
    this.costPerPerson = model.costPerPerson;
    this.images = model.images;
    this.city = model.city;
    this.tags = model.tags;
    this.rating = model.rating;
    this.likes = model.likes;
    this.comments = model.comments;
    this.savedIds = model.savedIds;
    this.createdAt = model.createdAt;
  }
}

export default PlaceDto;
