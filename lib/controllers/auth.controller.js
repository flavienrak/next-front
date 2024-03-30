const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginController = async ({ email, password }) => {
  return await fetch(`${apiUrl}/php-api/auth/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json());
};

export const registerController = async ({ nom, prenom, email, password }) => {
  return await fetch(`${apiUrl}/php-api/auth/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, prenom, email, password }),
  }).then((r) => r.json());
};
