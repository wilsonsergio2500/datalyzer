import { Component, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { IFormlyTypeGroup } from '../../core/IFormlyTypeGroup';

/*
usage:
  <formly-form-flex-json [formlyGroup]="formlyGroup"
                           [show-revert]="true"
                           btn-ready="Create"
                           btn-busy="Creating..."
                           [read-only]="false"
                           [is-busy]="isPosting$ | async"
                           (onFormSubmit)="formSubmit($event)">
      </formly-form-flex-json>
*/

@Component({
  selector: 'formly-form-flex-json',
  templateUrl: 'formly-form-flex-json.component.html',
  styleUrls: ['formly-form-flex-json.component.scss']
})
export class FormlyFormFlexJsonComponent<T> {

  private _showRevertbtn: boolean = false;

  @Input() formlyGroup: IFormlyTypeGroup<T>;
  @Input('btn-ready') btnReady: string;
  @Input('btn-busy') btnBusy: string;
  @Input('is-busy') btnIsBusy: boolean = false;
  @Input('read-only') readOnly: boolean = false;

  disableOnInvalid: boolean = false;
  @Input('btn-disable-on-invalid')
  set disableSubmitBtnOnInvalid(value: boolean) {
    this.disableOnInvalid = coerceBooleanProperty(value);
  }

  @Input('show-revert')
  set showRevertBtn(value: boolean) {
    this._showRevertbtn = coerceBooleanProperty(value);
  }
  @Output() onFormSubmit: EventEmitter<T> = new EventEmitter<T>();
  get showRevertBtn() {
    return this._showRevertbtn;
  }

  get isSubmitDisabled() {
    return (this.disableOnInvalid) ? this.formlyGroup.form.invalid : false;
  }

  submit($event : Event) {
    if (this.readOnly === false && this.formlyGroup.form.valid) {
      this.onFormSubmit.emit(this.formlyGroup.model);
    }
  }

}
