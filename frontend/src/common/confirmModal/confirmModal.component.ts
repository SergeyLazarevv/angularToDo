import { Input, Component} from '@angular/core';
import { ConfirmModalService } from './confirmModal.service'
import { modalData } from './confirmModal.interface'
     
@Component({
    selector: 'confirm_modal',
    templateUrl: './confirmModal.component.html',
    styleUrls: ['./confirmModal.component.scss'],
    providers: []
})

export class ConfirmModalUiComponent { 

    subscription
    data: modalData = {
        text: null,
        yesFunction: null,
        noFunction: null
    }

    constructor(private confirmModalService: ConfirmModalService){}

    ngOnInit() {
        this.subscription = this.confirmModalService.getdata().subscribe((data: modalData) => {
            this.data = data;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}