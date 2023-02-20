import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  HttpUrlGenerator,
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IGame } from '../interfaces';

@Injectable()
export class GameDataService extends DefaultDataService<IGame> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('game', http, httpUrlGenerator);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GameService extends EntityCollectionServiceBase<IGame> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('game', serviceElementsFactory);
  }

  // add(entity: IGame): Observable<IGame> {
  //   console.log('game data service - add', entity);
  //   return super.add(entity).pipe(tap((_) => console.log('tap - game data service - add', _)));
  // }
}
