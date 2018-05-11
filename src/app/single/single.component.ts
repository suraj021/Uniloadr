import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { FetcherService } from '../services/fetcher.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  video: Video;
  mp41080: boolean; mp4720: boolean; mp4480: boolean; mp4360: boolean; mp4240: boolean;
  gpp144: boolean; gpp180: boolean; gpp240: boolean;
  webm240: boolean; webm360: boolean; webm480: boolean; webm720: boolean; webm1080: boolean;
  flv240: boolean; flv360: boolean; flv480: boolean; flv720: boolean; flv1080: boolean;
  noaudiowebm240: boolean; noaudiowebm360: boolean; noaudiowebm480: boolean; noaudiowebm720: boolean; noaudiowebm1080: boolean; noaudiowebm3072: boolean;
  noaudiomp4240: boolean; noaudiomp4360: boolean; noaudiomp4480: boolean; noaudiomp4720: boolean; noaudiomp41080: boolean; noaudiomp41440: boolean; noaudiomp42160: boolean;

  hasmp4: boolean; hasgpp: boolean; hasflv: boolean; haswebm: boolean;
  hassubtitles: boolean;
  hasnoaudiomp4: boolean; hasnoaudiowebm: boolean;
  loading: boolean;

  constructor(private _fetcher: FetcherService) {
    this.loading= false;
  }

  ngOnInit() {
  }

  download(input) {

    this.loading= true;

    this.hasflv = this.hasgpp = this.hasmp4 = this.hasnoaudiomp4 = this.hasnoaudiowebm = this.hassubtitles = this.haswebm = false;

    this.video = new Video();
    let id = input.value;

    //console.log( window.location.href );
    let testurl= 'http://localhost:8080/';

    this._fetcher.get('api/video?id=' + id)
      .subscribe(
        res => {
          //console.log( res );
          this.video.title = res.title;
          this.video.id = res.id;
          this.video.duration = res.duration;
          this.video.subtitle = res.subtitles;
          this.video.thumbnail = res.thumbnails[0].url;

          //console.log( this.video.subtitle );

          if (Object.keys(this.video.subtitle).length > 0) {
            this.hassubtitles = true;
          } else {
            this.hassubtitles = false;
          }
          // get all videos
          for (let obj of res.formats) {
            if (obj.acodec === "none" || obj.vcodec === "none")
              continue;

            let ext: string = obj.ext;
            switch (ext) {
              case "mp4": {
                let height: string = String(obj.height);
                switch (height) {
                  case "240": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "360": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "480": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "720": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "1080": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "3072": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  default: {

                  }
                }
                break;
              }
              case "webm": {
                let height: string = String(obj.height);
                switch (height) {
                  case "240": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "360": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "480": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "720": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "1080": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "3072": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  default: {

                  }
                }
                break;
              }
              case "3gp": {
                let height: string = String(obj.height);
                switch (height) {
                  case "144": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "180": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "240": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "360": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "480": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "720": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "1080": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "3072": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  default: {

                  }
                }
                break;
              }
              case "flv": {
                let height: string = String(obj.height);
                switch (height) {
                  case "240": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "360": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "480": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "720": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "1080": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "3072": {
                    this.video.quality[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  default: {

                  }
                }
                break;
              }
              default: {
                break;
              }
            }
          }

          // get all no audio videos
          //let i= 0;
          for (let obj of res.formats) {
            //console.log( i++ );
            if (obj.acodec !== "none")
              continue;

            let ext: string = obj.ext;
            switch (ext) {
              case "mp4": {
                let height: string = String(obj.height);
                switch (height) {
                  case "240": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "360": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "480": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "720": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "1080": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "1440": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "2160": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  default: {

                  }
                }
                break;
              }
              case "webm": {
                let height: string = String(obj.height);
                switch (height) {
                  case "240": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "360": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "480": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "720": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "1080": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  case "3072": {
                    this.video.noaudio[ext][height].push(obj.url + '&title=' + this.video.title);
                    break;
                  }
                  default: {

                  }
                }
                break;
              }
              default: {
                break;
              }
            }

          }

          this.set();

          this.video.on = true;

          this.loading= false;
          //console.log(this.video);
        },
        err=> {
          this.loading= false;
        }
      );
  }

  set() {
    if (Object.keys(this.video.quality.mp4["1080"]).length > 0) {
      this.mp41080 = true;
      this.hasmp4 = true;
    } else {
      this.mp41080 = false;
    }

    if (Object.keys(this.video.quality.mp4["720"]).length > 0) {
      this.mp4720 = true;
      this.hasmp4 = true;
    } else {
      this.mp4720 = false;
    }

    if (Object.keys(this.video.quality.mp4["480"]).length > 0) {
      this.mp4480 = true;
      this.hasmp4 = true;
    } else {
      this.mp4480 = false;
    }

    if (Object.keys(this.video.quality.mp4["360"]).length > 0) {
      this.mp4360 = true;
      this.hasmp4 = true;
    } else {
      this.mp4360 = false;
    }

    if (Object.keys(this.video.quality.mp4["240"]).length > 0) {
      this.mp4240 = true;
      this.hasmp4 = true;
    } else {
      this.mp4240 = false;
    }

    if (Object.keys(this.video.quality["3gp"]["240"]).length > 0) {
      this.gpp240 = true;
      this.hasgpp = true;
    } else {
      this.gpp240 = false;
    }

    if (Object.keys(this.video.quality["3gp"]["180"]).length > 0) {
      this.gpp180 = true;
      this.hasgpp = true;
    } else {
      this.gpp180 = false;
    }

    if (Object.keys(this.video.quality["3gp"]["144"]).length > 0) {
      this.gpp144 = true;
      this.hasgpp = true;
    } else {
      this.gpp144 = false;
    }

    if (Object.keys(this.video.quality["webm"]["240"]).length > 0) {
      this.webm240 = true;
      this.haswebm = true;
    } else {
      this.webm240 = false;
    }

    if (Object.keys(this.video.quality["webm"]["360"]).length > 0) {
      this.webm360 = true;
      this.haswebm = true;
    } else {
      this.webm360 = false;
    }

    if (Object.keys(this.video.quality["webm"]["480"]).length > 0) {
      this.webm480 = true;
      this.haswebm = true;
    } else {
      this.webm480 = false;
    }

    if (Object.keys(this.video.quality["webm"]["720"]).length > 0) {
      this.webm720 = true;
      this.haswebm = true;
    } else {
      this.webm720 = false;
    }

    if (Object.keys(this.video.quality["webm"]["1080"]).length > 0) {
      this.webm1080 = true;
      this.haswebm = true;
    } else {
      this.webm1080 = false;
    }

    if (Object.keys(this.video.quality["flv"]["240"]).length > 0) {
      this.flv240 = true;
      this.hasflv = true;
    } else {
      this.flv240 = false;
    }

    if (Object.keys(this.video.quality["flv"]["360"]).length > 0) {
      this.flv360 = true;
      this.hasflv = true;
    } else {
      this.flv360 = false;
    }

    if (Object.keys(this.video.quality["flv"]["480"]).length > 0) {
      this.flv480 = true;
      this.hasflv = true;
    } else {
      this.flv480 = false;
    }

    if (Object.keys(this.video.quality["flv"]["720"]).length > 0) {
      this.flv720 = true;
      this.hasflv = true;
    } else {
      this.flv720 = false;
    }

    if (Object.keys(this.video.quality["flv"]["1080"]).length > 0) {
      this.flv1080 = true;
      this.hasflv = true;
    } else {
      this.flv1080 = false;
    }

    if (Object.keys(this.video.noaudio["webm"]["240"]).length > 0) {
      this.noaudiowebm240 = true;
      this.hasnoaudiowebm = true;
    } else {
      this.noaudiowebm240 = false;
    }

    if (Object.keys(this.video.noaudio["webm"]["360"]).length > 0) {
      this.noaudiowebm360 = true;
      this.hasnoaudiowebm = true;
    } else {
      this.noaudiowebm360 = false;
    }

    if (Object.keys(this.video.noaudio["webm"]["480"]).length > 0) {
      this.noaudiowebm480 = true;
      this.hasnoaudiowebm = true;
    } else {
      this.noaudiowebm480 = false;
    }

    if (Object.keys(this.video.noaudio["webm"]["720"]).length > 0) {
      this.noaudiowebm480 = true;
      this.hasnoaudiowebm = true;
    } else {
      this.noaudiowebm480 = false;
    }

    if (Object.keys(this.video.noaudio["webm"]["1080"]).length > 0) {
      this.noaudiowebm1080 = true;
      this.hasnoaudiowebm = true;
    } else {
      this.noaudiowebm1080 = false;
    }

    if (Object.keys(this.video.noaudio["webm"]["3072"]).length > 0) {
      this.noaudiowebm3072 = true;
      this.hasnoaudiowebm = true;
    } else {
      this.noaudiowebm3072 = false;
    }

    if (Object.keys(this.video.noaudio["mp4"]["240"]).length > 0) {
      this.noaudiomp4240 = true;
      this.hasnoaudiomp4 = true;
    } else {
      this.noaudiomp4240 = false;
    }

    if (Object.keys(this.video.noaudio["mp4"]["360"]).length > 0) {
      this.noaudiomp4360 = true;
      this.hasnoaudiomp4 = true;
    } else {
      this.noaudiomp4360 = false;
    }

    if (Object.keys(this.video.noaudio["mp4"]["480"]).length > 0) {
      this.noaudiomp4480 = true;
      this.hasnoaudiomp4 = true;
    } else {
      this.noaudiomp4480 = false;
    }

    if (Object.keys(this.video.noaudio["mp4"]["720"]).length > 0) {
      this.noaudiomp4720 = true;
      this.hasnoaudiomp4 = true;
    } else {
      this.noaudiomp4720 = false;
    }

    if (Object.keys(this.video.noaudio["mp4"]["1080"]).length > 0) {
      this.noaudiomp41080 = true;
      this.hasnoaudiomp4 = true;
    } else {
      this.noaudiomp41080 = false;
    }

    if (Object.keys(this.video.noaudio["mp4"]["1440"]).length > 0) {
      this.noaudiomp41440 = true;
      this.hasnoaudiomp4 = true;
    } else {
      this.noaudiomp41440 = false;
    }

    if (Object.keys(this.video.noaudio["mp4"]["2160"]).length > 0) {
      this.noaudiomp42160 = true;
      this.hasnoaudiomp4 = true;
    } else {
      this.noaudiomp42160 = false;
    }
  }

  convert(id, bitrate, load) {
    let durl = window.location.href + 'api/mp3/' + id + '?bitrate=' + bitrate;
    //console.log( load );
    load.href = durl;
    //console.log(load.href);
    load.click();
  }

}
