export enum VariableName {
  Lines = 'Lines',
  Guidance = 'Guidance',
  Status = 'Status',
  Station = 'Station',
}

export type Alert = {
  ModifiedDate: string;
  incidentMessage: {
    preMessage: string;
    subject: string;
    formVariableItems: {
      isRequired: boolean;
      val: string[];
      variableName: VariableName;
    }[];
  };
};
