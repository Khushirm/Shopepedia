import prismadb from "@/lib/prismadb";
import stripe from "@/utils/stripe";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  let success = false;
  let message = "";
  let order;
  try {
    const nextCookies = cookies();
    const data = await req.json();
    const { id } = data;
    const sessionId = nextCookies.get("sessionId")?.value as string;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      order = await prismadb.orderDetails.update({
        where: {
          id: id.toString(),
        },
        data: {
          status: "PAID",
        },
        
      });
     
      message = "Your Payment is successful!.";
    } else {
      message = "Your Payment is currently pending!.";
    }
    
    success = true;
    return NextResponse.json({ success, message, id: order?.id });
  } catch (error) {
      console.log(error);
    return NextResponse.json({ success });
  }
};
