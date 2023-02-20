import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameType, IGamer } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getRating(gameType: GameType): Observable<IGamer[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line  @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      }),
      // params: {
      //   query,
      // },
    };
    return this.http.get<IGamer[]>(
      environment.host + 'api/analytics/get-rating/' + gameType,
      httpOptions,
    );
    // .pipe(catchError((err) => throwError(err)));
  }

  getRatingByWins(gameType: GameType): Observable<IGamer[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line  @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      }),
      // params: {
      //   gameType,
      // },
    };
    return this.http.get<IGamer[]>(
      environment.host + 'api/analytics/get-wins/' + gameType,
      httpOptions,
    );
    // .pipe(catchError((err) => throwError(err)));
  }

  getRatingByWinsToGames(gameType: GameType): Observable<IGamer[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line  @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      }),
      // params: {
      //   gameType,
      // },
    };
    return this.http.get<IGamer[]>(
      environment.host + 'api/analytics/get-wins-to-games/' + gameType,
      httpOptions,
    );
    // .pipe(catchError((err) => throwError(err)));
  }
}
