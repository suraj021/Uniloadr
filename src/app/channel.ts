import { Video } from "./video";

export class Channel{
    id: string;
    title: string;
    name: string;
    username: string;
    uploadsId: string;
    description: string;
    thumbnail: string;
    uploadCount: number;
    uploads: Video[];

    constructor(){
        this.uploads= new Array<Video>();
    }
}
