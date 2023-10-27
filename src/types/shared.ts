import { z } from "zod";

const id = z.string().nonempty();
const total = z.number().min(0);

const characteristic = z.enum(["Standard", "No Arrows", "One Saber", "Legacy", "360 Degree", "90 Degree", "Lightshow", "Lawless"]);
const difficulty = z.enum(["Easy", "Normal", "Hard", "Expert", "Expert+"]);

export type Characteristic = z.infer<typeof characteristic>;
export type Difficulty = z.infer<typeof difficulty>;

export default { id, total, characteristic, difficulty };
