import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  DefaultDataService,
  HttpUrlGenerator,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IGamer, IUser } from '../interfaces';

@Injectable()
export class GamerDataService extends DefaultDataService<IGamer> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('gamer', http, httpUrlGenerator);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GamerService extends EntityCollectionServiceBase<IGamer> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('gamer', serviceElementsFactory);
  }
}
