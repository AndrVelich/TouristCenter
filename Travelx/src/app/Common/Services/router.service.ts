import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class RouterService {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    public updateQueryParams(newParameters: any): void {
        setTimeout(() => {
            this.changeQueryParams(newParameters);
        });
    }

    private changeQueryParams(newParameters): void
    {
        let queryParams = this.activatedRoute.snapshot.queryParams;
        let resultParams = Object.assign({}, queryParams, newParameters);
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: resultParams,
                queryParamsHandling: 'merge',
            });
    }
}

