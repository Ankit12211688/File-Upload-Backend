# 📂 File Upload Backend

A backend service for uploading, storing, parsing, and retrieving files with real-time progress tracking.

# 🛠 Tech Stack

* Node.js + Express
* MongoDB (Mongoose)
* Multer (file uploads)
* UUID (unique file IDs)
* dotenv (env variables)

# 📂 Directory Structure

```
.
├── file-upload-backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── config/
│       ├── db.js
│   └── controllers/
│       ├── fileController.js
│   └── utils/
│       ├── parser.js
│   ├── modals/
│   │   ├── File.js
│   └── routes/
│       ├── fileRoutes.js
│   └── uploads/ (storage for uploaded files if storing path instead of binary)
```
## 🛠️ Installation Steps:

<p>1. Clone Repository</p>

```
git clone https://github.com/Aditya122221
```

<p>2. Installation</p>

```
npm install
```

<p>3. .env Set up</p>
Create .env file and follow the .env.example file to setup the .env file
