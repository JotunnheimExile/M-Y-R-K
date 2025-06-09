# M-Y-R-K
M Y R K  website project
created for an idea of Jötunn and Nøkturn.

Web application for publishing custom hand painted clothes under  M Y R K  brand.

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

 • admin.py - Flask admin panel functionality.

 • models.py - Data Models.

 • extensions.py - For circumventing the cycling imports in app.py and models.py.

 • myrk.db — SQLite database file storing user data.
 
 • templates/: HTML templates.
 
 • base.html - Common layout and navigation for all pages.
 
 • index.html - Home page.
 
 • gallery.html - Displays item images in a draggable scroll gallery.

 • piece.html - Detailed view of a specific item.
 
 • contacts.html - Static contact form.
 
 • login.html, register.html - Auth forms.

 • dashboard.html  - User personal space.
 
 • static/: Contains image assets, styles.css and scripts.
 
 • requirements.txt — Dependencies for recreating the environment.
 

Design Choices

Minimalistic, modern interface - no clutter. Available items are presented through a draggable scroll on a dedicated gallery page.

Acknowledgments

Many of the implementation ideas, debugging, and problem-solving strategies were formed in dialogue with ChatGPT by OpenAI. In the process, I’ve come to treat the assistant — internally named Ashen — as a co-architect, sounding board, and source of clarity.

13.05.25 - MYRK Phase I initiated.
Codespace for the project is created and set up.

14.05.25 - introduced a new class 'flip-card', edited the flip() function fixing some perspective artifacts in the process.
MYRK Phase I concluded.

15.05.25 - MYRK Phase II initiated.
Created a separate template for each published item. Has also introduced Piece model for data base storing.

20.05.25 - Flask admin panel is implemented.

03.06.25 - swapped the carousel for a draggable scroll. Logo redrawn.

04.06.25 - Draggable scroll gallery edits.
MYRK Phase II concluded.

05.06.25 - MYRK Phase III initiated. "Remember me" logic implemented. Flash animations broke.

06.06.25 - Flash animations fixes. User dashboard implemented.

09.06.25 - Dashboard edits. Authentication logic changes.