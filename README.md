# 🌟 HopeHub - Social Development Events Platform

HopeHub is a community-driven full-stack event management platform where users can create, join, and track social service events in their local area. Whether it's a winter clothes distribution or a fundraising event, HopeHub connects passionate individuals with meaningful causes.

## 🚀 Live Links
- **Live Site URL:** [https://hopehub-client.vercel.app](https://hopehub-client.vercel.app)
- **Client Repository:** [https://github.com/saaikot/saaikot-social-events-client](https://github.com/saaikot/saaikot-social-events-client)
- **Server Repository:** [https://github.com/saaikot/saaikot-social-events-server](https://github.com/saaikot/saikot-social-events-server)

## ✨ Key Features
- **Secure Authentication & Authorization:** JWT-based secure Login and Registration system with custom password validation (Minimum 6 chars, at least 1 uppercase and 1 lowercase).
- **Event Management (CRUD):** Users can create social events, view details, and manage (update/delete) only their own created events. Past dates are strictly restricted during creation.
- **Join Events Functionality:** Logged-in users can seamlessly join any upcoming event with a single click, and track their joined events in a dedicated private dashboard.
- **Premium UI/UX & Themes:** Fully responsive design featuring a custom Light (Cream & Sage) / Dark (Pitch Black & Green) theme toggle. Includes smooth Framer Motion animations and a custom 404 page.
- **Profile Management:** Users can view and update their profile information, including their display name and profile picture.
- **Loading Skeletons:** Implemented proper loading skeleton states across the application (Home, Events page) for a better user experience.
- **SweetAlert Notifications:** Replaced default browser alerts with beautiful SweetAlert2 popups for all success and error messages.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, DaisyUI, Framer Motion, React Icons, Axios.
- **Backend:** Node.js, Express.js, MongoDB, JSON Web Tokens (JWT), Bcrypt.js.

## ⚙️ How to Run Locally

1. **Clone the client repository:**
   ```bash
   git clone https://github.com/saaikot/saaikot-social-events-client.git