import fs from 'fs';

let content = fs.readFileSync('src/services/storage.ts', 'utf8');

content = content.replace(/private get db\(\) \{[\s\S]*?async getUserProfile/m, `private async getDb() {
    return await getRxDBProxy();
  }

  async getUserProfile`);

content = content.replace(/const rxdb = this\.db;/g, "const rxdb = await this.getDb();");

fs.writeFileSync('src/services/storage.ts', content);
