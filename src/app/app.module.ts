import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { UiSideBarComponent } from './_components/ui-sidebar/ui-sidebar.component';
import { HardwareComponent } from './_pages/overview/e-commerce/products/hardware/hardware.component';
import { PcAndTabletsComponent } from './_pages/overview/e-commerce/products/pc-and-tablets/pc-and-tablets.component';
import { TvAndHifiComponent } from './_pages/overview/e-commerce/products/tv-and-hifi/tv-and-hifi.component';
import { PhotoAndVideoComponent } from './_pages/overview/e-commerce/products/photo-and-video/photo-and-video.component';
import { OrdersComponent } from './_pages/overview/e-commerce/orders/orders.component';
import { DashboardComponent } from './_pages/overview/dashboard/dashboard.component';
import { ThemesComponent } from './_pages/overview/appearance/themes/themes.component';
import { PluginsComponent } from './_pages/overview/appearance/plugins/plugins.component';
import { WidgetsComponent } from './_pages/overview/appearance/widgets/widgets.component';
import { DocumentationComponent } from './_pages/other/documentation/documentation.component';
import { HelpComponent } from './_pages/other/help/help.component';

@NgModule({
	declarations: [
		AppComponent,
		UiSideBarComponent,
		DashboardComponent,
		HardwareComponent,
		PcAndTabletsComponent,
		TvAndHifiComponent,
		PhotoAndVideoComponent,
		OrdersComponent,
		ThemesComponent,
		PluginsComponent,
		WidgetsComponent,
		DocumentationComponent,
		HelpComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot([
			{
				path: '',
				component: DashboardComponent,
			},
			{
				path: 'e-commerce',
				children: [
					{
						path: 'products',
						children: [
							{
								path: 'hardware',
								component: HardwareComponent,
							},
							{
								path: 'pc-tablets',
								component: PcAndTabletsComponent,
							},
							{
								path: 'tv-hifi',
								component: TvAndHifiComponent,
							},
							{
								path: 'photo-video',
								component: PhotoAndVideoComponent,
							},
						],
					},
					{
						path: 'orders',
						component: OrdersComponent,
					},
				],
			},
			{
				path: 'appearance',
				children: [
					{
						path: 'themes',
						component: ThemesComponent,
					},
					{
						path: 'plugins',
						component: PluginsComponent,
					},
					{
						path: 'widgets',
						component: WidgetsComponent,
					},
				],
			},
			{
				path: 'documentation',
				component: DocumentationComponent,
			},
			{
				path: 'help',
				component: HelpComponent,
			},
		]),
		FontAwesomeModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
