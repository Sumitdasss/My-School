import { db } from "../../../db/index.js";
import { Fees } from "../../../db/schema.js";


export async function POST(req){

    try{

        const body=await req.json();

        const{
            class1,
            feeType,
            amount,
            description
        }=body;

        const fee=await db
        .insert(Fees)
        .values({
            class1,
            feeType,
            amount:Number(amount),
            description
        })
        .returning();

        return Response.json({
            success:true,
            fee:fee[0]
        });

    }catch(error){

        return Response.json({
            success:false,
            message:error.message
        });

    }

}

export async function GET(){

    const fees=await db
    .select()
    .from(Fees);

    return Response.json({
        success:true,
        fees
    });

}