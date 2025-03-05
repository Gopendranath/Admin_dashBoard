
# Admin Dashboard

A modern, responsive admin dashboard built with ReactJS, featuring search functionality, pagination, and a paginated list displaying 10 items per page. This project utilizes Vite for fast builds, React Redux Toolkit for state management, Tailwind CSS for styling, React Hot Toast for notifications, and React Icons for enhanced UI elements.

**Visit [Here](https://admin-dashboard-ur6j.onrender.com) for more information.**

## Features

- **Search Functionality**: Filter the list of items dynamically.
- **Pagination**: Navigate through pages with 10 items displayed per page.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Toast Notifications**: User-friendly feedback with React Hot Toast.
- **Icon Support**: Enhanced UI with React Icons.

## Tech Stack

- **Frontend**: ReactJS (with Vite for fast builds)
- **State Management**: React Redux Toolkit
- **Styling**: Tailwind CSS
- **Notifications**: React Hot Toast
- **Icons**: React Icons

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/admin-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd admin-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Running the Project

1. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

2. Open your browser and visit:

   ```bash
   http://localhost:5173
   ```

   (Port may vary depending on your Vite configuration.)

## Project Structure

```bash
└── src/
    ├── App.css             # App-specific styles
    ├── App.jsx             # Main app component
    ├── components/         # Reusable React components
    │    ├── Header/
    │    │    └── index.jsx # Header component
    │    ├── Listbox/
    │    │    ├── index.jsx # Listbox wrapper component
    │    │    └── List.jsx  # List rendering component
    │    ├── Name.jsx       # Name component
    │    ├── Pagination/
    │    │    └── index.jsx # Pagination controls
    │    └── SearchBanner/
    │         └── index.jsx # Search bar component
    ├── features/
    │    └── membersSlice.js # Redux slice for member data
    ├── index.css           # Global styles (Tailwind)
    ├── main.jsx            # Entry point
    └── store/
         └── store.js       # Redux store configuration
```

## Usage

- **Search**: Use the search bar in `SearchBanner` to filter the list dynamically.
- **Pagination**: Navigate between pages using the controls in `Pagination`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add some feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Acknowledgments

- Built with ❤️ using ReactJS and Vite.
- Thanks to the open-source community for the amazing tools used in this    project.
