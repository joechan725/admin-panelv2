export interface SmartBar {
  id: string;
  titleZH?: string;
  titleEN?: string;
  messageZH: string;
  messageEN: string;
  link?: string;
  linkDescriptionZH?: string;
  linkDescriptionEN?: string;
  backgroundColor: string;
  textColor: string;
  isPublic: boolean;
  // timestamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
