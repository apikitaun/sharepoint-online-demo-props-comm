import { IWebPartContext } from '@microsoft/sp-webpart-base';
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
}
export interface ICommTestProps {
  context : IWebPartContext;
  props : IWebPartProps;

}
