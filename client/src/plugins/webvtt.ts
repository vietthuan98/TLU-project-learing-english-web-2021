import webvtt from 'node-webvtt'

export interface CueItem {
    identifier: string,
    start: number,
    end: number,
    text: string,
    styles: string
}

class WebVtt {
    segmentDuration: number; // default to 10
    startOffset: number; // Starting MPEG TS offset to be used in timestamp map, default 900000
    strict: boolean;
    constructor(segmentDuration: number, startOffset: number, strict = false) {
        this.segmentDuration = segmentDuration;
        this.startOffset = startOffset;
        this.strict = strict;
    }

    parsed(string: string) {
        return webvtt.parse(string, { strict: this.strict });
    }

    compile(json: unknown) {
        return webvtt.compile(json, { strict: this.strict });
    }
}

export default new WebVtt(10, 0);