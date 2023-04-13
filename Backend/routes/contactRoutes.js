const express=require("express");
const ContactController=require('../controller/contactController');
const validateToken = require("../middleware/validateTokenHandler");
const router=express.Router();

router.use(validateToken);
router.get("/", ContactController.getContact);
router.post("/",ContactController.createContact);
router.get("/:id", ContactController.getSingleContact);
router.put("/:id", ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);


module.exports=router;