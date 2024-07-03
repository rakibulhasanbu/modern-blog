type SocialLinks = {
  youtube?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  website?: string;
};

type AccountInfo = {
  totalPosts: number;
  totalReads: number;
};

type PersonalInfo = {
  fullName: string;
  email: string;
  password: string;
  oldPassword?: string;
  moreOldPassword?: string;
  username: string;
  bio?: string;
  profileImg?: string;
};

export type TUser = {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  accountInfo: AccountInfo;
  googleAuth: boolean;
  blogs: string[];
};

export type TTokenUser = {
  email: string;
  fullName: string;
  id: string;
  profileImg: string;
  username: string;
};

export interface TFlat {
  id: string;
  location: string;
  description: string;
  amount: number;
  squareFeet: number;
  totalBedrooms: number;
  totalRooms: number;
  amenities: string[];
  photos: string[];
  availability: boolean;
  advanceAmount: number;
  createdAt: string;
  updatedAt: string;
  postedById: string;
}

export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export const BookingStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export type TUserRole = keyof typeof USER_ROLE;
