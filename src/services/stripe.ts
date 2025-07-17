import Stripe from 'stripe';
import { version } from '../../package.json';

const stripeApiKey = process.env.STRIPE_API_KEY;
if (!stripeApiKey) {
    throw new Error('STRIPE_API_KEY environment variable is not set.');
}

export const stripe = new Stripe(
    stripeApiKey,
    {
        apiVersion: '2025-06-30.basil',
        appInfo: {
            name: '07-News',
            version
        },
    }
)