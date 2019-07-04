import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

  constructor() { }

  validateUrl( url: string ){
    let re= /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let match= url.match( re );

    if( match && match[1].length=== 11 )
      return match[1];
    else
      return false;
  }

  validatePlaylistUrl( url ){
    //let re= /^http:\/\/(?:www\.)?youtube\.com\/watch\?(?:&.*)*((?:v=([a-zA-Z0-9_\-]{11})(?:&.*)*&list=([a-zA-Z0-9_\-]{18}))|(?:list=([a-zA-Z0-9_\-]{18})(?:&.*)*&v=([a-zA-Z0-9_\-]{11})))(?:&.*)*(?:\#.*)*$/;
    //let re= /^http:\/\/(?:www\.)?youtube\.com\/watch\?(?:&.*)*((?:v=([a-zA-Z0-9_\-]{11})(?:&.*)*&list=([a-zA-Z0-9_\-]{18}))|(?:list=([a-zA-Z0-9_\-]{18})(?:&.*)*&v=([a-zA-Z0-9_\-]{11})))(?:&.*)*(?:\#.*)*$/;    
    //let re= /^http:\/\/(?:www\.)?youtube\.com\/watch\?((v=.*&list=.*)|(list=.*&v=.*))(&.*)*$/;
    let re=  /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
    let match= url.match( re );

    if( match && match[2] )
      return match[2];
    else
      return false;
   
  }

  validateChannelUrl( url ){
    //let re= /((http|https):\/\/|)(www\.|)youtube\.com\/(channel\/|user\/)[a-zA-Z0-9\-]{1,}/;
    let re= /((http|https):\/\/)?(www\.|)youtube\.com\/(channel\/|user\/)([a-zA-Z0-9_\-]{1,})/;
    let match= url.match( re );

    return match;
  }

}
