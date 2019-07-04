import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../services/fetcher.service';
import { MotionVideo, Video } from '../dmotion';

@Component({
  selector: 'app-daily-motion',
  templateUrl: './daily-motion.component.html',
  styleUrls: ['./daily-motion.component.scss']
})
export class DailyMotionComponent implements OnInit {

  dmotion: MotionVideo;
  loading: boolean;
  urlError: boolean;
  ready: boolean;

  constructor(private _fetcher: FetcherService) { }

  ngOnInit() {
  }

  download( input ) {

    if( this.dmotion && this.dmotion.webpage_url=== input.value ){
      return;
    }

    let url= input.value;
    this.loading= true;
    this.urlError= false;
    this.ready= false;
    this.get( 0, url );
  }

  get(i, url ) {

    if( i=== 2 ){
      this.loading= false;
      this.urlError= true;
      this.dmotion= null;
      return;
    }

    this._fetcher.get('api/video?url=' + url)
      .subscribe(res => {

        if( res.killed=== false ){
          this.get( i+1, url );
          return;
        }

        this.dmotion = new MotionVideo();
        this.dmotion.id = res.display_id;
        this.dmotion.title= res.fulltitle;
        this.dmotion.duration = res._duration_hms;
        this.dmotion.thumbnail = res.thumbnail;
        this.dmotion.webpage_url = res.webpage_url;

        for (let format of res.formats) {
          if (format.protocol === 'm3u8') {
            continue;
          }

          let video = new Video();

          video.ext = format.ext;
          video.height = format.height;
          video.width = format.width;
          video.url = format.url;

          //console.log(video.height, ' ', this.dmotion.quality.has(video.height));

          if (!this.dmotion.quality.has(video.height)) {
            this.dmotion.quality.set(video.height, new Array<Video>());
            this.dmotion.quality[video.height] = new Array<Video>();
          }

          this.dmotion.quality[video.height].push(video);

          if (format.protocol !== 'https') {
            console.log(format);
          }

        }

        this.loading= false;
        this.ready= true;
        //console.log(this.dmotion);

      });
  }

  getKeys(){
    return Array.from( this.dmotion.quality.keys() );
  }

}
