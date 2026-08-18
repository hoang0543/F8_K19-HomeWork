import {useEffect, useRef, useState} from "react";
import {
    Box,
    Stack,
    Typography,
    TextField,
    Button,
    Chip,
    IconButton,
    InputAdornment,
    Divider,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import MenuIcon from "@mui/icons-material/Menu";
import ApartmentIcon from "@mui/icons-material/Apartment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SavedSearchTwoToneIcon from '@mui/icons-material/SavedSearchTwoTone';
import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';

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

import WorkOutlineTwoToneIcon from "@mui/icons-material/WorkOutlineTwoTone";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import EngineeringTwoToneIcon from "@mui/icons-material/EngineeringTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";

const GREEN = "#00B14F";
const GREEN_DARK = "#008C40";
const NAVY = "#18191C";

function TopCvLogo({size = 26, light = false, showTagline = false}) {
    return (
        <Box sx={{display: "inline-block", lineHeight: 1.1}}>
            <Typography
                component="span"
                sx={{fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: size, letterSpacing: -0.5}}
            >
                <Box component="span" sx={{color: light ? "#fff" : NAVY}}>
                    top
                </Box>
                <Box component="span" sx={{color: GREEN}}>
                    cv
                </Box>
            </Typography>
            {showTagline && (
                <Typography
                    sx={{
                        fontSize: 12,
                        color: light ? "rgba(255,255,255,0.7)" : "#667085",
                        mt: 0.2,
                    }}
                >
                    Tiếp lợi thế, nối thành công
                </Typography>
            )}
        </Box>
    );
}

// ---- Nội dung mega menu khi hover "Việc làm" ----
const JOB_MENU = {
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

function JobMegaMenu() {
    return (
        <Box
            sx={{
                position: "absolute",
                width: "80%",
                top: "100%",
                left: "10%",
                right: 0,
                bgcolor: "#fff",
                borderTop: "1px solid #EAECF0",
                boxShadow: "0 16px 32px rgba(16,24,40,0.12)",
                px: {xs: 2, sm: 3, md: 5, lg: 7},
                py: 4,
                zIndex: 20,
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "240px 1fr 280px",
                    gap: 6,
                    alignItems: "start",
                }}
            >
                <Box>
                    <Typography sx={{fontSize: 20, fontWeight: 700, color: "#98A2B3", mb: 1.5, letterSpacing: 0.5}}>
                        {JOB_MENU.byType.title}
                    </Typography>
                    <Stack spacing={1.2} sx={{mb: 3}}>
                        <Stack spacing={0.8} sx={{mb: 3}}>
                            {JOB_MENU.byType.items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Stack
                                        key={item.label}
                                        direction="row"
                                        alignItems="center"
                                        spacing={1.5}
                                        sx={{
                                            px: 1,
                                            py: 1,
                                            borderRadius: 2,
                                            cursor: "pointer",

                                            "&:hover": {
                                                bgcolor: "#F2FBF6",

                                                "& .menu-icon": {
                                                    color: GREEN,
                                                    transform: "scale(1.08)",
                                                },

                                                "& .menu-text": {
                                                    color: GREEN,
                                                },
                                            },
                                        }}
                                    >
                                        <Icon
                                            className="menu-icon"
                                            sx={{
                                                fontSize: 25,
                                                color: "#667085",
                                                transition: "all 0.2s ease",
                                            }}
                                        />

                                        <Typography
                                            className="menu-text"
                                            sx={{
                                                fontSize: 17,
                                                color: NAVY,
                                                cursor: "pointer",
                                                transition: "color 0.2s ease",
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Stack>
                    <Typography sx={{fontSize: 20, fontWeight: 700, color: "#98A2B3", mb: 1.5, letterSpacing: 0.5}}>
                        {JOB_MENU.byType.company.title}
                    </Typography>
                    <Stack spacing={0.8}>
                        {JOB_MENU.byType.company.items.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Stack
                                    key={item.label}
                                    direction="row"
                                    alignItems="center"
                                    spacing={1.5}
                                    sx={{
                                        px: 1,
                                        py: 1,
                                        borderRadius: 2,
                                        cursor: "pointer",

                                        "&:hover": {
                                            bgcolor: "#F2FBF6",

                                            "& .menu-icon": {
                                                color: GREEN,
                                                transform: "scale(1.08)",
                                            },

                                            "& .menu-text": {
                                                color: GREEN,
                                            },
                                        },
                                    }}
                                >
                                    <Icon
                                        className="menu-icon"
                                        sx={{
                                            fontSize: 25,
                                            color: "#667085",
                                            transition: "all 0.2s ease",
                                        }}
                                    />

                                    <Typography
                                        className="menu-text"
                                        sx={{
                                            fontSize: 17,
                                            color: NAVY,
                                            cursor: "pointer",
                                            transition: "color 0.2s ease",
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Box>

                <Box>
                    <Typography sx={{fontSize: 20, fontWeight: 700, color: "#98A2B3", mb: 1.5, letterSpacing: 0.5}}>
                        {JOB_MENU.byPosition.title}
                    </Typography>
                    <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4}}>
                        <Stack spacing={1.2}>
                            {JOB_MENU.byPosition.colA.map((i) => (
                                <Typography key={i} sx={{
                                    fontSize: 18,
                                    color: NAVY,
                                    cursor: "pointer",
                                    "&:hover": {color: GREEN}
                                }}>
                                    {i}
                                </Typography>
                            ))}
                        </Stack>
                        <Stack spacing={1.2}>
                            {JOB_MENU.byPosition.colB.map((i) => (
                                <Typography key={i} sx={{
                                    fontSize: 18,
                                    color: NAVY,
                                    cursor: "pointer",
                                    "&:hover": {color: GREEN}
                                }}>
                                    {i}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>
                </Box>

                <Box>
                    <Typography sx={{fontSize: 20, fontWeight: 700, color: "#98A2B3", mb: 1.5, letterSpacing: 0.5}}>
                        {JOB_MENU.byField.title}
                    </Typography>
                    <Stack spacing={1.2}>
                        {JOB_MENU.byField.items.map((i) => (
                            <Typography key={i}
                                        sx={{fontSize: 18, color: NAVY, cursor: "pointer", "&:hover": {color: GREEN}}}>
                                {i}
                            </Typography>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

const CV_MENU = {
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
}

function CvMegaMenu() {
    return (
        <Box
            sx={{
                position: "absolute",
                width: "80%",
                top: "100%",
                left: "10%",
                bgcolor: "#fff",
                borderTop: "1px solid #EAECF0",
                boxShadow: "0 16px 32px rgba(16,24,40,0.12)",
                px: {xs: 2, sm: 3, md: 5, lg: 7},
                py: 4,
                zIndex: 20,
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "280px 1fr 280px",
                    gap: 6,
                    alignItems: "start",
                }}
            >
                {/* =========================
                    CỘT 1: MẪU CV THEO STYLE
                ========================== */}
                <Box>
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#98A2B3",
                            mb: 1.5,
                            letterSpacing: 0.5,
                        }}
                    >
                        {CV_MENU.byStyle.title}
                    </Typography>

                    <Stack spacing={0.8}>
                        {CV_MENU.byStyle.items.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Stack
                                    key={item.label}
                                    direction="row"
                                    alignItems="center"
                                    spacing={1.5}
                                    sx={{
                                        px: 1,
                                        py: 1,
                                        borderRadius: 2,
                                        cursor: "pointer",

                                        "&:hover": {
                                            bgcolor: "#F2FBF6",

                                            "& .cv-menu-icon": {
                                                color: GREEN,
                                                transform: "scale(1.08)",
                                            },

                                            "& .cv-menu-text": {
                                                color: GREEN,
                                            },
                                        },
                                    }}
                                >
                                    <Icon
                                        className="cv-menu-icon"
                                        sx={{
                                            fontSize: 25,
                                            color: "#667085",
                                            transition: "all 0.2s ease",
                                        }}
                                    />

                                    <Typography
                                        className="cv-menu-text"
                                        sx={{
                                            fontSize: 17,
                                            color: NAVY,
                                            transition: "color 0.2s ease",
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Box>


                {/* =================================
                    CỘT 2: MẪU CV THEO VỊ TRÍ
                ================================== */}
                <Box>
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#98A2B3",
                            mb: 1.5,
                            letterSpacing: 0.5,
                        }}
                    >
                        {CV_MENU.byStyle.position.title}
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 4,
                        }}
                    >
                        <Stack spacing={1.2}>
                            {CV_MENU.byStyle.position.items
                                .slice(0, 2)
                                .map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Stack
                                            key={item.label}
                                            direction="row"
                                            alignItems="center"
                                            spacing={1.5}
                                            sx={{
                                                px: 1,
                                                py: 1,
                                                borderRadius: 2,
                                                cursor: "pointer",

                                                "&:hover": {
                                                    bgcolor: "#F2FBF6",

                                                    "& .cv-position-icon": {
                                                        color: GREEN,
                                                        transform: "scale(1.08)",
                                                    },

                                                    "& .cv-position-text": {
                                                        color: GREEN,
                                                    },
                                                },
                                            }}
                                        >
                                            <Icon
                                                className="cv-position-icon"
                                                sx={{
                                                    fontSize: 25,
                                                    color: "#667085",
                                                    transition: "all 0.2s ease",
                                                }}
                                            />

                                            <Typography
                                                className="cv-position-text"
                                                sx={{
                                                    fontSize: 17,
                                                    color: NAVY,
                                                    transition: "color 0.2s ease",
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                        </Stack>

                        <Stack spacing={1.2}>
                            {CV_MENU.byStyle.position.items
                                .slice(2)
                                .map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Stack
                                            key={item.label}
                                            direction="row"
                                            alignItems="center"
                                            spacing={1.5}
                                            sx={{
                                                px: 1,
                                                py: 1,
                                                borderRadius: 2,
                                                cursor: "pointer",

                                                "&:hover": {
                                                    bgcolor: "#F2FBF6",

                                                    "& .cv-position-icon": {
                                                        color: GREEN,
                                                        transform: "scale(1.08)",
                                                    },

                                                    "& .cv-position-text": {
                                                        color: GREEN,
                                                    },
                                                },
                                            }}
                                        >
                                            <Icon
                                                className="cv-position-icon"
                                                sx={{
                                                    fontSize: 25,
                                                    color: "#667085",
                                                    transition: "all 0.2s ease",
                                                }}
                                            />

                                            <Typography
                                                className="cv-position-text"
                                                sx={{
                                                    fontSize: 17,
                                                    color: NAVY,
                                                    transition: "color 0.2s ease",
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                        </Stack>
                    </Box>
                </Box>


                {/* =========================
                    CỘT 3: CÔNG CỤ CV
                ========================== */}
                <Box>
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#98A2B3",
                            mb: 1.5,
                            letterSpacing: 0.5,
                        }}
                    >
                        CÔNG CỤ CV
                    </Typography>

                    <Stack spacing={0.8}>
                        {CV_MENU.cvOption.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Stack
                                    key={item.label}
                                    direction="row"
                                    alignItems="center"
                                    spacing={1.5}
                                    sx={{
                                        px: 1,
                                        py: 1,
                                        borderRadius: 2,
                                        cursor: "pointer",

                                        "&:hover": {
                                            bgcolor: "#F2FBF6",

                                            "& .cv-option-icon": {
                                                color: GREEN,
                                                transform: "scale(1.08)",
                                            },

                                            "& .cv-option-text": {
                                                color: GREEN,
                                            },
                                        },
                                    }}
                                >
                                    <Icon
                                        className="cv-option-icon"
                                        sx={{
                                            fontSize: 25,
                                            color: "#667085",
                                            transition: "all 0.2s ease",
                                        }}
                                    />

                                    <Typography
                                        className="cv-option-text"
                                        sx={{
                                            fontSize: 17,
                                            color: NAVY,
                                            transition: "color 0.2s ease",
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

const TOOL_MENU = {
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

function ToolMegaMenu() {
    return (
        <Box
            sx={{
                position: "absolute",
                width: "80%",
                top: "100%",
                left: "10%",
                bgcolor: "#fff",
                borderTop: "1px solid #EAECF0",
                boxShadow: "0 16px 32px rgba(16,24,40,0.12)",
                px: {xs: 2, sm: 3, md: 5, lg: 7},
                py: 4,
                zIndex: 20,
            }}
        >
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#98A2B3",
                    mb: 2,
                    letterSpacing: 0.5,
                }}
            >
                {TOOL_MENU.title}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: 6,
                    rowGap: 1,
                    maxWidth: 700,
                }}
            >
                {TOOL_MENU.items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Stack
                            key={item.label}
                            direction="row"
                            alignItems="center"
                            spacing={1.5}
                            sx={{
                                px: 1,
                                py: 1.2,
                                borderRadius: 2,
                                cursor: "pointer",

                                "&:hover": {
                                    bgcolor: "#F2FBF6",

                                    "& .tool-menu-icon": {
                                        color: GREEN,
                                        transform: "scale(1.08)",
                                    },

                                    "& .tool-menu-text": {
                                        color: GREEN,
                                    },
                                },
                            }}
                        >
                            <Icon
                                className="tool-menu-icon"
                                sx={{
                                    fontSize: 26,
                                    color: "#667085",
                                    transition: "all 0.2s ease",
                                }}
                            />

                            <Typography
                                className="tool-menu-text"
                                sx={{
                                    fontSize: 17,
                                    color: NAVY,
                                    transition: "color 0.2s ease",
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Stack>
                    );
                })}
            </Box>
        </Box>
    );
}

const CAREER_MENU = {
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

function CareerMegaMenu() {
    return (
        <Box
            sx={{
                position: "absolute",
                width: "80%",
                top: "100%",
                left: "10%",
                bgcolor: "#fff",
                borderTop: "1px solid #EAECF0",
                boxShadow: "0 16px 32px rgba(16,24,40,0.12)",
                px: {xs: 2, sm: 3, md: 5, lg: 7},
                py: 4,
                zIndex: 20,
            }}
        >
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#98A2B3",
                    mb: 2,
                    letterSpacing: 0.5,
                }}
            >
                {CAREER_MENU.title}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: 6,
                    rowGap: 1,
                    maxWidth: 750,
                }}
            >
                {CAREER_MENU.items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Stack
                            key={item.label}
                            direction="row"
                            alignItems="center"
                            spacing={1.5}
                            sx={{
                                px: 1,
                                py: 1.2,
                                borderRadius: 2,
                                cursor: "pointer",

                                "&:hover": {
                                    bgcolor: "#F2FBF6",

                                    "& .career-menu-icon": {
                                        color: GREEN,
                                        transform: "scale(1.08)",
                                    },

                                    "& .career-menu-text": {
                                        color: GREEN,
                                    },
                                },
                            }}
                        >
                            <Icon
                                className="career-menu-icon"
                                sx={{
                                    fontSize: 26,
                                    color: "#667085",
                                    transition: "all 0.2s ease",
                                }}
                            />

                            <Typography
                                className="career-menu-text"
                                sx={{
                                    fontSize: 17,
                                    color: NAVY,
                                    transition: "color 0.2s ease",
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Stack>
                    );
                })}
            </Box>
        </Box>
    );
}

// ---- Header / Navbar ----
function Header() {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
    const navLinks = ["Việc làm", "Tạo CV", "Công cụ", "Cẩm nang nghề nghiệp"];
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <Box
            component="header"
            onMouseLeave={() => setOpenMenu(null)}
            sx={{
                bgcolor: "#fff",
                borderBottom: "1px solid #EAECF0",
                px: {xs: 2, sm: 3, md: 5, lg: 7},
                py: {xs: 2, md: 3},
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                zIndex: 10,
            }}
        >
            <Stack direction="row" alignItems="center" spacing={{xs: 5, md: 15}}>
                <TopCvLogo size={isMdUp ? 38 : 26} showTagline={isMdUp}/>
                {isMdUp && (
                    <Stack direction="row" alignItems="center" spacing={8}>
                        {navLinks.map((label) => {
                            const isActive =
                                (openMenu === "jobs" && label === "Việc làm") ||
                                (openMenu === "cv" && label === "Tạo CV") ||
                                (openMenu === "tools" && label === "Công cụ") ||
                                (openMenu === "career" && label === "Cẩm nang nghề nghiệp");
                            return (
                                <Box
                                    key={label}
                                    onMouseEnter={() => {
                                        if (label === "Việc làm") {
                                            setOpenMenu("jobs");
                                        } else if (label === "Tạo CV") {
                                            setOpenMenu("cv");
                                        } else if (label === "Công cụ") {
                                            setOpenMenu("tools");
                                        } else if (label === "Cẩm nang nghề nghiệp") {
                                            setOpenMenu("career");
                                        } else {
                                            setOpenMenu(null);
                                        }
                                    }}
                                    sx={{
                                        position: "relative",
                                        "&:hover .nav-label": {color: GREEN},
                                        "&:hover .nav-arrow": {color: GREEN, transform: "rotate(180deg)"},
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" spacing={0.3}
                                           sx={{cursor: "pointer", py: 2}}>
                                        <Typography
                                            className="nav-label"
                                            sx={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                                color: isActive ? GREEN : "#344054",
                                                lineHeight: 1,
                                                transition: "color 0.2s ease",
                                            }}
                                        >
                                            {label}
                                        </Typography>
                                        <KeyboardArrowDownIcon
                                            className="nav-arrow"
                                            sx={{
                                                fontSize: 20,
                                                color: isActive ? GREEN : "#98A2B3",
                                                transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.2s ease, color 0.2s ease",
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            );
                        })}
                    </Stack>
                )}
            </Stack>

            {openMenu === "jobs" && <JobMegaMenu/>}

            {openMenu === "cv" && <CvMegaMenu/>}

            {openMenu === "tools" && <ToolMegaMenu/>}

            {openMenu === "career" && <CareerMegaMenu/>}

            {isMdUp ? (
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: 16,
                            color: GREEN,
                            borderColor: GREEN,
                            borderRadius: 5,
                            px: 3.5,
                            py: 1.2,
                        }}
                    >
                        Đăng ký
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: 16,
                            bgcolor: GREEN,
                            borderRadius: 5,
                            px: 3.5,
                            py: 1.2,
                            boxShadow: "none",
                            "&:hover": {bgcolor: GREEN_DARK, boxShadow: "none"},
                        }}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        size="large"
                        sx={{textTransform: "none", fontWeight: 600, fontSize: 16, color: "#344054", ml: 1}}
                        startIcon={<ApartmentIcon sx={{fontSize: 22}}/>}
                    >
                        Đăng tuyển & tìm hồ sơ
                    </Button>
                </Stack>
            ) : (
                <IconButton>
                    <MenuIcon/>
                </IconButton>
            )}
        </Box>
    );
}

// ---- Hero: tiêu đề + thanh tìm kiếm ----eroS
const CAREER_CATEGORIES = {
    groups: [
        {
            label: "Kinh doanh / Bán hàng",
            icon: BusinessCenterTwoToneIcon,
        },
        {
            label: "Marketing / Truyền thông",
            icon: CampaignTwoToneIcon,
        },
        {
            label: "Công nghệ thông tin",
            icon: CodeTwoToneIcon,
        },
        {
            label: "Tài chính / Kế toán",
            icon: AccountBalanceTwoToneIcon,
        },
        {
            label: "Kỹ thuật / Xây dựng",
            icon: EngineeringTwoToneIcon,
        },
        {
            label: "Nhân sự / Hành chính",
            icon: PeopleAltTwoToneIcon,
        },
    ],

    jobs: [
        "Nhân viên kinh doanh",
        "Marketing",
        "Lập trình viên",
        "Kế toán",
        "Nhân viên nhân sự",
        "Kỹ sư xây dựng",
        "Chăm sóc khách hàng",
        "Thiết kế đồ họa",
        "Nhân viên văn phòng",
        "Nhân viên ngân hàng",
    ],

    positions: [
        "Sales Executive",
        "Marketing Executive",
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "UI/UX Designer",
        "Accountant",
        "HR Specialist",
        "Project Manager",
        "Business Analyst",
    ],
};

function CareerCategoryMenu() {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{position: "relative", maxWidth: 1000, mx: "auto"}}>

            {/* Thanh mở menu */}
            <Box
                onClick={() => setOpen(!open)}
                sx={{
                    bgcolor: "#fff",
                    borderRadius: 3,
                    px: 2.5,
                    py: 1.5,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 12px rgba(16,24,40,0.08)",
                    mb: 1.5,

                    "&:hover": {
                        boxShadow: "0 6px 18px rgba(16,24,40,0.12)",
                    },
                }}
            >
                <Stack direction="row" spacing={1.2} alignItems="center">
                    <WorkOutlineTwoToneIcon
                        sx={{
                            color: GREEN,
                            fontSize: 25,
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: NAVY,
                        }}
                    >
                        Danh mục nghề nghiệp
                    </Typography>
                </Stack>

                <KeyboardArrowDownIcon
                    sx={{
                        color: "#667085",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                    }}
                />
            </Box>

            {/* Mega menu */}
            {open && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "calc(100% - 8px)",
                        left: 0,
                        right: 0,
                        bgcolor: "#fff",
                        borderRadius: 3,
                        boxShadow: "0 16px 32px rgba(16,24,40,0.16)",
                        p: {xs: 2, md: 3},
                        zIndex: 30,
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr 1fr",
                            },
                            gap: {xs: 3, md: 4},
                        }}
                    >

                        {/* =====================
                            NHÓM NGHỀ
                        ====================== */}
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 800,
                                    color: "#98A2B3",
                                    mb: 1.5,
                                    letterSpacing: 0.5,
                                }}
                            >
                                NHÓM NGHỀ
                            </Typography>

                            <Stack spacing={0.5}>
                                {CAREER_CATEGORIES.groups.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Stack
                                            key={item.label}
                                            direction="row"
                                            alignItems="center"
                                            spacing={1.2}
                                            sx={{
                                                px: 1,
                                                py: 1,
                                                borderRadius: 2,
                                                cursor: "pointer",

                                                "&:hover": {
                                                    bgcolor: "#F2FBF6",

                                                    "& .category-icon": {
                                                        color: GREEN,
                                                        transform: "scale(1.08)",
                                                    },

                                                    "& .category-text": {
                                                        color: GREEN,
                                                    },
                                                },
                                            }}
                                        >
                                            <Icon
                                                className="category-icon"
                                                sx={{
                                                    fontSize: 23,
                                                    color: "#667085",
                                                    transition: "all 0.2s ease",
                                                }}
                                            />

                                            <Typography
                                                className="category-text"
                                                sx={{
                                                    fontSize: 14.5,
                                                    color: NAVY,
                                                    transition: "color 0.2s ease",
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                            </Stack>
                        </Box>


                        {/* =====================
                            NGHỀ
                        ====================== */}
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 800,
                                    color: "#98A2B3",
                                    mb: 1.5,
                                    letterSpacing: 0.5,
                                }}
                            >
                                NGHỀ
                            </Typography>

                            <Stack spacing={0.3}>
                                {CAREER_CATEGORIES.jobs.map((job) => (
                                    <Typography
                                        key={job}
                                        sx={{
                                            px: 1,
                                            py: 0.8,
                                            borderRadius: 1.5,
                                            fontSize: 14.5,
                                            color: NAVY,
                                            cursor: "pointer",

                                            "&:hover": {
                                                bgcolor: "#F2FBF6",
                                                color: GREEN,
                                            },
                                        }}
                                    >
                                        {job}
                                    </Typography>
                                ))}
                            </Stack>
                        </Box>


                        {/* =====================
                            VỊ TRÍ CHUYÊN MÔN
                        ====================== */}
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 800,
                                    color: "#98A2B3",
                                    mb: 1.5,
                                    letterSpacing: 0.5,
                                }}
                            >
                                VỊ TRÍ CHUYÊN MÔN
                            </Typography>

                            <Stack spacing={0.3}>
                                {CAREER_CATEGORIES.positions.map((position) => (
                                    <Typography
                                        key={position}
                                        sx={{
                                            px: 1,
                                            py: 0.8,
                                            borderRadius: 1.5,
                                            fontSize: 14.5,
                                            color: NAVY,
                                            cursor: "pointer",

                                            "&:hover": {
                                                bgcolor: "#F2FBF6",
                                                color: GREEN,
                                            },
                                        }}
                                    >
                                        {position}
                                    </Typography>
                                ))}
                            </Stack>
                        </Box>

                    </Box>
                </Box>
            )}
        </Box>
    );
}

function HeroSearch() {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const categoryRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                categoryRef.current &&
                !categoryRef.current.contains(event.target)
            ) {
                setCategoryOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const careerGroups = [
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

    const positions = [
        "Intern",
        "Junior",
        "Middle",
        "Senior",
        "Team Leader",
        "Manager",
        "Director",
        "Freelancer",
    ];

    return (
        <Box
            sx={{
                background: `linear-gradient(
                    120deg,
                    #0B2E1D 0%,
                    #0F4A2C 55%,
                    ${GREEN_DARK} 100%
                )`,
                px: {xs: 2, sm: 4, md: 8},
                py: {xs: 4, sm: 5, md: 6},
            }}
        >
            <Typography
                sx={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 800,
                    color: GREEN,
                    textAlign: "center",
                    fontSize: {xs: 20, sm: 26, md: 32},
                    mb: {xs: 3, md: 4},
                }}
            >
                TopCV - Tạo CV, Tìm việc làm, Tuyển dụng hiệu quả
            </Typography>

            {/* SEARCH WRAPPER */}
            <Box
                ref={categoryRef}
                sx={{
                    maxWidth: 1000,
                    mx: "auto",
                    position: "relative",
                }}
            >

                {/* SEARCH BAR */}
                <Stack
                    direction={{xs: "column", md: "row"}}
                    spacing={{xs: 1.5, md: 0}}
                    sx={{
                        bgcolor: "#fff",
                        borderRadius: categoryOpen
                            ? "24px 24px 0 0"
                            : {xs: 3, md: 6},
                        p: {xs: 1.5, md: 1},
                        position: "relative",
                        zIndex: 5,
                    }}
                >

                    {/* =========================
                        DANH MỤC NGHỀ NGHIỆP
                    ========================== */}
                    <Box
                        onClick={() => setCategoryOpen(!categoryOpen)}
                        sx={{
                            minWidth: {md: 220},
                            px: 1.5,
                            py: 1,

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",

                            cursor: "pointer",

                            borderRadius: 3,

                            "&:hover": {
                                bgcolor: "#F9FAFB",
                            },
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        >
                            <WorkOutlineTwoToneIcon
                                sx={{
                                    color: GREEN,
                                    fontSize: 24,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: NAVY,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Danh mục nghề nghiệp
                            </Typography>
                        </Stack>

                        <KeyboardArrowDownIcon
                            sx={{
                                fontSize: 20,
                                color: "#98A2B3",
                                transform: categoryOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition:
                                    "transform 0.2s ease",
                            }}
                        />
                    </Box>

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                            my: 1,
                        }}
                    />

                    {/* =========================
                        Ô TÌM KIẾM
                    ========================== */}
                    <TextField
                        placeholder="Vị trí tuyển dụng, tên công ty"
                        fullWidth
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{
                                            color: "#98A2B3",
                                            ml: 1,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            px: 1,
                            py: 0.5,
                        }}
                    />

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                            my: 1,
                        }}
                    />

                    {/* =========================
                        ĐỊA ĐIỂM
                    ========================== */}
                    <TextField
                        placeholder="Địa điểm"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PlaceOutlinedIcon
                                        sx={{
                                            color: "#98A2B3",
                                            ml: 1,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            px: 1,
                            py: 0.5,
                            minWidth: {md: 180},
                        }}
                    />

                    {/* =========================
                        SEARCH BUTTON
                    ========================== */}
                    <Button
                        variant="contained"
                        startIcon={<SearchIcon/>}
                        sx={{
                            bgcolor: GREEN,
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: {xs: 3, md: 5},
                            px: 4,
                            py: 1.3,
                            boxShadow: "none",

                            whiteSpace: "nowrap",
                            minWidth: "fit-content",

                            "&:hover": {
                                bgcolor: GREEN_DARK,
                                boxShadow: "none",
                            },
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Stack>


                {/* =====================================
                    DROPDOWN FULL WIDTH
                ====================================== */}
                {categoryOpen && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,

                            bgcolor: "#fff",

                            borderRadius: "0 0 24px 24px",

                            boxShadow:
                                "0 16px 32px rgba(16,24,40,0.16)",

                            px: {xs: 2, md: 4},
                            py: {xs: 2, md: 3},

                            zIndex: 10,
                        }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "1.1fr 1.2fr 0.8fr",
                                },
                                gap: {xs: 3, md: 5},
                            }}
                        >

                            {/* NHÓM NGHỀ */}
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: "#98A2B3",
                                        mb: 1.5,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    NHÓM NGHỀ
                                </Typography>

                                <Stack spacing={0.4}>
                                    {careerGroups.map((group) => (
                                        <Typography
                                            key={group.title}
                                            sx={{
                                                px: 1,
                                                py: 0.8,
                                                borderRadius: 1.5,
                                                fontSize: 14,
                                                fontWeight: 500,
                                                color: NAVY,
                                                cursor: "pointer",

                                                "&:hover": {
                                                    bgcolor: "#F2FBF6",
                                                    color: GREEN,
                                                },
                                            }}
                                        >
                                            {group.title}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Box>


                            {/* NGHỀ */}
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: "#98A2B3",
                                        mb: 1.5,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    NGHỀ
                                </Typography>

                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "1fr 1fr",
                                        columnGap: 2,
                                    }}
                                >
                                    {careerGroups
                                        .flatMap(
                                            (group) =>
                                                group.jobs
                                        )
                                        .slice(0, 12)
                                        .map((job) => (
                                            <Typography
                                                key={job}
                                                sx={{
                                                    px: 1,
                                                    py: 0.8,
                                                    borderRadius: 1.5,
                                                    fontSize: 14,
                                                    color: NAVY,
                                                    cursor: "pointer",

                                                    "&:hover": {
                                                        bgcolor:
                                                            "#F2FBF6",
                                                        color: GREEN,
                                                    },
                                                }}
                                            >
                                                {job}
                                            </Typography>
                                        ))}
                                </Box>
                            </Box>


                            {/* VỊ TRÍ CHUYÊN MÔN */}
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: "#98A2B3",
                                        mb: 1.5,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    VỊ TRÍ CHUYÊN MÔN
                                </Typography>

                                <Stack spacing={0.3}>
                                    {positions.map(
                                        (position) => (
                                            <Typography
                                                key={position}
                                                sx={{
                                                    px: 1,
                                                    py: 0.8,
                                                    borderRadius: 1.5,
                                                    fontSize: 14,
                                                    color: NAVY,
                                                    cursor: "pointer",

                                                    "&:hover": {
                                                        bgcolor:
                                                            "#F2FBF6",
                                                        color: GREEN,
                                                    },
                                                }}
                                            >
                                                {position}
                                            </Typography>
                                        )
                                    )}
                                </Stack>
                            </Box>

                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

// ---- Danh mục ngành nghề (trái) + banner quảng cáo (phải) ----
function CategoriesAndBanner() {
    const categories = [
        "Kinh doanh/Bán hàng",
        "Marketing/PR/Quảng cáo",
        "Chăm sóc khách hàng",
        "Nhân sự/Hành chính/Pháp chế",
        "Công nghệ Thông tin",
        "Lao động phổ thông",
    ];

    return (
        <Box sx={{px: {xs: 2, sm: 4, md: 8}, mt: {xs: -3, md: -4}, position: "relative", zIndex: 2}}>
            <Stack direction={{xs: "column", md: "row"}} spacing={2}>
                <Box
                    sx={{
                        bgcolor: "#fff",
                        borderRadius: 3,
                        boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
                        p: 2,
                        width: {xs: "100%", md: 320},
                        flexShrink: 0,
                    }}
                >
                    <Stack spacing={0.5}>
                        {categories.map((c) => (
                            <Stack
                                key={c}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{
                                    px: 1.5,
                                    py: 1.2,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    "&:hover": {bgcolor: "#F2FBF6"},
                                }}
                            >
                                <Typography sx={{fontSize: 14, fontWeight: 500, color: NAVY}}>{c}</Typography>
                                <ChevronRightIcon sx={{fontSize: 18, color: "#98A2B3"}}/>
                            </Stack>
                        ))}
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{mt: 1, px: 1}}>
                        <Typography sx={{fontSize: 12, color: "#98A2B3"}}>1/5</Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton size="small" sx={{border: "1px solid #EAECF0"}}>
                                <ChevronLeftIcon fontSize="small"/>
                            </IconButton>
                            <IconButton size="small" sx={{border: `1px solid ${GREEN}`, color: GREEN}}>
                                <ChevronRightIcon fontSize="small"/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        borderRadius: 3,
                        overflow: "hidden",
                        bgcolor: "#EAF7EF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: {xs: 180, md: "auto"},
                        p: {xs: 3, md: 4},
                    }}
                >
                    <Stack spacing={1.5} sx={{maxWidth: 340}}>
                        <Typography sx={{fontSize: {xs: 18, md: 22}, fontWeight: 800, color: NAVY}}>
                            Kiếm thêm <Box component="span" sx={{color: GREEN}}>thu nhập</Box> khi đang tìm việc
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                alignSelf: "flex-start",
                                bgcolor: GREEN,
                                textTransform: "none",
                                fontWeight: 700,
                                borderRadius: 5,
                                boxShadow: "none",
                                "&:hover": {bgcolor: GREEN_DARK, boxShadow: "none"},
                            }}
                        >
                            Khám phá ngay →
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}

