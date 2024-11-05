interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  deviceMemory?: string;
  hardwareConcurrency: number;
  operatingSystem: string;
}

function getDeviceInfo(): string {
  // 获取操作系统和浏览器信息
  const userAgent = navigator.userAgent;
  const osInfo = userAgent.match(/(Windows|Macintosh|Linux).*?([0-9._]+)/i);
  const os = osInfo ? `${osInfo[1]}${osInfo[2]}` : "unknown";

  // 获取设备内存和CPU核心数
  // @ts-ignore
  const deviceMemory = navigator.deviceMemory
    ? // @ts-ignore
      `${navigator.deviceMemory} GB` // @ts-ignore
    : "unknown";
  const hardwareConcurrency = navigator.hardwareConcurrency
    ? `${navigator.hardwareConcurrency} cores`
    : "unknown";

  // 获取语言
  const language = navigator.language;

  // 组合设备信息
  return `${os}-${deviceMemory}-${hardwareConcurrency}-${language}`;
}

function generateUniqueId(): string {
  // 创建一个基础的UUID
  const baseUuid = crypto.randomUUID();

  // 获取设备信息
  const deviceInfo = getDeviceInfo();

  // 将设备信息和UUID结合起来生成唯一ID
  const uniqueId = `${baseUuid}-${deviceInfo}`;

  // 对结果进行Base64编码
  const encodedId = btoa(uniqueId);

  return encodedId;
}

// 使用 Promise 封装 chrome.storage API 的异步操作
function getOrCreateUserId(): Promise<string> {
  return new Promise((resolve, reject) => {
    // 尝试从 chrome.storage.sync 获取 userId
    chrome.storage.sync.get(["userId"], (result) => {
      let userId = result.userId;
      if (userId === undefined || userId === null) {
        // 如果不存在，则生成一个新的 userId
        userId = generateUniqueId();
        // 存储新的 userId 到 chrome.storage.sync
        chrome.storage.sync.set({ userId }, () => {
          // 存储成功后，使用 resolve 返回新的 userId
          resolve(userId);
        });
      } else {
        // 如果已经存在 userId，直接使用 resolve 返回
        resolve(userId);
      }
    });
  });
}

export { generateUniqueId, getOrCreateUserId };
