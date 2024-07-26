import * as FileSystem from "expo-file-system";

export async function checkFreeSpaceOnDevice(params) {
  await FileSystem.getFreeDiskStorageAsync().then((freeDiskStorage) => {
    var toKB = freeDiskStorage / 1024;
    var toMB = toKB / 1024;
    var toGB = toMB / 1024;
    // console.log(freeDiskStorage, toMB, "MB", toGB, "GB");
    return toMB;
  });
}
export function readFolderContents(params) {
  FileSystem.readDirectoryAsync(
    `file:///var/mobile/Containers/Data/Application/1A3A6ABA-B894-4B8C-9B63-2CAE12443859/Documents/ExponentExperienceData/%2540arnoldadler%252Fadler-tempo-music/songs`
  )
    .then((res) => {
      console.log(res);
      // returns [] of file names in folder
    })
    .catch((e) => {
      console.log(e);
    });
}
export async function makeAFolder(folderName) {
  await FileSystem.makeDirectoryAsync(
    FileSystem.documentDirectory + folderName,
    {}
  )
    .then((v) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

export function getFileOrFolderInfo(params) {
  FileSystem.getInfoAsync(
    `${FileSystem.documentDirectory}songs/${songcode}.mp3`
  )
    .then((file) => {
      if (file.exists) {
        console.log(file.uri);
      } else {
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
