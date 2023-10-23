import { LucidModel } from '@ioc:Adonis/Lucid/Orm'

export function roleGuard(model: LucidModel, rolesSession: string): string[] {
  const dataToSerializePick: string[] = []

  for (let column of model.$columnsDefinitions.keys()) {
    if (model.$hasColumn(column)) {
      const columnName = model.$getColumn(column)?.columnName ?? ''
      if ((model.$getColumn(column)?.meta?.roles || []).includes(rolesSession)) {
        dataToSerializePick.push(columnName)
      }
      if (model.$getColumn(column)?.meta?.roles === undefined) {
        dataToSerializePick.push(columnName)
      }
    }
  }

  return dataToSerializePick
}
