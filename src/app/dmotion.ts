export class MotionVideo {
    id: string;
    thumbnail: string;
    duration: string;
    webpage_url: string;
    title: string;

    quality: Map<number, Video[]>;

    constructor() {
        this.quality = new Map<number, Video[]>();
    }
}

export class Video {
    ext: string;
    height: number;
    width: number;
    url: string;

    constructor(){

    }
}
