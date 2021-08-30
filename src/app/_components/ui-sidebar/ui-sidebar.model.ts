import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ISideBarEntry {
	title: string;
	submenus?: ISideBarMenu[];

	// ... used internally within the side-bar component
	__isActive?: boolean;
	__hasActiveSubmenu?: boolean;
}

export interface ISideBarMenu extends ISideBarSubmenu {
	iconDefinition?: IconDefinition;                        // FontAwesome icon definition
}

export interface ISideBarSubmenu extends ISideBarEntry {
	url?: string;
	disable?: boolean;
	openInNewTab?: boolean;
}
