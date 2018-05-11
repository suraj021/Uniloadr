import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../services/fetcher.service';
import { Video } from '../video';
import { Playlist } from '../playlist';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import { AppError } from '../errors/app-error';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlist: Playlist;
  loading: boolean;
  private API_KEY = "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor(private _fetcher: FetcherService) { }

  ngOnInit() {
    this.loading = false;
  }

  download( input ) {
    let id= input.value;
    this.playlist = new Playlist();
    //PLUg5WJL2pGHcM9ZReMONn_XVIpDXZb0vU 5000
    // PLAwxTw4SYaPn_OWPFT9ulXLuQrImzHfOV 53
    this.loading = true;
    let url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id="+ id +"&key=" + this.API_KEY;
    this._fetcher.get(url)
      .subscribe(
        response => {
          if (response.items.length === 0) {
            return;
          }

          response = response.items[0];

          this.playlist.id = response.id;
          this.playlist.title = response.snippet.title;
          this.playlist.thumbnail = response.snippet.thumbnails.medium.url;
          this.playlist.itemCount = response.contentDetails.itemCount;

          this.getPlaylistItems(0, '');
        }
      );
  }

  getPlaylistItems(i: number, pageToken: string) {
    let url;

    if (i === 0)
      url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + this.playlist.id + "&key=" + this.API_KEY;
    else {
      url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=" + pageToken + "&playlistId=" + this.playlist.id + "&key=" + this.API_KEY;
    }

    if (i !== 0 && pageToken === "") {
      //console.log(this.playlist.videos);
      return;
    }

    //console.log(this.url);

    this._fetcher.get(url)
      .subscribe(
        response => {
          //console.log(response.items);

          if (response.nextPageToken != null) {
            pageToken = response.nextPageToken;
          } else {
            pageToken = "";
          }

          //console.log("NextPage " + pageToken);
          //console.log(i);

          response = response.items;

          for (let n = 0; n < response.length; ++n) {

            let video = new Video();
            video.id = response[n].snippet.resourceId.videoId;
            video.title = response[n].snippet.title;

            if (video.title === 'Deleted video' || video.title === 'Private video')
              continue;

            video.thumbnail = response[n].snippet.thumbnails.default.url;
            this.playlist.videos.push(video);

            if (pageToken === '' && n === response.length - 1) {
              this.loading = false;
            }

            this._fetcher.get('api/video?id=' + video.id)
              .subscribe(
                res => {
                  video.bestext = res.ext.toUpperCase();
                  video.besturl = res.url + '&title=' + video.title;
                  video.bestheight = res.height + ' P';
                  video.on = true;
                }
              );

          }

          //console.log(this.playlist.videos.values);

          this.getPlaylistItems(i + 1, pageToken);

        }
      );

  }

  handleError(err) {
    return Observable.throw(new AppError(err));
  }

}

/*
this._fetcher.get('http://localhost:8080/api/video?id=' + video.id)
              .subscribe(
                res => {
                  video.bestext = res.ext;
                  video.besturl = res.url + '&title=' + video.title;
                  video.bestheight = res.height;
                  

                  if (pageToken === '' && n === response.length - 1) {
                    this.loading = false;
                  }
                }
              );
*/
