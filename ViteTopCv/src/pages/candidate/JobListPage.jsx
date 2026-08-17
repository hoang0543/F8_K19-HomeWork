import {useState} from "react";
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
                top: "100%",
                left: 0,
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
                            const isActive = openMenu === "jobs" && label === "Việc làm";
                            return (
                                <Box
                                    key={label}
                                    onMouseEnter={() => setOpenMenu(label === "Việc làm" ? "jobs" : null)}
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

// ---- Hero: tiêu đề + thanh tìm kiếm ----
function HeroSearch() {
    return (
        <Box
            sx={{
                background: `linear-gradient(120deg, #0B2E1D 0%, #0F4A2C 55%, ${GREEN_DARK} 100%)`,
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

            <Stack
                direction={{xs: "column", md: "row"}}
                spacing={{xs: 1.5, md: 0}}
                sx={{
                    bgcolor: "#fff",
                    borderRadius: {xs: 3, md: 6},
                    p: {xs: 1.5, md: 1},
                    maxWidth: 1000,
                    mx: "auto",
                }}
            >
                <TextField
                    placeholder="Vị trí tuyển dụng, tên công ty"
                    fullWidth
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{color: "#98A2B3", ml: 1}}/>
                            </InputAdornment>
                        ),
                    }}
                    sx={{px: 1, py: 0.5}}
                />
                <Divider orientation="vertical" flexItem sx={{display: {xs: "none", md: "block"}, my: 1}}/>
                <TextField
                    placeholder="Địa điểm"
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <PlaceOutlinedIcon sx={{color: "#98A2B3", ml: 1}}/>
                            </InputAdornment>
                        ),
                    }}
                    sx={{px: 1, py: 0.5, minWidth: {md: 220}}}
                />
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
                        "&:hover": {bgcolor: GREEN_DARK, boxShadow: "none"},
                    }}
                >
                    Tìm kiếm
                </Button>
            </Stack>
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