import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './checkout-form.component';
import './stripe.styles.css'

const StripeComponent = () => {
    const stripePromise = loadStripe("pk_test_51Jj1j6SBWzodFEEtHNwg7diloBZVchEvcyo0lDZRpBLdklrleD0Wqzo4IzKlfW3aHQOA7HHjeynD9j7pr5VBpA0r00GYOWo95d")
    return (
        <div className='stripe-component'>

            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>

        </div>
    )
}

export default StripeComponent