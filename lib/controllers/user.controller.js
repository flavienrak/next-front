const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUsersController = async () => {
  return await fetch(`${apiUrl}/php-api/user/user.php`).then((r) => r.json());
};

export const createUserController = async ({ name, username, email }) => {
  return await fetch(`${apiUrl}/php-api/user/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, email }),
  }).then((r) => r.json());
};
