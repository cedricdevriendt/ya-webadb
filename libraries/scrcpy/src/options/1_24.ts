import { ScrcpyOptions1_21 } from "./1_21.js";
import type { ScrcpyOptionsInit1_23 } from "./1_23.js";
import { ScrcpyOptions1_23 } from "./1_23.js";
import { ScrcpyOptions } from "./types.js";

export interface ScrcpyOptionsInit1_24 extends ScrcpyOptionsInit1_23 {
    powerOn?: boolean;
}

export class ScrcpyOptions1_24 extends ScrcpyOptions<ScrcpyOptionsInit1_24> {
    static readonly DEFAULTS = {
        ...ScrcpyOptions1_23.DEFAULTS,
        powerOn: true,
    } as const satisfies Required<ScrcpyOptionsInit1_24>;

    override get defaults(): Required<ScrcpyOptionsInit1_24> {
        return ScrcpyOptions1_24.DEFAULTS;
    }

    constructor(init: ScrcpyOptionsInit1_24) {
        super(ScrcpyOptions1_23, init, ScrcpyOptions1_24.DEFAULTS);
    }

    override serialize(): string[] {
        return ScrcpyOptions1_21.serialize(this.value, this.defaults);
    }
}
