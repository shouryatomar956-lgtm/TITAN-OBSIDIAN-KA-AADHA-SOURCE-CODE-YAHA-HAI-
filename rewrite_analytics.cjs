const fs = require('fs');

const path = 'src/components/AnalyticsDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

const returnIdx = content.indexOf('  return (\n');
if (returnIdx === -1) {
    console.error("Could not find return statement in AnalyticsDashboard.tsx");
    process.exit(1);
}

const beforeReturn = content.substring(0, returnIdx);
const newReturn = `  return (
    <section className="mt-2 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">Analytics</h2>
        <button 
          onClick={handleExportPDF}
          disabled={exporting}
          className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div ref={reportRef} className="space-y-6" style={{ backgroundColor: '#ffffff', color: '#111827' }}>
        
        {/* Main Metric & Toggles */}
        <div className="flex items-end justify-between">
            <div className="flex flex-col">
               <span className="text-sm font-bold text-zinc-400 mb-1">Total Est. Volume</span>
               <span className="text-[32px] font-bold text-zinc-900 tracking-tight leading-none">84.2k</span>
            </div>
            <div className="flex gap-2">
                <button className="w-10 h-10 rounded-[14px] bg-zinc-900 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 rounded-[14px] bg-zinc-100 flex items-center justify-center transition-colors">
                    <Activity className="w-5 h-5 text-zinc-400" />
                </button>
            </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center justify-between bg-zinc-50 rounded-[20px] p-4">
            <span className="text-sm font-bold text-zinc-700">From {format(subDays(today, 6), 'MMM dd')} to {format(today, 'MMM dd')}</span>
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-zinc-500">
               <Target className="w-4 h-4" />
            </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div className="h-48 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressionData}>
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px', color: '#ffffff', fontWeight: 'bold' }}
                  itemStyle={{ color: '#8b5cf6' }}
                  formatter={(val) => [new Intl.NumberFormat('en-US').format(val), 'Volume']}
                />
                <Line type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#fff', stroke: '#8b5cf6'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h3 className="text-base font-bold text-zinc-900 mb-4">Training Frequency</h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frequencyData}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px', color: '#ffffff', fontWeight: 'bold' }}
                    cursor={{fill: '#f3f4f6'}}
                  />
                  <Bar dataKey="completed" fill="#06b6d4" radius={[6, 6, 6, 6]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-6 left-1/2 z-50 px-6 py-4 bg-zinc-900 text-white rounded-[20px] shadow-2xl font-bold text-sm whitespace-nowrap flex items-center gap-3"
        >
          <Target className="w-5 h-5 text-cyan-400" />
          {toastMessage}
        </motion.div>
      )}
    </section>
  );
}
`;

fs.writeFileSync(path, beforeReturn + newReturn);
console.log('AnalyticsDashboard.tsx updated!');
