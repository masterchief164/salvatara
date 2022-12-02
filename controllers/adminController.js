const Collection = require("../models/collectionModel")
const NFT = require("../models/nftModel")
const Bid = require('../models/bidModel')
const User = require("../models/userModel")
const Order = require('../models/orderModel')
const Notification = require("../models/NotificationSettingsModel")
const Support = require("../models/customerSupportModel")
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require("../utils/apiFeatures")
const {searchQuery} = require("../utils/helper")
const moment = require('moment')

//create Collection
exports.createCollection = catchAsync(async (req, res) => {
    let found = await Collection.findOne({title: req.body.title})
    if (found) {
        let created = await Collection.create(req.body)
        if (created) {
            res.send({status: true, message: "Collection created", data: created})
        } else {
            res.send({status: false, message: "Collection not created"})
        }
    } else {
        res.send({status: false, message: "collection name already taken"})
    }
})

//nft created
exports.createNFT = catchAsync(async (req, res) => {
    let found = await NFT.findOne({title: req.body.title})
    if (found) {
        let created = await NFT.create(req.body)
        if (created) {
            res.send({status: true, message: "NFT created", data: created})
        } else {
            res.send({status: false, message: "NFT not created"})
        }
    } else {
        res.send({status: false, message: "nft name already taken"})
    }
})

//get all nfts
exports.getAllNFT = catchAsync(async (req, res, next) => {
    let nft
    let search = req.query.search
    if (search) {
        let QStringTitle = searchQuery(search, "title")
        let QStringDesccription = searchQuery(search, "description")
        nft = await NFT.find({$or: QStringTitle.concat(QStringDesccription)})
        if (nft.length > 0) {
            return res.status(200).json({
                status: true,
                results: nft.length,
                message: "all nft",
                data: nft
            })
        } else {
            return res.send({
                status: false,
                message: "No nft's",
                data: []
            })
        }
    }

    let doc
    if (req.query.status !== "") {
        doc = await NFT.find({status: req.query.status})
    } else {
        doc = await NFT.find({})
    }

    if (doc.length > 0) {
        res.status(200).json({
            status: true,
            results: doc.length,
            message: "all NFT",
            users: doc
        })
    } else {
        res.send({status: false, message: "No NFT", data: []})
    }
})

//get all collections
exports.getAllCollection = catchAsync(async (req, res, next) => {
    let collection
    let search = req.query.search
    if (search) {
        let QStringTitle = searchQuery(search, "title")
        let QStringDesccription = searchQuery(search, "description")
        collection = await Collection.find({$or: QStringTitle.concat(QStringDesccription)})
        if (collection.length > 0) {
            return res.status(200).json({
                status: true,
                results: collection.length,
                message: "all collection",
                data: collection
            })
        } else {
            res.send({status: false, message: "No Collection", data: []})
        }
    }

    let doc
    if (req.query.status !== "") {
        doc = await Collection.find({status: req.query.status})
    } else {
        doc = await Collection.find({})
    }

    if (doc.length > 0) {
        res.status(200).json({
            status: true,
            results: doc.length,
            message: "all Collection",
            users: doc
        })
    } else {
        res.send({status: false, message: "No Collection", data: []})
    }
})

// dashboard details
exports.dashboard = catchAsync(async (req, res, next) => {
    let nfts = await NFT.find()

    let viewsCount = 0
    let royalty = 0
    let earned = 0

    //nftCount
    let nftCount = await NFT.find({status: 'Sold'}).count()

    // viewsCount
    nfts.forEach(el => {
        viewsCount += el.views
    })

    // bidcount
    let bidCount = await Bid.find().count()

    // royalty
    nfts.forEach(el => {
        royalty += el.price * el.royalty / 100
    })

    //earned
    nfts.forEach(el => {
        earned += el.price
    })

    // collection list
    let yourCollection = await Collection.find({user: req.user._id})

    // json
    let dashboard = {
        nftCount: nftCount,
        viewsCount: viewsCount,
        bidCount: bidCount,
        royalty: royalty,
        earned: earned,
        recentBid: recentBid,
        yourCollection: yourCollection,
    }
    res.send({status: true, message: 'dashboard details', data: dashboard})
})

// topSellingNFT
exports.topSellingNFT = catchAsync(async (req, res, nesxt) => {
    let topSellingNFT

    if (req.query.collectionId !== "") {
        topSellingNFT = await NFT.find({collectionId: req.query.collectionId}).sort({price: -1}).limit(10)
    } else {
        topSellingNFT = await NFT.find({}).sort({price: -1}).limit(10)
    }
    res.send({status: true, message: 'top selling nft', data: topSellingNFT})
})

// most viewed nft
exports.mostviewedNFT = catchAsync(async (req, res, nesxt) => {
    let mostviewedNFT

    if (req.query.collectionId != "") {
        mostviewedNFT = await NFT.find({collectionId: req.query.collectionId}).sort({views: -1}).limit(10)
    } else {
        mostviewedNFT = await NFT.find({}).sort({views: -1}).limit(10)
    }
    res.send({status: true, message: 'most viewed nft', data: mostviewedNFT})
})

// Recent Bids
exports.recentBids = catchAsync(async (req, res, nesxt) => {
    let recentBids

    if (req.query.collectionId !== "") {
        recentBids = await Bid.find({collectionId: req.query.collectionId}).sort({createdAt: -1}).limit(10)
    } else {
        recentBids = await Bid.find({}).sort({createdAt: -1}).limit(10)
    }
    res.send({status: true, message: 'Recent Bids', data: recentBids})
})


