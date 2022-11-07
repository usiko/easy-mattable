import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ITableFilterValue } from "src/app/components/service/table.model";


@Injectable()
export abstract class FilterDialog<T extends ITableFilterValue> implements OnInit, OnDestroy {
  protected debouncer$ = new Subject<void>();
  protected subscription = new Subscription();

  public data!: { change$: Subject<T>, value: T; };




  /**
   * view init
   */
  ngOnInit(): void {
    if (this.data.change$) {
      this.subscription.add(this.debouncer$.pipe(debounceTime(350)).subscribe(() => {
        this.data.change$.next(this.data.value);
      }));
    }

  }

  /**
   * event emit when value changed
   */
  onChange() {
    this.debouncer$.next();
  }

  /**
   * view destroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * function of clear input
   */
  abstract clear(event: PointerEvent, param?: string): any;
}
