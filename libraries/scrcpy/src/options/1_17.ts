import type { ScrcpyOptionsInit1_16 } from "./1_16/index.js";
import { ScrcpyOptions1_16 } from "./1_16/index.js";
import type { ScrcpyEncoder } from "./types.js";
import { ScrcpyOptions } from "./types.js";

export interface ScrcpyOptionsInit1_17 extends ScrcpyOptionsInit1_16 {
    encoderName?: string | undefined;
}

export class ScrcpyOptions1_17 extends ScrcpyOptions<ScrcpyOptionsInit1_17> {
    static readonly DEFAULTS = {
        ...ScrcpyOptions1_16.DEFAULTS,
        encoderName: undefined,
    } as const satisfies Required<ScrcpyOptionsInit1_17>;

    static readonly SERIALIZE_ORDER = [
        ...ScrcpyOptions1_16.SERIALIZE_ORDER,
        "encoderName",
    ] as const satisfies readonly (keyof ScrcpyOptionsInit1_17)[];

    static parseEncoder(
        line: string,
        encoderNameRegex: RegExp,
    ): ScrcpyEncoder | undefined {
        const match = line.match(encoderNameRegex);
        if (match) {
            return { type: "video", name: match[1]! };
        }
        return undefined;
    }

    override get defaults(): Required<ScrcpyOptionsInit1_17> {
        return ScrcpyOptions1_17.DEFAULTS;
    }

    constructor(init: ScrcpyOptionsInit1_17) {
        super(ScrcpyOptions1_16, init, ScrcpyOptions1_17.DEFAULTS);
    }

    override serialize(): string[] {
        return ScrcpyOptions1_16.serialize(
            this.value,
            ScrcpyOptions1_17.SERIALIZE_ORDER,
        );
    }

    override setListEncoders() {
        // Set to an invalid value
        // Server will print valid values before crashing
        // (server will crash after opening video and control sockets)
        this.value.encoderName = "_";
    }

    override parseEncoder(line: string): ScrcpyEncoder | undefined {
        return ScrcpyOptions1_17.parseEncoder(
            line,
            /^\s+scrcpy --encoder-name '([^']+)'$/,
        );
    }
}
