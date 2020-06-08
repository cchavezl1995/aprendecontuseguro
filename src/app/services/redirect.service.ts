import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class RedirectService {
  constructor(private http: HttpClient) { }

  getRedirect()
  {
    return this.http.get("https://dev-vqdsauwl.auth0.com/login?state=g6Fo2SBUOHNnTHhKZzRZbkd5RFZISEN4eG5xZVdpanhUOFFEV6N0aWTZIG42cWZLYV9wcHcwNThEMEt0TU5hOE5DTWl3NmhzNE95o2NpZNkgUU5ENzU1bFUwbWxpd2tvNDJzZ1lIcmUzOFdzT0lNTFc&client=QND755lU0mliwko42sgYHre38WsOIMLW&protocol=oauth2&prompt=login&response_type=code&connection=CourseraDB&scope=openid%20profile&redirect_uri=https%3A%2F%2Fmanage.auth0.com%2Ftester%2Fcallback%3Fconnection%3DCourseraDB&user=hola@hola.cl&pass=12345");
  }


}
