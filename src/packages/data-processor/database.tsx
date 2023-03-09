export function processTeamRecord(columns: string[], record: string[]) {
  return columns.reduce(
    (memo, column, index) => ({
      ...memo,
      [column]: record[index]
    }),
    {}
  );
}

export function processProfessionalRecord(columns: string[], record: string[]) {
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
    cities: record
      .slice(indexOfCities, indexOfServices)
      .map((value, index) =>
        value === "TRUE" ? columns[indexOfCities + index] : undefined
      )
      .filter((value) => value),
    services: record
      .slice(indexOfServices)
      .map((value, index) =>
        value === "TRUE" ? columns[indexOfServices + index] : undefined
      )
      .filter((value) => value)
  };
}
