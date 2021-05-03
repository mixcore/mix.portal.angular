import { Injectable } from '@angular/core';
import { MixRestService, getDefaultAxiosConfiguration } from '@mix-lib';
[Injectable];
export class PostService extends MixRestService {
  constructor() {
    var conf = getDefaultAxiosConfiguration();
    conf.withCredentials = false;
    conf.baseURL = 'https://localhost:5001/api/v1/rest/en-us';
    super('post', 'mvc', null, conf);
  }
}
