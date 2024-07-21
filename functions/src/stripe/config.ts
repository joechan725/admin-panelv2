import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
