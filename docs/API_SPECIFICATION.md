# API — proposition v1

Préfixe : `/api/v1`

| Méthode | Route | Usage |
|---|---|---|
| POST | `/accounts` | Création de compte |
| POST | `/sessions` | Ouverture de session |
| DELETE | `/sessions/current` | Fermeture de session |
| GET | `/petitions` | Liste et filtres |
| POST | `/petitions` | Création d'un brouillon |
| GET | `/petitions/{id}` | Détail public autorisé |
| PATCH | `/petitions/{id}` | Modification autorisée |
| POST | `/petitions/{id}/submit` | Soumission à examen |
| POST | `/petitions/{id}/signatures` | Signature après authentification |
| POST | `/petitions/{id}/reports` | Signalement |
| POST | `/petitions/{id}/transmission-requests` | Demande de transmission |
| GET | `/institutions` | Répertoire public |
| GET | `/accountability/cases` | Suivi des dossiers publics |
| POST | `/moderation/cases/{id}/appeals` | Recours |

## Contrat général
- JSON UTF-8.
- Erreurs structurées avec code stable.
- Pagination par curseur.
- Idempotency-Key pour commandes pouvant être répétées.
- Authentification et autorisation par ressource.
- Rate limiting.
- Ne jamais retourner les données d'identité privée dans les endpoints publics.

Ces routes sont une spécification initiale, pas encore une API implémentée.
