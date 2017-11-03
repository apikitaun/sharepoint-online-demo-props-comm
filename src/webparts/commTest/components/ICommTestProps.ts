import { IWebPartContext } from '@microsoft/sp-webpart-base';
import{ISPList,ISPLists} from '../ISPList';
// WebPart properties
export interface IWebPartProps
{
  // public properties
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

export interface IExchangeAttributes
{
  divListContent : string;
  link:string;
  lists:ISPList [];
}
export interface ICommTestProps {
  context : IWebPartContext;
  props : IWebPartProps;

}
