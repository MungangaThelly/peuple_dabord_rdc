
-module(pd_authz).

-export([
    has_permission/2,
    require_permission/2
]).

%% Check whether an active user has a permission
%% through at least one active role assignment.
has_permission(UserId, PermissionKey)
  when is_integer(UserId),
       UserId > 0,
       is_binary(PermissionKey) ->

    Sql =
        "SELECT EXISTS ("
        "SELECT 1 "
        "FROM users u "
        "JOIN user_role_assignments ura "
        "ON ura.user_id = u.id "
        "JOIN role_permissions rp "
        "ON rp.role_id = ura.role_id "
        "JOIN permissions p "
        "ON p.id = rp.permission_id "
        "WHERE u.id = $1 "
        "AND u.account_status = 'active' "
        "AND ura.revoked_at IS NULL "
        "AND p.permission_key = $2"
        ")",

    case pd_db:query(Sql, [UserId, PermissionKey]) of
        {ok, _Columns, [{true}]} ->
            {ok, true};

        {ok, _Columns, [{false}]} ->
            {ok, false};

        {error, Reason} ->
            {error, {authorization_database_error, Reason}};

        Other ->
            {error, {unexpected_authorization_result, Other}}
    end;

has_permission(_UserId, _PermissionKey) ->
    {error, invalid_authorization_arguments}.


%% Require a permission or explicitly deny access.
require_permission(UserId, PermissionKey) ->
    case has_permission(UserId, PermissionKey) of
        {ok, true} ->
            ok;

        {ok, false} ->
            {error, forbidden};

        {error, Reason} ->
            {error, Reason}
    end.
