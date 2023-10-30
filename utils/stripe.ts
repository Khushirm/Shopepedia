import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "", {
    apiVersion: '2023-08-16',
    appInfo: {
        name: 'Ecommerce',
        version: '1.0.0'
    }
});

export default stripe;