# 🎰 Lottery Results Scraper & API

A Node.js and Express backend service that automatically scrapes real-time lottery winning numbers from live web sources, parses the draw data, and persists historical results to MongoDB Atlas using Mongoose.

---

## 🚀 Features

- **Automated Web Scraping:** Scrapes real-time lottery draw results directly from official live web sources using `axios` / `cheerio`.
- **Data Parsing & Normalization:** Extracts, cleans, and structures raw HTML draw data into standardized JSON formats.
- **Persistent Storage:** Saves draw history into MongoDB Atlas, preventing duplicate entries with strict schema validation.
- **RESTful API:** Exposes endpoints to query current and historical draw results.
- **Environment Security:** Secures connection strings and scraping configurations using `dotenv` and Git ignore policies.

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Scraping & HTTP:** Axios, Cheerio
- **Database & ODM:** MongoDB Atlas, Mongoose
- **Configuration & Security:** dotenv, Git

---

## 📋 Prerequisites

Before running this project, ensure you have:
* **Node.js** (v18 or higher)
* **MongoDB** (A local MongoDB instance or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/produm-debug/4d-results-api.git](https://github.com/produm-debug/4d-results-api.git)
   cd 4d-results-api

2. **Install Dependencies:**
    ```bash
    npm install

3. **Configure Environment Variables:**
    ```bash
    Create a .env file in the root directory:
    touch .env

4. **Add environment configuration to .env:**
    ```bash
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
    PORT=5000

5. **Run the Application:**
    ```bash
    node server.js

---


    