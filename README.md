# Peuple d’abord — RDC

Squelette technique Erlang/OTP pour une plateforme citoyenne de pétitions. Le dépôt est un prototype en développement, **pas encore une plateforme web** et pas prêt à accueillir des données ou signatures réelles.

## État actuel

- `pd_core` fournit le démarrage et la supervision OTP.
- `pd_db` ouvre une connexion PostgreSQL et expose des requêtes ainsi que des transactions. Le mot de passe est lu depuis `PD_DB_PASSWORD` ; les autres paramètres de connexion sont actuellement codés pour PostgreSQL local (`127.0.0.1:5432`, base `peuple_dabord_rdc`, utilisateur `pd_app`).
- `pd_petition_statem` gère les transitions de statut d’une pétition et enregistre les changements et leur audit dans PostgreSQL.
- `pd_authz` vérifie les permissions associées aux rôles en base.
- `migrations/001_rbac.sql` et `migrations/002_rbac_archive_permission.sql` définissent les rôles et permissions. La première migration suppose que les tables `users` et `audit_logs` existent déjà ; le dépôt ne fournit pas encore un jeu complet de migrations pour créer le schéma applicatif.
- `config/sys.config` contient la configuration de développement.

Il n’y a actuellement ni interface web, ni serveur HTTP/API, ni parcours d’inscription ou de connexion, ni procédure complète pour appliquer les migrations. La spécification d’API et le modèle de données dans `docs/` sont des propositions, pas des fonctionnalités livrées.

## Contenu du dépôt

- `apps/pd_core/` : application OTP, accès PostgreSQL, autorisation RBAC et machine à états de pétition.
- `migrations/` : migrations SQL RBAC partielles.
- `config/` : configuration de développement.
- `docs/` : concept, charte, gouvernance, cadre juridique à valider, architecture, sécurité, modèle de données, proposition d’API et feuille de route.
- `rebar.config` : configuration Rebar3 et dépendance `epgsql`.

## Prérequis

- Erlang/OTP 29 (version minimale déclarée dans `rebar.config`).
- Rebar3 3.28 ou version compatible.
- PostgreSQL avec un schéma applicatif compatible, un utilisateur `pd_app` et les tables requises par le code. Les migrations actuellement présentes ne suffisent pas à initialiser seules une base neuve.

## Compiler et lancer les tests

Depuis la racine du dépôt :

```powershell
rebar3 compile
rebar3 eunit
```

## Lancer le cœur OTP

Configurez `PD_DB_PASSWORD` dans l’environnement de votre terminal et assurez-vous que PostgreSQL est disponible avec les paramètres indiqués ci-dessus. Puis lancez :

```powershell
$env:PD_DB_PASSWORD = "votre-mot-de-passe-local"
rebar3 shell
```

Dans le shell Erlang, démarrez l’application et un processus pour une pétition dont l’identifiant numérique existe déjà dans la table `petitions` :

```erlang
application:ensure_all_started(pd_core).
pd_petition_statem:start_link(<<"1">>).
```

Le processus charge le statut depuis PostgreSQL. Les commandes prises en charge dépendent du statut courant : `submit`, `start_review`, `publish`, `close`, `transmit`, `start_follow_up`, `reject`, `withdraw` et `archive`. Ce test du cœur ne lance pas de serveur web et ne crée pas de pétition.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Feuille de route](docs/ROADMAP.md)
- [Sécurité](docs/SECURITY.md)
- [Proposition d’API](docs/API_SPECIFICATION.md)
- [Modèle de données logique](docs/DATABASE_SCHEMA.md)

## Limites et préparation d’un pilote

Le dépôt ne fournit pas encore l’application web, l’API, l’authentification, le schéma complet et son initialiseur, ni le déploiement opérationnel. Le RBAC présent est partiel et les transitions de pétition utilisent un acteur système pour l’audit ; elles ne constituent pas un flux complet d’autorisation métier.

Ne collectez pas de vraies identités, signatures ou signalements sensibles avec ce prototype. Avant un pilote, il faut notamment compléter et valider les règles métier, le schéma et les migrations, l’authentification et les contrôles d’accès, la protection des données, la modération, les sauvegardes et restaurations, puis effectuer les revues juridique et de sécurité nécessaires en RDC.

## Prochaines étapes

La feuille de route dans `docs/ROADMAP.md` décrit les étapes envisagées : fondation et validation, base technique, parcours de pétition, interface accessible, suivi de la redevabilité et pilote contrôlé. Les étapes ne sont pas toutes implémentées ; les durées indiquées sont des estimations de planification, pas un calendrier garanti.