// ---- 1 thẻ job ----
function JobCard({job}) {
    return (
        <Box
            sx={{
                border: "1px solid #EAECF0",
                borderRadius: 3,
                p: 2,
                display: "flex",
                gap: 1.5,
                bgcolor: "#fff",
                "&:hover": {boxShadow: "0 4px 16px rgba(16,24,40,0.08)"},
            }}
        >
            <Box
                sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: "#F2F4F7",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "#98A2B3",
                    fontSize: 13,
                }}
            >
                {job.company.slice(0, 2).toUpperCase()}
            </Box>
            <Box sx={{flex: 1, minWidth: 0}}>
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: NAVY,
                        mb: 0.5,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {job.title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 12.5,
                        color: "#667085",
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {job.company}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Chip
                        label={job.salary}
                        size="small"
                        sx={{bgcolor: "#F2FBF6", color: GREEN_DARK, fontWeight: 600, fontSize: 12}}
                    />
                    <Chip
                        label={job.location}
                        size="small"
                        sx={{bgcolor: "#F9FAFB", color: "#475467", fontSize: 12}}
                    />
                </Stack>
            </Box>
            <IconButton size="small" sx={{alignSelf: "flex-start", color: GREEN}}>
                <FavoriteBorderIcon fontSize="small"/>
            </IconButton>
        </Box>
    );
}

