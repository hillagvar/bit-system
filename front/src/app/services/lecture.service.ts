import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lecture } from '../models/lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) {}

  public getLecturesByGroup(groupId: number) {
    return this.http.get<Lecture[]>("http://localhost:2999/groups/"+groupId+"/lectures");
  }
}
