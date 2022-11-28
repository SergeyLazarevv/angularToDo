import { Input, Component} from '@angular/core';
     
@Component({
    selector: 'button_ui',
    templateUrl: './buttonUi.component.html',
    styleUrls: ['./buttonUi.component.css'],
    providers: []
})

export class ButtonUiComponent { 

    @Input() text: string = "";
    @Input() icon: string = "";
    @Input() disabled: boolean = false

    constructor(){}
}