import {
  deleteFile,
  readFileObject,
  readFolder,
  writeFile,
} from "../capacitor/filesystem";

export const deleteEntry = async <
  T extends { timestamp: number; start?: Date }
>(
  path: string,
  data: T
) => {
  const date = data.start
    ? data.start.toDateString()
    : new Date(data.timestamp).toDateString();
  const filePath = `${path}/${date}/${data.timestamp}.json`;
  return deleteFile(filePath);
};
export const writeEntry = async <T extends { timestamp: number; start?: Date }>(
  path: string,
  data: T
) => {
  const date = data.start
    ? data.start.toDateString()
    : new Date(data.timestamp).toDateString();
  const filePath = `${path}/${date}/${data.timestamp}.json`;
  return writeFile(filePath, JSON.stringify(data));
};

export const readEntry = async <T extends object>(
  path: string,
  timestamp: number
) => {
  const date = new Date(timestamp).toDateString();
  const filePath = `${path}/${date}/${timestamp}.json`;
  return readFileObject<T>(filePath);
};

//read all entries in given day
export const readDayEntries = async <T extends object>(
  path: string,
  timestamp: number | string
) => {
  const timestampPath =
    typeof timestamp == "string"
      ? timestamp
      : new Date(timestamp).toDateString();
  const folderPath = `${path}/${timestampPath}`;
  const fileNames = await readFolder(folderPath);
  const files = fileNames.map(async (fileName) => {
    const filePath = `${folderPath}/${fileName.name}`;
    return readFileObject<T>(filePath);
  });
  return await Promise.all(files);
};

//read all entries in given Path
export const readPathEntries = async <T extends object>(path: string) => {
  const days: Record<string, T[]> = {};
  const dayPaths = await readFolder(path);
  const paths = dayPaths.map(async (dayPath) => {
    days[dayPath.name] = await readDayEntries<T>(path, dayPath.name);
    return days[dayPath.name];
  });
  await Promise.all(paths);
  return days;
};
