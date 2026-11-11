# Architecture technique

## Principe
Monolithe modulaire OTP au départ, avec frontières de modules explicites. Ne pas commencer par des microservices distribués : la distribution ajoute des risques opérationnels et de sécurité.

## Composants
- Frontend web/PWA : interface accessible et faible consommation de données.
- API : HTTP/JSON et WebSocket pour les événements temps réel.
- Erlang/OTP : supervision, orchestration, règles métier et notifications.
- PostgreSQL : source de vérité transactionnelle.
- Stockage objet privé : pièces jointes chiffrées et contrôles d'accès.
- File de messages : à introduire seulement lorsque le besoin de découplage est établi.
- Observabilité : métriques, journaux, traces et alertes.

## Applications/modules envisagés
pd_core, pd_api, pd_accounts, pd_petitions, pd_signatures, pd_verification, pd_moderation, pd_institutions, pd_accountability, pd_notifications, pd_audit, pd_analytics.

Le dépôt initial regroupe volontairement le démarrage OTP dans `pd_core`. Les modules métier seront extraits en applications OTP séparées quand leurs interfaces et besoins de déploiement seront stabilisés.

## Principes de fiabilité
- PostgreSQL est la source de vérité ; ne pas compter sur l'état mémoire d'un GenServer.
- Transactions et contraintes d'unicité pour les signatures.
- Idempotence des commandes sensibles.
- Outbox transactionnelle pour publier des événements après commit.
- Timeouts, limites de charge et reprise contrôlée.
- Sauvegardes chiffrées et exercices de restauration.
- Supervision OTP pour relancer les processus, pas pour masquer les erreurs de conception.
- Distribution Erlang uniquement sur des nœuds maîtrisés, avec réseau privé, cookies secrets et contrôle strict des accès.

## Hébergement hybride
Un déploiement hybride ne signifie pas répliquer toutes les données partout. Garder les données d'identité et les dossiers sensibles dans un environnement principal contrôlé. Les nœuds périphériques peuvent servir le contenu public, les notifications et des fonctions non sensibles. Toute réplication doit être justifiée, chiffrée et documentée.

## Décisions différées
Choix du fournisseur cloud, région, opérateur SMS, fournisseur d'identité, framework HTTP, stratégie de réplication et politique de résidence des données après analyse juridique et menace.
