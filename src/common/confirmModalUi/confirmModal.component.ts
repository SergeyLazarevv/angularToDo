import { Input, Component} from '@angular/core';
     
@Component({
    selector: 'confirm_modal',
    templateUrl: './confirmModal.component.html',
    styleUrls: ['./confirmModal.component.css'],
    providers: []
})

export class ConfirmModalUiComponent { 

    @Input() show: boolean = false
    @Input() text: string = "Вопрос";
    @Input() successFunc = () => null

    constructor(){}
}