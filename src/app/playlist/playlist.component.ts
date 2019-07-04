import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../services/fetcher.service';
import { Video } from '../video';
import { Playlist } from '../playlist';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppError } from '../errors/app-error';
import { Title } from '@angular/platform-browser';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  id: string;
  urlError: boolean;
  playlist: Playlist;
  loading: boolean;
  links: string;
  progress: number;
  count: number;

  private API_KEY = "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor(private _fetcher: FetcherService, private validator: ValidatorService) { }

  ngOnInit() {
    this.progress = this.count = 0;
    this.loading = false;
  }

  download(input) {
    this.urlError = false;
    let playlistUrl = input.value;
    let match = this.validator.validatePlaylistUrl(playlistUrl);

    if (this.playlist != null && this.id === match && this.id === this.playlist.id)
      return;

    this.links = '';
    this.count = 0;
    this.progress = 0;

    if (match) {
      this.id = match;
      this.urlError = false;
    } else {
      this.id = '';
      this.urlError = true;
      this.playlist = null;
      this.links = '';
      return;
    }

    this.playlist = new Playlist();
    this.loading = true;
    //this.links = 'Links will be available after some moments...';
    //PLUg5WJL2pGHcM9ZReMONn_XVIpDXZb0vU 5000
    // PLAwxTw4SYaPn_OWPFT9ulXLuQrImzHfOV 53
    this.loading = true;
    let url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=" + this.id + "&key=" + this.API_KEY;
    this._fetcher.get(url)
      .subscribe(
        response => {
          if (response.items.length === 0 || response.pageInfo.totalResults === 0) {
            this.urlError = true;
            this.id = '';
            this.playlist = null;
            this.links = '';
            return;
          }

          response = response.items[0];

          this.playlist.id = response.id;
          this.playlist.title = response.snippet.title;
          this.playlist.thumbnail = response.snippet.thumbnails.default.url;
          this.getPlaylistItems(0, '');
        },
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

    //console.log(url);

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
          this.playlist.itemCount = response.pageInfo.totalResults;

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

            this._fetcher.get('api/video?url=https://www.youtube.com/watch?v=' + video.id)
              .subscribe(
                res => {
                  video.bestext = res.ext.toUpperCase();
                  video.besturl = res.url + '&title=' + video.title;
                  video.bestheight = res.height + ' P';
                  video.on = true;
                  if (!this.urlError) {
                    this.links += video.besturl;
                  }

                  this.count++;

                  if (this.playlist == null)
                    return;

                  this.progress = Math.ceil((this.count / this.playlist.itemCount) * 100);

                  if (!this.urlError && pageToken === '' && n === response.length - 1) {
                    /*
                    this.links = '';
                    for (let item of this.playlist.videos) {
                      this.links += item.besturl + '\n';
                    }*/
                  }
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
