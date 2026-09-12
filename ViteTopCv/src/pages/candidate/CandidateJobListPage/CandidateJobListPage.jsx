import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TuneIcon from "@mui/icons-material/Tune";

import Header from "../../../components/header/Header.jsx";
import JobCard from "../../../components/jobCard/jobCard.jsx";
import HeroSearch from "../../../components/search/HeroSearch.jsx";

import {
    getJobs,
} from "../../../services/candidateService.js";

import {
    normalizeText,
} from "../../../utils/searchUtils.js";

import {
    CAREER_GROUPS,
} from "../../../data/CandidateJobListPage.js";

import styles from "./CandidateJobListPage.module.css";


/* =========================================================
   CATEGORY + BANNER
========================================================= */

function CategoriesAndBanner() {
    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("sm")
    );

    const isTablet = useMediaQuery(
        theme.breakpoints.between(
            "sm",
            "md"
        )
    );

    const [
        categoryPage,
        setCategoryPage,
    ] = useState(0);


    /* =========================
       CATEGORY DATA
    ========================= */

    const allCategories =
        useMemo(
            () =>
                CAREER_GROUPS.flatMap(
                    (group) =>
                        group.jobs
                ),
            []
        );

    const categoriesPerPage =
        isMobile
            ? 4
            : isTablet
                ? 5
                : 6;

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                allCategories.length /
                categoriesPerPage
            )
        );

    const safePage =
        Math.min(
            categoryPage,
            totalPages - 1
        );

    const startIndex =
        safePage *
        categoriesPerPage;

    const visibleCategories =
        allCategories.slice(
            startIndex,
            startIndex +
            categoriesPerPage
        );


    /* =========================
       RESET PAGE
    ========================= */

    useEffect(() => {
        setCategoryPage(0);
    }, [categoriesPerPage]);


    /* =========================
       PAGINATION
    ========================= */

    const handlePreviousPage = () => {
        setCategoryPage(
            (previous) =>
                previous === 0
                    ? totalPages - 1
                    : previous - 1
        );
    };

    const handleNextPage = () => {
        setCategoryPage(
            (previous) =>
                previous >=
                totalPages - 1
                    ? 0
                    : previous + 1
        );
    };


    return (
        <Box
            className={
                styles.categoryBannerSection
            }
            sx={{
                px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 8,
                },
                pt: 1,
                pb: {
                    xs: 2.75,
                    sm: 3.5,
                    md: 4.5,
                    lg: 5,
                },
            }}
        >
            <Box
                className={
                    styles.categoryBannerInner
                }
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",

                        md:
                            "minmax(260px, 0.35fr) minmax(0, 0.65fr)",

                        lg:
                            "minmax(300px, 0.32fr) minmax(0, 0.68fr)",
                    },

                    gap: {
                        xs: 2,
                        md: 2,
                        lg: 2.5,
                    },
                }}
            >

                {/* =========================
                    CATEGORY LIST
                ========================= */}

                <Box
                    className={
                        styles.categoryList
                    }
                >
                    <Typography
                        className={
                            styles.categoryHeading
                        }
                    >
                        Danh mục nổi bật
                    </Typography>

                    <Stack spacing={0}>
                        {visibleCategories.map(
                            (category) => (
                                <Stack
                                    key={
                                        category
                                    }
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    className={
                                        styles.categoryListItem
                                    }
                                >
                                    <Typography
                                        className={
                                            styles.categoryListText
                                        }
                                    >
                                        {category}
                                    </Typography>

                                    <ChevronRightIcon
                                        className={
                                            styles.categoryListArrow
                                        }
                                    />
                                </Stack>
                            )
                        )}
                    </Stack>


                    {/* CATEGORY PAGINATION */}

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className={
                            styles.categoryPagination
                        }
                    >
                        <Typography
                            className={
                                styles.pageNumber
                            }
                        >
                            {allCategories.length ===
                            0
                                ? "0 / 0"
                                : `${safePage + 1} / ${totalPages}`}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={0.75}
                        >
                            <IconButton
                                size="small"
                                className={
                                    styles.paginationButton
                                }
                                onClick={
                                    handlePreviousPage
                                }
                                disabled={
                                    totalPages <= 1
                                }
                            >
                                <ChevronLeftIcon/>
                            </IconButton>

                            <IconButton
                                size="small"
                                className={`${styles.paginationButton} ${styles.paginationButtonActive}`}
                                onClick={
                                    handleNextPage
                                }
                                disabled={
                                    totalPages <= 1
                                }
                            >
                                <ChevronRightIcon/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>


                {/* BANNER */}
                <Box className={styles.banner}>
                    <Box
                        component="img"
                        className={styles.bannerImage}
                        src="https://www.topcv.vn/v4/image/mb-life/banner-v3.png"
                        alt="Banner tuyển dụng MB Life"
                        sx={{
                            position: {
                                xs: "static",
                                md: "absolute",
                            },
                            height: {
                                xs: "auto",
                                md: "100%",
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}


/* =========================================================
   JOB LIST
========================================================= */

function JobListSection({
                            searchKeyword,
                            searchCategory,
                            searchLocation,
                        }) {
    const [
        jobs,
        setJobs,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        tab,
        setTab,
    ] = useState("office");

    const [
        locationFilter,
        setLocationFilter,
    ] = useState(
        "Ngẫu Nhiên"
    );

    const locations = [
        "Ngẫu Nhiên",
        "Hà Nội",
        "TP. Hồ Chí Minh",
        "Miền Bắc",
        "Miền Trung",
        "Miền Nam",
    ];


    /* =========================
       FETCH JOBS
    ========================= */

    const fetchJobs =
        async () => {
            try {
                setLoading(true);

                setError("");

                const data =
                    await getJobs();

                console.log(
                    "GET JOBS RESPONSE:",
                    data
                );

                if (
                    Array.isArray(data)
                ) {
                    setJobs(data);

                    return;
                }

                if (
                    Array.isArray(
                        data?.items
                    )
                ) {
                    setJobs(
                        data.items
                    );

                    return;
                }

                if (
                    Array.isArray(
                        data?.data
                    )
                ) {
                    setJobs(
                        data.data
                    );

                    return;
                }

                if (
                    Array.isArray(
                        data?.results
                    )
                ) {
                    setJobs(
                        data.results
                    );

                    return;
                }

                console.warn(
                    "Không nhận được array jobs:",
                    data
                );

                setJobs([]);
            } catch (error) {
                console.error(
                    "GET JOBS ERROR:",
                    error
                );

                const message =
                    error.response
                        ?.data
                        ?.detail ||
                    error.response
                        ?.data
                        ?.message ||
                    "Không thể tải danh sách việc làm";

                setError(
                    message
                );
            } finally {
                setLoading(
                    false
                );
            }
        };


    useEffect(() => {
        fetchJobs();
    }, []);


    /* =========================
       SEARCH + FILTER
    ========================= */

    const displayedJobs =
        useMemo(() => {
            const keyword =
                normalizeText(
                    searchKeyword
                );

            const categoryKeyword =
                normalizeText(
                    searchCategory
                );

            const locationKeyword =
                normalizeText(
                    searchLocation
                );

            return jobs.filter(
                (job) => {

                    /* KEYWORD */

                    const keywordValues = [
                        job.title,
                        job.category,
                        job.specialty,
                        job.experience_level,
                        job.job_type,

                        job.company
                            ?.company_name,

                        job.company
                            ?.short_name,

                        job.company
                            ?.international_name,
                    ];

                    const keywordMatched =
                        !keyword ||
                        keywordValues.some(
                            (value) =>
                                normalizeText(
                                    value
                                ).includes(
                                    keyword
                                )
                        );


                    /* CATEGORY */

                    const categoryValues = [
                        job.category,
                        job.specialty,
                        job.title,
                    ];

                    const categoryMatched =
                        !categoryKeyword ||
                        categoryValues.some(
                            (value) => {
                                const normalizedValue =
                                    normalizeText(
                                        value
                                    );

                                return (
                                    normalizedValue.includes(
                                        categoryKeyword
                                    ) ||
                                    categoryKeyword.includes(
                                        normalizedValue
                                    )
                                );
                            }
                        );


                    /* HERO LOCATION */

                    const heroLocationMatched =
                        !locationKeyword ||
                        job.work_location?.some(
                            (location) =>
                                normalizeText(
                                    location.city_name
                                ).includes(
                                    locationKeyword
                                ) ||
                                normalizeText(
                                    location.address_detail
                                ).includes(
                                    locationKeyword
                                )
                        );


                    /* LOCATION CHIP */

                    let chipLocationMatched =
                        true;

                    const normalizedFilter =
                        normalizeText(
                            locationFilter
                        );

                    if (
                        locationFilter !==
                        "Ngẫu Nhiên"
                    ) {
                        if (
                            locationFilter ===
                            "Miền Bắc"
                        ) {
                            const northCities = [
                                "ha noi",
                                "hai phong",
                                "quang ninh",
                                "bac ninh",
                                "bac giang",
                                "thai nguyen",
                                "vinh phuc",
                                "phu tho",
                                "hai duong",
                                "hung yen",
                                "nam dinh",
                                "ninh binh",
                            ];

                            chipLocationMatched =
                                job.work_location?.some(
                                    (location) =>
                                        northCities.some(
                                            (city) =>
                                                normalizeText(
                                                    location.city_name
                                                ).includes(
                                                    city
                                                )
                                        )
                                );
                        } else if (
                            locationFilter ===
                            "Miền Trung"
                        ) {
                            const centralCities = [
                                "da nang",
                                "hue",
                                "quang nam",
                                "quang ngai",
                                "binh dinh",
                                "khanh hoa",
                                "nghe an",
                                "ha tinh",
                                "thanh hoa",
                            ];

                            chipLocationMatched =
                                job.work_location?.some(
                                    (location) =>
                                        centralCities.some(
                                            (city) =>
                                                normalizeText(
                                                    location.city_name
                                                ).includes(
                                                    city
                                                )
                                        )
                                );
                        } else if (
                            locationFilter ===
                            "Miền Nam"
                        ) {
                            const southCities = [
                                "ho chi minh",
                                "dong nai",
                                "binh duong",
                                "can tho",
                                "long an",
                                "ba ria",
                                "vung tau",
                                "an giang",
                                "tay ninh",
                            ];

                            chipLocationMatched =
                                job.work_location?.some(
                                    (location) =>
                                        southCities.some(
                                            (city) =>
                                                normalizeText(
                                                    location.city_name
                                                ).includes(
                                                    city
                                                )
                                        )
                                );
                        } else {
                            chipLocationMatched =
                                job.work_location?.some(
                                    (location) =>
                                        normalizeText(
                                            location.city_name
                                        ).includes(
                                            normalizedFilter
                                        )
                                );
                        }
                    }


                    return (
                        keywordMatched &&
                        categoryMatched &&
                        heroLocationMatched &&
                        chipLocationMatched
                    );
                }
            );
        }, [
            jobs,
            searchKeyword,
            searchCategory,
            searchLocation,
            locationFilter,
        ]);


    /* =========================
       RENDER
    ========================= */

    return (
        <Box
            className={
                styles.jobSection
            }
            sx={{
                px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 8,
                },

                py: {
                    xs: 3.5,
                    sm: 4,
                    md: 5,
                    lg: 6,
                },
            }}
        >

            {/* =========================
                HEADER
            ========================= */}

            <Stack
                className={
                    styles.jobSectionHeader
                }
                sx={{
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },

                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },

                    justifyContent:
                        "space-between",

                    gap: {
                        xs: 1.5,
                        sm: 2,
                    },
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    useFlexGap
                    flexWrap="wrap"
                >
                    <Typography
                        className={
                            styles.sectionTitle
                        }
                    >
                        Việc làm tốt nhất
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                    >
                        <Chip
                            label="Việc văn phòng"
                            onClick={() =>
                                setTab(
                                    "office"
                                )
                            }
                            className={
                                tab ===
                                "office"
                                    ? `${styles.tabChip} ${styles.tabChipActive}`
                                    : styles.tabChip
                            }
                        />

                        <Chip
                            label="Việc phổ thông"
                            onClick={() =>
                                setTab(
                                    "labor"
                                )
                            }
                            className={
                                tab ===
                                "labor"
                                    ? `${styles.tabChip} ${styles.tabChipActive}`
                                    : styles.tabChip
                            }
                        />
                    </Stack>
                </Stack>
            </Stack>


            {/* =========================
                SEARCH RESULT
            ========================= */}

            {(
                searchKeyword ||
                searchCategory ||
                searchLocation
            ) && (
                <Alert
                    severity="success"
                    sx={{
                        mb: 2,
                    }}
                >
                    Tìm thấy{" "}
                    {
                        displayedJobs.length
                    }{" "}
                    việc làm

                    {searchKeyword
                        ? ` với từ khóa "${searchKeyword}"`
                        : ""}

                    {searchCategory
                        ? ` thuộc "${searchCategory}"`
                        : ""}

                    {searchLocation
                        ? ` tại ${searchLocation}`
                        : ""}
                </Alert>
            )}


            {/* =========================
                FILTER
            ========================= */}

            <Stack
                className={
                    styles.filterSection
                }
                sx={{
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },

                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },

                    gap: {
                        xs: 1,
                        sm: 1.5,
                    },
                }}
            >
                <Chip
                    icon={
                        <TuneIcon/>
                    }
                    label="Lọc theo: Địa điểm"
                    variant="outlined"
                    className={
                        styles.filterTitle
                    }
                />

                <Stack
                    direction="row"
                    spacing={1}
                    className={
                        styles.locationFilters
                    }
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "auto",
                        },

                        overflowX:
                            "auto",
                    }}
                >
                    {locations.map(
                        (location) => (
                            <Chip
                                key={
                                    location
                                }
                                label={
                                    location
                                }
                                onClick={() =>
                                    setLocationFilter(
                                        location
                                    )
                                }
                                className={
                                    locationFilter ===
                                    location
                                        ? `${styles.locationFilter} ${styles.locationFilterActive}`
                                        : styles.locationFilter
                                }
                            />
                        )
                    )}
                </Stack>
            </Stack>


            {/* =========================
                INFO
            ========================= */}

            <Box
                className={
                    styles.infoBox
                }
            >
                💡 Gợi ý: Nhấn vào một
                việc làm để xem thông tin
                chi tiết
            </Box>


            {/* =========================
                LOADING
            ========================= */}

            {loading && (
                <Box
                    sx={{
                        display:
                            "flex",

                        justifyContent:
                            "center",

                        py: 6,
                    }}
                >
                    <CircularProgress/>
                </Box>
            )}


            {/* =========================
                ERROR
            ========================= */}

            {!loading &&
                error && (
                    <Stack
                        spacing={2}
                    >
                        <Alert
                            severity="error"
                        >
                            {error}
                        </Alert>

                        <Button
                            variant="outlined"
                            onClick={
                                fetchJobs
                            }
                            sx={{
                                alignSelf:
                                    "flex-start",
                            }}
                        >
                            Thử lại
                        </Button>
                    </Stack>
                )}


            {/* =========================
                EMPTY
            ========================= */}

            {!loading &&
                !error &&
                displayedJobs.length ===
                0 && (
                    <Alert
                        severity="info"
                    >
                        Không tìm thấy việc
                        làm phù hợp.
                    </Alert>
                )}


            {/* =========================
                JOB GRID
            ========================= */}

            {!loading &&
                !error &&
                displayedJobs.length >
                0 && (
                    <Box
                        className={
                            styles.jobGrid
                        }
                        sx={{
                            display:
                                "grid",

                            gridTemplateColumns:
                                {
                                    xs:
                                        "1fr",

                                    sm:
                                        "1fr",

                                    md:
                                        "repeat(2, minmax(0, 1fr))",

                                    lg:
                                        "repeat(3, minmax(0, 1fr))",
                                },

                            gap: {
                                xs: 1.5,
                                sm: 2,
                            },
                        }}
                    >
                        {displayedJobs.map(
                            (job) => (
                                <JobCard
                                    key={
                                        job.id
                                    }
                                    job={
                                        job
                                    }
                                />
                            )
                        )}
                    </Box>
                )}
        </Box>
    );
}


/* =========================================================
   PAGE
========================================================= */

export default function CandidateJobListPage() {
    const [
        searchParams,
        setSearchParams,
    ] = useState({
        keyword: "",
        category: "",
        location: "",
    });


    const handleSearch = ({
                              keyword,
                              category,
                              location,
                          }) => {
        setSearchParams({
            keyword:
                keyword || "",

            category:
                category || "",

            location:
                location || "",
        });


        requestAnimationFrame(() => {
            document
                .getElementById(
                    "job-list-section"
                )
                ?.scrollIntoView({
                    behavior:
                        "smooth",

                    block:
                        "start",
                });
        });
    };


    return (
        <Box
            className={
                styles.page
            }
        >
            <Header
                mode="candidate"
            />

            <Box
                className={
                    styles.heroArea
                }
            >
                <HeroSearch
                    onSearch={
                        handleSearch
                    }
                />

                <CategoriesAndBanner/>
            </Box>

            <Box
                id="job-list-section"
            >
                <JobListSection
                    searchKeyword={
                        searchParams.keyword
                    }
                    searchCategory={
                        searchParams.category
                    }
                    searchLocation={
                        searchParams.location
                    }
                />
            </Box>
        </Box>
    );
}