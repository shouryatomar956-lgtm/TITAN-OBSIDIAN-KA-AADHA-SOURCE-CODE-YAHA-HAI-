import fs from 'fs';
let content = fs.readFileSync('src/components/ProfileView.tsx', 'utf8');

const glassCardCode = `const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <section className={cn("bg-white/60 backdrop-blur-xl border border-white shadow-sm rounded-[32px] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden", className)}>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 flex flex-col gap-6 h-full">
        {children}
      </div>
    </section>
  );`;

const editableFieldCode = `const EditableField = ({ 
     label, 
     fieldKey, 
     options,
    placeholder,
    isEditing,
    profile,
    editProfile,
    onChange
  }: { 
     label: string, 
     fieldKey: keyof UserProfile, 
     options?: string[],
    placeholder?: string,
    isEditing: boolean,
    profile: Partial<UserProfile>,
    editProfile: Partial<UserProfile>,
    onChange: (key: keyof UserProfile, value: string) => void
  }) => {
    const displayValue = isEditing ? editProfile[fieldKey] : profile[fieldKey];
    
    if (!isEditing && !displayValue) return null;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{label}</label>
        {isEditing ? (
          options ? (
            <select 
              value={(displayValue as string) || ''}
              onChange={e => onChange(fieldKey, e.target.value)}
              className="w-full bg-white/50 border border-white/60 text-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition-all"
            >
              <option value="">Select...</option>
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <input 
              type="text"
              placeholder={placeholder}
              value={(displayValue as string) || ''}
              onChange={e => onChange(fieldKey, e.target.value)}
              className="w-full bg-white/50 border border-white/60 text-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition-all placeholder:text-zinc-400"
            />
          )
        ) : (
          <div className="text-sm font-bold text-zinc-700 bg-white/40 px-4 py-3 rounded-xl border border-white/40 shadow-sm">{displayValue as string}</div>
        )}
      </div>
    );
  };`;

// We need to carefully replace the inner ones and move them out.
let insideRender = true;
// wait, it's easier to just do it via regex or manual extraction.
