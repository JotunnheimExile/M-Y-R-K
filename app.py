import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
from admin import MyAdminIndexView, SecureModelView
from flask_admin import Admin
from flask_login import login_user, login_required, login_fresh, logout_user, current_user, user_logged_in
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

# Initializing the Flask app and SQLAlchemy
app = Flask(__name__)
app.debug = True

# Database setup
from extensions import db, login_manager
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myrk.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["REMEMBER_COOKIE_DURATION"] = timedelta(days=30) # Remember user for 30 days
app.secret_key = os.urandom(24)

# Importing models AFTER db is created
db.init_app(app)
login_manager.init_app(app)
login_manager.login_view = "login"

from models import User, Piece

# Create all tables
with app.app_context():
    db.create_all()

# Loading Admin
admin = Admin(app, index_view=MyAdminIndexView(), template_mode='bootstrap4')
admin.add_view(SecureModelView(Piece, db.session))

# Loading User
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

### ROUTES ###
# Home route
@app.route("/")
def index():
    return render_template("index.html")


# Items related routes
@app.route("/gallery")
def gallery():
    pieces = Piece.query.all()
    return render_template("gallery.html", pieces=pieces)

@app.route("/piece/<int:piece_id>")
def view_piece(piece_id):
    piece = Piece.query.get_or_404(piece_id)
    return render_template("piece.html", piece=piece)

@app.route("/reserve/<int:piece_id>", methods=["POST"])
def reserve_piece(piece_id):
    piece = Piece.query.get_or_404(piece_id)
    if not piece.reserved:
        piece.reserved = True
        db.session.commit()
    return redirect(url_for('view_piece', piece_id=piece.id))


# Contacts route
@app.route("/contacts")
def contacts():
    return render_template("contacts.html")


# Registration route
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")

        if User.query.filter_by(username=username).first():
            flash("Username already exists.")
            return redirect(url_for("register"))

        if User.query.filter_by(email=email).first():
            flash("This email is already registered.")
            return redirect(url_for("register"))

        if not username or not email or not password:
            flash("Please fill out all of the provided fields.")
            return redirect(url_for("register"))

        print(f"DEBUG: username={username}, email={email}, password={password}")

        try:
            user = User(username=username, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            return f"<h1>Registration error:</h1><pre>{e}</pre>", 500

        flash("Welcome to MYRK.")
        return redirect(url_for("login"))

    return render_template("register.html")


# Authentication route
@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard"))
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        remember = True if request.form.get("remember") else False

        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            flash("Invalid credentials.")
            return redirect(url_for("login"))

        login_user(user, remember=remember) # Persistent login
        session["greeted"] = False

        #flash("Logged in successfully.")
        return redirect(url_for("dashboard"))

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("greeted", None)
    logout_user()
    flash("Logged out.", "info")
    return redirect(url_for("index"))

@app.before_request
def greet_returning_user():
    if current_user.is_authenticated and not session.get("greeted", True):
        flash("Glad to have you back, {}.".format(current_user.username))
        session["greeted"] = True

@user_logged_in.connect_via(app)
def when_user_logs_in(sender, user):
    print(f"User {user.username} has logged in.")

# Dashboard route
@app.route("/dashboard")
@login_required
def dashboard():
    try:
        if not login_fresh: #and not session.get("greeted")
            #flash(f"Glad to have You back, {current_user.username}", "info")
            session["greeted"] = True
        return render_template("dashboard.html")
    except Exception as e:
        return f"<h1>Dashboard Render Error</h1><pre>{e}</pre>", 500
    
# Dashboard Settings route
@app.route("/dashboard_settings")
@login_required
def dashboard_settings():
    return render_template("dashboard_settings.html")

# Dashboard Feedback route
@app.route("/dashboard_feedback")
@login_required
def dashboard_feedback():
    return render_template("dashboard_feedback.html")

# Update User Email
@app.route("/update_email", methods=["POST"])
@login_required
def update_email():
    new_email = request.form.get("new_email")
    if new_email:
        current_user.email = new_email
        db.session.commit()
        flash("Email updated successfully.")
    return redirect(url_for("dashboard"))

# Update User Password
@app.route("/update_password", methods=["POST"])
@login_required
def update_password():
    current_pw = request.form.get("current_password")
    new_pw = request.form.get("new_password")

    if not current_user.check_password(current_pw):
        flash("Current password is incorrect.")
        return redirect(url_for("dashboard"))
    
    current_user.password_hash = generate_password_hash(new_pw)
    db.session.commit()
    flash("Password updated successfully.")
    return redirect(url_for("dashboard"))

# Update Username
@app.route("/update_username", methods=["POST"])
@login_required
def update_username():
    current_un = request.form.get("current_username")
    new_un = request.form.get("new_username")

    if new_un:
        current_user.username = new_un
        db.session.commit()
        flash("All set, {}.".format(current_user.username))
    return redirect(url_for("dashboard"))

if __name__ == "__main__":
    app.run(debug=True)
