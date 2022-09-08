import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Character } from "../app.component";
import { DialogComponent } from "../dialog/dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-character-info",
  templateUrl: "./character-info.component.html",
  styleUrls: ["./character-info.component.css"],
})
export class CharacterInfoComponent implements OnInit {
  @Input() characters$: Character[];
  dialogRef: MatDialogRef<DialogComponent>;
  searchField = new FormControl("");
  searchTerm$ = new BehaviorSubject<string>("");
  @Output() searchFieldEvent = new EventEmitter<FormControl>();
  @Output() searchTermEvent = new EventEmitter<BehaviorSubject<string>>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  setStatusColor(status: string) {
    if (status === "Alive") {
      return "green";
    }
    if (status === "Dead") {
      return "red";
    }
  }

  openDialog(char) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        c: char,
      },
    });

    this.dialogRef.afterClosed().subscribe((res: string) => {
      if (!res) {
        return;
      }
      this.searchField.patchValue(res);
      this.searchTerm$.next(res);
      this.searchFieldEvent.emit(this.searchField);
      this.searchTermEvent.emit(this.searchTerm$);
    });
  }
}
