import placeService from "../services/place-service.js";

class PlaceController {
  async getPlaces(req, res, next) {
    try {
      const placeList = await placeService.getPlaces(req?.query?.search);
      res.json(placeList);
    } catch (error) {
      next(error);
    }
  }

  async getOnePlace(req, res, next) {
    try {
      const place = await placeService.getOnePlace(req.params._id, req.query);
      res.json(place);
    } catch (error) {
      next(error);
    }
  }
  async createPlace(req, res, next) {
    try {
      console.log(req.files);
      const newPlace = await placeService.createPlace(req.body);
      res.json({ ...newPlace, files: req.files });
    } catch (error) {
      next(error);
    }
  }
  async updatePlace(req, res, next) {
    try {
      const newPlace = await placeService.updatePlace(req.body);
      res.json(newPlace);
    } catch (error) {
      next(error);
    }
  }
  async deletePlace(req, res, next) {
    try {
      const newPlace = await placeService.deletePlace(req.params._id);
      res.json(newPlace);
    } catch (error) {
      next(error);
    }
  }
}
export default new PlaceController();