//sales data
exports.salesData = async (req, res) => {
    const start = moment().startOf('day').subtract(15, 'day').toDate()
    const end = moment().startOf('day').toDate()
    let first = new Date().getDate() - new Date().getDay()
    let last = first + 6;
    let firstday = new Date(new Date().setDate(first))
    let lastday = new Date(new Date().setDate(last))
    const e = moment().startOf('day').subtract(365, 'day').toDate()
    //daily
    let dailyarr = []
    dailyarr = await Order.find({$and: [{createdAt: {$gt: start}}, {createdAt: {$lte: end}}]}).populate('nft')

    let aray = []
    dailyarr.forEach(el => {
        if (el.nft != null) {
            aray.push(el)
        }
    })
    let distictdates = [...new Set(aray.map(a => a.createdAt.toString()))]
    //count each date frequency
    let daily = distictdates.map(a => {
            return {
                count: aray.filter(a1 => a1.createdAt.toString().startsWith(a)).length,
                createdAt: a
            }
        }
    )
    //weekly
    let weeklyarr = []
    weeklyarr = await Order.find({$and: [{createdAt: {$gt: firstday}}, {createdAt: {$lte: lastday}}]}).populate({path: "nft"})

    let bray = []
    weeklyarr.forEach(el => {
        if (el.nftId != null) {
            bray.push(el)
        }
    })
    let distictdate = [...new Set(bray.map(a => a.createdAt.toString()))]
    //count each date frequency
    let weekly = distictdate.map(a => {
            return {
                count: bray.filter(a1 => a1.createdAt.toString().startsWith(a)).length,
                createdAt: a
            }
        }
    )
    //monthly
    let arr = []
    arr = await Order.find({}).populate({path: "nft"})

    let ar = []
    arr.forEach(el => {
        if (el.nftId != null) {
            ar.push(el)
        }
    })
    let distict_dates = [...new Set(ar.map(a => a.createdAt.toString().substring(0, 7)))];
    //count each date frequency
    let Monthly = distict_dates.map(a => {
            return {
                count: ar.filter(a1 => a1.createdAt.toString().startsWith(a)).length,
                createdAt: a
            }
        }
    )
    let montharray = [
        {month: 'Jan', count: 0}, {month: 'Feb', count: 0}, {month: 'Mar', count: 0}, {
            month: 'Apr',
            count: 0
        }, {month: 'May', count: 0}, {month: 'Jun', count: 0},
        {month: 'Jul', count: 0}, {month: 'Aug', count: 0}, {month: 'Sep', count: 0}, {
            month: 'Oct',
            count: 0
        }, {month: 'Nov', count: 0}, {month: 'Dec', count: 0}
    ]
    montharray.forEach(el => {
        Monthly.forEach(ele => {
            if (ele.createdAt.substring(4, 7) == el.month) {
                el.count = el.count + ele.count
            }
        })
    })
    res.send({
        status: true,
        message: 'Sales Data Information',
        data: {daily: daily, weekly: weekly, monthly: montharray}
    })
}

exports.getNFT = catchAsync(async (req, res, next) => {
    let nft = await NFT.findOne({_id: req.params.id}).populate({path: 'collectionId', populate: {path: 'user'}});
    if (nft) {
        let orders = await Order.find({nft: req.params.id}).sort({currentDate: -1}).populate([{path: 'buyer'}, {path: 'seller'}]);
        let doc = {
            currentPrice: nft.price,
            category: nft.category,
            explicitContent: nft.explicit_sensitive ? "Yes" : "No",
            description: nft.description,
            stats: nft.stats,
            nft: nft
        };
        if (orders.size > 0) {
            doc.seller = orders[0].seller.name;
            doc.buyer = orders[0].buyer.name;
        } else {
            doc.seller = nft.collectionId.user.name;
        }
        // TODO add properties and supply attribute
        doc.productActivity = orders;
        res.send({status: true, message: 'NFT details', data: doc})
    } else
        res.send({status: false, message: 'NFT not found', data: null})
});

exports.editProfile = catchAsync(async (req, res, next) => {
    let data = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        walletId: req.body.walletId,
        bio: req.body.bio,
        domain: req.body.domain,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
    }
    let user = await User.findOneAndUpdate({_id: req.user.id}, data, {new: false});
    return res.send({status: true, message: 'Profile updated successfully', data: user})
});

exports.editNotificationSettings = catchAsync(async (req, res, next) => {
    let data = {
        itemsSold: req.body.itemsSold,
        bidActivity: req.body.bidActivity,
        priceChange: req.body.priceChange,
        auctionExpiration: req.body.auctionExpiration,
        outbid: req.body.outbid,
        successfullPurchase: req.body.successfullPurchase,
        omniseaNewsLetter: req.body.omniseaNewsLetter,
    }

    let settings = await Notification.findOneAndUpdate({userId: req.user.id}, data, {new: true});
    return res.send({status: true, message: 'Notification settings updated successfully', data: settings})
});

exports.customerSupport = catchAsync(async (req, res, next) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        queryType: req.body.queryType,
        message: req.body.message,
        attachment: req.body.attachment,
    }
    let support = await Support.create(data);
    return res.send({status: true, message: 'Support request submitted successfully', data: support})
});
