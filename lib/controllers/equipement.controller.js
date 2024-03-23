const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUsersController = async () => {
  return await fetch(`${apiUrl}/php-api/user/user.php`).then((r) => r.json());
};

export const getEquipementsController = async () => {
  return await fetch(`${apiUrl}/php-api/equipement/getAll.php`).then((r) =>
    r.json()
  );
};

export const createServerController = async ({
  nom,
  adresseIP,
  dateInstallation,
  description,
  sysExploitation,
  capRAM,
  capStockage,
  debit,
  tempsConnexion,
  tempsReponse,
  tauxErreur,
}) => {
  return await fetch(`${apiUrl}/php-api/equipement/server/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom,
      adresseIP,
      dateInstallation,
      description,
      sysExploitation,
      capRAM,
      capStockage,
      debit,
      tempsConnexion,
      tempsReponse,
      tauxErreur,
    }),
  }).then((r) => r.json());
};
