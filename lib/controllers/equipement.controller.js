const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// get all equipements
export const getEquipementsController = async () => {
  return await fetch(`${apiUrl}/php-api/equipements/get.php`).then((r) =>
    r.json()
  );
};

// get equipement :id
export const getEquipementController = async (id) => {
  return await fetch(`${apiUrl}/php-api/equipements/id/get.php?id=${id}`).then(
    (r) => r.json()
  );
};

// delete equipement :id
export const deleteEquipementController = async (id) => {
  return await fetch(
    `${apiUrl}/php-api/equipements/id/delete.php?id=${id}`
  ).then((r) => r.json());
};

export const createEquipementController = async ({
  userId,
  nom,
  categorie,
  adresseIP,
  dateInstallation,
  description,
  sysExploitation,
  capRAM,
  capStockage,
  passerelle,
  protocoleRoutage,
  nbPorts,
  typePorts,
  qualiteService,
  debit,
  tempsConnexion,
  tempsReponse,
  tauxErreur,
}) => {
  return await fetch(`${apiUrl}/php-api/equipements/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      nom,
      categorie,
      adresseIP,
      dateInstallation,
      description,
      sysExploitation,
      capRAM,
      capStockage,
      passerelle,
      protocoleRoutage,
      nbPorts,
      typePorts,
      qualiteService,
      debit,
      tempsConnexion,
      tempsReponse,
      tauxErreur,
    }),
  }).then((r) => r.json());
};

export const updateEquipementController = async ({
  id,
  nom,
  adresseIP,
  description,
  sysExploitation,
  capRAM,
  capStockage,
  debit,
  tempsConnexion,
  tempsReponse,
  tauxErreur,
}) => {
  return await fetch(`${apiUrl}/php-api/equipements/id/update.php?id=${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom,
      adresseIP,
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

export const updateDataController = async () => {
  return await fetch(`${apiUrl}/php-api/data/update.php`).then((r) => r.json());
};
