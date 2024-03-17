const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createUserController = async ({ name, username, email }) => {
  return await fetch(`${apiUrl}/api/user/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, email }),
  }).then((r) => r.json());
};
