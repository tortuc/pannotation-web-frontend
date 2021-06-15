import { Component, Input, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-active-subscription',
  templateUrl: './active-subscription.component.html',
  styleUrls: ['./active-subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveSubscriptionComponent implements OnInit {
  @Input() dateFrom: string;
  @Input() dateTo: string;

  readonly startDate = new BehaviorSubject<string>('');
  readonly endDate = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit(): void {
    if (this.dateFrom) {
      this.startDate.next(this.dateFrom);
    }

    if (this.dateTo) {
      this.endDate.next(this.dateTo);
    }
  }
}
