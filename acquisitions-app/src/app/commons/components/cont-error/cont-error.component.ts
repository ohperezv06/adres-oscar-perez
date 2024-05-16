import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { VALIDATOR_MESSAGES } from '@commons/constants/error-messages.constant';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cont-error',
  templateUrl: './cont-error.component.html',
  styleUrls: ['./cont-error.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContErrorComponent {
  @Input() errors: any;
  @Input() touched: any;

  constructor() {
  }

  getErrorMessage(errorKey: string, value?: any): string {
    // @ts-ignore
    const errorMessage = VALIDATOR_MESSAGES[errorKey];
    return typeof errorMessage === 'function' ? errorMessage(value) : errorMessage;
  }

  protected readonly Object = Object;
}

