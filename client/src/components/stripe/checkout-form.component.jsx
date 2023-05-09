import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, } from "../../actions/users";
import { useNavigate } from 'react-router-dom'
import { setCurrentUser } from "../../actions/currentUser";


const CheckoutForm = () => {
    const user = useSelector(state => state.currentUserReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const priceId = "price_1N55DASBWzodFEEtRb51krqJ"

    // stripe items
    const stripe = useStripe();
    const elements = useElements();

    // main function
    const createSubscription = async () => {
        try {

            // create a payment method
            const paymentMethod = await stripe?.createPaymentMethod({
                type: "card",
                card: elements?.getElement(CardElement),
                billing_details: {
                    name,
                    email,
                },
            });

            // call the backend to create subscription
            const response = await fetch("http://localhost:5000/user/create-subscription", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                body: JSON.stringify({
                    paymentMethod: paymentMethod?.paymentMethod?.id,
                    name,
                    email,
                    priceId
                }),
            })

            const paymentResponse = await response.json()
            console.log(paymentResponse)
            const confirmPayment = await stripe?.confirmCardPayment(
                paymentResponse.clientSecret
            );

            if (confirmPayment?.error) {
                alert(confirmPayment.error.message);
            } else {
                alert("Success! Check your email for the invoice.");
                dispatch(updateProfile(user?.result?._id, { ...user?.result, subscribed: true }))
                localStorage.setItem('Profile', JSON.stringify({ ...user, result: { ...user?.result, subscribed: true } }))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid gap-4 m-auto">
            <input  // this should not be a text field. maybe a radio button ro something
                placeholder="Price Id"
                type="text"
                value={priceId}
                disabled
                hidden
            />
            <input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <CardElement />
            <button onClick={createSubscription} disabled={!stripe}>
                Subscribe
            </button>
        </div>
    );
}

export default CheckoutForm;