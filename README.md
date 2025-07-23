# 📚 Taskelio Dashboard

A fully functional task management dashboard built with **Next.js**, **Tailwind CSS**, **Redux Toolkit**, and **Recharts**.

---

## 🚀 Features

- User authentication (mocked)
- Dynamic task table with:
  - Filtering (priority, status)
  - Sorting (due date, priority)
  - Pagination
  - Live status updating
  - Delete functionality
  - Add Task functionality
- Weekly and status-based analytics using charts (Recharts)
- Fully responsive design

---

## 🛠️ Tech Stack

- **Next.js**
- **React + Redux Toolkit**
- **Tailwind CSS**
- **Recharts**
- **TypeScript**

---

## 📦 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/YOUR_USERNAME/Taskelio-dashboard
cd taskelio-dashboard
```

2. **Clone the repo**
Install dependencies
npm install

3. **Run the app**
npm run dev

4. **Visit the dashboard**
Open http://localhost:3000

## 🧠 Implementation Approach

- The app is split into two main pages: **Login** and **Dashboard**.
- Used **Next.js API Routes** to simulate backend logic and store data in memory (arrays).
- The **Dashboard** is composed of smaller components (Sidebar, TaskTable, Charts, etc.), each styled with **Tailwind CSS** and built with isolated logic.
- Utilized **Redux Toolkit**:
  - `authSlice` for user info
  - `taskSlice` for task operations (add, update, delete, get)
- On login, user and task data are fetched from the mock API and stored in Redux state.

## 🎥 Demo
https://youtu.be/JCMr6Vg49tE?si=3DXbsWvqFZ8Yf2k-


