import SavedSearchTwoToneIcon from "@mui/icons-material/SavedSearchTwoTone";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import AssignmentTurnedInTwoToneIcon from "@mui/icons-material/AssignmentTurnedInTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import ListAltTwoToneIcon from "@mui/icons-material/ListAltTwoTone";
import ApartmentTwoToneIcon from "@mui/icons-material/ApartmentTwoTone";

import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";

import BusinessCenterTwoToneIcon from "@mui/icons-material/BusinessCenterTwoTone";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";
import CalculateTwoToneIcon from "@mui/icons-material/CalculateTwoTone";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";

import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";

import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import PercentTwoToneIcon from "@mui/icons-material/PercentTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";

import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import RecordVoiceOverTwoToneIcon from "@mui/icons-material/RecordVoiceOverTwoTone";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";

/* =========================
   HEADER NAV
========================= */

export const NAV_LINKS = [
  {
    label: "Việc làm",
    menu: "jobs",
  },
  {
    label: "Tạo CV",
    menu: "cv",
  },
  {
    label: "Công cụ",
    menu: "tools",
  },
  {
    label: "Cẩm nang nghề nghiệp",
    menu: "career",
  },
];

/* =========================
   JOB MENU
========================= */

export const JOB_MENU = {
  byType: {
    title: "VIỆC LÀM",

    items: [
      {
        label: "Tìm việc làm",
        icon: SavedSearchTwoToneIcon,
      },
      {
        label: "Việc làm đã lưu",
        icon: BookmarkAddedTwoToneIcon,
      },
      {
        label: "Việc làm đã ứng tuyển",
        icon: AssignmentTurnedInTwoToneIcon,
      },
      {
        label: "Việc làm phù hợp",
        icon: ThumbUpAltTwoToneIcon,
      },
    ],

    company: {
      title: "CÔNG TY",

      items: [
        {
          label: "Danh sách công ty",
          icon: ListAltTwoToneIcon,
        },
        {
          label: "Công ty Pro",
          icon: ApartmentTwoToneIcon,
        },
      ],
    },
  },

  byPosition: {
    title: "VIỆC LÀM THEO VỊ TRÍ",

    colA: [
      "Việc làm Nhân viên kinh doanh",
      "Việc làm Kế toán",
      "Việc làm Marketing",
      "Việc làm Hành chính nhân sự",
      "Việc làm Chăm sóc khách hàng",
      "Việc làm Ngân hàng",
      "Việc làm IT",
    ],

    colB: [
      "Việc làm Lao động phổ thông",
      "Việc làm Senior",
      "Việc làm Kỹ sư xây dựng",
      "Việc làm Thiết kế đồ hoạ",
      "Việc làm Bất động sản",
      "Việc làm Giáo dục",
      "Việc làm Telesales",
    ],
  },

  byField: {
    title: "VIỆC LÀM THEO LĨNH VỰC",

    items: [
      "Việc làm Sản xuất",
      "Việc làm Bán lẻ - Hàng tiêu dùng - FMCG",
      "Việc làm IT - Phần mềm",
      "Việc làm Xây dựng",
      "Việc làm Giáo dục/Đào tạo",
    ],
  },
};

/* =========================
   CV MENU
========================= */

export const CV_MENU = {
  byStyle: {
    title: "Mẫu CV theo style",

    items: [
      {
        label: "Mẫu CV đơn giản",
        icon: DescriptionTwoToneIcon,
      },
      {
        label: "Mẫu CV ấn tượng",
        icon: AutoAwesomeTwoToneIcon,
      },
      {
        label: "Mẫu CV chuyên nghiệp",
        icon: WorkspacePremiumTwoToneIcon,
      },
      {
        label: "Mẫu CV Harvard",
        icon: SchoolTwoToneIcon,
      },
    ],

    position: {
      title: "Mẫu CV theo vị trí ứng tuyển",

      items: [
        {
          label: "Nhân viên kinh doanh",
          icon: BusinessCenterTwoToneIcon,
        },
        {
          label: "Lập trình viên",
          icon: CodeTwoToneIcon,
        },
        {
          label: "Nhân viên kế toán",
          icon: CalculateTwoToneIcon,
        },
        {
          label: "Chuyên viên marketing",
          icon: CampaignTwoToneIcon,
        },
      ],
    },
  },

  cvOption: [
    {
      label: "Quản lí CV",
      icon: AssignmentTurnedInTwoToneIcon,
    },
    {
      label: "Tải CV lên",
      icon: CloudUploadTwoToneIcon,
    },
    {
      label: "Hướng dẫn viết CV",
      icon: EditNoteTwoToneIcon,
    },
    {
      label: "Quản lí Cover Letter",
      icon: DescriptionTwoToneIcon,
    },
    {
      label: "Mẫu Cover Letter",
      icon: ArticleTwoToneIcon,
    },
  ],
};

/* =========================
   TOOL MENU
========================= */

export const TOOL_MENU = {
  title: "CÔNG CỤ",

  items: [
    {
      label: "Tính lương Gross - Net",
      icon: AccountBalanceWalletTwoToneIcon,
    },
    {
      label: "Tính bảo hiểm xã hội",
      icon: CalculateTwoToneIcon,
    },
    {
      label: "Tính thuế thu nhập cá nhân",
      icon: PercentTwoToneIcon,
    },
    {
      label: "Tính giờ làm việc",
      icon: AccessTimeTwoToneIcon,
    },
    {
      label: "Tra cứu ngành nghề",
      icon: WorkHistoryTwoToneIcon,
    },
    {
      label: "Công cụ dịch CV",
      icon: TranslateTwoToneIcon,
    },
  ],
};

