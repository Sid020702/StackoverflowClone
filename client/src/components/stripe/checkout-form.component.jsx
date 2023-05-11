import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, } from "../../actions/users";
import { useNavigate } from 'react-router-dom'


const CheckoutForm = () => {
    const user = useSelector(state => state.currentUserReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    // stripe items
    const stripe = useStripe();
    const elements = useElements();

    // main function
    const createSubscription = async () => {
        const sel = document.getElementById('plan')
        const plan = sel.options[sel.selectedIndex].text
        let asks = 1
        let unlimited = false
        if (plan === "Silver Plan") {
            asks = 5
        }

        else {
            unlimited = true
        }
        const priceId = String(sel.value)

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
            const confirmPayment = await stripe?.confirmCardPayment(
                paymentResponse.clientSecret
            );

            if (confirmPayment?.error) {
                alert(confirmPayment.error.message);
            } else {
                alert("Success! Check your email for the invoice.");
                dispatch(updateProfile(user?.result?._id, { ...user?.result, plan, unlimited, asks }))
                localStorage.setItem('Profile', JSON.stringify({ ...user, result: { ...user?.result, plan, unlimited, asks } }))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid gap-4 m-auto">
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
            <select id="plan" name="plan" required>
                {/* <option value="price_1N6IX2SBWzodFEEtkUsqqRnV">Free Plan</option> */}
                <option value="price_1N6Hs3SBWzodFEEtxhd90yzM">Silver Plan</option>
                <option value="price_1N6Hs3SBWzodFEEthFdNRfjo">Gold Plan</option>
            </select>

            <CardElement />
            <button onClick={createSubscription} disabled={!stripe}>
                Subscribe
            </button>
        </div>
    );
}

export default CheckoutForm;