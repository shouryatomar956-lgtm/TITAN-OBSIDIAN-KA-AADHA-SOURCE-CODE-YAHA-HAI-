import fs from 'fs';

let content = fs.readFileSync('src/services/storage.ts', 'utf8');

const importCrypto = `import { format } from 'date-fns';
import { getRxDBProxy } from '../utils/rxdbManager';
import { hashData } from '../utils/crypto';
`;

content = content.replace(`import { format } from 'date-fns';\nimport { getRxDBProxy } from '../utils/rxdbManager';`, importCrypto);

const oldUpdatePin = `  async updatePin(newPin: string): Promise<void> {
    const profile = await this.getUserProfile();
    if (profile) {
      profile.previousPin = profile.pin;
      profile.pinUpdatedAt = new Date().toISOString();
      profile.pin = newPin;
      await this.saveUserProfile(profile);
    }
  }`;

const newUpdatePin = `  async updatePin(newPin: string): Promise<void> {
    const profile = await this.getUserProfile();
    if (profile) {
      profile.previousPin = profile.pin;
      profile.pinUpdatedAt = new Date().toISOString();
      profile.pin = await hashData(newPin);
      await this.saveUserProfile(profile);
    }
  }`;

content = content.replace(oldUpdatePin, newUpdatePin);
fs.writeFileSync('src/services/storage.ts', content);
