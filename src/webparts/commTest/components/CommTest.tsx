import * as React from 'react';
import styles from './CommTest.module.scss';
import { ICommTestProps , IExchangeAttributes } from './ICommTestProps';
import { SharepointExtComm } from '../SharepointExtComm';
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
import {ResponsiveRow} from './ResponsiveRow';

export default class CommTest extends React.Component<ICommTestProps, IExchangeAttributes> {
private numElements = 4;
constructor (props)
{
  super(props);
  this.state = {
                divListContent:"please wait",
                link:"/a",
                lists: []
              };
}

public ListElement(item)
{
  return (
    <div className={`ms-Grid-col ${styles.list}`}>
      <span className="ms-font-l">{item.Title}</span>
    </div>
  );
}

  public render(): React.ReactElement<ICommTestProps> {
    var rows = [];
    var i = 0;
    while ( this.state.lists.length > 0 )
    {
      var toElement = this.numElements;
      if ( this.numElements >= this.state.lists.length)
         toElement = this.state.lists.length;
      rows[i] = this.state.lists.splice (0 , toElement);
      i++;
    }
    return (
      <div className={styles.commTest}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint! 1.0.0.11</span>
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
        <div className={styles.container}>
           {rows.map((item) =>{
             return (
              <ResponsiveRow list={item}/>
             );
           })
          }
         </div>
      </div>
    );
  }
  

  
  // pre-render
  public componentWillMount()
  {
  }
  // post-render
  public componentDidMount()
  {
    this._renderListAsync();
  }

  private _renderListAsync(): void {

    SharepointExtComm.get<ISPLists>(this.props.context,'/_api/web/lists?$filter=Hidden eq false')
       .then((response : ISPLists) =>{
         this.setState({lists:response.value});
       });
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
