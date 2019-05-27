import { Injectable } from "@angular/core";

@Injectable()
export class PreloaderService
{
    private isInProgress: boolean = false;

    public isPreloaderInProgress(): boolean
    {
        return this.isInProgress;
    }

    public startPreloader(): void
    {
        this.isInProgress = true;
        //var bodyContentClassList = document.getElementsByClassName("preloader");
        //if(!bodyContentClassList.contains("preloader"))
        //{
        //   bodyContentClassList.add("preloader");
        //}
    }

    public finishPreloader(): void
    {
        this.isInProgress = false;
        //document.getElementsByClassName("body-content")[0].classList.remove("preloader");
    }
}
