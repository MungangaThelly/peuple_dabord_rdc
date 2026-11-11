# Politique de sécurité — exigences initiales

## Classification
- Public : pages publiées, statistiques agrégées.
- Interne : notes opérationnelles et dossiers de modération.
- Confidentiel : identité, coordonnées, preuves non publiques, signalements.
- Très sensible : informations pouvant exposer une victime, un témoin ou un signataire à un risque.

## Contrôles requis
- TLS pour tous les échanges.
- Chiffrement au repos et gestion séparée des clés.
- MFA pour les comptes privilégiés.
- RBAC et moindre privilège.
- Accès aux dossiers sensibles journalisé.
- Séparation logique des données d'identité et des signatures publiques.
- Limitation de débit, protection anti-automatisation et détection d'abus.
- Gestion des secrets hors du dépôt.
- Mises à jour de sécurité et analyse des dépendances.
- Sauvegardes chiffrées, isolées et restaurées en test.
- Plan de réponse aux incidents et notification selon le droit applicable.
- Tests d'intrusion indépendants avant pilote public.

## Identité et pseudonymat
L'identité vérifiée en privé ne doit pas être exposée aux autres utilisateurs. L'accès interne doit être exceptionnel, autorisé, motivé et audité. Ne collecter aucune pièce d'identité si une méthode moins intrusive suffit. Définir une durée de conservation et une procédure d'effacement.

## Menaces à modéliser
Doxxing, représailles contre signataires, usurpation d'identité, signatures artificielles, compromission d'administrateur, fuite de documents, attaques DDoS, censure réseau, coercition de signataires et abus de modération.

## Interdictions de mise en production
Pas de collecte réelle d'identités, de signatures ou de signalements sensibles tant que l'avis juridique, l'analyse d'impact vie privée, le modèle de menace et les contrôles de sécurité ne sont pas validés.
