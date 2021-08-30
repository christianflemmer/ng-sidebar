import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { faBook, faHeart, faPaintBrush, faQuestionCircle, faShoppingCart, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ISideBarEntry } from './_components/ui-sidebar/ui-sidebar.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {

	public readonly sidebarEntries: ISideBarEntry[] = [
		{
			title: 'Overview',
			submenus: [
				{
					title: 'Dashboard',
					iconDefinition: faTachometerAlt,
					url: '/',
				},
				{
					title: 'E-commerce',
					iconDefinition: faShoppingCart,
					submenus: [
						{
							title: 'Products',
							submenus: [
								{
									title: 'Hardware',
									url: '/e-commerce/products/hardware',
								},
								{
									title: 'PC & tablets',
									url: '/e-commerce/products/pc-tablets',
								},
								{
									title: 'TV & hifi',
									url: '/e-commerce/products/tv-hifi',
								},
								{
									title: 'Photo & video',
									url: '/e-commerce/products/photo-video',
								},
							],
						},
						{
							title: 'Orders',
							url: '/e-commerce/orders',
						},
					],
				},
				{
					title: 'Appearance',
					iconDefinition: faPaintBrush,
					submenus: [
						{
							title: 'Themes',
							url: '/appearance/themes',
						},
						{
							title: 'Plugins',
							url: '/appearance/plugins',
						},
						{
							title: 'Widgets',
							url: '/appearance/widgets',
						},
					],
				},
				{
					title: 'Membership deals',
					iconDefinition: faHeart,
					disable: true,
				},
			],
		},
		{
			title: 'Other',
			submenus: [
				{
					title: 'Documentation',
					iconDefinition: faBook,
					url: '/documentation',
				},
				{
					title: 'Help',
					iconDefinition: faQuestionCircle,
					url: '/help',
				},
			],
		},
	];

	public __currentUrl: string = null;

	private readonly destroy$: Subject<void> = new Subject<void>();

	constructor (
		private readonly _router: Router,
	) {
		this._router.events
			.pipe(
				filter((e: Event): boolean => e instanceof NavigationEnd),
				takeUntil(this.destroy$)
			)
			.subscribe((e: NavigationEnd): string => this.__currentUrl = e.url);
	}

}
