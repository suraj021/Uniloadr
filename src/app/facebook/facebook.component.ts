import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../services/fetcher.service';
import { FacebookVideo, Video } from '../fvideo';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  fvideo: FacebookVideo;
  urlError: boolean;
  loading: boolean;
  ready: boolean;

  constructor(private _fetcher: FetcherService) { }

  ngOnInit() {
  }

  download( input ) {
    if( this.fvideo && this.fvideo.webpage_url=== input.value ){
      return;
    }

    let url = input.value;
    this.loading= true;
    this.urlError= false;
    this.ready= false;

    this._fetcher.get('api/video?url=' + url)
      .subscribe(
        res => {
          if (res.killed === false) {
            //console.log(res);
            this.loading= false;
            this.urlError= true;
            return;
          }

          this.fvideo = new FacebookVideo();
          this.fvideo.id = res.display_id;
          this.fvideo.thumbnail = res.thumbnail;
          this.fvideo.title = res.fulltitle;
          this.fvideo.webpage_url = res.webpage_url;

          for (let format of res.formats) {
            let video = new Video();

            if (format.acodec && format.acodec === 'none') {

              video.ext = format.ext;
              video.height = format.height;
              video.width = format.width;
              video.url = format.url;
              if (format.preference === 0)
                video.quality = 'SD';

              if (format.preference === 5 || format.preference === -5)
                video.quality = 'HD';

              if (!this.fvideo.noaudio.has(video.width + ' x ' + video.height)) {
                this.fvideo.noaudio.set(video.width + ' x ' + video.height, new Array<Video>());
                this.fvideo.noaudio[video.width + ' x ' + video.height] = new Array<Video>();
              }

              this.fvideo.noaudio[video.width + ' x ' + video.height].push(video);

            } else if (format.vcodec && format.vcodec === 'none') {
              video.ext = format.ext;
              video.url = format.url;

              this.fvideo.novideo.push(video);

            } else {

              if (format.height)
                video.height = format.height;
              if (format.width)
                video.width = format.width;

              video.ext = format.ext;
              video.url = format.url;

              //console.log(format);
              

              if (format.preference!= null) {
                if (format.preference === 0) {
                  video.quality = 'SD';
                  //console.log( '0: ', format);
                } else if (format.preference === 5) {
                  video.quality = 'HD';
                  //console.log('HD: ', format);
                } else if (format.preference === -5) {
                  video.quality = 'HD';
                  //console.log('HD: ', format);
                }
              }

              if( !this.fvideo.both.has( video.quality + ' ' + video.ext ) ){
                this.fvideo.both.set( video.quality + ' ' + video.ext, new Array<Video>() );
                this.fvideo.both[video.quality + ' ' + video.ext]= new Array< Video >();
              }

              this.fvideo.both[video.quality + ' ' + video.ext ].push( video );

            }

          }

          console.log(this.fvideo);
          this.ready= true;
        }
      );
  }

  getBothKeys(){
    return Array.from( this.fvideo.both.keys() );
  }

  getNoAudioKeys(){
    return Array.from( this.fvideo.noaudio.keys() );
  }

}
