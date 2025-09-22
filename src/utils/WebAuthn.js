// src/utils/webAuthn.js
// WebAuthn.js

// Generate a random challenge for WebAuthn
export function generateRandomChallenge() {
  return Uint8Array.from(window.crypto.getRandomValues(new Uint8Array(32)));
}

export async function registerUser() {
  const challenge = generateRandomChallenge();

  const publicKey = {
    challenge,
    rp: { name: "Test App" },
    user: {
      id: Uint8Array.from("user123", c => c.charCodeAt(0)), // Simulated user ID
      name: "user@example.com",
      displayName: "Test User",
    },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256 algorithm
    authenticatorSelection: {
      authenticatorAttachment: "platform", // Use platform authenticator (e.g., fingerprint sensor)
      requireResidentKey: false,
      userVerification: "required", // Ensure biometric verification
    },
  };

  try {
    const credential = await navigator.credentials.create({ publicKey });
    console.log("Credential created:", credential);

    // Store the credential locally for testing purposes
    localStorage.setItem("credentialId", JSON.stringify(credential.rawId));
    return "Registration successful! Biometric registered.";
  } catch (err) {
    console.error("Registration failed:", err);
    return "Registration failed. Please try again.";
  }
}
