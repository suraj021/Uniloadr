import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../services/fetcher.service';
import { Channel } from '../channel';
import { Video } from '../video';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  channel: Channel;
  urlError: boolean;
  links: string;
  loading: boolean;
  progress: number;
  count: number;
  errMessage: string;
  private API_KEY = 'AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA';

  constructor(private _fetcher: FetcherService, private _validator: ValidatorService) { }

  ngOnInit() {
    this.progress = 0;
    this.count = 0;
  }

  download(input) {
    //let id = 'UCuB4FSBjofpagXnBlHQUocA';
    this.urlError = false;
    let curl = input.value;
    let match = this._validator.validateChannelUrl(curl);

    if (match) {
      if (match[4] === 'channel/') {
        if (this.channel != null && this.channel.id === match[5]) {
          return;
        }
        this.loading = true;
        this.links = '';
        this.count = 0;
        this.progress = 0;
        this.channel = new Channel();
        this.channel.id = match[5];
        let url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=' + this.channel.id + '&key=' + this.API_KEY;

        this.getChannelInfo(url);
      } else {
        if (this.channel != null && this.channel.name === match[5]) {
          return;
        }
        this.loading = true;
        this.links = '';
        this.count = 0;
        this.progress = 0;
        this.channel = new Channel();
        this.channel.name = match[5];

        let durl = 'https://www.googleapis.com/youtube/v3/channels?key=' + this.API_KEY + '&forUsername=' + this.channel.name + '&part=id';

        this._fetcher.get(durl)
          .subscribe(
            res => {
              if (res.items.length === 0) {
                this.urlError = true;
                this.count = 0;
                this.links = '';
                this.progress = 0;
                this.channel = null;

              } else {
                this.channel.id = res.items[0].id;
                let url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=' + this.channel.id + '&key=' + this.API_KEY;

                this.getChannelInfo(url);
              }
            }
          );
      }

    } else {
      this.urlError = true;
      this.count = 0;
      this.links = '';
      this.progress = 0;
      this.channel = null;
      return;
    }

  }

  getChannelInfo(url) {
    this._fetcher.get(url)
      .subscribe(res => {
        res = res.items;

        if (res.length === 0) {
          this.urlError = true;
          this.links = '';
          this.progress = 0;
          this.count = 0;
          this.channel = null;
          //console.log("here");
          return;
        }

        res = res[0];

        this.channel.title = res.snippet.title;
        this.channel.description = res.snippet.description;
        this.channel.thumbnail = res.snippet.thumbnails.default.url;
        //this.channel.thumbnail= ( res.snippet.thumbnails.medium != null )?res.snippet.thumbnails.medium.url:res.snippet.thumbnails.default.url;
        this.channel.uploadsId = res.contentDetails.relatedPlaylists.uploads;
        this.get(0, '');
      });

  }

  get(i, pageToken) {
    let url;

    if (i === 0)
      url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + this.channel.uploadsId + '&maxResults=50&key=' + this.API_KEY;
    else {
      url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + this.channel.uploadsId + '&pageToken=' + pageToken + '&maxResults=50&key=' + this.API_KEY;
    }

    if (i !== 0 && pageToken === "") {
      //console.log(this.channel.uploads);
      this.loading = false;
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
          this.channel.uploadCount = response.pageInfo.totalResults;

          response = response.items;

          for (let j = 0; j < response.length; ++j) {

            let video = new Video();
            video.id = response[j].snippet.resourceId.videoId;
            video.title = response[j].snippet.title;

            if (video.title === 'Deleted video' || video.title === 'Private video')
              continue;

            video.thumbnail = response[j].snippet.thumbnails.default.url;
            this.channel.uploads.push(video);

            this._fetcher.get(`/api/video?url=https://www.youtube.com/watch?v=${video.id}`)
              .subscribe(
                res => {
                  video.bestext = res.ext.toUpperCase();
                  video.besturl = res.url + '&title=' + video.title;
                  video.bestheight = res.height + ' P';
                  video.on = true;

                  this.count++;

                  this.progress = Math.ceil((this.count / this.channel.uploadCount) * 100);

                  if (this.urlError) {
                    //this.links += video.besturl;
                    return;
                  } else {
                    this.links += video.besturl;
                  }
                  /*
                  if ( pageToken=== '' && j=== response.length-1 ) {
                    this.links= '';
                    for (let item of this.channel.uploads) {
                      this.links += item.besturl + '\n';
                    }
                  }*/

                }
              );

          }

          //console.log(this.playlist.videos.values);

          this.get(i + 1, pageToken);

        }
      );

  }

}
