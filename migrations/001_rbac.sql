
BEGIN;

-- =========================================================
-- 1. ROLES
-- =========================================================

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_key VARCHAR(80) NOT NULL UNIQUE,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 2. PERMISSIONS
-- =========================================================

CREATE TABLE IF NOT EXISTS permissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    permission_key VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 3. ROLE-PERMISSION RELATIONSHIP
-- =========================================================

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id BIGINT NOT NULL REFERENCES roles(id),
    permission_id BIGINT NOT NULL REFERENCES permissions(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (role_id, permission_id)
);

-- =========================================================
-- 4. USER ROLE ASSIGNMENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS user_role_assignments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT NOT NULL REFERENCES users(id),
    role_id BIGINT NOT NULL REFERENCES roles(id),

    assigned_by BIGINT REFERENCES users(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    revoked_by BIGINT REFERENCES users(id),
    revoked_at TIMESTAMPTZ,

    CHECK (
        revoked_at IS NULL OR revoked_at >= assigned_at
    )
);

-- A user cannot have the same active role twice.
CREATE UNIQUE INDEX IF NOT EXISTS
    uq_user_active_role
ON user_role_assignments(user_id, role_id)
WHERE revoked_at IS NULL;

CREATE INDEX IF NOT EXISTS
    idx_user_role_assignments_user
ON user_role_assignments(user_id);

CREATE INDEX IF NOT EXISTS
    idx_role_permissions_permission
ON role_permissions(permission_id);

-- =========================================================
-- 5. INITIAL ROLES
-- =========================================================

INSERT INTO roles (role_key, name, description)
VALUES
(
    'citizen',
    'Citoyen',
    'Participation citoyenne et création de pétitions'
),
(
    'moderator',
    'Modérateur',
    'Examen et modération des pétitions'
),
(
    'administrator',
    'Administrateur',
    'Administration générale de la plateforme'
),
(
    'institution_representative',
    'Représentant institutionnel',
    'Réponse institutionnelle aux pétitions transmises'
)
ON CONFLICT (role_key) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- =========================================================
-- 6. INITIAL PERMISSIONS
-- =========================================================

INSERT INTO permissions (permission_key, description)
VALUES
('petition:read_public', 'Consulter les pétitions publiques'),
('petition:create', 'Créer une pétition'),
('petition:sign', 'Signer une pétition'),
('petition:submit', 'Soumettre une pétition à examen'),
('petition:withdraw', 'Retirer sa propre pétition'),
('petition:review', 'Examiner une pétition'),
('petition:publish', 'Autoriser la publication'),
('petition:reject', 'Rejeter une pétition'),
('petition:close', 'Clôturer une pétition'),
('petition:transmit', 'Transmettre une pétition à une institution'),
('petition:read_assigned', 'Consulter les pétitions transmises à son institution'),
('petition:institution_response', 'Répondre à une pétition au nom de son institution'),
('consultation:participate', 'Participer aux consultations citoyennes'),
('consultation:create', 'Créer une consultation'),
('moderation:manage_reports', 'Traiter les signalements'),
('users:manage_roles', 'Gérer les rôles des utilisateurs'),
('platform:manage_settings', 'Gérer les paramètres de la plateforme'),
('audit:read', 'Consulter les journaux d audit'),
('institution:manage_profile', 'Gérer le profil institutionnel')
ON CONFLICT (permission_key) DO UPDATE
SET description = EXCLUDED.description;

-- =========================================================
-- 7. CITIZEN PERMISSIONS
-- =========================================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM (
    VALUES
        ('citizen', 'petition:read_public'),
        ('citizen', 'petition:create'),
        ('citizen', 'petition:sign'),
        ('citizen', 'petition:submit'),
        ('citizen', 'petition:withdraw'),
        ('citizen', 'consultation:participate')
) AS mapping(role_key, permission_key)
JOIN roles r ON r.role_key = mapping.role_key
JOIN permissions p ON p.permission_key = mapping.permission_key
ON CONFLICT DO NOTHING;

-- =========================================================
-- 8. MODERATOR PERMISSIONS
-- =========================================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM (
    VALUES
        ('moderator', 'petition:read_public'),
        ('moderator', 'petition:review'),
        ('moderator', 'petition:publish'),
        ('moderator', 'petition:reject'),
        ('moderator', 'petition:close'),
        ('moderator', 'moderation:manage_reports')
) AS mapping(role_key, permission_key)
JOIN roles r ON r.role_key = mapping.role_key
JOIN permissions p ON p.permission_key = mapping.permission_key
ON CONFLICT DO NOTHING;

-- =========================================================
-- 9. INSTITUTION REPRESENTATIVE PERMISSIONS
-- =========================================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM (
    VALUES
        ('institution_representative', 'petition:read_public'),
        ('institution_representative', 'petition:read_assigned'),
        ('institution_representative', 'petition:institution_response'),
        ('institution_representative', 'institution:manage_profile')
) AS mapping(role_key, permission_key)
JOIN roles r ON r.role_key = mapping.role_key
JOIN permissions p ON p.permission_key = mapping.permission_key
ON CONFLICT DO NOTHING;

-- =========================================================
-- 10. ADMINISTRATOR PERMISSIONS
-- =========================================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.role_key = 'administrator'
ON CONFLICT DO NOTHING;

-- =========================================================
-- 11. DEFAULT CITIZEN ROLE FOR EXISTING USERS
-- =========================================================

INSERT INTO user_role_assignments (user_id, role_id)
SELECT u.id, r.id
FROM users u
CROSS JOIN roles r
WHERE r.role_key = 'citizen'
AND NOT EXISTS (
    SELECT 1
    FROM user_role_assignments ura
    WHERE ura.user_id = u.id
      AND ura.role_id = r.id
      AND ura.revoked_at IS NULL
);


-- =========================================================
-- 12. APPLICATION DATABASE PRIVILEGES
-- =========================================================

GRANT SELECT ON roles, permissions, role_permissions
TO pd_app;

GRANT SELECT, INSERT, UPDATE
ON user_role_assignments
TO pd_app;

GRANT USAGE, SELECT
ON SEQUENCE user_role_assignments_id_seq
TO pd_app;

COMMIT;
