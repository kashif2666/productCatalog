import { Request, Response } from "express";

const uploadImage = async (req: Request, res: Response): Promise<void> => {
  console.log("file received", req.file);
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  res.status(200).json({ filename: req.file.filename });
};

export default {
  uploadImage,
};
