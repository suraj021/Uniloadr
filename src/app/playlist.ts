import { Video } from "./video";

export class Playlist{
    id: string;
    title: string;
    thumbnail: string;
    itemCount: number;
    videos: Video[];

    constructor(){
        this.videos= new Array<Video>();
    }
}
