# API Documentation

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
   git clone https://github.com/ashishnex007/fin-fusion.git
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/<collection_name>
   ```
   Same process applies to the Mongo Atlas

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

## Frontend Documentation

### Dashboard Component

The `Dashboard` component is responsible for displaying various statistics and graphs related to customer data. It uses the `ApexCharts` library for rendering charts and `axios` for making API requests.

#### Dependencies

- React
- ApexCharts
- Axios
- Navbarx (custom component)

## Conclusion

FinFusion is an overall package designed to aggregate and analyze banking data. This interface is built using the MERN stack to provide seamless integration and efficient data management. The API provides a comprehensive set of endpoints to retrieve and analyze customer data, while the frontend uses React and ApexCharts to visualize the data effectively.
