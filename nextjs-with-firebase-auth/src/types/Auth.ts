export interface IRegisterUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  idToken: string;
}

export interface IDeviceInfo {
  fcmToken: string;
  deviceName: string;
}

export interface ILoginUserPayload {
  idToken: string;
  deviceInfo: IDeviceInfo;
}
