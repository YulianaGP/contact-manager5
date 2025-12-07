# Contact Manager 5

A modern and responsive web application to manage contacts easily and efficiently.

## Description

**Contact Manager 5** is a tool designed to organize and manage your contact list. It allows you to create, view, edit, and delete contacts with a clean and user-friendly interface. The application includes features such as search, filtering by groups and favorites, with dark mode support.

## Tech Stack

- **React** (v18+): JavaScript library for building interactive user interfaces
- **Vite**: Fast and modern build tool with HMR (Hot Module Replacement)
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **React Router**: Routing and navigation management
- **PostCSS**: CSS transformation tool

## Features

✅ Responsive interface (mobile, tablet, desktop)  
✅ Dark/Light theme  
✅ Contact search  
✅ Organization by groups  
✅ Mark favorites  
✅ Contact CRUD management  
✅ Modern design with Tailwind CSS  

## Project Structure

```
contact-manager5/
├── src/
│   ├── components/        # Reusable components
│   │   ├── ContactCard.jsx        # Individual contact card
│   │   ├── ContactListPage.jsx    # Contact list view
│   │   ├── Header.jsx             # Navigation header
│   │   ├── Footer.jsx             # Footer
│   │   └── Landing.jsx            # Landing page
│   ├── layout/            # Layout components
│   │   └── Layout.jsx             # Main layout
│   ├── assets/            # Static resources
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Public static files
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file

```

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/YulianaGP/contact-manager5.git
cd contact-manager5
```

Install dependencies:

```bash
npm install
```

## Usage

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5174`

### Build

Generate the optimized production version:

```bash
npm run build
```

### Production Preview

Preview the built version:

```bash
npm run preview
```

## Responsive Design

The project uses **Tailwind CSS** with responsive breakpoints:

- `sm`: 640px (tablets)
- `md`: 768px (large tablets)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

All components include responsive Tailwind classes for an optimal experience on any device.

## Author

Created by **Yuliana** ❤️
