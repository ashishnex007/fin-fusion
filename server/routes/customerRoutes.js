const express = require('express');
const {Customer} = require('../models/customerModel');
const router = express.Router();

// * Get top 5 documents from the collection for verification
router.get('/', async(req, res) => {
    try {
        const customers = await Customer.find().limit(5).exec();
        console.log('First 5 documents:', customers);
        res.json(customers);
    } catch (err) {
        console.error('Error retrieving data:', err);
    }
});

// * Get the number of occurrences for each distinct age
router.get('/age-distribution', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$age',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 } // Optional: sort by count
            }
        ];

        const results = await Customer.aggregate(pipeline).exec();

        // Convert the results to a simple object with age as key and count as value
        const ageDistribution = {};
        results.forEach(item => {
            ageDistribution[item._id] = item.count;
        });

        res.json(ageDistribution);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// * get the gender distributions
router.get('/gender-distribution', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$gender',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 } // Optional: sort by count
            }
        ];

        const results = await Customer.aggregate(pipeline).exec();

        // Convert the results to a simple object with gender as key and count as value
        const genderDistribution = {};
        results.forEach(item => {
            genderDistribution[item._id] = item.count;
        });

        res.json(genderDistribution);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// * Count unique customers
router.get('/unique-customers-count', async (req, res) => {
    try {
        const uniqueCustomers = await Customer.distinct('customer').exec();
        const uniqueCustomersCount = uniqueCustomers.length;
        res.json({ uniqueCustomersCount });
    } catch (err) {
        console.error('Error fetching unique customers count:', err);
        res.status(500).send('Internal Server Error');
    }
});

// * Count unique merchants
router.get('/unique-merchants-count', async (req, res) => {
    try {
        const uniqueMerchants = await Customer.distinct('merchant').exec();
        const uniqueMerchantsCount = uniqueMerchants.length;
        res.json({ uniqueMerchantsCount });
    } catch (err) {
        console.error('Error fetching unique merchants count:', err);
        res.status(500).send('Internal Server Error');
    }
});

// * Get the number of transactions in each category
router.get('/transactions-by-category', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ];
        
        const results = await Customer.aggregate(pipeline).exec();
        res.json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// * Get the count of transactions in specific amount ranges
router.get('/amount-ranges', async (req, res) => {
    try {
        const pipeline = [
            {
                $bucket: {
                    groupBy: '$amount',
                    boundaries: [0, 50, 100, 200, 500, 1000, Infinity],
                    default: 'Other',
                    output: {
                        count: { $sum: 1 }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    range: {
                        $switch: {
                            branches: [
                                { case: { $lt: ['$_id', 50] }, then: '0-50' },
                                { case: { $lt: ['$_id', 100] }, then: '50-100' },
                                { case: { $lt: ['$_id', 200] }, then: '100-200' },
                                { case: { $lt: ['$_id', 500] }, then: '200-500' },
                                { case: { $lt: ['$_id', 1000] }, then: '500-1000' },
                                { case: { $gte: ['$_id', 1000] }, then: '1000+' }
                            ],
                            default: 'Other'
                        }
                    },
                    count: 1
                }
            },
            {
                $group: {
                    _id: '$range',
                    count: { $sum: '$count' }
                }
            },
            {
                $sort: { _id: 1 }  // Sort by range for consistent order
            }
        ];

        const results = await Customer.aggregate(pipeline).exec();
        res.json(results);
    } catch (err) {
        console.error('Error fetching amount ranges:', err);
        res.status(500).send('Internal Server Error');
    }
});

// * fraud stats
router.get('/fraud-stats', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$fraud',  // Group by the fraud field
                    count: { $sum: 1 }  // Count the number of occurrences
                }
            },
            {
                $project: {
                    _id: 0,  // Exclude the _id field from the output
                    fraudStatus: {
                        $cond: {
                            if: { $eq: ['$_id', 1] },
                            then: 'Fraud',
                            else: 'Not Fraud'
                        }
                    },
                    count: 1  // Include the count field
                }
            }
        ];

        const results = await Customer.aggregate(pipeline).exec();
        res.json(results);
    } catch (err) {
        console.error('Error fetching fraud stats:', err);
        res.status(500).send('Internal Server Error');
    }
});

// * Get the number of transactions in each amount range, broken down by gender
router.get('/amount-range-gender', async (req, res) => {
    try {
        const pipeline = [
            {
                $bucket: {
                    groupBy: '$amount',
                    boundaries: [0, 50, 100, 200, 500, 1000, Infinity],
                    default: 'Other',
                    output: {
                        count: { $sum: 1 },
                        maleCount: {
                            $sum: {
                                $cond: [{ $eq: ['$gender', 'M'] }, 1, 0]
                            }
                        },
                        femaleCount: {
                            $sum: {
                                $cond: [{ $eq: ['$gender', 'F'] }, 1, 0]
                            }
                        },
                        otherCount: {
                            $sum: {
                                $cond: [
                                    { $in: ['$gender', ['E', 'U']] },
                                    1,
                                    0
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    range: {
                        $switch: {
                            branches: [
                                { case: { $lt: ['$_id', 50] }, then: '0-50' },
                                { case: { $lt: ['$_id', 100] }, then: '50-100' },
                                { case: { $lt: ['$_id', 200] }, then: '100-200' },
                                { case: { $lt: ['$_id', 500] }, then: '200-500' },
                                { case: { $lt: ['$_id', 1000] }, then: '500-1000' },
                                { case: { $gte: ['$_id', 1000] }, then: '1000+' }
                            ],
                            default: 'Other'
                        }
                    },
                    maleCount: 1,
                    femaleCount: 1,
                    otherCount: 1
                }
            },
            {
                $sort: { range: 1 }  // Sort by range for consistent order
            }
        ];

        const results = await Customer.aggregate(pipeline).exec();
        res.json(results);
    } catch (err) {
        console.error('Error fetching amount range and gender data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// * 
// Get transaction trends over time
router.get('/transaction-trends', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                        day: { $dayOfMonth: '$date' }
                    },
                    totalAmount: { $sum: '$amount' },
                    transactionCount: { $sum: 1 }
                }
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                    '_id.day': 1
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateFromParts: {
                            year: '$_id.year',
                            month: '$_id.month',
                            day: '$_id.day'
                        }
                    },
                    totalAmount: 1,
                    transactionCount: 1
                }
            }
        ];

        const results = await Customer.aggregate(pipeline).exec();
        res.json(results);
    } catch (err) {
        console.error('Error fetching transaction trends:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;