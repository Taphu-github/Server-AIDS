import express from "express";
import Animal from "../models/animal.mjs";
import Owner from "../models/owner.mjs";
import AnimalCategory from "../models/animal_category.mjs";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getanimals", authenticate, async (req, res) => {
  Animal.find().then(animals => res.json(animals)).catch(err=> res.status(400).json('Error: '+ err)); 
});

// Fetches the latest posts
router.post("/addOwner", authenticate,(req, res) => {
  const cid=req.body.cid;
  const ownername=req.body.ownername;
  const contactNo= req.body.contactNo;
  const emailID= req.body.emailID;

  const owner= new Owner({
    cid,
    ownername,
    contactNo,
    emailID
  });

  owner.save().then(()=> res.json('succesfully added owner')).catch(err=> res.status(400).json("Error: "+ err));
});

router.get("/getOwner").get((req, res) => {
  Owner.find().then(owners => res.json(owners)).catch(err=> res.status(400).json('Error: '+ err));
});

router.route("/getOwner/:id").get((req, res) => {
  Owner.findById(req.params.id)
    .then(owner => {
      // Check if the owner was found
      if (!owner) {
        return res.status(404).json({ message: 'Owner not found' });
      }

      // Send the owner data as JSON response
      res.json(owner);
    })
    .catch(err => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.route('/updateOwner/:id').post((req, res) => {
  Owner.findById(req.params.id)
    .then(owners => {
     
      owners.cid = req.body.cid;
      owners.ownername = req.body.ownername;
      owners.contactNo = req.body.contactNo;
      owners.emailID = req.body.emailID;


      owners.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteOwner/:id').delete((req, res)=>{
  try{
      //find the item by its id and delete it 
      const deleteItem =  Owner.findByIdAndDelete(req.params.id);
      res.status(200).json('Owner Deleted');   
  } catch(err){
      res.json(err);
  }
})

// Animal Catgeory
router.route("/getAnimalCat").get((req, res) => {
  AnimalCategory.find().then(categories => res.json(categories)).catch(err=> res.status(400).json('Error: '+ err));
});

router.route("/addAnimal").post((req, res) => {
  const acid=req.body.acid;
  const animalname=req.body.animalname;
  const animaldescription= req.body.animaldescription;

  const owner= new AnimalCategory({
    acid,
    animalname,
    animaldescription
  });

  owner.save().then(()=> res.json('succesfully added animal to animal category')).catch(err=> res.status(400).json("Error: "+ err));
});

router.route('/updateAnimalCat/:id').post((req, res) => {
  AnimalCategory.findById(req.params.id)
    .then(categories => {
     
      categories.acid = req.body.cid;
      categories.animalname = req.body.animalname;
      categories.animaldescription = req.body.animaldescription;


      categories.save()
        .then(() => res.json('Animal Category updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteAnimalCat/:id').delete((req, res)=>{
  try{
      //find the item by its id and delete it 
      const deleteItem =  AnimalCategory.findByIdAndDelete(req.params.id);
      res.status(200).json('Item Deleted');   
  } catch(err){
      res.json(err);
  }
})


// Fetches the latest posts
router.route("/addSystem").post((req, res) => {
  const cid=req.body.cid;
  const ownername=req.body.ownername;
  const contactNo= req.body.contactNo;
  const emailID= req.body.emailID;

  const owner= new Owner({
    cid,
    ownername,
    contactNo,
    emailID
  });

  owner.save().then(()=> res.json('succesfully added owner')).catch(err=> res.status(400).json("Error: "+ err));
});

export default router;