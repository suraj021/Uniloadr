export class Video {
    "on": boolean;
    "id": string;
    "title": string;
    "subtitle": {};
    "thumbnail": "";
    "duration": number;
    "besturl": string;
    "bestext": string;
    "bestheight": string;
    "quality": {
        "3gp": {
            "144": string[],
            "180": string[],
            "240": string[]
        },
        "webm": {
            "240": string[],
            "360": string[],
            "480": string[],
            "720": string[],
            "1080": string[]
        },
        "mp4": {
            "240": string[],
            "360": string[],
            "480": string[],
            "720": string[],
            "1080": string[]
        },
        "flv": {
            "240": string[],
            "360": string[],
            "480": string[],
            "720": string[],
            "1080": string[]
        }
    };
    "noaudio": {
        "webm": {
            "240": string[],
            "360": string[],
            "480": string[],
            "720": string[],
            "1080": string[],
            "3072": string[]
        },
        "mp4": {
            "240": string[],
            "360": string[],
            "480": string[],
            "720": string[],
            "1080": string[],
            "1440": string[],
            "2160": string[]
        }      
    };

    constructor() {

        this.on= false;
        this.quality = {
            "3gp": {
                "144": [],
                "180": [],
                "240": []
            },
            "webm": {
                "240": [],
                "360": [],
                "480": [],
                "720": [],
                "1080": []
            },
            "mp4": {
                "240": [],
                "360": [],
                "480": [],
                "720": [],
                "1080": []
            },
            "flv": {
                "240": [],
                "360": [],
                "480": [],
                "720": [],
                "1080": []
            }
        };

        this.noaudio= {
            "webm": {
                "240": [],
                "360": [],
                "480": [],
                "720": [],
                "1080": [],
                "3072": []
            },
            "mp4": {
                "240": [],
                "360": [],
                "480": [],
                "720": [],
                "1080": [],
                "1440": [],
                "2160": []
            }
        };

        this.quality["3gp"]["144"] = [];
        this.quality["3gp"]["180"] = [];
        this.quality["3gp"]["240"] = [];

        this.quality["webm"]["240"]= [];
        this.quality["webm"]["360"]= [];
        this.quality["webm"]["480"]= [];
        this.quality["webm"]["720"]= [];
        this.quality["webm"]["1080"]= [];

        this.quality["mp4"]["240"] = [];
        this.quality["mp4"]["360"] = [];
        this.quality["mp4"]["480"] = [];
        this.quality["mp4"]["720"] = [];
        this.quality["mp4"]["1080"] = [];

        this.quality["flv"]["240"] = [];
        this.quality["flv"]["360"] = [];
        this.quality["flv"]["480"] = [];
        this.quality["flv"]["720"] = [];
        this.quality["flv"]["1080"] = [];

        this.noaudio["webm"]["240"]= [];
        this.noaudio["webm"]["360"]= [];
        this.noaudio["webm"]["480"]= [];
        this.noaudio["webm"]["720"]= [];
        this.noaudio["webm"]["1080"]= [];
        this.noaudio["webm"]["3072"]= [];

        this.noaudio["mp4"]["240"]= [];
        this.noaudio["mp4"]["360"]= [];
        this.noaudio["mp4"]["480"]= [];
        this.noaudio["mp4"]["720"]= [];
        this.noaudio["mp4"]["1080"]= [];
        this.noaudio["mp4"]["1440"]= [];
        this.noaudio["mp4"]["2160"]= [];

    }
}
