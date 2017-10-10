export interface ICPCPDispositionSection {
  id?: number;
  isNonCPCPRelatedEvent?: boolean;
  isWideSpreadCorrosion?: boolean;
  isCorrosionLevelCorrect?: boolean;
  correctedCorrosionLevel?: number;

  isCorrosionTaskNoCorrect?: boolean;
  correctedCorrosionTaskNo?: string;
  corrosionLevelChangeReason?: number;
  corrosionLevelChangeReasonOtherText?: string;
  engineeringComments?: string;
  qcFeedback?: string;
  isReviewComplete?: boolean;
  reviewer?: string;
  reviewerBadgeNo?: string;
  submittedToQC?: boolean;
}
