# OWASP Juice Shop

A **React-based web application** inspired by the OWASP Juice Shop, featuring a set of interactive challenges to explore and learn about common web application vulnerabilities. This project is ideal for practicing secure coding techniques and understanding real-world security issues in a safe, controlled environment.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instruction)
4. [User Interface](#user-interface)
5. [Conclusion](#conclusion)
6. [References](#references)

## Overview

This project is a **React-based clone of the OWASP Juice Shop**, designed as a learning platform to practice web application security concepts. It features **unique cyber security challenges** that simulate real-world vulnerabilities, allowing users to explore and mitigate common security issues in a controlled environment.

## Prerequisite

Before setting up the project, ensure the following tools and software are installed on your system:

1. **Node.js** (v16 or later)

   - Download and install from the [Node.js official site](https://nodejs.org/).
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

2. **Git**
   - Download and install from the [Git official site](https://git-scm.com/).
   - Verify installation:
     ```bash
     git --version
     ```
3. **MongoDB**

   - Ensure you have MongoDB installed and running on your local machine or use a cloud-based service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Verify installation (for local setup):

   ```bash
   mongo --version
   ```

4. **Code Editor** (Optional but recommended)

   - Use an editor like [Visual Studio Code](https://code.visualstudio.com/).

5. **Browser**
   - A modern web browser like Chrome, Firefox, or Edge for testing.

If your project involves a database or API, make sure the relevant services or tools (e.g., Docker, Postman) are also installed.

## Setup Instructions

#### **1. Clone the Repository**

Download the project code to your local machine using Git:

```bash
git clone https://github.com/Aswath20000/Juice-shop
cd Juice-shop/owasp-juice-shop
```

---

#### **2. Install Dependencies**

Install the required packages using npm:

```bash
npm install
cd backend
npm i
```

---

#### **4. Start the Development Server**

First, Run the development server with the following command:

```bash
cd backend
node server.js
```

Then for frontend

```bash
npm start
```

The application will be accessible at `http://localhost:3000` in your browser.

---

#### **5. Additional Configuration (Optional)**

- **Challenges Setup:** Modify challenge configurations located in the `src/challenges/` directory as needed.
- **Database/API:** If the project uses a backend or database, ensure those services are up and running before starting the app.

---

You are now ready to explore and use the application!

## User Interface

The application is designed with a user-friendly interface that provides intuitive navigation and interactive features. Here's a breakdown of the main UI components:

#### **1. Dashboard**

The main landing page where users can browse and buy items, serving as the primary interaction hub.

<img src="./images/dashboard.png" alt="Dashboard" width="700">

#### **2. Basket page**

A simulated shopping cart where users can interact with purchased items.

<img src="./images/basket-page.png" alt="Dashboard" width="700">

#### **3. Score board**

Tracks and displays the user's overall score and ranking among other participants.

<img src="./images/score-board.png" alt="Dashboard" width="700">

## Conclusion

This project serves as an engaging platform to learn and practice web application security through a React-based clone of the OWASP Juice Shop. By simulating real-world vulnerabilities and providing interactive challenges, it offers users a hands-on approach to understanding and mitigating common security issues. With its flexible design and customizable features, this project is not only a valuable educational tool but also a foundation for extending and exploring advanced security concepts.

## References

1. **OWASP Juice Shop**  
   The official OWASP Juice Shop, which this project is based on. A vulnerable web application designed for security testing and learning.

   - [OWASP Juice Shop Official Website](https://owasp.org/www-project-juice-shop/)

2. **React Documentation**  
   The official React documentation, used as a reference for building the frontend of this project.

   - [React Docs](https://reactjs.org/docs/getting-started.html)

3. **Node.js Documentation**  
   Documentation for Node.js, which is used as the runtime environment for this application.
   - [Node.js Docs](https://nodejs.org/en/docs/)

These resources provided the foundation for creating this web application and implementing security challenges for users to explore.
