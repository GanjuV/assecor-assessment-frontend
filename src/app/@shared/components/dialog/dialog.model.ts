export interface DialogData {
  dataObj?: any;
  component: any;
  displayConfig: DialogDisplayConfig;
  isFullScreen?: boolean;
}

export interface DialogDisplayConfig {
  title?: string;
  secondaryHeader?: string;
  instructionalText?: string;
  buttons?: {
    primary: DialogButton;
    secondary: DialogButton;
  };
  hideButtons?: boolean;
}

export interface DialogButton {
  label: string;
}
