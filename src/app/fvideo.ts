export class FacebookVideo {
    title: string;
    id: string;
    thumbnail: string;
    webpage_url: string;

    both: Map<string, Video[]>;
    noaudio: Map<string, Video[]>;
    novideo: Array<Video>;

    constructor() {
        this.both = new Map<string, Video[]>();
        this.noaudio = new Map<string, Video[]>();
        this.novideo = new Array<Video>();
    }
}

export class Video {
    ext: string;
    height: number;
    width: string;
    quality: string;
    url: string;

    constructor() {
        this.quality= '';
    }
}

