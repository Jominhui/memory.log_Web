import MemberType from "./Member";

export default interface PaperType {
  idx: number;
  member: MemberType;
  title: string;
  scope: string;
  code: string;
  likeCount: number;
  endTime: Date;
  thumbnail: string;
  like: boolean;
  backgroundColor: string;
  createdAt: Date;
  updatedAt: Date;
}
