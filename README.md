# React Exercises – Axios, useEffect, and Filtering

This repository contains two small React exercises focused on working with REST APIs using Axios, useEffect, and filter states.

---

## 📘 Exercise 1: CRUD with Axios & useEffect

- Fetch articles from `/articles` using `useEffect`.
- Use Axios to send GET, POST, PUT, DELETE requests.
- Manage article form input with `useState`.
- Use React Router to view, add, update, and delete articles.
- Logic and UI are separated for cleaner code.

### 🧠 Key Concepts
- `useEffect()` to load data on mount.
- Axios for HTTP requests.
- Form state management using `useState`.
- RESTful route patterns (`/articles`, `/articles/:id`).

---

## 📘 Exercise 2: Article Filtering by Journalist & Category

- Fetch data from:
  - `/journalists`
  - `/categories`
  - `/articles`, `/journalists/:id/articles`, `/categories/:id/articles`
- Apply filters based on selected journalist or category.
- When both filters are selected, frontend applies additional filtering manually.

### 🧠 Key Concepts
- Controlled dropdowns for filtering.
- State management for multiple filters.
- Client-side filtering when backend doesn't support combined filters.
- Clear sub-resource routes (e.g. `/journalists/:id/articles`) for API clarity.

---

## ✨ Summary

| Feature               | Exercise 1 | Exercise 2 |
|----------------------|------------|------------|
| Axios API calls      | ✅         | ✅         |
| useEffect            | ✅         | ✅         |
| useState for inputs  | ✅         | ✅         |
| CRUD operations      | ✅         | ❌         |
| Filtering UI         | ❌         | ✅         |
| Client-side filtering| ❌         | ✅         |
| RESTful API usage    | ✅         | ✅         |

---

## 🛠 Requirements

- React
- Axios
- Backend running on `http://localhost:5000`

---

## 📂 Notes

These are not full projects, but focused component-level exercises.
Perfect for learning how React interacts with REST APIs.