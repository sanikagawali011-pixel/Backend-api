const Package = require('../models/package');

const createPackage = async (req,res) => {

    try{
        const { title, description, destination, category, price, duration, maxGuests, availableSeats, images, inclusions, exclusions, itinerary, isActive } = req.body;

        if( !title || !description || !destination){
             res.status(400).json(
            {
            "message":"All Required fields are mandatory"
            }
        )

        }

        const generateImageUrls = req?.files?.map((file)=>{
            return `${req.protocol}://${req.get("host")}/uploads/packages/${file.filename}`
        })

        console.log(generateImageUrls);

        const package = new Package(
            {
            title,
            description,
            destination,
            category,
            price,
            duration:JSON.parse(duration),
            maxGuests, 
            availableSeats,
            images:generateImageUrls, 
            inclusions, 
            exclusions,
            itinerary:JSON.parse(itinerary), 
            isActive
            }
        );

        await package.save();
        res.status(201).json({
            message: "Package Created successfully",
            package: package
        })

    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }

};

const deletePackage = async (req,res) => {
    try{
        const {id} = req.params;

        const deletedPackage = await Package.findByIdAndDelete(id);

        if(!deletedPackage){
            return res.status(404).json(
            {
            "message":"Package not found"
            }
        )
        }

        console.log(deletedPackage);
        return res.status(200).json({
            message:"Package deleted successfully"
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const updatePackage = async (req,res) => {
    try{
        const {id} = req.params;

        const updatedPackage = await Package.findByIdAndUpdate(
            id,
            req.body,
            {
                new:true
            }
            
        );

        if(!updatedPackage){
            return res.status(404).json(
            {
            "message":"Package not found"
            }
        )
        }
        console.log(updatedPackage);
        return res.status(200).json({
            message:"Package updated successfully"
        })

    }catch(error)
    {
        res.status(500).json({
            message:error.message
        })
    }
} 

const getAllPackages = async (req,res) => {
    try{

        let {page,limit} = req.query;

        page = parseInt(page) || 1
        limit = parseInt(limit) || 5

        const skip = (page-1) * limit;

        const packages = await Package.find({
            isActive:true,
        }).skip(skip).limit(limit)

    res.status(200).json({
        count:packages.length,
        packages
    })

    }catch(error){
        res.status(500).json({
            message:error.message  
        })
    }
}

module.exports = {createPackage,deletePackage,updatePackage,getAllPackages};