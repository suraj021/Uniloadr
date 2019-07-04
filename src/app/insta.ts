export class InstaVideo {
    quality: Map<string, Array<Video>>;

    constructor() {
        this.quality = new Map<string, Array<Video>>();
    }
}

export class Video {
    url: string;
    height: number;
    width: number;
    ext: string;

    constructor() {

    }
}
