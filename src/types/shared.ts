import { z } from "zod";

const id = z.string().min(1);
const total = z.number().min(0);

const characteristic = z.enum(["Standard", "NoArrows", "OneSaber", "Legacy", "360Degree", "90Degree", "Lightshow", "Lawless"]);
const difficulty = z.enum(["Easy", "Normal", "Hard", "Expert", "ExpertPlus"]);

export type Characteristic = z.infer<typeof characteristic>;
export type Difficulty = z.infer<typeof difficulty>;

export default { id, total, characteristic, difficulty };
