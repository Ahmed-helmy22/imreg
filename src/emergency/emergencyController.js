import emergencyModel from "../../database/models/emergencyModel.js";
import AppErr from "../error/AppErr.js";
import { catchErr } from "../error/catchErr.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multer.js";
import { setPagination } from "../utils/setPagination.js";

const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(new AppErr("Error uploading to Cloudinary", 500));
      resolve(result);
    });
    uploadStream.end(buffer);
  });
};

export const addEmergency = catchErr(async (req, res, next) => {
  try {
    const { lat, long, emergencyText } = req.body;
    let emergencyRecord, emergencyPhoto, emergencyVideo;

    if (req.files?.emergencyRecord) {
      const emergencyRecordCloudinary = formatImage(req.files.emergencyRecord[0]);
      const emergencyRecordResponse = await uploadToCloudinary(emergencyRecordCloudinary, { resource_type: "video" });
      emergencyRecord = emergencyRecordResponse.secure_url;
    }

    if (req.files?.emergencyPhoto) {
      const emergencyPhotoCloudinary = formatImage(req.files.emergencyPhoto[0]);
      const emergencyPhotoResponse = await cloudinary.v2.uploader.upload(emergencyPhotoCloudinary);
      emergencyPhoto = emergencyPhotoResponse.secure_url;
    }

    if (req.files?.emergencyVideo) {
      const emergencyVideoBuffer = req.files.emergencyVideo[0].buffer;
      const emergencyVideoResponse = await uploadToCloudinary(emergencyVideoBuffer, { resource_type: "video" });
      emergencyVideo = emergencyVideoResponse.secure_url;
    }

    const emergency = await emergencyModel.create({
      lat, long, emergencyText, emergencyRecord, emergencyPhoto, emergencyVideo, createdBy: req.user._id
    });

    return res.json({ message: "success", emergency });
  } catch (err) {
    next(new AppErr("Error processing request", 500));
  }
});

export const getAllEmergencies = catchErr(async (req, res, next) => {
  const { limit, skip, pagination } = await setPagination(emergencyModel, req);
  const emergencies = await emergencyModel.find()
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name email phoneNumber');
  res.json({ message: "success", pagination, emergencies });
});

export const getEmergenciesForUser = catchErr(async (req, res, next) => {
  const { limit, skip, pagination } = await setPagination(emergencyModel, req);
  const emergencies = await emergencyModel.find({ createdBy: req.params.id })
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip(skip)
    .limit(limit);
  res.json({ message: "success", pagination, emergencies });
});
export const getUserEmergencies = catchErr(async (req, res, next) => {
  const { limit, skip, pagination } = await setPagination(emergencyModel, req);
  const emergencies = await emergencyModel.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip(skip)
    .limit(limit);
  res.json({ message: "success", pagination, emergencies });
});

export const updateEmergency = catchErr(async (req, res, next) => {
  try {
  
  const { id } = req.params;
  console.log(id , "kkdkdk");
  const emergency = await emergencyModel.findOneAndUpdate(
    { _id: id, createdBy: req.user._id },
    req.body,
    { new: true }
  );
  console.log("hi");
  if (!emergency) {
    return res.status(404).json({message : "no emergecy found for this user"});
  }
  console.log("kkdkddkdkdkdkdk");
  return res.json({ message: "success" });
    
  } catch (error) {
    console.log(error);
  }
});

export const deleteEmergency = catchErr(async (req, res, next) => {
  const { id } = req.params;
  let emergency;
  if(req.user.role == "user")
{  
   emergency = await emergencyModel.findOneAndDelete({ _id: id, createdBy: req.user._id });
} else {
  emergency =  await emergencyModel.findOneAndDelete({ _id: id });
}

  if (!emergency) {
    return res.status(404).json({message : "no emergecy found for this user"});
  }

  res.json({ message: "Emergency deleted successfully" });
});


export const getEmergencyById = catchErr(async (req, res, next) => {
  const { id } = req.params;
  const emergency = await emergencyModel.findOne({_id : id})
    .populate('createdBy', 'name email'); // Populate if you need user details
  if (!emergency) {
    return res.status(404).json({message : "no emergecy found for this user"});
  }

  return res.json({ message: "success", emergency });
});