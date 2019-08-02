import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class PagerService
{

    public GetPager(totalItems: number, pageOptions: PageOptions): Pager {

        let pagerLength = pageOptions.pagerLength;
        let floorHalfLength = Math.floor(pagerLength / 2);
        let pager = new Pager();

        pager.currentPage = Math.ceil(pageOptions.skip / pageOptions.take) + 1;

        pager.totalPages = Math.ceil(totalItems / pageOptions.take);

        if (pager.totalPages <= pagerLength)
        {
            pager.startPage = 1;
            pager.endPage = pager.totalPages;
        }
        else
        {
            if (pager.currentPage + floorHalfLength >= pager.totalPages)
            {
                pager.startPage = pager.totalPages - pagerLength + 1;
                pager.endPage = pager.totalPages;
            }
            else
            {
                if (pager.currentPage - floorHalfLength < 0) {
                    pager.startPage = 1;
                    pager.endPage = pagerLength;
                }
                else if (this.isEven(pagerLength))
                {
                    pager.startPage = pager.currentPage - floorHalfLength + 1;
                    pager.endPage = pager.currentPage + floorHalfLength;
                }
                else
                {
                    pager.startPage = pager.currentPage - floorHalfLength;
                    pager.endPage = pager.currentPage + floorHalfLength;
                }
                
            }
        }

        pager.pages = this.getPagesArray(pager);

        return pager;

    }

    private getPagesArray(pager: Pager): Array<number>
    {
        let emptyPageArray = new Array<number>(pager.endPage - pager.startPage + 1)
        emptyPageArray = emptyPageArray.fill(0)
        let result = emptyPageArray.map((x, i) => pager.startPage + i);

        return result;
    }

    private isEven(n): boolean
    {
        return n % 2 == 0;
    }
}

export class Pager {
    public currentPage: number;
    public pageSize: number;
    public totalPages: number;
    public startPage: number;
    public endPage: number;
    public startIndex: number;
    public endIndex: number;
    public pages: number[];
};

export class PageOptions {
    public skip: number;
    public take: number;
    public pagerLength: number

    constructor(skip: number, take: number, pagerLength: number)
    {
        this.skip = skip;
        this.take = take;
        this.pagerLength = pagerLength;
    }
}

export class Page<T>
{
    public count: number
    public collection: Array<T>

    constructor(count: number, collection: Array<T>)
    {
        this.count = count;
        this.collection = collection;
    }
}
