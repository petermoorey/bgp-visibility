
export class Settings {
    notifyEmail: boolean;
    notifyWebhook: boolean;
}

export class Network {
  id: string;
  network: string;
  uid: string;
  created: Date;
  settings: Settings;
}
