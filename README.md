# 🌟 HopeHub - Social Development Events Platform

HopeHub is a community-driven, full-stack event management platform designed to connect passionate individuals with meaningful causes. Users can seamlessly create, discover, and join social service events in their local area. Whether it's a winter clothes distribution or a fundraising campaign, HopeHub makes organizing and participating in charity effortless.

## 🚀 Live Links
- **Live Site URL:** [https://YOUR_CLIENT_URL.vercel.app](https://YOUR_CLIENT_URL.vercel.app)
- **Client Repository:** [https://github.com/saaikot/saaikot-social-events-client](https://github.com/saaikot/saaikot-social-events-client)
- **Server Repository:** [https://github.com/saaikot/saaikot-social-events-server](https://github.com/saaikot/saaikot-social-events-server)

## ✨ Key Features

- **Secure Authentication & Authorization:** Complete JWT-based email/password authentication alongside a seamless **Google Login** (via Firebase) integration. Protected routes ensure secure access to private data.
- **Comprehensive Event Management (CRUD):** Logged-in users can create, update, and delete their own social events. Includes strict form validations, such as preventing the selection of past dates.
- **Join & Track Events:** Users can explore upcoming events, view detailed information, and join them with a single click. Joined events are neatly tracked and sorted by date in a dedicated dashboard.
- **Premium UI/UX & Custom Theming:** A fully responsive, eye-catching design featuring a custom **Light (Cream & Sage) / Dark (Pitch Black & Green)** theme toggle. Enhanced with smooth Framer Motion animations and a custom animated 404 error page.
- **Advanced File Uploads:** Integrated **ImgBB API** allowing users to upload event thumbnails directly from their device instead of pasting URLs.
- **Dynamic Profile Management:** Users can view and update their display name and profile picture, with global state synchronization across the app.
- **Interactive Feedback & Loading States:** Replaced default browser alerts with elegant **SweetAlert2** popups for all success/error messages. Includes proper loading skeletons for a smooth user experience.
- **Newsletter Subscription UI:** A beautifully designed newsletter section on the home page with interactive toast notifications.

## 🛠️ Tech Stack

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS, DaisyUI
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Authentication:** Firebase (Google Provider)
- **API Requests:** Axios

**Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Native Driver)
- **Authentication:** JSON Web Tokens (JWT), Bcrypt.js

## ⚙️ How to Run Locally

Follow these steps to set up the project on your local machine:

1. **Clone the repositories:**
   ```bash
   # Clone the client
   git clone https://github.com/saaikot/saaikot-social-events-client.git
   
   # Clone the server
   git clone https://github.com/saaikot/saaikot-social-events-server.git