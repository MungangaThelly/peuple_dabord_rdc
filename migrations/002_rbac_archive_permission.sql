
BEGIN;

-- Add petition archive permission.
INSERT INTO permissions (permission_key, description)
VALUES (
    'petition:archive',
    'Archiver une pétition après la clôture de son traitement'
)
ON CONFLICT (permission_key) DO UPDATE
SET description = EXCLUDED.description;

-- Grant archive permission only to administrators.
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.role_key = 'administrator'
  AND p.permission_key = 'petition:archive'
ON CONFLICT DO NOTHING;

COMMIT;
