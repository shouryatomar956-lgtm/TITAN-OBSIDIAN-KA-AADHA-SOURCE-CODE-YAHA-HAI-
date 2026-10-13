import fs from 'fs';

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// 1. Import UserProfileForm
if (!content.includes('UserProfileForm')) {
  content = content.replace(
    `import { UserProfileSettings } from './UserProfileSettings';`,
    `import { UserProfileSettings } from './UserProfileSettings';\nimport { UserProfileForm } from './UserProfileForm';`
  );
}

// 2. Add UserProfileForm to the profile tab
const oldProfileTab = `        {activeTab === 'profile' && (
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 w-full">
            {/* Empty User Profile Tab as requested */}
          </div>
        )}`;

const newProfileTab = `        {activeTab === 'profile' && (
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 w-full flex items-start justify-center">
            <UserProfileForm />
          </div>
        )}`;

if (content.includes(oldProfileTab)) {
    content = content.replace(oldProfileTab, newProfileTab);
    fs.writeFileSync('src/components/Dashboard.tsx', content);
    console.log("Successfully integrated UserProfileForm");
} else {
    console.log("Could not find old Profile tab container");
}