const JOBS = [
    {
        title: "Giám Đốc Khai Thác Mỏ Lương Từ 25-30 Triệu",
        company: "Công ty TNHH Đầu tư Bình Thuận Lâm...",
        salary: "25 - 30 triệu",
        location: "Lâm Đồng (mới)"
    },
    {
        title: "Kỹ Sư Cấp Thoát Nước - Kỹ Sư Môi Trường Nước",
        company: "Công ty CP Đầu tư Thương mại...",
        salary: "Thoả thuận",
        location: "Hà Nội"
    },
    {
        title: "Personal Trainer (Huấn Luyện Viên Cá Nhân)",
        company: "Hộ kinh doanh Hoàng Duy Tân",
        salary: "10 - 40 triệu",
        location: "Hà Nội"
    },
    {
        title: "Kế Toán Quản Trị Hợp Nhất",
        company: "Công ty CP Flamingo Holding Group",
        salary: "Thoả thuận",
        location: "Hà Nội"
    },
    {title: "Kỹ Sư VR/AR/XR - Đi Làm Ngay", company: "Proton Việt Nam", salary: "15 - 25 triệu", location: "Hà Nội"},
    {
        title: "Kế Toán Viên - Từ 1 Năm Kinh Nghiệm",
        company: "Tam Hưng và Định Công",
        salary: "8 - 12 triệu",
        location: "Hà Nội"
    },
];

