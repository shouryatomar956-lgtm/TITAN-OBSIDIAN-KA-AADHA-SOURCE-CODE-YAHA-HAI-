var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// remove_injury.ts
var import_fs = __toESM(require("fs"), 1);
var content = import_fs.default.readFileSync("src/components/Dashboard.tsx", "utf8");
var handleToggleFunc = `  const handleToggleInjury = useCallback(async (dateStr: string) => {
    const newState = await storage.toggleInjuryStatus(dateStr);
    setState(newState);
  }, []);

`;
content = content.replace(handleToggleFunc, "");
var buttonHtml = `              <button 
                onClick={() => handleToggleInjury(format(new Date(), 'yyyy-MM-dd'))}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors",
                  (state?.injuryDate === format(new Date(), 'yyyy-MM-dd')) 
                    ? "bg-rose-500/20 text-rose-400 border-rose-500/30" 
                    : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300"
                )}
              >
                <Crosshair className="w-3.5 h-3.5" />
                Injured
              </button>
`;
content = content.replace(buttonHtml, "");
var renderBlockStr = `              {state?.injuryDate === format(new Date(), 'yyyy-MM-dd') ? (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full text-center group relative overflow-hidden rounded-xl p-8 transition-all duration-300 bg-rose-500/10 border border-rose-500/30 flex flex-col gap-3 items-center"
                >
                  <Crosshair className="w-8 h-8 text-rose-400" />
                  <h3 className="font-bold text-rose-100 text-lg">Recovery Mode Active</h3>
                  <p className="text-sm text-rose-200/70">You've marked today as an injury day. Rest up, hydrate, and focus on recovery. This override will expire tomorrow.</p>
                </motion.div>
              ) : recommendedExercises.map((workout, index) => (`;
content = content.replace(renderBlockStr, `              {recommendedExercises.map((workout, index) => (`);
import_fs.default.writeFileSync("src/components/Dashboard.tsx", content);
var storageContent = import_fs.default.readFileSync("src/services/storage.ts", "utf8");
var storageFunc = `  async toggleInjuryStatus(dateStr: string): Promise<AppState> {
    const state = await this.getState();
    const isCurrentlyInjured = state.injuryDate === dateStr;
    const newState = {
      ...state,
      injuryDate: isCurrentlyInjured ? null : dateStr
    };
    await localforage.setItem(STATE_KEY, newState);
    return newState;
  }

`;
storageContent = storageContent.replace(storageFunc, "");
storageContent = storageContent.replace("  injuryDate?: string | null;\n", "");
storageContent = storageContent.replace("  injuryDate: null,\n", "");
import_fs.default.writeFileSync("src/services/storage.ts", storageContent);
