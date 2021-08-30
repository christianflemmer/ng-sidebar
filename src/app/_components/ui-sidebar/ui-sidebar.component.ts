import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { ISideBarEntry, ISideBarMenu } from './ui-sidebar.model';
import { faAngleRight, faEllipsisH, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RandomUserService } from 'src/app/_services/random-user.service';
import { IRandomUser } from 'src/app/_interfaces/random-user.interfaces';

@Component({
	selector: 'ui-sidebar',
	templateUrl: './ui-sidebar.component.html',
	styleUrls: ['./ui-sidebar.component.scss'],
})
export class UiSideBarComponent implements OnChanges, OnDestroy {

	@Input()
	public entries: ISideBarEntry[];

	@Output()
	public urlClicked: EventEmitter<void> = new EventEmitter<void>();

	public readonly CURRENT_YEAR: number = new Date().getFullYear();
	public readonly faAngleRight: IconDefinition = faAngleRight;
	public readonly faEllipsisV: IconDefinition = faEllipsisH;

	public __expandedMenuTitle: string = null;
	public __randomUser: IRandomUser;

	private currentUrl: string = null;
	private readonly destroy$: Subject<void> = new Subject<void>();

	constructor (
		private readonly _router: Router,
		private readonly _randomUserService: RandomUserService,
	) {
		this._randomUserService
			.getRandomUser$()
			.subscribe((randomUser: IRandomUser): IRandomUser => this.__randomUser = randomUser);
	}

	public ngOnChanges(

	): void {
		// Always close expanded menus on changes
		this.__expandedMenuTitle = null;

		// Kill previous observable
		this.destroy$.next();

		// Start (re)-listening for router events
		this._router.events
			.pipe(
				// Start with current URL
				startWith(new NavigationStart(null, this._router.url)),

				// Only consider `NavigationStart` events
				filter((event: Event): boolean => event instanceof NavigationStart),

				// Map to URL
				map((event: NavigationStart): string => event.url),

				// Destroy along with component
				takeUntil(this.destroy$),
			)
			.subscribe((currentUrl: string): void => {
				// Set current url
				this.currentUrl = currentUrl;

				// Start iterating through entries to style breadcrumbs accordingly
				this.iterator(this.entries);
			});
	}

	public ngOnDestroy(

	): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	/**
	 * Recursive iterator function for styling the side bar tree.
	 * 
	 * @param { ISideBarMenu[] } entries
	 *
	 * @returns { boolean }
	 */
	private iterator(
		entries: ISideBarMenu[] = [],
	): boolean {
		if (entries.length > 0) {
			entries.forEach((e: ISideBarMenu): void => {
				e.__isActive = (('url' in e) && (e.url === this.currentUrl));
				e.__hasActiveSubmenu = (e.__isActive || this.iterator(e.submenus));
			});

			return entries.some((e: ISideBarMenu): boolean => e.__hasActiveSubmenu || e.__isActive);
		}

		return false;
	}

}