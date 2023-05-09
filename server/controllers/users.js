import User from '../models/auth.js'
import mongoose from 'mongoose'
import Stripe from "stripe"




export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        const allUserDetails = []
        allUsers.forEach(user => {
            allUserDetails.push({ _id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn, subscribed: user.subscribed })
        })
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params
    const { name, about, tags, subscribed } = req.body
    console.log(subscribed)
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable...')
    }
    try {
        const updatedProfile = await User.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags, 'subscribed': subscribed } }, { new: true })
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createSubscription = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    try {
        const customer = await stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            payment_method: req.body.paymentMethod,
            invoice_settings: {
                default_payment_method: req.body.paymentMethod,
            },
        });


        // get the price id from the front-end
        const priceId = req.body.priceId;

        // create a stripe subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            payment_settings: {
                payment_method_options: {
                    card: {
                        request_three_d_secure: 'any',
                    },
                },
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent'],
            metadata: { customerEmail: req.body.email }
        });


        // return the client secret and subscription id
        return res.json({
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
        });
    } catch (error) {
        console.log(error)
    }


}