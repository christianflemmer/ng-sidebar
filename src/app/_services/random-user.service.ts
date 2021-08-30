import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { IRandomUser } from '../_interfaces/random-user.interfaces';

@Injectable({
	providedIn: 'root',
})
export class RandomUserService {

	private readonly randomUserUrl: string = 'https://randomuser.me/api/';

	constructor (
		private readonly _http: HttpClient,
	) { }

	/**
	 * Get a random user object.
	 * 
	 * @returns { Observable<IRandomUser> }
	 */
	public getRandomUser$(

	): Observable<IRandomUser> {
		return this._http.get<any>(this.randomUserUrl)
			.pipe(
				pluck('results'),
				map((apiResponse: any[]): IRandomUser => this.constructRandomUser(apiResponse)),
			);
	}

	/**
	 * Construct random user object based on provided API response.
	 * 
	 * @param { any } apiResponse 
	 * @returns { IRandomUser }
	 */
	private constructRandomUser(
		apiResponse: any[],
	): IRandomUser {
		return {
			name: `${apiResponse[0].name.first} ${apiResponse[0].name.last}`,
			email: apiResponse[0].email.replace('example', 'ii'),
			pictureUrl: apiResponse[0].picture.thumbnail,
		};
	}

}
