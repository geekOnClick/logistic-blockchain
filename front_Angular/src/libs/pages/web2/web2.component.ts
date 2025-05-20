import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
    selector: 'web2',
    templateUrl: './web2.component.html',
    imports: [RouterOutlet, RouterModule],
    standalone: true,
})
export class Web2Component { }