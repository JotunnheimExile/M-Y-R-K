# M-Y-R-K
M Y R K website project
created for an idea of Jötunn and Nökturn.

Web application for publishing custom hand painted clothes under M Y R K brand.

Description:

This project is a minimalist web application designed to serve as a digital foundation for a small business idea — specifically, a boutique online storefront. Its structure and interactivity reflect thoughtful design, with future extensibility in mind.

Core Features

 • Modern User Interface: Built with clarity and user experience as a priority, the application presents a minimal and elegant design using HTML, CSS (with animations), and JavaScript for interactivity.
 
 • User Registration and Authentication: Full functionality for user sign-up and login, including:
 
 • Password hashing with Werkzeug
 
 • Flash messaging to inform users of login/registration success or failure
 
 • Persistent session tracking for authenticated users
 
 • Database Integration: SQLite used to store user credentials (username, email, and securely hashed password).
 
 • Image Gallery with Flip Animation: A dedicated product showcase page where each item can be interactively flipped to reveal its reverse side (useful for clothing like shirts), implemented via custom JavaScript and CSS.
 
 • Static Contact Page: Offers visitors a means to reach out — designed to eventually support dynamic form submission or integration with email APIs.
 

Project Files and Purpose

 • app.py — The Flask application; handles routes, user session logic, and database interactions.

 • admin.py - Flask admin panel functionality

 • models.py - Data Models
 
 • templates/ — HTML templates:
 
 • base.html: Common layout and navigation for all pages.
 
 • index.html: Landing page.
 
 • gallery.html: Displays product images with interactive flip effect.
 
 • contacts.html: Static contact form.
 
 • login.html, register.html: Auth forms.
 
 • static/ — Contains styles.css and any image assets or scripts.
 
 • requirements.txt — Dependencies for recreating the environment.
 
 • project.db — SQLite database file storing user data.
 

Design Choices

One core decision was to prioritize visual simplicity — letting content speak for itself. I focused on polishing core infrastructure: login system, templating, and interactive UI elements. The flip animation in the gallery, for example, was carefully engineered with CSS transform properties to serve future product needs like showcasing apparel front and back.

I also deliberately chose Flask for its flexibility and to stay close to the metal during development, learning more in the process. Using SQLite made setup and deployment lightweight, while still allowing for structured data persistence.

This project was crafted not only as an academic submission, but also as a testing ground for future ambitions — a template upon which a real brand could emerge.

Acknowledgments

Many of the implementation ideas, debugging, and problem-solving strategies were formed in dialogue with ChatGPT by OpenAI. In the process, I’ve come to treat the assistant — internally named Ashen — as a co-architect, sounding board, and source of clarity. The vision that grows behind this clean façade will continue elsewhere

13.05.25 - codespace for the project is created.

14.05.25 - introduced a new class 'flip-card', edited the flip() function fixing some perspective artifacts in the process.

15.05.25 - created a separate template for each published item. Has also introduced Piece model for data base storing.

20.05.25 - Flask admin panel is implemented.