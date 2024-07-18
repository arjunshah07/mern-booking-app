 import express , {Request , Response} from "express";
 import multer from 'multer';
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import  { Hotel  } from "../models/hotels";
import {HotelType} from "../shared/types";

 const router = express.Router();

 const storage = multer.memoryStorage();
 const upload = multer( {
    storage : storage ,
    limits: {
        fileSize: 5 * 1024 *1024
    },
 });

 router.post("/",
    verifyToken, [
    body("name").notEmpty().withMessage('Name is required'),
    body("city").notEmpty().withMessage('City is required'),
    body("country").notEmpty().withMessage('Country is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("type").notEmpty().withMessage('Hotel Type is required'),
    body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage('Price per night is required and must be a number'),
    body("nfacilities").notEmpty().isArray().withMessage('Facilities are required'),
    ],
    upload.array("imageFiles", 6), 
 async(req : Request , res:Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel:HotelType = req.body;
    
    // upload the images to  cloudinary
    const uploadPromise = imageFiles.map(async(image) =>{
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });
  // if upload is successful , add the URLS to the new hotel
    const imageUrls = await Promise.all(uploadPromise);
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;
     // save the new hotel
     const hotel =new Hotel(newHotel);
     await hotel.save();
     //return a 201 status
    res.status(201).send(hotel);
}
  catch (e){
    console.log("error creating hotel :",e);
    res.status(500).json({message:"something went wrong"});
  }
 });
 router.get("/", verifyToken, async(req:Request , res: Response) => {
  try {
  const hotels = await Hotel.find({userId:req.userId});
  res.json(hotels);
  }
  catch(error){
    res.status(500).json({message:"Error fetching hotels"})
  }
 });
 export default router;