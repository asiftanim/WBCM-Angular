import { Case } from "./Case";
import { CaseAttachment } from "./CaseAttachment";

export class CaseDetails {
  Case: Case | undefined;
  CaseAttachment: Array<CaseAttachment> | undefined;
}
