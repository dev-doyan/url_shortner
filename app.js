import express from 'express'
import {pool, check_connection } from './config/db.js';
import {create, geturl, deleteurl, getallurl, incrementclicks, update_expiry} from './models/url_operations.js'
import dotenv from 'dotenv'
dotenv.config()
const app=express();
const port=process.env.PORT;


//middlewear

app.use(express.json());


app.post("/shorten",async(req,res)=>{
    try {
       const burl=req.body.url;
       const  bexpires_at=req.body.expires_at;
       const code =req.body.custom_code;

      const shortenurl=  await create(burl,bexpires_at,code);
        res.json({message:"success",
            created:shortenurl
        });
    } catch (error) {
        res.json({message:error})
    }
})


app.get("/urls",async(req,res)=>{
    try {
        const urls= await getallurl();
        console.log(urls)
        res.json({message:"succes getting urls",
            urls:urls
        })
    } catch (error) {
        res.json(error)
    }
})


app.delete("/api/urls/:code",async(req,res)=>{
    let c=req.params.code;
    try {
        const durl= await deleteurl(c);
        res.json({message:"deleted successfully",
            deleted:durl}
        )
    } catch (error) {
        res.json({error})
    }
})


app.get("/:code",async(req,res)=>{
    try {
        let c= req.params.code;
    const surl= await geturl(c);
res.redirect(surl);
    } catch (error) {
        res.json({message:"error finding the url"})
    }

})





app.listen(port,()=>{
    console.log(`server running at ${port}`)
    check_connection()
})


