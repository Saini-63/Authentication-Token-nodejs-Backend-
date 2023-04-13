const asynchandler = require('express-async-handler');
const contactModel = require('../model/contactModel');
class ContactController{

//Get Request for Contact
    static getContact=asynchandler(async(req,res)=>{
        //res.send("get all Contacts");
        const contact= await contactModel.find({user_id: req.user.id});
        res.status(200).json(contact);
    });

//Post Request for Contact
    static createContact= asynchandler(async(req,res)=>{
        //console.log("The request Body is :",req.body);
        const{ name, email, phone}=req.body;
        if(!name || !email || !phone){
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const contact = await contactModel.create({
            name: name,
            email: email,
            phone: phone,
            user_id: req.user.id
        })
        res.status(200).json(contact);
    });

//Get Single Request for Contact
    static getSingleContact=asynchandler(async(req,res)=>{
        const contact= await contactModel.findById(req.params.id);
        if(!contact){
            res.status(404);
            throw new Error("Contact not found");
        }
        res.status(200).json(contact);
    });

//Update Request for Contact
    static updateContact= asynchandler(async(req,res)=>{
        const contact= await contactModel.findById(req.params.id);
        if(!contact){
            res.status(404);
            throw new Error("Contact not found");
        }
        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User dont have permission to update other user contacts");
        }

        const updatedContact = await contactModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );
        res.status(200).json(updatedContact);
    });

//Delete Request for Contact
    static deleteContact=asynchandler(async(req,res)=>{
        const contact= await contactModel.findById(req.params.id);
        if(!contact){
            res.status(404);
            throw new Error("Contact not found");
        }
        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User dont have permission to delete other user contacts");
        }
        await contactModel.deleteOne({_id:req.params.id});
        res.status(200).json(contact);
    });
}

module.exports=ContactController;