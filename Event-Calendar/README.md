# 📅 React Calendar Application

A **React-based Calendar** application that allows users to view, add, edit, and delete events. It integrates with Beeceptor for API requests, is fully optimized for performance, and includes error handling and routing using React Router.

### [Live Demo](<https://event-calendar-ashen.vercel.app/>) (hosted on Vercel)

---

## 🚀 Features

### 1. **Calendar View**
   - Displays a monthly calendar with clickable days.
   - Fetches and displays events from a mock API.

### 2. **Add Event**
   - Users can add new events by filling out a form.
   - Events are saved and displayed on the calendar.

### 3. **Edit Event**
   - Modify the details of an existing event.
   - Click on an event in the calendar to edit its details.

### 4. **Delete Event**
   - Users can remove events by clicking on them and confirming the deletion.

### 5. **Event Details**
   - Click on an event to view its full details in a modal.

### 6. **Filter Events**
   - Filter events based on categories like "Work", "Personal", etc., to manage different event types efficiently.

---

## 🛠️ Technical Stack

### 1. **Frontend:**
   - **React**: A component-based library for building user interfaces.
   - **React Hooks**: Used `useState`, `useEffect`, `useContext` for state and side-effect management.
   - **React Router**: For navigation between calendar views and event detail pages.

### 2. **API Integration:**
   - **Beeceptor**: Mock API to simulate event data management (Fetching, Adding, Editing, Deleting events).

### 3. **State Management:**
   - **React Context API**: Used for sharing state across components and managing global event data.

### 4. **Styling:**
   - **CSS Modules**: Scoped, modular CSS for component-specific styles.
   - **Responsive Design**: Ensures a seamless experience across devices of all sizes.

### 5. **Testing:**
   - Component and integration testing using `Jest` and `React Testing Library` to ensure robust functionality.

---

## 📚 API Integration

All API requests are handled using Beeceptor. Here’s how the mock API endpoints are set up:

### Endpoints:
- **GET** `/events`: Retrieve the list of all events.
- **POST** `/events`: Add a new event.
- **PUT** `/events/{id}`: Edit an existing event.
- **DELETE** `/events/{id}`: Delete an event.

---

## 🛠️ Development Setup

### 1. **Clone the repository:**
```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/react-calendar-app.git

## Folder Structure
react-calendar-app/
│
├── public/
│   ├── index.html       # Main HTML file
│   └── ...
├── src/
│   ├── components/      # All React components (Calendar, Event forms, Modals)
│   ├── hooks/           # Custom React hooks for event management
│   ├── api/             # API interaction logic
│   ├── styles/          # CSS module files
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point for React
│   └── ...
├── package.json         # App metadata and dependencies
└── README.md            # Project documentation
