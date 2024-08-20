import React, { useEffect } from "react";

const GoogleSignIn = ({ onLogin }) => {
  useEffect(() => {
    const clientId = "588310681077-gd5na3amb6tjb6l9v8fg1c6cqchcq5k4.apps.googleusercontent.com"; // Replace with your actual client ID

    const handleLogin = async (response) => {
      if (response.credential) {
        try {
          const idToken = response.credential;
          const res = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          });
          const data = await res.json();
          if (data.token && data.user) {
            onLogin(data.token, data.user);
          }
        } catch (error) {
          console.error("Authentication Error:", error);
        }
      }
    };

    const loadGoogleSignInScript = () => {
      console.log("Loading Google Sign-In script...");
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => {
        console.log("Google Sign-In script loaded.");
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleLogin,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-sign-in-button"),
          { theme: "outline", size: "large" }
        );
        console.log("Google Sign-In button rendered.");
      };
      script.onerror = () => {
        console.error("Failed to load Google Sign-In script.");
      };
      document.body.appendChild(script);
    };

    loadGoogleSignInScript();
  }, [onLogin]);

  return (
    <div>
      <div id="google-sign-in-button"></div>
    </div>
  );
};

export default GoogleSignIn;