/* =========================
   CAREER MENU
========================= */

export const CAREER_MENU = {
  title: "CẨM NANG NGHỀ NGHIỆP",

  items: [
    {
      label: "Bí quyết tìm việc",
      icon: WorkTwoToneIcon,
    },
    {
      label: "Kỹ năng viết CV",
      icon: MenuBookTwoToneIcon,
    },
    {
      label: "Kinh nghiệm phỏng vấn",
      icon: RecordVoiceOverTwoToneIcon,
    },
    {
      label: "Định hướng nghề nghiệp",
      icon: SchoolTwoToneIcon,
    },
    {
      label: "Phát triển sự nghiệp",
      icon: TrendingUpTwoToneIcon,
    },
    {
      label: "Mẹo nghề nghiệp",
      icon: TipsAndUpdatesTwoToneIcon,
    },
  ],
};

/* =========================
   HERO SEARCH
========================= */

export const CAREER_GROUPS = [
  {
    title: "Kinh doanh / Bán hàng",
    jobs: [
      "Nhân viên kinh doanh",
      "Sales",
      "Telesales",
      "Business Development",
    ],
  },

  {
    title: "Marketing / Truyền thông",
    jobs: [
      "Marketing",
      "Digital Marketing",
      "Content Marketing",
      "PR / Truyền thông",
    ],
  },

  {
    title: "Công nghệ thông tin",
    jobs: [
      "Lập trình viên",
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
    ],
  },

  {
    title: "Tài chính / Kế toán",
    jobs: [
      "Kế toán",
      "Kiểm toán",
      "Tài chính",
      "Ngân hàng",
    ],
  },

  {
    title: "Nhân sự / Hành chính",
    jobs: [
      "Nhân viên nhân sự",
      "HR Specialist",
      "Recruiter",
      "Hành chính",
    ],
  },

  {
    title: "Kỹ thuật / Xây dựng",
    jobs: [
      "Kỹ sư xây dựng",
      "Kỹ sư cơ khí",
      "Kỹ thuật điện",
      "Giám sát công trình",
    ],
  },
];

export const POSITIONS = [
  "Intern",
  "Junior",
  "Middle",
  "Senior",
  "Team Leader",
  "Manager",
  "Director",
  "Freelancer",
];

/* =========================
   CATEGORY
========================= */

export const CATEGORIES = [
  "Kinh doanh/Bán hàng",
  "Marketing/PR/Quảng cáo",
  "Chăm sóc khách hàng",
  "Nhân sự/Hành chính/Pháp chế",
  "Công nghệ Thông tin",
  "Lao động phổ thông",
];

export const JOBS = [
  {
    title:
      "Giám Đốc Khai Thác Mỏ Lương Từ 25-30 Triệu",
    company:
      "Công ty TNHH Đầu tư Bình Thuận Lâm...",
    salary: "25 - 30 triệu",
    location: "Lâm Đồng (mới)",
  },
  {
    title:
      "Kỹ Sư Cấp Thoát Nước - Kỹ Sư Môi Trường Nước",
    company:
      "Công ty CP Đầu tư Thương mại...",
    salary: "Thoả thuận",
    location: "Hà Nội",
  },
  {
    title:
      "Personal Trainer (Huấn Luyện Viên Cá Nhân)",
    company:
      "Hộ kinh doanh Hoàng Duy Tân",
    salary: "10 - 40 triệu",
    location: "Hà Nội",
  },
  {
    title:
      "Kế Toán Quản Trị Hợp Nhất",
    company:
      "Công ty CP Flamingo Holding Group",
    salary: "Thoả thuận",
    location: "Hà Nội",
  },
  {
    title:
      "Kỹ Sư VR/AR/XR - Đi Làm Ngay",
    company: "Proton Việt Nam",
    salary: "15 - 25 triệu",
    location: "Hà Nội",
  },
  {
    title:
      "Kế Toán Viên - Từ 1 Năm Kinh Nghiệm",
    company:
      "Tam Hưng và Định Công",
    salary: "8 - 12 triệu",
    location: "Hà Nội",
  },
];

export const PROVINCES = [
  "Hà Nội",
  "Hải Phòng",
  "Huế",
  "Đà Nẵng",
  "Cần Thơ",
  "TP. Hồ Chí Minh",

  "Lai Châu",
  "Điện Biên",
  "Sơn La",
  "Lạng Sơn",
  "Cao Bằng",
  "Tuyên Quang",
  "Lào Cai",
  "Thái Nguyên",
  "Phú Thọ",
  "Bắc Ninh",
  "Hưng Yên",
  "Ninh Bình",
  "Quảng Ninh",
  "Thanh Hóa",
  "Nghệ An",
  "Hà Tĩnh",
  "Quảng Trị",
  "Quảng Ngãi",
  "Gia Lai",
  "Khánh Hòa",
  "Đắk Lắk",
  "Lâm Đồng",
  "Đồng Nai",
  "Tây Ninh",
  "Vĩnh Long",
  "Đồng Tháp",
  "Cà Mau",
  "An Giang",
];