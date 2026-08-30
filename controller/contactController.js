
const Enquiry = require('../models/contactModule');

const submitEnquiry = async (req, res) => {
    try {
        const { name, email, mobile_number, description, status } = req.body
        const enquiry = new Enquiry(req.body);

        await enquiry.save()
        res.status(200).json({
            message: `Thank you ${name}. We have received your enquiry and we will email you at ${email}`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const getEnquiry = async (req, res) => {
    try {
        const enquiries = await Enquiry.find()

        if (enquiries.length === 0) {
            return res.status(200).json({
                message: "No Records Found"
            });
        }
        return res.status(200).json({
            count: enquiries.length,
            enquiries: enquiries
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateEnquiry = async (req,res) => {
    try {
        const{id}=req.params;
        const{status}=req.body;
        const allowedTypes=["open","closed"]
        
        if(!allowedTypes.includes(status)){
             return res.status(404).json({
                message:"Invalid Status"
             })
        }
        
        const checkEnquiry = await Enquiry.findOne({_id:id});
        console.log(checkEnquiry);

        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            {status},
            {
                new:true,
                runValidators:true
            }    
        )
        if(!enquiry){
            return res.status(404).json({
                message:"enquiry not found"
            })
        }
        return res.status(200).json({
            message:"status updated successfully",
            enquiry:enquiry
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports = { submitEnquiry, getEnquiry, updateEnquiry };