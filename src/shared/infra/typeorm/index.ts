import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host?): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(defaultOptions);
};
