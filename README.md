# HopeHub - Social Development Events Platform

HopeHub is a community-driven full-stack web application. It allows users to create, discover, and join social events in their local area. It helps people connect with meaningful causes and participate in charity work.

## 🚀 Live Links
- **Live Site:** [YOUR_CLIENT_URL]
- **Client Repo:** https://github.com/saaikot/saaikot-social-events-client
- **Server Repo:** https://github.com/saaikot/saaikot-social-events-server

## ✨ Key Features

- **User Authentication:** Users can register and log in securely using Email/Password or Google Login. It is implemented using BetterAuth.
- **Event Management (CRUD):** Logged-in users can create new events. They can also manage (update or delete) only the events they have created.
- **Join Events:** Users can view all upcoming events and join them by clicking a button. The joined data is saved in the database.
- **Private Routes:** Pages like Create Event, Manage Events, Joined Events, and Profile are protected. Unauthorized users are redirected to the login page.
- **Joined Events Dashboard:** A dedicated page where users can see all the events they have joined, sorted by the event date.
- **Profile Update:** Users can view their profile and update their display name and profile picture.
- **Form Validation:** Added validation in all forms (e.g., checking password length, preventing past dates in event creation).
- **Responsive UI:** The design is fully responsive with a custom Light and Dark mode toggle.

## 🛠️ Tech Stack

**Frontend:**
- Next.js (App Router)
- Tailwind CSS & DaisyUI
- BetterAuth
- Axios
- React Icons

**Backend:**
- Node.js & Express.js
- MongoDB (Mongoose)
- JOSE (for JWT verification)

## ⚙️ How to Run Locally

1. Clone the client and server repositories.
```bash
git clone https://github.com/saaikot/saaikot-social-events-client.git
git clone https://github.com/saaikot/saaikot-social-events-server.git

Setup Environment Variables
# Client
NEXT_PUBLIC_API_URL=your_server_url
BETTER_AUTH_URL=your_client_url
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_uri

# Server
PORT=5000
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_secret
CLIENT_URL=your_client_url