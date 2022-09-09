import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

import { HttpClient, HttpParams } from "@angular/common/http";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

export interface Origin {
  [key: string]: any;
}

export interface Location {
  [key: string]: any;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: any[];
  url: string;
  created: Date;
}

export interface HttpRequest {
  info?: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results?: Character[];
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  characters$: Observable<any>;
  characterDataSource: MatTableDataSource<Character[]>;
  characterDatabase = new HttpDatabase(this.httpClient);
  searchTerm$ = new BehaviorSubject<string>("");
  resultsEmpty$ = new BehaviorSubject<boolean>(false);
  status$ = new BehaviorSubject<string>("");
  resultsLength = 0;

  filterFormGroup: FormGroup;
  searchField = new FormControl("");

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.characterDatabase
        .getCharacters(
          this.searchTerm$.getValue(),
          this.status$.getValue(),
          this.paginator.pageIndex
        )
        .subscribe((response: HttpRequest) => {
          this.characterDataSource = new MatTableDataSource(
            response.results as any[]
          );
          this.resultsLength = response.info?.count;
          // this.characterDataSource.paginator = this.paginator;
          this.characters$ = this.characterDataSource.connect();
        });
    });
  }

  ngOnInit() {
    this.filterFormGroup = this.fb.group({});
    this.loadData();
  }

  ngOnDestroy() {
    if (this.characterDataSource) {
      this.characterDataSource.disconnect();
    }
  }

  loadData() {
    this.characterDatabase
      .search(this.searchTerm$, this.status$)
      .subscribe((response: HttpRequest) => {
        if (!response.info || !response.results) {
          this.resultsEmpty$.next(true);
          return;
        }
        this.resultsEmpty$.next(false);
        this.resultsLength = response.info?.count;
        this.characterDataSource = new MatTableDataSource(
          response.results as any[]
        );
        this.characters$ = this.characterDataSource.connect();
      });

    this.status$.subscribe((data) => {
      this.characterDatabase
        .getCharacters(this.searchTerm$.getValue(), data)
        .subscribe((response: HttpRequest) => {
          if (!response.info || !response.results) {
            this.resultsEmpty$.next(true);
            return;
          }
          this.resultsEmpty$.next(false);
          this.resultsLength = response.info?.count;
          this.characterDataSource = new MatTableDataSource(
            response.results as any[]
          );
          this.characterDataSource.paginator = this.paginator;
          this.characters$ = this.characterDataSource.connect();
        });
    });
  }

  setStatusColor(status: string) {
    if (status === "Alive") {
      return "green";
    }
    if (status === "Dead") {
      return "red";
    }
  }
}

export class HttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  search(terms: Observable<string>, status: BehaviorSubject<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term) =>
        this.getCharacters(term, status.getValue()).pipe(
          catchError(() => {
            return of({ info: null, results: null });
          })
        )
      )
    );
  }

  getCharacters(
    name: string = "",
    status: string = "",
    page: number = 0
  ): Observable<HttpRequest> {
    const apiUrl = "https://rickandmortyapi.com/api/character";
    return this._httpClient.get<HttpRequest>(apiUrl, {
      params: new HttpParams()
        .set("name", name)
        .set("status", status)
        .set("page", (page + 1).toString()),
    });
  }
}
