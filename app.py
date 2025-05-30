import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from admin import MyAdminIndexView, SecureModelView
from flask_admin import Admin
from flask_login import LoginManager, logout_user, login_required, login_user
from werkzeug.security import generate_password_hash, check_password_hash

# Initializing the Flask app and SQLAlchemy
app = Flask(__name__)
app.debug = True

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myrk.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.urandom(24)
db = SQLAlchemy(app)

# Importing models AFTER db is created
from models import db, User, Piece
login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

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

        flash("Registration successful.")
        return redirect(url_for("login"))

    return render_template("register.html")


# Authentication route
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            flash("Invalid credentials.")
            return redirect(url_for("login"))

        login_user(user)

        session["user_id"] = user.id
        session["email"] = email
        flash("Logged in successfully.")
        return redirect(url_for("index"))

    return render_template("login.html")

@app.route("/logout")
def logout():
    logout_user()
    session.clear()
    flash("Logged out.", "info")
    return redirect(url_for("index"))

@app.route("/dashboard")
@login_required
def dashboard():
    ...
    
if __name__ == "__main__":
    app.run(debug=True)
