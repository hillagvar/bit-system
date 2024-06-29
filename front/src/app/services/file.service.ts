import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lectureFile } from '../models/lectureFile';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public getFileList(id: number) {
    return this.http.get<lectureFile[]>("http://localhost:2999/lectures/"+id+"/files");
  }

  public addFile(lectureId: number, files: any) {
    const postFiles = new FormData();
    postFiles.append("lectureId", (lectureId).toString());
    for (const file of files)
    postFiles.append("files", file);
    return this.http.post("http://localhost:2999/file/add", postFiles);
  }


  public hideFile(id: number) {
    return this.http.patch("http://localhost:2999/file/"+id, {"hidden": 0} );
   }

  public deleteFile(id: number) {
    return this.http.delete("http://localhost:2999/file/"+id);
   }


}
