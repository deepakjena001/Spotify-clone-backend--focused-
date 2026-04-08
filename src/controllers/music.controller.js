const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");                // we have used this in this file and not created separate controller file becoz it not has as such big task
const {uploadFile} = require("../services/storage.service");
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {

    // HERE WE HAVE COMMENT OUT THE TRY-CATCH BLOCK BECOZ THIS FUNCTION WILL NOW perform BY AUTH MIDDLEWARE TO VERIFY AUTHOUR. WE HAVE DONE THIS BECOZ THE CODE IS REPATING BELOW AS WELL
    
    // const token = req.cookies.token;

    // if(!token){
    //     return res.status(401).json({message: "unauthorized"})
    // }

    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //     if(decoded.role !== "artist"){
    //         return res.status(403).json({ message: "You dont have access to create music"})
    //     }
        

        const {title} = req.body;
        const file = req.file;


        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            // artist: decoded.id,
            artist: req.user.id,
        })

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        })



    // } catch (err){
    //     return res.status(401).json({ message: "Unauthorized"})
         
    // }



}


async function createAlbum(req, res) {

    // const token = req.cookies.token;

    // if(!token){
    //     return res.status(401).json({ message: "Unauthorized" });
    // }


    // try {
        
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //     if(decoded.role !== "artist"){
    //         return res.status(401).json({ message: "You dont have the access to create an album"})
    //     }


        const { title, musicIds} = req.body;

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musicIds
        })

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })

    // } catch (err) {

    //     console.log(err);
    //     return res.status(401).json({ message: "Unauthorized"})
        
    // }

   
}


async function getAllMusics(req, res) {
    
    const musics = await musicModel
    .find()
    .skip(2)                                    //it means, it will skip first 2 music
    .limit(1)                                      // limit up to show 1 music
    .populate("artist", "username email")         // populate helps to give more detail about artist, only give username and email, if you wont specify it will give every detail about the artist

    res.status(200).json({
        message: "Music fetched successfully",
        musics: musics
    })

}




async function getAllAlbums(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "username email")
    res.status(200).json({
        message: "Album fetched successfully",
        albums: albums
    })
    
}



async function getAlbumById(req, res) {

    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email")

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album,
    })

}



module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };