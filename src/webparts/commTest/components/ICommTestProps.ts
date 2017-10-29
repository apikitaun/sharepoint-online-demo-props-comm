import { IWebPartContext } from '@microsoft/sp-webpart-base';
export interface ICommTestProps {
  // #SharepointPageContext
  context: IWebPartContext;
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;

}
