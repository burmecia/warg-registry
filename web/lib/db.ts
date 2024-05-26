import postgres from "postgres"

const host = process.env.POSTGRES_HOST
const password = process.env.POSTGRES_PASSWORD
const sql = postgres(`postgres://warg:${password}@${host}:5432/warg`)

export const getPackages = async () => {
  const pkgs = await sql`
    with src as (
      select
        log_id,
        name,
        validator->'releases' rel,
        jsonb_object_keys(validator->'releases') ver,
        created_at,
        updated_at
      from
        public.logs
      where
        name is not null
    ),
    pkgs as (
      select distinct
        log_id,
        name,
        created_at,
        updated_at
      from
        src
      order by
        name
    ),
    releases as (
      select
        name as package,
        rel->ver->>'recordId' as record_id,
        ver as version,
        rel->ver->'state'->>'status' as status,
        to_timestamp(cast(rel->ver->>'timestamp' as float)) as released_at,
        rel->ver->'state'->>'content' as content_hash
      from
        src
      order by
        ver desc
    )
    select
      p.log_id,
      p.name,
      p.created_at,
      p.updated_at,
      json_agg(r)::jsonb as releases
    from pkgs p
      join releases r on p.name = r.package
    where
      r.status = 'released'
    group by
      1,2,3,4
  `
  return pkgs
}
