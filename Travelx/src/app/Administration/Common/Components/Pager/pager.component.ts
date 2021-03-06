﻿import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RouterService } from "@common/Services/router.service";
import { PagerService, Pager, PageOptions } from "@common/Services/pager.service";

@Component({
    selector: "pagerComponent",
    templateUrl: "pager.component.html"
})
export class PagerComponent implements OnInit {
    public pager: Pager;
    @Input()
    public pageOptions: PageOptions;
    @Output()
    public setPageEvent = new EventEmitter<PageOptions>();

    constructor(
        private pagerService: PagerService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private routerService: RouterService,
    ) { }

    ngOnInit()
    {
        this.getPageOptionsFromUrl();
        this.GetPageData();
    }

    public updatePager(count: number): void
    {
        this.pager = this.pagerService.GetPager(count, this.pageOptions);
    }

    public setPage(page): void
    {
        if (page > 0 && page <= this.pager.totalPages && page != this.pager.currentPage)
        {
            this.pageOptions.skip = (page - 1) * this.pageOptions.take;
            this.setPageOptionsToUrl();
            this.GetPageData();
        }
    }

    public resetPager(): void {
        this.pageOptions.skip = 0;
        this.setPageOptionsToUrl();
        this.GetPageData();
    }

    private GetPageData(): void
    {
        this.setPageEvent.emit(this.pageOptions);
    }

    private getPageOptionsFromUrl(): void {
        let queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams)
        {
            let skip = parseInt(queryParams.skip);
            let take = parseInt(queryParams.take);
            let pagerLength = parseInt(queryParams.pagerLength);

            if (!isNaN(skip)) {
                this.pageOptions.skip = skip;
            }

            if (!isNaN(take)) {
                this.pageOptions.take = take;
            }

            if (!isNaN(pagerLength)) {
                this.pageOptions.pagerLength = pagerLength;
            }
        }
    }

    private setPageOptionsToUrl(): void {
        this.routerService.updateQueryParams(this.pageOptions);        
    }
    
}