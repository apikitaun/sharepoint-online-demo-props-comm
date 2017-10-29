import * as React from 'react';
import styles from './CommTest.module.scss';
import { ICommTestProps } from './ICommTestProps';
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

export default class CommTest extends React.Component<ICommTestProps, {}> {

  public render(): React.ReactElement<ICommTestProps> {
    return (
      <div className={styles.commTest}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.test)}
              </p>
              <p>{escape(this.props.context.pageContext.web.title)}</p>
              <a className={styles.button} onClick={() => this.viewObject(this.props.context.pageContext.web.title) } >
                <span className={styles.label}>Learn more</span>
              </a>

            </div>
          </div>
        </div>
        <div id="spListContainer" />
      </div>
    );
  }
  public viewObject(text:string) :void
  {
    alert(text);
  }
}
