import User from '../models/auth.js'
import mongoose from 'mongoose'
import Stripe from "stripe"
import fetch from 'node-fetch'
import IP from '../models/ip.js'


export const getAllUsers = async (req, res) => {
    try {

        const ipinfo = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=ebda3c3b3e02448b81cecbaaf8dd0ea7',
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())

        await IP.create({ ip_address: ipinfo.ip_address, city: ipinfo.city }).then(result => console.log("IP Logged"))
        const allUsers = await User.find()
        const allUserDetails = []
        allUsers.forEach(user => {
            allUserDetails.push({ _id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn, friends: user.friends })
        })
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params
    const { name, about, tags, unlimited, asks, askedOn, plan } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable...')
    }
    try {
        const updatedProfile = await User.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags, 'unlimited': unlimited, 'plan': plan, 'asks': asks === "Gold Plan" ? 1 : asks, 'askedOn': askedOn } }, { new: true })
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const deleteSubscription = async (req, res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const { subId } = req.params
        await stripe.subscriptions.del(subId)
        res.status(200).json({ message: "Unsubscribed successfully" })
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
        return res.status(200).json({
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
        });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addFriend = async (req, res) => {
    try {
        const { id: _id, value } = req.body
        const { friendId } = req.params
        const currentUser = await User.findById(_id)
        const friend = await User.findById(friendId)
        let requests2 = friend.requests
        let friends2 = friend.requests.friends
        let requests1 = currentUser.requests
        let friends1 = currentUser.friends
        if (!friends1) {
            friends1 = {}
        }
        if (!friends2) {
            friends2 = {}
        }
        if (value === "send request") {
            friends1[friendId] = 'request sent'
            requests2.push(currentUser)
        }
        else if (value === "cancel request") {
            friends1 = Object.keys(friends1).filter(key => key != friendId).reduce((obj, key) => {
                obj[key] = friends1[key]
                return obj
            }, {})
            requests2 = requests2.filter(user => user._id !== _id)
        }

        else if (value === "remove friend") {
            friends1 = Object.keys(friends1).filter(key => key != friendId).reduce((obj, key) => {
                obj[key] = friends1[key]
                return obj
            }, {})
            friends2 = Object.keys(friends2).filter(key => key != _id).reduce((obj, key) => {
                obj[key] = friends2[key]
                return obj
            }, {})
        }
        else if (value === "accept request") {
            friends1[friendId] = 'friend'
            friends2[_id] = 'friend'
            requests1 = requests1.filter(user => user._id != friendId)
        }
        else if (value === "reject request") {
            requests1 = requests1.filter(user => user._id != friendId)
            friends2 = Object.keys(friends2).filter(key => key != _id).reduce((obj, key) => {
                obj[key] = friends2[key]
                return obj
            }, {})
        }
        await User.findByIdAndUpdate(friendId, { $set: { requests: requests2, friends: friends2 } })
        const updatedProfile = await User.findByIdAndUpdate(_id, { $set: { requests: requests1, friends: friends1 } }, { new: true })
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

