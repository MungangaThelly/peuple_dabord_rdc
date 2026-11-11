# Modèle de données logique — première version

## Identités et accès
- users(id, status, created_at, updated_at)
- private_identity_records(id, user_id, provider_ref, verification_level, verified_at, retention_until)
- public_profiles(user_id, display_name, pseudonym, visibility)
- roles(id, name)
- user_roles(user_id, role_id)

Ne pas stocker de copies de documents d'identité par défaut. Préférer une référence de vérification auprès d'un prestataire évalué juridiquement et techniquement.

## Pétitions
- petitions(id, slug, title, summary, body, category_id, creator_id, recipient_institution_id, status, created_at, published_at, closed_at)
- petition_documents(id, petition_id, object_key, checksum, visibility, uploaded_by, created_at)
- petition_transitions(id, petition_id, from_status, to_status, actor_id, reason, created_at)
- petition_signatures(id, petition_id, user_id, consent_version, signed_at, status)
- petition_transmissions(id, petition_id, recipient, method, sent_at, proof_object_key, status)
- institution_responses(id, petition_id, source, response_date, object_key, summary, verified_by)

Contrainte : UNIQUE(petition_id, user_id) pour une signature par compte ; les règles d'éligibilité et les contrôles anti-fraude restent à définir selon la procédure.

## Gouvernance et modération
- institutions(id, name, level, jurisdiction, public_contact)
- reports(id, target_type, target_id, reporter_id, reason, status, created_at)
- moderation_cases(id, report_id, assigned_to, decision, rationale, decided_at)
- appeals(id, case_id, appellant_id, grounds, status, decided_at)
- audit_events(id, actor_id, action, target_type, target_id, occurred_at, metadata_redacted)

## Consultations
- consultations(id, title, description, opens_at, closes_at, status, methodology)
- consultation_options(id, consultation_id, label)
- consultation_responses(id, consultation_id, user_id, response, submitted_at)

Les votes de consultation ne doivent pas être présentés comme des votes officiels. Définir si une consultation est nominative, pseudonyme ou anonyme et publier sa méthodologie.

## Règles
- UUID/identifiants non séquentiels pour les ressources exposées.
- Horodatages UTC.
- Contraintes, clés étrangères et transactions.
- Pas de données personnelles superflues dans les journaux.
- Politique de rétention et effacement par catégorie.
