# 📅 MyCalendar – Interactive Event Calendar

![MyCalendar Banner](https://img.shields.io/badge/React-Calendar-blue?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-green?style=for-the-badge)](https://Mohammednazel.github.io/MyCalendar/)

Welcome to **MyCalendar**, a modern, responsive calendar web app built using **React** and **Tailwind CSS**. This project allows users to view monthly calendars, browse events, and visualize overlapping/conflicting events with clean tooltips and color coding.

---

## 🌐 Live Demo

👉 [Click here to view the Live Demo](https://Mohammednazel.github.io/MyCalendar/)

---

## ✨ Features

- 📆 **12-Month Scrollable View** – View a full year of months with smooth scrolling.
- 🧭 **Sticky Navigation Header** – Dropdown to jump to specific months and navigate by year.
- 🗓️ **Day Cells with Tooltips** – Hover or click on any date to view event details.
- 🎨 **Color-Coded Events** – Distinct color tags for overlapping/conflicting events.
- 🖥️ **Responsive UI** – Adapts beautifully to desktop, tablet, and mobile screens.
- ⚡ **Smooth Scroll to Today** – Quickly return to the current month.

---

## 🧠 How It Works

- The app renders the next 12 months from the current date.
- Events are fetched from a local JSON file.
- Each day highlights relevant events.
- If multiple events overlap, conflicts are shown clearly with separate colors and tooltips.

---

## 🛠️ Technologies Used

- **React** – Front-end JavaScript library
- **Tailwind CSS** – Utility-first CSS framework
- **Day.js** – Lightweight date library for manipulating dates
- **HTML5 + CSS3 + JSX**

---

## 🚀 Getting Started (Optional for Local Setup)

```bash
git clone https://github.com/Mohammednazel/MyCalendar.git
cd MyCalendar
npm install
npm start
