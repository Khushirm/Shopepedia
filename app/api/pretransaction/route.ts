import { NextRequest, NextResponse } from "next/server";
import { StripeCartProps } from "@/types";
import prismadb from "@/lib/prismadb";
import stripe from "@/utils/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { serialize } from "cookie";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const { cart, oid }: StripeCartProps = data;
    const { name, phone, address, city, state, pincode } = data.user;
    const nextAuthSession = await getServerSession(authOptions);

    const order = await prismadb.orderDetails.create({
      data: {
        oid: oid.toString(),
        address,
        city,
        name,
        phone,
        pincode,
        state,
        userEmail: nextAuthSession?.user?.email || "",
      },
    });

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.NEXTAUTH_URL}/success?id=${order.id}`,
      cancel_url: `${process.env.NEXTAUTH_URL}`,
    });

    const cookie = serialize("sessionId", session.id, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 86400,
    });

    return NextResponse.json(
      { url: session.url, id: session.id },
      { headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
};
