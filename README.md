# Soulful Living - Eco-Friendly Furniture E-Commerce

**Live Demo:** [Link to your deployed Netlify/Vercel site]

![Soulful Living Home Page](https://i.imgur.com/your-screenshot-url.png) 
<!-- **Action:** Take a beautiful screenshot of your home page, upload it to a service like Imgur, and paste the URL here. -->

---

## 📖 Project Overview

**Soulful Living** is a feature-rich, frontend-only e-commerce Single Page Application (SPA) for a conceptual sustainable furniture brand. This project was built from the ground up to serve as a comprehensive portfolio piece, demonstrating a mastery of modern React, advanced state management techniques, complex UI/UX animations, and a deep focus on performance optimization.

The platform delivers a highly interactive and soulful user experience that reinforces the company's mission to nurture the planet, featuring a complete suite of advanced e-commerce functionalities and a unique, multi-product customization studio.

---

## ✨ Key Features

This project is a complete simulation of a modern e-commerce experience, showcasing a wide range of functionalities:

*   **Dynamic Product Catalog:** A fully interactive catalog with multi-faceted filtering (category, price, rating), sorting (price, popularity), and a debounced, client-side fuzzy search using **Fuse.js**.
*   **Live Furniture Customizer:** A "Design Studio" feature allowing users to select a base product (e.g., chair, sofa) and customize its components (materials, fabrics) in real-time, with dynamic pricing and asset handling.
*   **Persistent Shopping Cart & Wishlist:** A robust and persistent cart and wishlist system built with **React Context** and a custom `useLocalStorage` hook, featuring quantity updates, subtotals, and a promotional code system.
*   **Interactive Price Comparison:** A tool for users to select up to three products for a side-by-side comparison, with dynamic highlighting for "Cheapest" and "Best Value" options.
*   **Complete User Journey:** The application covers the full e-commerce flow, from product discovery to a simulated checkout with client-side validation, and a persistent "Your Orders" history page.
*   **Richly Animated UI:** The entire interface is brought to life with **Framer Motion**, including page transitions, a sequential-growth "Nurture Tree" animation, fluid image carousels, and an interactive search overlay.

---

## 🛠️ Tech Stack & Architectural Decisions

This project was built with a focus on modern, scalable, and performant frontend technologies.

*   **Core:** React (Hooks), JavaScript (ES6+), React Router
*   **State Management:** **React Context API** was chosen over Redux to demonstrate mastery of core React capabilities for managing complex global state (cart, wishlist, comparison) in a clean, scalable way. Custom hooks (`useDebounce`, `useForm`, `useLocalStorage`) were created to abstract and reuse complex logic.
*   **Styling:** **TailwindCSS** was used for a utility-first, responsive, and highly maintainable styling workflow.
*   **Animation:** **Framer Motion** was implemented for all animations to create a fluid, high-performance, and physically-based user experience.
*   **Search:** **Fuse.js** was integrated for a lightweight, powerful, client-side fuzzy search capability.

### **Performance Optimizations**

Performance was a primary consideration throughout development. Key optimizations include:
*   **Code-Splitting:** Routes are split into separate chunks using `React.lazy()` and `Suspense` to reduce the initial bundle size.
*   **Memoization:** `useMemo`, `useCallback`, and `React.memo` are used strategically to prevent unnecessary re-renders in computationally expensive components (like the product grid and filter logic).
*   **Image Optimization:** All product images are lazy-loaded by default, and next-gen formats would be used in a production environment.
*   **Debouncing:** User input in the search bar is debounced to prevent excessive re-renders and prepare the architecture for scalable API calls.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### **Prerequisites**

*   Node.js (v16 or later)
*   npm

### **Installation & Setup**

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/soulful-living-ecommerce.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd soulful-living-ecommerce
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Start the development server:**
    ```sh
    npm start
    ```
    The application will be available at `http://localhost:3000`.

---

## 💡 What I Learned

Building this project was a fantastic opportunity to go deep into the React ecosystem and tackle real-world e-commerce challenges. Key takeaways include:
*   Architecting a scalable state management solution using only React's built-in tools.
*   Implementing a wide array of performance optimization techniques and understanding their impact.
*   Designing and building complex, data-driven UI components like the live customizer and comparison table.
*   The power of a well-designed custom hook to create clean, reusable, and testable logic.

---
