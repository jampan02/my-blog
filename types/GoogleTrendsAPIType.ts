import gtAPIData from "../json/gt.json";

export type GoogleTrentdsAPIType = typeof gtAPIData;

export type GoogleTrentdsAPIContentType = typeof gtAPIData.default.timelineData;

export type GoogleTrentdsAPIContentTypeByDate = {
  weekly: GoogleTrentdsAPIContentType;
  monthly: GoogleTrentdsAPIContentType;
  yearly: GoogleTrentdsAPIContentType;
};
