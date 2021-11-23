import express from "express";
const router = express.Router();


router.get("/",(req, res)=>{
  res.render("index",({
  }))
});

router.get("/wizards",(req, res)=>{
  res.render("pages/wizards",({
  }))
});

router.get("/login",(req, res)=>{
  res.render("pages/login",({
  }))
});

router.get("/login",(req, res)=>{
  res.render("pages/register",({
  }))
});


export default router;