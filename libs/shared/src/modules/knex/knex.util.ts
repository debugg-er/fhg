export function getKnexConnectionToken(connectionName: string) {
  return 'Knex_' + connectionName
}
