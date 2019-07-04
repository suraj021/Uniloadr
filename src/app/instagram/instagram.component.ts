import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../services/fetcher.service';
import { Video, InstaVideo } from '../insta';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {

  insta: InstaVideo;
  loading: boolean;
  urlError: boolean;
  ready: boolean;
  constructor(private fetcher: FetcherService) { }

  ngOnInit() {
  }

  download( input ) {
    let url = input.value;
    this.loading= true;
    this.urlError= false;
    this.ready= false;
    this.fetcher.get( 'api/video?url=' + url )
      .subscribe(
        res=> {
          if( res.killed=== false ){
            this.urlError= true;
            this.loading= false;
            return;
          }

          this.insta= new InstaVideo();

          for( let format of res ){
            if( format.protocol=== 'https' || format.protocol=== 'http' ){
              let video= new Video();
              video.height= format.height;
              video.width= format.width;
              video.ext= format.ext;
              video.url= format.url;

              if( !this.insta.quality.has( video.width + ' x ' + video.height ) ){
                this.insta.quality.set( video.width + ' x ' + video.height, new Array<Video>() );
                this.insta.quality[video.width + ' x ' + video.height]= new Array<Video>();
              }

              this.insta.quality[video.width + ' x ' + video.height].push( video );

            }
          }
          this.loading= false;
          this.ready= true;
          console.log( this.insta );

        }
      );

  }

  getAllKeys(){
    return Array.from( this.insta.quality.keys() );
  }

}
