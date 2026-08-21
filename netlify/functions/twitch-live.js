// netlify/functions/twitch-live.js
//
// Vérifie le statut "live" d'une liste de chaînes Twitch via l'API Helix.
// Le client_secret ne quitte jamais le navigateur : cette fonction tourne
// côté Netlify uniquement.
//
// Variables d'environnement à configurer sur Netlify
// (Site settings > Environment variables) :
//   TWITCH_CLIENT_ID
//   TWITCH_CLIENT_SECRET
//
// Appel front : GET /.netlify/functions/twitch-live?logins=chaine1,chaine2

let cachedToken = null; // { access_token, expires_at } — garde le token tant que la fonction reste "chaude"

async function getAppAccessToken() {
  const now = Date.now();
  if (cachedToken && cachedToken.expires_at > now + 60_000) {
    return cachedToken.access_token;
  }

  const params = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  const res = await fetch(`https://id.twitch.tv/oauth2/token?${params.toString()}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(`Twitch OAuth token error: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = {
    access_token: data.access_token,
    expires_at: now + data.expires_in * 1000,
  };
  return cachedToken.access_token;
}

export const handler = async (event) => {
  const loginsParam = event.queryStringParameters?.logins || "";
  const logins = loginsParam
    .split(",")
    .map((l) => l.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 100); // limite Helix : 100 user_login par requête

  if (logins.length === 0) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ live: [] }),
    };
  }

  try {
    const token = await getAppAccessToken();

    const params = new URLSearchParams();
    logins.forEach((login) => params.append("user_login", login));

    const res = await fetch(`https://api.twitch.tv/helix/streams?${params.toString()}`, {
      headers: {
        "Client-Id": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Twitch Helix error: ${res.status}`);
    }

    const data = await res.json();

    const live = data.data.map((s) => ({
      login: s.user_login.toLowerCase(),
      displayName: s.user_name,
      title: s.title,
      game: s.game_name,
      viewers: s.viewer_count,
      startedAt: s.started_at,
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=15",
      },
      body: JSON.stringify({ live }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};