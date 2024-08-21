# Customer API Documentation

This documentation provides an overview of the Customer API, which is built using the MERN stack (MongoDB, Express.js, React, Node.js). The API provides various endpoints to retrieve and analyze customer data.

## FinFusion: Banking Data Aggregator

FinFusion is an overall package designed to aggregate and analyze banking data. This interface is built using the MERN stack to provide seamless integration and efficient data management.

## Why MERN Stack?

The MERN stack is a popular choice for full-stack web development due to its seamless integration and efficient data management. Here are some reasons why the MERN stack was chosen for this project:

- **MongoDB:** Excellent at handling JSON data, which is the primary data format used in React applications.
- **Express.js:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **React:** A JavaScript library for building user interfaces, particularly suited for single-page applications.
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, allowing for server-side execution of JavaScript code.
- **TailwindCSS:** A utility-first CSS framework for rapidly building custom user interfaces.

## Setup

### Prerequisites

- Node.js
- MongoDB
- Express.js
- Mongoose
- Cors
- Dotenv

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/customer-api.git
   cd customer-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/new_data
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Base URL

```
http://localhost:3000/api/customer
```

### Endpoints

#### 1. Get Top 5 Documents

- **URL:** `/`
- **Method:** `GET`
- **Description:** Retrieves the first 5 documents from the customer collection for verification.
- **Response:**
  ```json
  [
    {
      "_id": "60f3e1b6d1f1e2f3e4f5f6f7",
      "name": "John Doe",
      "age": 30,
      "gender": "M",
      "customer": "C001",
      "merchant": "M001",
      "category": "Electronics",
      "amount": 150,
      "fraud": false
    },
    ...
  ]
  ```

#### 2. Get Age Distribution

- **URL:** `/age-distribution`
- **Method:** `GET`
- **Description:** Retrieves the number of occurrences for each distinct age.
- **Response:**
  ```json
  {
    "25": 10,
    "30": 15,
    "35": 5,
    ...
  }
  ```

#### 3. Get Gender Distribution

- **URL:** `/gender-distribution`
- **Method:** `GET`
- **Description:** Retrieves the number of occurrences for each distinct gender.
- **Response:**
  ```json
  {
    "M": 50,
    "F": 45,
    "E": 5,
    ...
  }
  ```

#### 4. Count Unique Customers

- **URL:** `/unique-customers-count`
- **Method:** `GET`
- **Description:** Retrieves the count of unique customers.
- **Response:**
  ```json
  {
    "uniqueCustomersCount": 100
  }
  ```

#### 5. Count Unique Merchants

- **URL:** `/unique-merchants-count`
- **Method:** `GET`
- **Description:** Retrieves the count of unique merchants.
- **Response:**
  ```json
  {
    "uniqueMerchantsCount": 50
  }
  ```

#### 6. Get Transactions by Category

- **URL:** `/transactions-by-category`
- **Method:** `GET`
- **Description:** Retrieves the number of transactions in each category.
- **Response:**
  ```json
  [
    {
      "_id": "Electronics",
      "count": 20
    },
    {
      "_id": "Groceries",
      "count": 30
    },
    ...
  ]
  ```

#### 7. Get Transactions by Amount Ranges

- **URL:** `/amount-ranges`
- **Method:** `GET`
- **Description:** Retrieves the count of transactions in specific amount ranges.
- **Response:**
  ```json
  [
    {
      "_id": "0-50",
      "count": 10
    },
    {
      "_id": "50-100",
      "count": 15
    },
    ...
  ]
  ```

#### 8. Get Fraud Stats

- **URL:** `/fraud-stats`
- **Method:** `GET`
- **Description:** Retrieves the count of fraud and non-fraud transactions.
- **Response:**
  ```json
  [
    {
      "fraudStatus": "Fraud",
      "count": 5
    },
    {
      "fraudStatus": "Not Fraud",
      "count": 95
    }
  ]
  ```

#### 9. Get Transactions by Amount Range and Gender

