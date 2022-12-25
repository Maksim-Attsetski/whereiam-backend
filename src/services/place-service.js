import PlaceCreateDto from "../dto/place/place-create-dto.js";
import PlaceGetDto from "../dto/place/place-get-dto.js";

import { ApiError } from "../exceptions/api-error.js";

import placeModel from "../models/place-model.js";

import fileService from "./file-service.js";

import { populate } from "../utils/populate.js";

class PlaceService {
  async getPlaces() {
    const placeList = await placeModel.find();
    return placeList;
  }

  async getOnePlace(_id, query) {
    const place = await placeModel.findById(_id);

    if (!place) {
      throw ApiError;
    }

    const populatedItem = await populate(place, PlaceGetDto, query?.full);
    return populatedItem;
  }

  async createPlace({ place }) {
    // const placeDto = new PlaceCreateDto(place);
    const images = await fileService.saveArrayOfImages(place.images);

    const newPlace = await placeModel.create({ ...place, images });

    return new PlaceGetDto(newPlace);
  }

  async updatePlace({ place }) {
    console.log("place", place);
    if (!place?._id) {
      throw ApiError.BadRequest("Id is requred");
    }

    const newPlace = await placeModel.findOneAndUpdate(place?._id, place);

    if (!newPlace?._id) {
      throw ApiError.BadRequest("Place with this id is not exist");
    }

    return new PlaceGetDto(newPlace);
  }

  async deletePlace(_id) {
    console.log(_id);
    if (!_id) {
      throw ApiError.BadRequest("Id is requred");
    }

    const place = await placeModel.findByIdAndDelete(_id);

    if (!place._id) {
      throw ApiError.BadRequest("Place with this id is not exist");
    }

    return place._id;
  }
}

export default new PlaceService();