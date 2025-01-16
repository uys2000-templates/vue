import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const requestPermissions = async () => {
  const permissionStatus = await Filesystem.requestPermissions();
  return permissionStatus.publicStorage != "denied";
};
export const checkPermissions = async () => {
  const permissionStatus = await Filesystem.checkPermissions();
  return permissionStatus.publicStorage != "denied";
};

export const readFolder = async (path: string) => {
  const readdirResult = await Filesystem.readdir({
    path: "HUM/" + path,
    directory: Directory.Documents,
  });
  return readdirResult.files;
};
export const makeDirectory = async (path: string) => {
  await Filesystem.mkdir({
    path: "HUM/" + path,
    directory: Directory.Documents,
  });
};
export const removeFolder = async (path: string) => {
  await Filesystem.rmdir({
    path: "HUM/" + path,
    directory: Directory.Documents,
  });
};

export const readFile = async (path: string) => {
  const readFileResult = await Filesystem.readFile({
    path: "HUM/" + path,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  return readFileResult.data as string;
};
export const readFileObject = async <T extends object>(path: string) => {
  const readFileResult = await Filesystem.readFile({
    path: "HUM/" + path,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  return JSON.parse(readFileResult.data as string) as T;
};

export const writeFile = async (path: string, data: string) => {
  return Filesystem.writeFile({
    path: "HUM/" + path,
    data: data,
    recursive: true,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};
export const writeFileObject = async (path: string, data: object) => {
  return Filesystem.writeFile({
    path: "HUM/" + path,
    data: JSON.stringify(data),
    recursive: true,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

export const deleteFile = async (path: string) => {
  await Filesystem.deleteFile({
    path: "HUM/" + path,
    directory: Directory.Documents,
  });
};
