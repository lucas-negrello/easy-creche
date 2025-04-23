import {inject, Injectable} from '@angular/core';
import Echo, {Broadcaster} from 'laravel-echo';
import Pusher from 'pusher-js';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EchoService {

  public echo!: Echo<keyof Broadcaster>;
  private readonly _http: HttpClient = inject(HttpClient);

  public initService(_route: string) {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'pxepdd6abfwiws7ikrze',
      wsHost: 'localhost',
      wsPort: 8084,
      wssPort: 8084,
      forceTLS: false,
      encrypted: false,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      authorizer: (channel: any, options: any) => {
        return {
          authorize: (socketId: string, callback: any) => {
            this._http.post(`http://localhost:8000/broadcasting/${_route}`, {
              socket_id: socketId,
              channel_name: channel.name,
            }).subscribe({
              next: (response) => callback(null, response),
              error: (error) => callback(error, null),
            });
          },
        };
      },
    });
  }
}
