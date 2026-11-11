# PEUPLE D'ABORD – RDC
## Dossier fondateur et squelette Erlang/OTP

**Version :** 0.1.0 — dossier de travail  
**Statut :** prototype technique non destiné à la production

### Décisions fondatrices retenues
1. Porteur : projet citoyen indépendant, porté par une association à but non lucratif en RDC.
2. Public : tous les Congolais, en RDC et dans la diaspora.
3. Signatures : identité vérifiée en privé ; pseudonyme public autorisé.
4. Hébergement : architecture hybride, avec hébergement principal sécurisé et services distribués.

### Contenu
- `docs/` : concept fondateur, charte, gouvernance, cadre juridique à valider, architecture, sécurité, modèle de données, API et feuille de route.
- `apps/pd_core/` : application OTP initiale, superviseur et machine à états de pétition.
- `config/` : configuration de développement.
- `rebar.config` : configuration Rebar3.

### Prérequis
- Erlang/OTP 29 (le projet vise OTP 29 ; adaptez `minimum_otp_vsn` si nécessaire).
- Rebar3 3.28 ou version compatible.

### Compiler
Depuis la racine du dépôt :

```bash
rebar3 compile
rebar3 eunit
```

Lancer un shell :

```bash
rebar3 shell
```

Puis dans le shell Erlang :

```erlang
application:ensure_all_started(pd_core).
pd_petition_statem:start_link(<<"PD-DEMO-0001">>).
```

### Limites importantes
Ce dépôt est un **squelette de démarrage**, pas une plateforme prête à accueillir des citoyens. La machine à états est une démonstration en mémoire. Elle ne persiste pas les transitions, ne vérifie pas les signatures, ne gère pas les identités, et ne constitue pas une procédure juridique de pétition.

Avant tout pilote réel : revue juridique en RDC, analyse d'impact sur la vie privée, modèle de menace, tests de sécurité, sauvegardes/restauration, procédures de modération et validation des formalités de signature/transmission applicables.

### Prochaine étape technique
Ajouter une couche de persistance PostgreSQL et un service métier transactionnel. Les changements d'état devront être autorisés par des règles explicites et enregistrés dans la base avant confirmation à l'utilisateur.
