import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { ChannelComponent } from './channel/channel.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SingleComponent } from './single/single.component';
import { Routes, RouterModule } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { FetcherService } from './services/fetcher.service';
import { LoadingComponent } from './loading/loading.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { Loading2Component } from './loading2/loading2.component';
import { ValidatorService } from './services/validator.service';
import { SupportedSitesComponent } from './supported-sites/supported-sites.component';
import { FacebookComponent } from './facebook/facebook.component';
import { VimeoComponent } from './vimeo/vimeo.component';
import { DailyMotionComponent } from './daily-motion/daily-motion.component';
import { InstagramComponent } from './instagram/instagram.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';

const routes: Routes= [
  { path: "", component: SingleComponent },
  { path: "home", component: SingleComponent },
  { path: "playlist", component: PlaylistComponent },
  { path: "channel", component: ChannelComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "tutorial", component: TutorialComponent },
  { path: "terms-of-use", component: TermsOfUseComponent },
  { path: "facebook", component: FacebookComponent },
  { path: "vimeo", component: VimeoComponent },
  { path: "daily-motion", component: DailyMotionComponent },
  { path: "instagram", component: InstagramComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChannelComponent,
    ContactUsComponent,
    NavbarComponent,
    PlaylistComponent,
    SingleComponent,
    MainBodyComponent,
    LoadingComponent,
    TutorialComponent,
    TermsOfUseComponent,
    Loading2Component,
    SupportedSitesComponent,
    FacebookComponent,
    VimeoComponent,
    DailyMotionComponent,
    InstagramComponent,
    SoundcloudComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot( routes ),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    FetcherService,
    ValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
