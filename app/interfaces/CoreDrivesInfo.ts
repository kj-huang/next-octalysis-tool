export type CoreDrivesData = {
  [key: string]: CoreDrivesInfo;
};

export interface CoreDriveDescription {
  paragraph: string;
  xPos: number;
  yPos: number;
  width: number;
  height: number;
}

export interface CoreDrivesInfo {
  title: string;
  score: number;
  coreDriveDescription: CoreDriveDescription;
}
