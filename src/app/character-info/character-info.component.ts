import { Component, OnInit, Input } from "@angular/core";
import { Character } from "../app.component";

@Component({
  selector: "app-character-info",
  templateUrl: "./character-info.component.html",
  styleUrls: ["./character-info.component.css"],
})
export class CharacterInfoComponent implements OnInit {
  @Input() characters$: Character[];
  constructor() {}

  ngOnInit(): void {}

  setStatusColor(status: string) {
    if (status === "Alive") {
      return "green";
    }
    if (status === "Dead") {
      return "red";
    }
  }
}
