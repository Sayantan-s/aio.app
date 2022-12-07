export const instrumentHeaders = ["Symbol", "Name", "Sector"] as const;
export type KeyOfInstrumentHeadersType = Lowercase<
  typeof instrumentHeaders[number]
>;
export type InstrumentObjectType = Record<KeyOfInstrumentHeadersType, string>;
