import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';
import Navbarx from '../components/Navbarx';

const Dashboard = () => {
    
    // * graph states 
    const [categories, setCategories] = useState([]);
    const [genderDistribution, setGenderDistribution] = useState([]);
    const [amountRanges, setAmountRanges] = useState([]);
    const [amountRangeGender, setAmountRangeGender] = useState([]);
    const [transactionTrends, setTransactionTrends] = useState([]);

    // * non graph states
    const [customerCount, setCustomerCount] = useState();
    const [merchantCount, setMerchantCount] = useState();
    const [transactionsCount, setTransactionsCount] = useState();
    const [fraudCount, setFraudCount] = useState();


    // * graph methods


    const getCategories = async() => {
        const response = await axios.get("http://localhost:3000/api/customer/transactions-by-category");
        if(response){
            setCategories(response.data);
        }
        // console.log(response.data);
    };

    // * Fetch gender distribution data
    const getGenderDistribution = async () => {
        const response = await axios.get("http://localhost:3000/api/customer/gender-distribution");
        if (response) {
            setGenderDistribution(response.data);
        }
        console.log(response.data);
    };

    // * Fetch amount ranges data
    const getAmountRanges = async () => {
        const response = await axios.get("http://localhost:3000/api/customer/amount-ranges");
        if (response) {
            setAmountRanges(response.data);
        }
    };

    const getAmountRangeGender = async() => {
        try {
            const response = await axios.get("http://localhost:3000/api/customer/amount-range-gender");
            if (response) {
                setAmountRangeGender(response.data);
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching amount range and gender data:', error);
        }
    };


    // * non graph methods


    const getCustomersCount = async() => {
        const response = await axios.get("http://localhost:3000/api/customer/unique-customers-count");
        if(response){
            setCustomerCount(response.data.uniqueCustomersCount);
        }
    };

    const getMerchantsCount = async() => {
        const response = await axios.get("http://localhost:3000/api/customer/unique-merchants-count");
        if(response){
            setMerchantCount(response.data.uniqueMerchantsCount);
        }
    };

    const getTransactionsCount = async() => {
        const response = await axios.get("http://localhost:3000/api/customer/fraud-stats");
        console.log(response.data);
        setTransactionsCount(response.data[0].count);
        setFraudCount(response.data[1].count);
    };

    useEffect(() => {
        getCategories();
        getGenderDistribution();
        getAmountRanges();
        getAmountRangeGender();

        getCustomersCount();
        getMerchantsCount();
        getTransactionsCount();
    }, []);

    // * categories graph loader
    useEffect(() => {
        if (categories.length > 0) {
            const categoryOptions = {
                chart: {
                    type: 'bar',
                    height: 700, // Adjust the height for better visibility
                    width: '100%'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnnWidth: '55%',
                    }
                },
                series: [{
                    name: 'Transactions',
                    data: categories.map(category => category.count)
                }],
                xaxis: {
                    categories: categories.map(category => category._id)
                },
                colors: ['#008FFB'],
                title: {
                    text: 'Transactions by Category',
                    align: 'center',
                    margin: 20,
                }
            };

            const chart = new ApexCharts(document.querySelector("#categories_chart"), categoryOptions);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [categories]);

    // * gender dist graph loader
    useEffect(() => {
        if (Object.keys(genderDistribution).length > 0) {
            const genderOptions = {
                chart: {
                    type: 'donut',
                    height: 500,
                },
                series: Object.values(genderDistribution), // Values for the donut slices
                labels: Object.keys(genderDistribution), // Labels for the donut slices
                colors: ['#00E396', '#FEB019', '#FF4560', '#775DD0'], // Example colors for each gender category
                title: {
                    text: 'Gender Distribution',
                    align: 'center',
                    margin: 20,
                }
            };

            const chart = new ApexCharts(document.querySelector("#gender_chart"), genderOptions);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [genderDistribution]);

    // * amount of data
    useEffect(() => {
        if (amountRanges.length > 0) {
            const amountOptions = {
                chart: {
                    type: 'line',
                    height: 600,
                    width: '80%'
                },
                series: [{
                    name: 'Amount Range Transactions',
                    data: amountRanges.map(range => range.count)
                }],
                xaxis: {
                    categories: amountRanges.map(range => range._id)
                },
                colors: ['#FF4560'],
                title: {
                    text: 'Transactions by Amount Range',
                    align: 'center',
                    margin: 20,
                },
                markers: {
                    size: 4,
                    colors: ['#FF4560'],
                    strokeColors: '#fff',
                    strokeWidth: 2,
                    hover: {
                        size: 7,
                    }
                },
            };

            const chart = new ApexCharts(document.querySelector("#amount_chart"), amountOptions);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [amountRanges]);

    useEffect(() => {
        if (amountRangeGender.length > 0) {
            const chartOptions = {
                chart: {
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '60%',
                        endingShape: 'rounded'
                    }
                },
                series: [
                    {
                        name: 'Male',
                        data: amountRangeGender.map(item => item.maleCount)
                    },
                    {
                        name: 'Female',
                        data: amountRangeGender.map(item => item.femaleCount)
                    },
                    {
                        name: 'Other',
                        data: amountRangeGender.map(item => item.otherCount)
                    }
                ],
                xaxis: {
                    categories: amountRangeGender.map(item => item.range),
                    title: {
                        text: 'Amount Range'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Count'
                    }
                },
                legend: {
                    position: 'top'
                },
                dataLabels: {
                    enabled: true
                }
            };

            const chart = new ApexCharts(document.querySelector("#amount_range_gender_chart"), chartOptions);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [amountRangeGender]);

    return (
        <div>
            <Navbarx />

            <div className="flex w-full justify-evenly py-8">
                <div className="bg-orange-100 border-2 border-orange-400 w-[17rem] h-[8rem] rounded-md flex flex-col items-center justify-center">
                    <h1 className="font-bold text-xl py-4">Unique Customers</h1>
                    <h1 className="font-semibold text-2xl text-center">{customerCount}</h1>
                </div>

                <div className="bg-blue-100 border-2 border-blue-400 w-[17rem] h-[8rem] rounded-md flex flex-col items-center justify-center">
                    <h1 className="font-bold text-xl py-4">Unique Merchants</h1>
                    <h1 className="font-semibold text-2xl text-center">{merchantCount}</h1>
                </div>

                <div className="bg-green-100 border-2 border-green-400 w-[17rem] h-[8rem] rounded-md flex flex-col items-center justify-center">
                    <h1 className="font-bold text-xl py-4">Transactions Done</h1>
                    <h1 className="font-semibold text-2xl text-center">{transactionsCount}</h1>
                </div>

                <div className="bg-red-100 border-2 border-red-400 w-[17rem] h-[8rem] rounded-md flex flex-col items-center justify-center">
                    <h1 className="font-bold text-xl py-4">Frauds Detected</h1>
                    <h1 className="font-semibold text-2xl text-center">{fraudCount}</h1>
                </div>
            </div>

            <button onClick={getTransactionsCount}>wor</button>

            {/* // * charts come here */}
            <div>
                <div className="w-full flex justify-evenly">
                    <div id="categories_chart" className="w-[800px]"></div>
                    <div id="gender_chart" className="w-[800px]"></div>
                </div>
                
                <h1 className="text-center text-2xl font-bold py-8">Transactions by Amount Range</h1>
                <div className="w-full h-[80vh] flex justify-center">
                    <div id="amount_chart" className="w-full"></div>
                </div>

                <div id="amount_range_gender_chart" className="w-[800px] mt-8"></div>
            </div>
        </div>
    );
}

export default Dashboard;