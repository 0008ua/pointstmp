import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GamerService } from 'src/app/store/gamer-data.service';
import { environment } from 'src/environments/environment';
import * as fromAuthActions from '../../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  host = environment.host;

  constructor(
    private readonly http: HttpClient,
    private readonly gamerService: GamerService,
    private readonly store: Store,
  ) {}

  unsubscibeFromBot(gamerId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .patch<string>(
        this.host + '/api/tg/unsubscribe/' + gamerId,
        null,
        httpOptions,
      )
      .pipe(
        catchError((error) => {
          this.store.dispatch(
            fromAuthActions.error({ error: error.error.message }),
          );
          return throwError(error);
        }),
        tap(() => this.gamerService.load()),
      );
  }

  sendMessages(messages: { gamerId: string; message: string }[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(
      this.host + '/api/tg/messages',
      messages,
      httpOptions,
    );
    // .pipe(
    //   catchError((error) => {
    //     this.store.dispatch(
    //       fromAuthActions.error({ error: error.error.message }),
    //     );
    //     return throwError(error);
    //   }),
    //   tap(() => this.gamerService.load()),
    // );
  }
}
