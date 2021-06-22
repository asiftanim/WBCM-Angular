import { Case } from "./Case";
import { CaseAttachment } from "./CaseAttachment";
import { CaseReply } from "./CaseReply";

export class CaseDetails {
  Case: Case | undefined;
  CaseAttachment: Array<CaseAttachment> | undefined;
  CaseReply: Array<CaseReply> | undefined;
}
