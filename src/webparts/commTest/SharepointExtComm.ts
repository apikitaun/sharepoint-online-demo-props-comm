import { ISPList } from './ISPList';
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
export class SharepointExtComm
{
    private static commProperties =
    {
        ServerURL : "https://sidertiasolutions.sharepoint.com",
        SiteRelativeURL : "sites/rsdevsite",
        RelativeURL:"",
        User:"jgcia@sidertia.com",
        Password:""
    };
    public static httpClient : HttpClient;
    private static intermediateURL = "http://sharepointbridgespfx.azurewebsites.net/api/sharepoint/invokeGetMethod";
    private static getRelative (relativeURL : string) : Promise<HttpClientResponse>
    {
        this.commProperties.RelativeURL = relativeURL;
        const opt: IHttpClientOptions = {
            headers: {'Content-Type': 'application/json',
                      'Accept': 'application/json'},
            body: JSON.stringify(this.commProperties),

        };
        return this.httpClient.post(this.intermediateURL, HttpClient.configurations.v1 , {
            headers: {
        },
            method: "post",
            body: JSON.stringify(this.commProperties)
            }
        );
    }
    public static get(url : string): Promise<string> {
        
        return SharepointExtComm.getRelative (url)
          .then((response: HttpClientResponse) => {
            return response.json();
          }) as Promise<string>;
      }
}