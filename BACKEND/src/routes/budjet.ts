import express from "express";
import { BudjetModel } from "../models/bujet";
import { userAuth } from "../middlewares/auth";
import { time } from "console";

const router = express.Router();

router.post("/", userAuth, async (req, res) => {

    try
    {
        const { category, month, amount } = req.body;

        if (!category || !month || !amount) {
            return res.status(404).json({

                message: "All Feilds Are Required! ✅ "
            })
        }

        //@ts-ignore
        const userId = req.user.id;

        const response = await BudjetModel.create({
            
            userId,
            category,
            month,
            amount
        });

        await response.save();

        res.json({

            message: "Budjet Goal Created Sucessfully!✅ ",
            data: response
        });

    } catch (error) {
       
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

});

router.get("/",userAuth,async(req,res)=>{
    try 
    {
        //@ts-ignore
        const userId = req.user.id;

        const budjets = await BudjetModel.find({ userId});

        if(!budjets)
        {
            res.status(404).json({

                message:"Now Budjets Are Created!"
            })
        }

        res.json({

            message:"Budject Goals Are Fetched Sucessfully!",
            data:budjets

        })
        
    } 
    catch (error) 
    {
        console.error("Error fetching Budject Goals!:", error);
        res.status(500).json({
        message: "Failed to Budject Goals!",
        error: error instanceof Error ? error.message : error,
        });
        
    }
});

router.get("/:id",userAuth,async(req,res)=>{

    try 
    {
        const {id} = req.params;

        //@ts-ignore
        const userId = req.user.id;

        const budjet= await BudjetModel.findOne({ _id: id, userId});

        if(!budjet)
        {
            return res.status(404).json({

                message:"Budjet Goal Not Found!"
            })
        }

        res.json({

            message:"Budjet Goal Fetched Sucessfully!"
        });
    } 
    catch (error) 
    {
        console.error("Error fetching Budject Goal !:", error);
        res.status(500).json({
        message: "Failed to Fecth Budject Goal!",
        error: error instanceof Error ? error.message : error,
        }); 
    }
})

router.put("/:id",userAuth,async(req,res)=>{

    try 
    {
        const {id} = req.params;
        const { category,month,amount}=req.body;

        //@ts-ignore
        const userId = req.user.id;

        const response = await BudjetModel.findOne({ _id: id, userId });

        if(!response)
        {
           return res.status(404).json({
                message:"Budjet Not Found!"
            });
        }

        if(category) response.category = category;
        if(month) response.month = month;
        if(amount) response.amount = amount;

        await response.save();

        res.json({

            mesaage:"Budjet Goal Updated Sucessfully!",
            data:response
        })

        
    } 
    catch (error) 
    {
        console.error("Error Updating Budject Goal !:", error);
        res.status(500).json({
        message: "Failed to Update Budject Goal!",
        error: error instanceof Error ? error.message : error,
        }); 
    }
});

router.delete("/:id",userAuth,async(req,res)=>{

    try 
    {
        const {id} = req.params;

        //@ts-ignore
        const userId=req.user.id;

        const budjet =  await BudjetModel.findOneAndDelete({ _id: id, userId});
        
        if(!budjet)
        {
            return res.status(404).json({
                message:"Budject Not Found!"
            })
        }

        res.json({
            message:"Budject Goal Removed SucessFully!"
        })

    } 
    catch (error) 
    {
        console.error("Error Removing Budjet Goal !:", error);
        res.status(500).json({
        message: "Failed to Remove Budjet Goal!",
        error: error instanceof Error ? error.message : error,
        }); 
    }
});

export default router;