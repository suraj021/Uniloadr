import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../services/fetcher.service';
import { Vimeo, Video } from '../vimeo-video';

@Component({
  selector: 'app-vimeo',
  templateUrl: './vimeo.component.html',
  styleUrls: ['./vimeo.component.scss']
})
export class VimeoComponent implements OnInit {

  ready: boolean;
  vimeo: Vimeo;
  urlError: boolean;
  loading: boolean;
  url: string;

  constructor(private _fetcher: FetcherService) { }

  ngOnInit() {
  }

  download( input ) {
    
    if( this.url && this.url=== input.value )
      return;

    this.vimeo= null;
    this.url= input.value;
    this.ready = false;
    this.urlError= false;
    let base = 'api/video?url=';
    this.loading= true;
    this._fetcher.get(base + this.url )
      .subscribe(
        res => {

          if( res.killed=== false ){
            this.urlError= true;
            this.loading= false;
            return;
          }

          this.vimeo = new Vimeo();
          this.vimeo.id = res.display_id;
          this.vimeo.title = res.title;
          this.vimeo.thumbnail= res.thumbnail;
          this.vimeo.webpage_url= res.webpage_url;
          this.vimeo.duration= res._duration_hms;

          for (let format of res.formats) {
            // both audio and video
            let video = new Video();

            //format.url.replace( 'mp4.m3u8', 'mp4' );

            if (format.preference === -50 || format.preference === -40) {
              continue;
            }

            if (!format.url.includes('05-lvl3-pdl') && !format.url.includes('gcs-vimeo')) {
              continue;
            }

            if (format.url.includes('/../') || format.url.includes('.m3u8'))
              continue;

            video.ext = format.ext;
            video.height = format.height;
            video.width = format.width;
            video.url = format.url;
            if (format.preference) {
              video.preference = format.preference;
            }
            if (format.acodec) {
              video.acodec = format.acodec;
            }
            if (format.vcodec) {
              video.vcodec = format.vcodec;
            }

            if (!this.vimeo.both.has(video.height)) {
              //console.log( "both: " , video.height );
              this.vimeo.both.set(video.height, new Array<Video>());
              this.vimeo.both[video.height] = new Array<Video>();
            }

            this.vimeo.both[video.height].push(video);

          }

          this.ready = true;
          this.loading= false;
          //console.log(this.vimeo);

        });
  }

  getBothKeys() {
    return Array.from( this.vimeo.both.keys() );
  }

}
