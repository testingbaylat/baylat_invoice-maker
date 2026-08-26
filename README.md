# Baylat Document Generator

A lightweight internal document automation tool built to simplify the creation of Baylat Properties transaction documents.

Instead of repeatedly opening Microsoft Word, editing a pre-formatted company document, entering transaction details, and preparing it for printing, this application provides a simple web-based interface where users enter the required information and instantly see the completed A4 document in a live preview.

## ✨ Why This Exists

This project was born from a simple problem encountered in the workplace.

Every transaction required a document to be manually prepared in Microsoft Word using the company's letterhead and formatting. While the process worked, it was repetitive, time-consuming, and prone to small formatting inconsistencies.

The idea was simple:

> **Enter the information once → generate the document automatically.**

Baylat Document Generator turns that repetitive process into a streamlined digital workflow.

## 🚀 Features

- **Live A4 Document Preview**
  - See the document update as information is entered.
  - Designed around the company's existing document format.

- **Transaction Management**
  - Add multiple transaction items.
  - Enter descriptions, quantities, units, and prices.
  - Automatically calculate line amounts.
  - Automatically calculate the grand total.

- **Company Letterhead**
  - Recreates the existing Baylat Properties letterhead.
  - Includes company branding, RC number, watermark, footer, and signature.

- **Document Information**
  - Transaction date
  - Recipient
  - Company
  - Attention
  - Memo / document title

- **Account Information**
  - Account name
  - Account number
  - Bank name

- **Print-Ready A4 Layout**
  - Optimized for A4 portrait documents.
  - Dedicated print styling removes the application interface when printing.

- **Form Validation**
  - Required fields are validated before document generation.

- **Reset / New Document**
  - Quickly clear the current transaction and start a new document.

## 🖥️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Development

- Next.js App Router
- Turbopack
- CSS print media queries
- Responsive UI

## 📂 Project Structure

The project follows a lightweight Next.js structure:

    invoiceMaker/
    ├── app/
    │   ├── ...
    │   └── page.tsx
    │
    ├── components/
    │   └── ...
    │
    ├── public/
    │   ├── logo.png
    │   ├── app_logo2.jpg
    │   └── signature.png
    │
    ├── types/
    │   └── document.ts
    │
    ├── utils/
    │   └── document.ts
    │
    ├── package.json
    ├── next.config.mjs
    ├── tsconfig.json
    └── README.md

> The exact structure may evolve as the application develops.

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20+
- npm

### Installation

Clone the repository:

    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

Navigate into the project:

    cd invoiceMaker

Install dependencies:

    npm install

### Development

Start the development server:

    npm run dev

Open the application in your browser:

    http://localhost:3000

## 🏗️ Production Build

Create an optimized production build:

    npm run build

Start the production server:

    npm start

## 🖨️ Printing Workflow

The application is designed around an A4 portrait document.

The typical workflow is:

1. Enter the transaction information.
2. Add the required transaction items.
3. Verify the live A4 preview.
4. Click **Print**.
5. Select the appropriate printer or **Save as PDF** from the browser print dialog.

The application uses dedicated print CSS to hide the surrounding application interface and preserve the document's A4 dimensions.

## 🧮 Transaction Calculations

Each transaction item calculates its amount using:

    Quantity × Price = Line Amount

The document total is calculated from all transaction items:

    Grand Total = Σ Line Amounts

Currency values are formatted in Nigerian Naira (₦).

## 🎯 Project Goals

The current version focuses on solving the immediate document preparation problem with a lightweight and easy-to-use interface.

Future improvements may include:

- Direct PDF generation and downloading
- Transaction history
- Saved documents
- Document numbering
- User authentication
- Database integration
- Cloud storage
- Multiple document templates
- Export and sharing functionality
- Administrative dashboard

## 🔐 Internal Use

This application was designed primarily as an internal productivity tool.

The document template, company branding, transaction format, and other business-specific elements are intended for authorized use.

## 👨🏾‍💻 Author

### Chukwudi Francis Awulor

**Software Developer | Full-Stack Developer | 3D Web Developer**

Built with curiosity, a real workplace problem, and a few hours of refusing to go to sleep. 😂

The project started with a simple thought:

> *"There has to be a better way than opening Word and editing this document every single time."*

So I built one.

## 🙏 Credits

**Concept, Design, Development & Implementation**

**Chukwudi Francis Awulor**

Special credit to the original Baylat Properties document and branding that inspired the application's A4 document layout.

## 📜 License

This project is intended for internal use.

The source code may be used, modified, or extended by authorized users according to the organization's requirements.

## ⭐ Project Status

**Current Status: 🟢 Active Development**

The core document-generation workflow and A4 live preview are implemented.

The project is intentionally lightweight and can be extended as additional business requirements emerge.

---

<p align="center">
  Built with ❤️ and a little bit of GRIT by
  <strong>Chukwudi Francis Awulor</strong>
</p>