export class Vimeo {
    id: string;
    title: string;
    thumbnail: string;
    webpage_url: string;
    duration: string;
    both: Map< number, Video[]>;

    constructor(){
        this.both= new Map< number, Video[]>();
    }

    set(){
        //this.both.sort( compare );
        //this.noaudio.sort( compare );
        //this.novideo.sort( compare );
    }

}

export class Video{
    id: string;
    height: number;
    width: number;
    url: string;
    ext: string;
    acodec: string;
    vcodec: string;
    preference: number;
}
