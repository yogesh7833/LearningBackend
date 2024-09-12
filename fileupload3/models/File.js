const mongoose=require('mongoose');
const nodemailer=require('nodemailer');

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
  
//post middleware

fileSchema.post("save",async function(doc){  //doc matlab jo image upload ki details mongodb mai save hui vahi all details doc represent kar rh ahia
    try {
        console.log("DOC",doc);

        //transporter
        //TODO:shift this configuration under/config folder
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                 user:process.env.MAIL_USER,
                 pass:process.env.MAIL_PASS,
            },
        });

        // send mail 
        let info=await transporter.sendMail({
            from:`codeHelp by-Babbar`,
            to:doc.email,
            subject:"New File Uploaded on cloudinary",
            html:`<h2>Hello JI</h2><p>File Uploaded view here:<a href="${doc.imageUrl}">${doc.imageUrl}</a></p> `,
        })

        console.log("INFO:",info);
    } catch (error) {
        console.error(error);

    }
})

const File=mongoose.model("File",fileSchema);

module.exports=File;