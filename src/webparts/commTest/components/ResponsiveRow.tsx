import * as React from 'react';
import {IResponsiveRowProps} from './IResponsiveRowProps';
import{ISPList,ISPLists} from '../ISPList';
import styles from './CommTest.module.scss';


export class ResponsiveRow extends React.Component<IResponsiveRowProps>{


    constructor (props : IResponsiveRowProps)
    {
      super(props);

    }
    public render(): React.ReactElement<IResponsiveRowProps> {
        return (
            <div className={`ms-Grid-row ${styles.row}`}>
                {this.props.list.map( (item)  =>
            {
              return (
                <div className={`ms-Grid-col ms-u-md3 ${styles.list}`}>
                  <span className="ms-font-l">{item.Title}</span>
                </div>
              );
            }
            )}
            </div>
        ); 
    }
}