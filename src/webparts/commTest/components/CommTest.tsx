import * as React from 'react';
import styles from './CommTest.module.scss';
import { ICommTestProps , IExchangeAttributes } from './ICommTestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import { ISPList, ISPLists } from '../ISPList';
import { MockHttpClient } from '../MockHttpClient';
import {
  SPHttpClient,
  HttpClient,
  SPHttpClientResponse,   
  HttpClientResponse
} from '@microsoft/sp-http';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

export default class CommTest extends React.Component<ICommTestProps, IExchangeAttributes> {
constructor (props)
{
  super(props);
  this.state = {divListContent:"please wait",
                link:"/a"};
}
  public render(): React.ReactElement<ICommTestProps> {
    return (
      <div className={styles.commTest}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint! 1.0.0.9</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.props.description)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.props.test)}
              </p>
              <p>{escape(this.props.context.pageContext.web.title)}</p>
              <p>
              <a className={styles.button} onClick={() => this.viewObject(this.props.context.pageContext.web.title) } >
                <span className={styles.label}>Learn more</span>
              </a>
              </p>
              <p>
              <a className={styles.button} href={"www.google.es"+this.state.link} >
                <span className={styles.label}>To Link</span>
              </a>
              </p>
            </div>
          </div>
        </div>
        <div id="spListContainer" dangerouslySetInnerHTML={{ __html: this.state.divListContent}}/>
      </div>
    );
  }

  // pre-render
  public componentWillMount()
  {
    this._renderListAsync();
  }
  // post-render
  public componentDidMount()
  {
  }



  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }
  private _getListData(): Promise<ISPLists> {
    return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }
  private _renderListAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint || 
              Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then((response) => {
          this._renderList(response.value);
        });
    } 
  }
  private _renderList(items: ISPList[]): void {
    let html: string = '';
    items.forEach((item: ISPList) => {
      html += `
        <ul class="${styles.list}">
            <li class="${styles.listItem}">
                <span class="ms-font-l">${item.Title}</span>
            </li>
        </ul>`;
    });
    this.setState({divListContent:html});
  }

  public viewObject(text:string) :void
  {
    //alert(text);
    this.getTenant();
  }
  private getTenant() :void {
    this.props.context.httpClient.get('https://sidertiasolutions.sharepoint.com/_vti_bin/client.svc',
    HttpClient.configurations.v1,{
      headers: {
        'Authorization': "Bearer"
      }
    })
    .then((response: HttpClientResponse) => {
      alert(JSON.stringify(response.headers.get('WWW-Authenticate')));
    })
    .then((error) => {
      alert(error);
    });
  }
    
}
