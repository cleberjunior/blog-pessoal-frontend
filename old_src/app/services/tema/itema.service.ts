import { Observable } from "rxjs";
import { DetailTemaResponse, ListTemaResponse, SaveTemaRequest, SaveTemaResponse, UpdateTemaRequest, UpdateTemaResponse } from "./tema.models";

export interface ITemaService {

    save(request: SaveTemaRequest): Observable<SaveTemaResponse>
    
    update(id:number, request: UpdateTemaRequest): Observable<UpdateTemaResponse>

    delete(id: number): Observable<void>

    list(): Observable<ListTemaResponse[]>

    findById(id: number): Observable<DetailTemaResponse>
}