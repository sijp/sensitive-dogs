import lodash from "lodash";
import { ProfessionalRecord, TeamRecord, MenuRecord } from ".";

export function processTeamRecord(
  columns: string[],
  record: string[]
): TeamRecord {
  return columns.reduce(
    (memo, column, index) => ({
      ...memo,
      [column]: record[index]
    }),
    {}
  ) as TeamRecord;
}

export function processMenuRecord(
  columns: string[],
  record: string[]
): MenuRecord {
  return columns.reduce(
    (memo, column, index) => ({
      ...memo,
      [column]: record[index]
    }),
    {}
  ) as MenuRecord;
}

export function processHomePageRecord(_columns: string[], record: string[]) {
  return { [record[0]]: record[1] };
}

export function processProfessionalRecord(
  columns: string[],
  record: string[]
): ProfessionalRecord {
  const indexOfCities = columns.indexOf("cities");
  const indexOfServices = columns.indexOf("services");
  return {
    ...columns.slice(0, indexOfCities).reduce(
      (memo, column, index) => ({
        ...memo,
        [column]: record[index] === "TRUE" ? true : record[index] || undefined
      }),
      {}
    ),
    cities: lodash.compact(
      record
        .slice(indexOfCities, indexOfServices)
        .map((value, index) =>
          value === "TRUE" ? columns[indexOfCities + index] : undefined
        )
    ),
    services: lodash.compact(
      record
        .slice(indexOfServices)
        .map((value, index) =>
          value === "TRUE" ? columns[indexOfServices + index] : undefined
        )
    )
  } as ProfessionalRecord;
}
