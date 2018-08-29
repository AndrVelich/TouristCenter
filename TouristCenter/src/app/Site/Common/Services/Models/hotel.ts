import { Apartment } from "./apartment";

export class Hotel{
    public Name: string 
    public Description: string  
    public Stars: number  
    public Country: string  
    public City: string  
    public DistanceToSea: number  
    public Services: string  
    public ChildServices: string  
    public Food: string  
    public HasPool: boolean  
    public HasOwnBeach: boolean  
    public HasInternet: boolean  

    public ImageIdCollection: string[]

    public apartment: Apartment         
}
