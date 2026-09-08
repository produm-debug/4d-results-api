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

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/lottery-app.git](https://github.com/your-username/lottery-app.git)
   cd lottery-app