- **URL:** `/amount-range-gender`
- **Method:** `GET`
- **Description:** Retrieves the count of transactions in each amount range, broken down by gender.
- **Response:**
  ```json
  [
    {
      "range": "0-50",
      "maleCount": 5,
      "femaleCount": 3,
      "otherCount": 2
    },
    {
      "range": "50-100",
      "maleCount": 8,
      "femaleCount": 5,
      "otherCount": 2
    },
    ...
  ]
  ```

## Error Handling

- **500 Internal Server Error:** If there is an error fetching data from the database, the server will respond with a 500 status code and a message indicating an internal server error.

## Frontend Documentation

### Dashboard Component

The `Dashboard` component is responsible for displaying various statistics and graphs related to customer data. It uses the `ApexCharts` library for rendering charts and `axios` for making API requests.

#### Dependencies

- React
- ApexCharts
- Axios
- Navbarx (custom component)

#### State Management

The component uses the following state variables:

- **Graph States:**
  - `categories`: Stores the data for transactions by category.
  - `genderDistribution`: Stores the data for gender distribution.
  - `amountRanges`: Stores the data for transactions by amount ranges.
  - `amountRangeGender`: Stores the data for transactions by amount range and gender.
  - `transactionTrends`: Stores the data for transaction trends.

- **Non-Graph States:**
  - `customerCount`: Stores the count of unique customers.
  - `merchantCount`: Stores the count of unique merchants.
  - `transactionsCount`: Stores the count of transactions.
  - `fraudCount`: Stores the count of fraud transactions.

#### Methods

The component defines several methods to fetch data from the API and update the state:

- `getCategories`: Fetches data for transactions by category.
- `getGenderDistribution`: Fetches data for gender distribution.
- `getAmountRanges`: Fetches data for transactions by amount ranges.
- `getAmountRangeGender`: Fetches data for transactions by amount range and gender.
- `getCustomersCount`: Fetches the count of unique customers.
- `getMerchantsCount`: Fetches the count of unique merchants.
- `getTransactionsCount`: Fetches the count of transactions and fraud transactions.

#### Effects

The component uses `useEffect` hooks to:

- Fetch data when the component mounts.
- Render charts using `ApexCharts` when the corresponding data is available.

#### Example Usage

```jsx
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
    const getCategories = async () => {
        const response = await axios.get("http://localhost:3000/api/customer/transactions-by-category");
        if (response) {
            setCategories(response.data);
        }
    };

    const getGenderDistribution = async () => {
        const response = await axios.get("http://localhost:3000/api/customer/gender-distribution");
        if (response) {
            setGenderDistribution(response.data);
        }
    };

    const getAmountRanges = async () => {
        const response = await axios.get("http://localhost:3000/api/customer/amount-ranges");
        if (response) {
            setAmountRanges(response.data);
        }
    };

    const getAmountRangeGender = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/customer/amount-range-gender");
            if (response) {
                setAmountRangeGender(response.data);
            }
        } catch (error) {
            console.error('Error fetching amount range and gender data:', error);
        }
    };

    // * non graph methods
    const getCustomersCount = async () => {
        const response = await axios.get("http://localhost:3000/api/customer/unique-customers-count");
        if (response) {
            setCustomerCount(response.data.uniqueCustomersCount);
        }
    };

    const getMerchantsCount = async () => {
        const response = await axios.get("http://localhost:3000/api/customer/unique-merchants-count");
        if (response) {
            setMerchantCount(response.data.uniqueMerchantsCount);
        }
    };

    const getTransactionsCount = async () => {
        const response = await axios.get("http://localhost:3000/api/customer/fraud-stats");
        if (response) {
            setTransactionsCount(response.data[0].count);
            setFraudCount(response.data[1].count);
        }
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
```

## Conclusion

FinFusion is an overall package designed to aggregate and analyze banking data. This interface is built using the MERN stack to provide seamless integration and efficient data management. The API provides a comprehensive set of endpoints to retrieve and analyze customer data, while the frontend uses React and ApexCharts to visualize the data effectively.