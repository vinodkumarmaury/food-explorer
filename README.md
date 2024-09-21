## Demo Link: https://food-explorer-task.netlify.app/
## Food Product Explorer Application
This project is a React.js application that provides an interface to explore food products using the OpenFoodFacts API. The application allows users to search for products by name and barcode, filter products by category, sort them, and view detailed product information.

## Method Used to Solve the Problem

## 1. Understanding the Requirements:

The problem required building an application that retrieves and displays product data from the OpenFoodFacts API, with functionalities like searching, filtering, sorting, and viewing detailed information about products.
Additionally, the application needed to handle CORS restrictions, allow users to search by barcode, and be responsive to different screen sizes.

## 2. Breaking Down the Problem

I broke down the solution into key components:
ProductList: Displays a list of products.

ProductDetailPage: Displays details for a selected product.

SearchBar: Allows users to search for products by name and barcode.

CategoryFilter: Enables users to filter products by category.

SortOptions: Allows users to sort products alphabetically (A-Z or Z-A).

Cart: Allows users to add products to the cart and view them.

Navigation between pages was handled using React Router to ensure a smooth transition between the product list and product detail pages.

## 3. Implementation Steps

Initial Setup: Set up a React project with the necessary components and routing for navigation between the product list and product detail pages.

Fetching Product Data: Used Axios to fetch data from the OpenFoodFacts API.

Handled CORS issues by using a CORS proxy (https://cors-anywhere.herokuapp.com/).

Cached API responses to avoid hitting the API rate limit (429 Too Many Requests error).

Search by Name and Barcode: Implemented the SearchBar component to allow users to search products either by name or by entering a barcode.

Category Filtering and Sorting: Built CategoryFilter and SortOptions components to enable filtering and sorting of products based on user input.

Product Detail Page: Created a separate page for displaying detailed information about the product (ingredients, nutrition grade, etc.).

Included a "Back to Home" button for easy navigation back to the product list.

Responsiveness: Ensured that the layout was responsive by using CSS Flexbox, allowing the app to be used seamlessly on both desktop and mobile devices.

## 4. Testing and Debugging

Tested the application by searching for products by name and barcode.
Ensured that navigating between the product list and product detail pages worked smoothly.
Debugged issues related to CORS, API rate limits, and loading states on the product detail page.

## 5. Challenges Addressed

CORS: Bypassed CORS restrictions using a proxy.

API Rate Limits: Cached product data to prevent excessive requests to the OpenFoodFacts API.

Responsive Design: Made sure the application worked on various screen sizes by testing on both desktop and mobile.

Time Taken to Complete the Assignment
The assignment took approximately 12 hours to complete.

## Running the Application

Clone the Repository:

git clone https://github.com/your-username/food-product-explorer.git
Install Dependencies:

npm install
Run the Application:

npm start
Usage:

You can search for products by name or barcode.
Filter products by category and sort them alphabetically.
Click on a product to view detailed information.
Use the "Back to Home" button on the product detail page to return to the product list.
