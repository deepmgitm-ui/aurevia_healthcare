export type TreatmentVisual = {
  ink: string;
  navy: string;
  muted: string;
  accent: string;
  wash: string;
  glow: string;
};

export const treatmentVisuals: Record<string, TreatmentVisual> = {
  cataract: { ink: "#23414A", navy: "#295A68", muted: "#5D7174", accent: "#2D8290", wash: "#E4F1F0", glow: "#F6FAF9" },
  lasik: { ink: "#31395E", navy: "#354882", muted: "#626B89", accent: "#5968AC", wash: "#ECEFFC", glow: "#F8F8FD" },
  sinus: { ink: "#324B42", navy: "#315F51", muted: "#5F7469", accent: "#438372", wash: "#E8F2EF", glow: "#F7FAF8" },
  tonsillectomy: { ink: "#40533B", navy: "#496344", muted: "#697664", accent: "#728C5B", wash: "#EDF2E8", glow: "#F9FAF5" },
  septoplasty: { ink: "#344B5A", navy: "#34576B", muted: "#5D737D", accent: "#53758F", wash: "#E8F0F2", glow: "#F7FAFA" },
  "ear-perforation": { ink: "#2C4D56", navy: "#305F6A", muted: "#5B7479", accent: "#308A99", wash: "#E5F1F3", glow: "#F7FBFC" },
  rhinoplasty: { ink: "#49394A", navy: "#654F68", muted: "#74677A", accent: "#90638D", wash: "#F0EAF1", glow: "#FBF8FC" },
  gynecomastia: { ink: "#4E3A41", navy: "#73505A", muted: "#7C696E", accent: "#B36C74", wash: "#F5EAEB", glow: "#FCF8F8" },
  "kidney-stone": { ink: "#514331", navy: "#785536", muted: "#786A57", accent: "#A66F45", wash: "#F3ECE4", glow: "#FCF9F4" },
  dental: { ink: "#334844", navy: "#3D6D67", muted: "#60736E", accent: "#4A827D", wash: "#E8F1EF", glow: "#F7FAF9" },
};

export function getTreatmentVisual(slug: string) {
  return treatmentVisuals[slug] ?? treatmentVisuals.cataract;
}
