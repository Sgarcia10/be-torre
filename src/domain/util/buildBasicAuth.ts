export class BuildBasicAuth {
  static basicAuth(user: string, password: string) {
    const prePass = `${user}:${password}`;
    return `Basic ${Buffer.from(prePass).toString('base64')}`;
  }
}
