import {v4 as uuid} from 'uuid';
import { Request,Response } from 'express';
import gadgetRepo from '../repo/gadgetRepo';
import { Gadget,GadgetStatus } from '../entity/Gadget';

interface GadgetType {
    id:string,
    name:string,
    codename:string,
    status:string,
    destroyedAt?:Date
}

const addGadget = async (req:Request,res:Response):Promise<any>=>{
    try {
        const repo = await gadgetRepo();
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                msg:"Name is required"
            })
        }
        const codename = ["Warlord", "Seven Emperor", "Zoro", "Sanji"][Math.floor(Math.random() * 4)];
        const newGadget = repo.create({
            id:uuid(),
            name:name,
            codename:codename
        })
        await repo.save(newGadget);
        return res.status(200).json({
            msg:"Gadget Added Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}


const updateGadget = async (req:Request,res:Response):Promise<any>=>{
    try {
        const repo = await gadgetRepo();
        const {id,name,status} = req.body
        if(!id){
            return res.status(400).json({
                msg:"ID is required"
            })
        }

        const gadget = await repo.findOneBy({id});
        if(!gadget){
            return res.status(400).json({
                msg:"Gadget not found"
            })
        }
        if(name){
            gadget.name = name.trim()
        }
        if(status){
            if(status.toLowerCase() !== "available" && status.toLowerCase() !== "deployed" && status.toLowerCase() !== "destroyed" && status.toLowerCase() !== "decommissioned"){
                return res.status(400).json({
                    msg:"Invalid status"
                })
            }
            gadget.status = status.toLowerCase()
        }
        await repo.save(gadget);
        return res.status(200).json({
            msg:"Gadget Updated Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}


const getAllGadgets = async (req:Request,res:Response):Promise<any> => {
    try {
        const repo = await gadgetRepo();
        const {status}:{status?:string} = req.query
        let gadgets:any = await repo.find({
            where:status ? {status:status} : {}
        });
        console.log(status)
        gadgets = gadgets.map((gadget:GadgetType)=>{
          const missionStatus = `${gadget.codename} - ${Math.floor(Math.random() * 100)}% success probability`;  

          return {
            ...gadget,
            missionStatus
          }
        })

        return res.status(200).json({
            msg:"Gadgets Fetched Successfully",
            data:gadgets
        })
    } catch (error) {
       return res.status(500).json({
           msg:"Internal Server Error"
       }) 
    }
}



const deleteGadget= async (req:Request,res:Response):Promise<any>=>{
    try{
        const repo = await gadgetRepo();
        const id = req.params.id

        if(!id){
            return res.status(400).json({
                msg : "ID is required"
            })
        }
        const currentDate = new Date();
        const gadget = repo.createQueryBuilder("gadget")
        .update(Gadget)
        .set({
            status:"decommissioned",
            destroyedAt:currentDate.toISOString()
        })
        .where("gadget.id = :id",{id:id})

        await gadget.execute();
        return res.status(200).json({
            msg:"Gadget Deleted Successfully"
        })

    }catch(error){
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

const seftDestructGadget = async (req:Request,res:Response):Promise<any> => {
    try {
        const { id } = req.params;
        const confirmationCode = Math.floor(100000 + Math.random() * 900000); 
        res.json({
            msg: `Gadget ${id} self-destruct sequence initiated. Confirmation code: ${confirmationCode}`
        });
    } catch (error) {
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }

}
export {addGadget,updateGadget,getAllGadgets,deleteGadget,seftDestructGadget}