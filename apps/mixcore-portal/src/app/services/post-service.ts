import { Injectable } from '@angular/core';
import { MixRestService, getDefaultAxiosConfiguration } from '@mix-lib';
import { MixModelType } from '../enums/model-type.enums';
import { MixPostMvc } from '../models/mix-posts/mix-post-mvc';
[Injectable];
export class PostService extends MixRestService<MixPostMvc> {
  constructor() {
    let appUrl = 'https://store.mixcore.org/api/v1/rest/';
    let viewName = 'mvc';
    let specificulture = 'en-us';
    var conf = getDefaultAxiosConfiguration();
    conf.withCredentials = false;
    super(appUrl, MixModelType.Post, viewName, specificulture, conf);
  }
  public getSingleModel(id: any){
    let queries = {
      kw: 'test'
    };
    return super.getSingleModel(id, queries);
  }
}
