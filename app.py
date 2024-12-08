from flask import Flask, redirect, request, render_template, url_for
import requests
import logging

app = Flask(__name__)

# Setze die GitHub OAuth-Client-ID und Client-Secret
CLIENT_ID = 'Ov23liPjrnedujMwwENt'
CLIENT_SECRET = 'cb0f37be433f6dfe74589b061c3383436c0a3ea9'
GITHUB_API_URL = 'https://api.github.com/user'

# Konfiguriere Logging für Debugging
logging.basicConfig(level=logging.DEBUG)

# Die Route für den Start des Authentifizierungsprozesses
@app.route('/')
def index():
    # Überprüfen, ob der Benutzer bereits authentifiziert ist
    access_token = request.cookies.get('access_token')  # Verwende Cookies zur Speicherung des Tokens
    if not access_token:
        return redirect(url_for('login'))  # Wenn nicht, zur Login-Seite weiterleiten
    
    user_data = get_user_data(access_token)
    if user_data:
        username = user_data['login']
        return render_template('index.html', username=username)  # Wenn authentifiziert, zur index.html weiterleiten
    else:
        return "Fehler beim Abrufen der Benutzerdaten!", 500

# Die Route für die Login-Seite
@app.route('/login')
def login():
    return render_template('login.html')

# Die Callback-Route für GitHub nach erfolgreicher Anmeldung
@app.route('/callback')
def callback():
    # Hole den 'code' aus der URL
    code = request.args.get('code')
    
    if not code:
        logging.error("Kein Code erhalten")
        return "Fehler: Kein Code erhalten!", 400

    # Hole das Access-Token von GitHub
    access_token = get_github_access_token(code)

    if access_token:
        # Erfolgreiche Authentifizierung, speichere das Access-Token in einem Cookie
        logging.info(f"Erfolgreich angemeldet! Access Token: {access_token}")
        response = redirect(url_for('index'))  # Nach erfolgreicher Anmeldung zur Index-Seite weiterleiten
        response.set_cookie('access_token', access_token)  # Access-Token im Cookie speichern
        return response
    else:
        logging.error("Fehler bei der Token-Abrufung")
        return "Fehler bei der Authentifizierung!", 500

# Hole das Access-Token von GitHub
def get_github_access_token(code):
    url = "https://github.com/login/oauth/access_token"
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code
    }
    headers = {
        "Accept": "application/json"
    }

    response = requests.post(url, data=data, headers=headers)
    logging.debug(f"GitHub Response: {response.text}")

    if response.status_code == 200:
        response_data = response.json()
        access_token = response_data.get('access_token')
        if access_token:
            return access_token
        else:
            logging.error("Kein Access-Token in der Antwort")
            return None
    else:
        logging.error(f"Fehler bei der Token-Anforderung: {response.status_code} - {response.text}")
        return None

# Route für die Anzeige von Benutzerdaten
@app.route('/user')
def user():
    access_token = request.cookies.get('access_token')  # Hole das Access-Token aus den Cookies
    if not access_token:
        return redirect(url_for('login'))  # Wenn kein Token vorhanden, zur Login-Seite weiterleiten

    user_data = get_user_data(access_token)

    if user_data:
        return f"""
        <html>
            <head><title>Benutzerdaten</title></head>
            <body>
                <h1>Willkommen, {user_data['login']}!</h1>
                <p>Du bist bei GitHub authentifiziert.</p>
                <img src="{user_data['avatar_url']}" alt="Avatar" width="100">
            </body>
        </html>
        """
    else:
        return "Fehler beim Abrufen der Benutzerdaten!", 500

# Hole die Benutzerdaten von GitHub
def get_user_data(access_token):
    url = GITHUB_API_URL
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json"
    }

    response = requests.get(url, headers=headers)
    logging.debug(f"Benutzerdaten Response: {response.text}")

    if response.status_code == 200:
        return response.json()
    else:
        logging.error(f"Fehler beim Abrufen der Benutzerdaten: {response.status_code} - {response.text}")
        return None

if __name__ == '__main__':
    app.run(debug=True)
