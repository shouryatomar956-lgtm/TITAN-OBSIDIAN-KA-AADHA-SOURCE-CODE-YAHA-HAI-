import { useState } from 'react';
import { User, MapPin, Target, Activity, Save } from 'lucide-react';
import { motion } from 'motion/react';

export function UserProfileForm() {
  const [formData, setFormData] = useState({
    username: '',
    experience: '',
    location: '',
    goals: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepared for future state management integration
    console.log('Profile data ready for storage:', formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-100">User Profile</h2>
        <p className="text-zinc-400 text-sm mt-1">Manage your identity and fitness journey details.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-2">
            <User className="w-3.5 h-3.5" /> Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        {/* Experience Level */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm appearance-none"
          >
            <option value="" disabled>Select experience level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="elite">Elite</option>
          </select>
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Region, or Gym Name"
            className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        {/* Fitness Goals */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-2">
            <Target className="w-3.5 h-3.5" /> Fitness Goals
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            placeholder="What do you want to achieve?"
            rows={3}
            className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile Info
          </button>
        </div>
      </form>
    </motion.div>
  );
}
