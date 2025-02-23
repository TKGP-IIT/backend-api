import express from "express";
import cors from "cors";
import multer from "multer";
import WebTorrent from "webtorrent";

const app = express();

const upload = multer({dest:"uploads/"});

const client = WebTorrent();


app.use(cors())

app.post("/upload",upload.single("file"),(req,res) => {
    
    if (!req.file) return res.status(400).json({
        error:"No file uploaded"
    });

    client.seed(req.file.path,(torrent)=>{
        res.json({
            torrentId: torrent.infoHash,
            magnetURI: torrent.magnetURI,
        })
    })
});

app.listen(5000,()=> console.log("Server running on port 5000"))


