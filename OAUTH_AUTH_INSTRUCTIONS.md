# How to Add OAuth Authentication to Your Static Website

## Step-by-Step Instructions

### 1. Choose an OAuth Provider

Popular options: Google, Facebook, GitHub, Microsoft.

### 2. Register Your Application

- Go to the provider's developer console (e.g., https://console.developers.google.com/ for Google).
- Create a new project/app.
- Set the redirect URI (e.g., `https://yourdomain.com/pages/signin.html` or `http://localhost:5500/pages/signin.html` for local testing).
- Obtain the Client ID and Client Secret.

### 3. Add an OAuth Sign-In Button to Your Sign-In Page

- Add a button: "Sign in with Google" (or other provider).

### 4. Implement the OAuth Flow

For static sites, use the provider's OAuth 2.0 "Implicit" or "Authorization Code with PKCE" flow. You can use a library like [OAuth.io](https://oauth.io/), [Auth0](https://auth0.com/), or [Netlify Identity](https://docs.netlify.com/visitor-access/identity/).

#### Example: Google OAuth (Client-Side Only)

- Add a button that redirects to the Google OAuth endpoint with your client ID and redirect URI.
- On redirect, parse the access token from the URL fragment or code from the query string.
- (Optional) Use a library like [hello.js](https://adodson.com/hello.js/) for easier integration.

### 5. Handle the OAuth Response

- On successful login, extract the user's info (name, email) from the token or by calling the provider's userinfo endpoint.
- Store the user info in localStorage/sessionStorage.
- Redirect to the dashboard or show a welcome message.

### 6. Secure Your App

- For production, always use HTTPS.
- Never expose your client secret in client-side code.
- For advanced use, consider a backend to handle tokens securely.

---

# Example: Google OAuth Button (Client-Side)

Add this to your `signin.html`:

```html
<button
  id="google-signin"
  class="modern-btn"
  style="margin-top:1rem;width:100%;background:#fff;color:#1a2236;border:1.5px solid #ffb400;"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google logo"
    style="height:20px;vertical-align:middle;margin-right:8px;"
  />
  Sign in with Google
</button>
```

Add this script to handle the redirect:

```js
// Replace with your Google Client ID and redirect URI
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const REDIRECT_URI = window.location.origin + "/pages/signin.html";

document.getElementById("google-signin").onclick = function () {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" +
    encodeURIComponent(GOOGLE_CLIENT_ID) +
    "&redirect_uri=" +
    encodeURIComponent(REDIRECT_URI) +
    "&response_type=token" +
    "&scope=profile email" +
    "&prompt=select_account";
  window.location.href = url;
};

// On redirect, extract token and get user info
window.onload = function () {
  if (window.location.hash.includes("access_token")) {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = params.get("access_token");
    if (accessToken) {
      fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: "Bearer " + accessToken },
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("esd_username", user.name);
          window.location.href = "dashboard.html";
        });
    }
  }
};
```

---

# Notes

- For other providers, the flow is similar but endpoints and scopes differ.
- For production, consider using a backend or a service like Auth0 for better security and user management.
