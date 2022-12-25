class PlaceDto {
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
    this.authorID = model.authorID;
    this.name = model.name;
    this.description = model.description;
    this.location = model.location;
    this.costPerPerson = model.costPerPerson;
    this.images = model.images;
    this.city = model.city;
    this.tags = model.tags;
    this.rating = null;
    this.likes = null;
    this.comments = null;
    this.savedIds = null;
    this.createdAt = Date.now();
  }
}

export default PlaceDto;
