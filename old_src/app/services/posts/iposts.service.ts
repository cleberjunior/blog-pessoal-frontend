import { Observable } from "rxjs";
import { DetailPostResponse, ListPostResponse, SavePostRequest, SavePostResponse, UpdatePostRequest, UpdatePostResponse } from "./posts.models";

export interface IPostService {

    save(request: SavePostRequest): Observable<SavePostResponse>
    
    update(id:number, request: UpdatePostRequest): Observable<UpdatePostResponse>

    delete(id: number): Observable<void>

    list(): Observable<ListPostResponse[]>

    findById(id: number): Observable<DetailPostResponse>
}