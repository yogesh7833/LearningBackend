const File=require("../models/File")
const cloudinary=require('cloudinary').v2
//ye wala function server mai file apload karega client ke 
//localfileupload 

exports.localFileUpload = async(req,res)=>{
    try {
        //fetch file from requiest 
        const file=req.files.file;  //is wali line se hum file fetch karenge last mai jo dot ke baad file likha hai testing karte time 
        //post man mai bhi key mai file likhna padega
        console.log("File Ayegi JI",file);

           //create path where file needs to be store
        let path=__dirname +"/files/"+Date.now()+`.${file.name.split('.')[1]}`; //__dirname represent karta hia current directory
        // matlab folder ko or humary current directory is controllers
        console.log("PATH->",path);

        // add path to the move function , ye wala function file ko move kar rha hai into jaha par file bhejni hai 
        file.mv(path, (err)=>{
            console.log(err);
        });

        //create a successfull responce
        res.json({
            success:true,
            message:'Local file aploaded successfully',
        })
    } catch (error) {
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file, folder,quality){
    const options={folder};
    console.log("temp file path", file.tempFilePath);
    //image ya video ki quality set kar rhe hai
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
   return  await cloudinary.uploader.upload(file.tempFilePath,options)
   //jab bhi kisi file ko cloudinary par apload karte hai toh sabse pehle humri machine se file server ke kisi tempfolder par aata hai
   //firserver ke us temp folder se file media(cloudinary) server pe jati hai or fir server ke media folder se vah file delete ho jati hai 
   //isiliye humne file.tempFilePath diya hai 
}

//image upload ka handler 
exports.imageUpload=async (req,res)=>{
    try {
        //data fetch 
        const {name, tags, email}=req.body;
        console.log(name,tags,email );

        const file=req.files.imageFile;
        console.log(file);
        //validation 
        const supportedTypes= ["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File type->",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }
        //File format supported hai 
        console.log("Uploading to yogesh");
        const response=await uploadFileToCloudinary(file,"yogesh");
         console.log(response);
        //db mai entry save karna
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully uploaded',
        })

    } catch (error) {
        console.error(error);
        res.json({
            success:false,
            message:'Somthing went wrong',
        })
    }
}

//video upload 

exports.videoUpload=async(req,res)=>{
    try {
         
        //data fetch karo 
        const {name, tags, email}=req.body;
        console.log(name,tags,email );

        const file=req.files.videoFile;
        //validation
        const supportedTypes= ["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File type->",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }
        //File format supported hai 
        console.log("Uploading to yogesh");
        const response=await uploadFileToCloudinary(file,"yogesh");
         console.log(response);
        

         //db mai entry save karna
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'video Successfully uploaded',
        })

        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}


//image size Reducer

exports.imageSizeReducer=async(req,res)=>{
    try {
        //data fetch 
        const {name, tags, email}=req.body;
        console.log(name,tags,email );

        const file=req.files.imageFile;
        console.log(file);
        //validation 
        const supportedTypes= ["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File type->",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }
        //File format supported hai 
        console.log("Uploading to yogesh");
        const response=await uploadFileToCloudinary(file,"yogesh",90);
         console.log(response);
        //db mai entry save karna
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully uploaded',
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}