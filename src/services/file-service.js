import { v4 } from "uuid";
import path from "path";
import fs from "fs/promises";

class FileService {
  async saveArrayOfImages(images) {
    const allImages = [];

    images.forEach(async (element) => {
      const fileName = await this.saveFile(element);
      allImages.push(fileName);
    });

    return allImages;
  }

  async saveFile(file) {
    try {
      const fileName = v4() + ".png";
      const filePath = path.resolve("static", fileName);

      await file.mv(filePath);

      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteFile(fileName) {
    try {
      const file = path.resolve("static", fileName);
      fs.rm(file);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();