// ---- Danh sách job + filter ----
function JobListSection() {
    const [tab, setTab] = useState("office");
    const [locationFilter, setLocationFilter] = useState("Ngẫu Nhiên");
    const locations = ["Ngẫu Nhiên", "Hà Nội", "TP. Hồ Chí Minh (cũ)", "Miền Bắc", "Miền Nam"];

    return (
        <Box sx={{px: {xs: 2, sm: 4, md: 8}, py: {xs: 4, md: 6}}}>
            <Stack
                direction={{xs: "column", sm: "row"}}
                spacing={{xs: 2, sm: 0}}
                alignItems={{xs: "flex-start", sm: "center"}}
                justifyContent="space-between"
                sx={{mb: 3}}
            >
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Typography sx={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 800,
                        fontSize: {xs: 18, md: 22},
                        color: GREEN
                    }}>
                        Việc làm tốt nhất
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label="Việc văn phòng"
                            onClick={() => setTab("office")}
                            sx={{
                                fontWeight: 600,
                                bgcolor: tab === "office" ? GREEN : "#F2F4F7",
                                color: tab === "office" ? "#fff" : "#475467",
                                "&:hover": {bgcolor: tab === "office" ? GREEN_DARK : "#EAECF0"},
                            }}
                        />
                        <Chip
                            label="Việc phổ thông"
                            onClick={() => setTab("labor")}
                            sx={{
                                fontWeight: 600,
                                bgcolor: tab === "labor" ? GREEN : "#F2F4F7",
                                color: tab === "labor" ? "#fff" : "#475467",
                                "&:hover": {bgcolor: tab === "labor" ? GREEN_DARK : "#EAECF0"},
                            }}
                        />
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography sx={{fontSize: 13, color: GREEN, fontWeight: 600}}>Xem tất cả</Typography>
                    <IconButton size="small"><ChevronLeftIcon fontSize="small"/></IconButton>
                    <IconButton size="small" sx={{color: GREEN}}><ChevronRightIcon fontSize="small"/></IconButton>
                </Stack>
            </Stack>

            <Stack
                direction={{xs: "column", sm: "row"}}
                spacing={1.5}
                alignItems={{xs: "flex-start", sm: "center"}}
                sx={{mb: 2, overflowX: {xs: "visible", sm: "auto"}}}
            >
                <Chip icon={<TuneIcon sx={{fontSize: 16}}/>} label="Lọc theo: Địa điểm" variant="outlined"
                      sx={{fontWeight: 600}}/>
                <Stack direction="row" spacing={1} sx={{overflowX: "auto", pb: {xs: 1, sm: 0}}}>
                    {locations.map((loc) => (
                        <Chip
                            key={loc}
                            label={loc}
                            onClick={() => setLocationFilter(loc)}
                            sx={{
                                fontWeight: 600,
                                flexShrink: 0,
                                bgcolor: locationFilter === loc ? GREEN : "#F2F4F7",
                                color: locationFilter === loc ? "#fff" : "#475467",
                                "&:hover": {bgcolor: locationFilter === loc ? GREEN_DARK : "#EAECF0"},
                            }}
                        />
                    ))}
                </Stack>
            </Stack>

            <Box
                sx={{
                    bgcolor: "#EFF8FF",
                    border: "1px solid #D1E9FF",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    mb: 3,
                    fontSize: 13,
                    color: "#1849A9",
                }}
            >
                💡 Gợi ý: Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr"},
                    gap: 2,
                }}
            >
                {JOBS.map((job, i) => (
                    <JobCard key={i} job={job}/>
                ))}
            </Box>
        </Box>
    );
}

export default function JobListPage() {
    return (
        <Box sx={{fontFamily: "Inter, sans-serif", width: "100%", minHeight: "100vh", bgcolor: "#F7F8FA"}}>
            <Header/>
            <HeroSearch/>
            <CategoriesAndBanner/>
            <JobListSection/>
        </Box>
    );
}