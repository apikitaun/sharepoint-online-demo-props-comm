import {
    SPHttpClient,
    HttpClient,
    SPHttpClientResponse,   
    HttpClientResponse,
    IHttpClientOptions
  } from '@microsoft/sp-http';
  import {
    IWebPartContext
  } from '@microsoft/sp-webpart-base';
  import {
    Environment,
    EnvironmentType
  } from '@microsoft/sp-core-library';
export class SharepointExtComm
{
    private static commProperties =
    {
        ServerURL : "WYyd07G3m3VdDlFbZZywAU6oC7GfBqMuEP8+77p16PDrhOrwskUcO5P5nbd5eQRU",
        SiteRelativeURL : "pezcRjESW6O1CsXGK+aSdQ==",
        RelativeURL:"",
        User:"",
        Password:""
    };

    
    //private static intermediateURL = "http://192.168.89.103/SharepointBridge/api/Sharepoint/InvokeGetMethod";
    private static intermediateURL = "http://sharepointbridgespfx.azurewebsites.net/api/sharepoint/invokeGetMethod";
    private static getRelative (context : IWebPartContext , relativeURL : string) : Promise<HttpClientResponse>
    {
        this.commProperties.RelativeURL = relativeURL;
        return context.httpClient.post(this.intermediateURL, HttpClient.configurations.v1 , {
            headers: []
        ,
            method: "post",
            body: JSON.stringify(this.commProperties)
            }
        );
    }
    public static get<T>(context : IWebPartContext , url : string): Promise<T> {
        if (Environment.type == EnvironmentType.Local)
        {
           return SharepointExtComm.getRelative (context,url)
              .then((response: HttpClientResponse) => {
                 return response.json();
              }) 
              .then((response2 : string )=>{
                return JSON.parse(response2); 
         })as Promise<T>;
        }
        else
        {
            return context.spHttpClient.get(context.pageContext.web.absoluteUrl + url, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
              return response.json();
            }) as Promise<T>;
        }
      }
}