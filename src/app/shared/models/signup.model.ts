export class SignupModel {
  firstName: string;
  middleName: string;
  lastName: string;
  phNum: number;
  emailAddress: string;
  password: string;
  orgDetails: OrgDetailsModel = new OrgDetailsModel();
}

export class OrgDetailsModel {
  orgName: string;
  orgAddr1: string;
  orgAdd2: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  orgPh: number;
  orgFax: number;
}