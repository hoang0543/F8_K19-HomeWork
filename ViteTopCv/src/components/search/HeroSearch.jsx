import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Box,
    Button,
    ButtonBase,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WorkOutlineTwoToneIcon from "@mui/icons-material/WorkOutlineTwoTone";

import {
    CAREER_GROUPS,
    POSITIONS,
    PROVINCES,
} from "../../data/CandidateJobListPage.js";

import {
    normalizeText,
} from "../../utils/searchUtils.js";

import styles from "./HeroSearch.module.css";

export default function HeroSearch({ onSearch }) {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);

    const [keyword, setKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("");
    const [locationSearch, setLocationSearch] =
        useState("");
    const [selectedLocation, setSelectedLocation] =
        useState("");

    const categoryRef = useRef(null);
    const locationRef = useRef(null);

    const filteredProvinces = useMemo(
        () =>
            PROVINCES.filter((province) =>
                normalizeText(province).includes(
                    normalizeText(locationSearch)
                )
            ),
        [locationSearch]
    );

    const allJobs = useMemo(
        () =>
            CAREER_GROUPS.flatMap(
                (group) => group.jobs
            ),
        []
    );

    const middleIndex =
        Math.ceil(allJobs.length / 2);

    const firstJobColumn =
        allJobs.slice(0, middleIndex);

    const secondJobColumn =
        allJobs.slice(middleIndex);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                categoryRef.current &&
                !categoryRef.current.contains(
                    event.target
                )
            ) {
                setCategoryOpen(false);
            }

            if (
                locationRef.current &&
                !locationRef.current.contains(
                    event.target
                )
            ) {
                setLocationOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleSelectCategory = (value) => {
        setSelectedCategory(value);
        setCategoryOpen(false);
    };

    const handleSelectLocation = (value) => {
        setSelectedLocation(value);
        setLocationSearch(value);
        setLocationOpen(false);
    };

    const handleSearch = () => {
        onSearch?.({
            keyword: keyword.trim(),
            category: selectedCategory,
            location: selectedLocation,
        });
    };

    return (
        <Box
            className={styles.hero}
        >
            <Typography
                className={styles.heroTitle}
            >
                Tìm việc làm nhanh 24H, việc làm mới nhất trên toàn quốc
            </Typography>

            <Typography
                className={styles.heroDescription}
            >
                Tiếp cận 60.000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
            </Typography>

            <Box
                ref={categoryRef}
                className={styles.searchWrapper}
            >
                <Stack
                    className={styles.searchBar}
                >
                    <ButtonBase
                        type="button"
                        aria-expanded={categoryOpen}
                        className={
                            selectedCategory
                                ? `${styles.categoryButton} ${styles.categoryButtonSelected}`
                                : styles.categoryButton
                        }
                        onClick={() => {
                            setLocationOpen(false);
                            setCategoryOpen((prev) => !prev);
                        }}
                    >
                        <Stack
                            direction="row"
                            className={
                                styles.categoryButtonContent
                            }
                        >
                            <WorkOutlineTwoToneIcon
                                className={
                                    styles.categoryMainIcon
                                }
                            />

                            <Typography
                                className={
                                    styles.categoryButtonText
                                }
                            >
                                {selectedCategory ||
                                    "Danh mục nghề nghiệp"}
                            </Typography>
                        </Stack>

                        <KeyboardArrowDownIcon
                            className={
                                categoryOpen
                                    ? `${styles.categoryArrow} ${styles.categoryArrowOpen}`
                                    : styles.categoryArrow
                            }
                        />
                    </ButtonBase>

                    <Divider
                        orientation="vertical"
                        className={
                            styles.searchDivider
                        }
                    />

                    <TextField
                        fullWidth
                        variant="standard"
                        value={keyword}
                        placeholder="Vị trí tuyển dụng, tên công ty"
                        className={
                            styles.searchInput
                        }
                        onChange={(event) =>
                            setKeyword(
                                event.target.value
                            )
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key === "Enter"
                            ) {
                                handleSearch();
                            }
                        }}
                        slotProps={{
                            input: {
                                disableUnderline:
                                    true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            className={
                                                styles.searchIcon
                                            }
                                        />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Divider
                        orientation="vertical"
                        className={
                            styles.searchDivider
                        }
                    />

                    <Box
                        ref={locationRef}
                        className={
                            styles.locationWrapper
                        }
                    >
                        <TextField
                            fullWidth
                            variant="standard"
                            value={
                                locationOpen
                                    ? locationSearch
                                    : selectedLocation
                            }
                            placeholder="Địa điểm"
                            className={
                                styles.locationInput
                            }
                            onFocus={(event) => {
                                if (event.target.tagName !== "INPUT") return;
                                setCategoryOpen(false);
                                setLocationOpen(true);
                                setLocationSearch(
                                    selectedLocation
                                );
                            }}
                            onChange={(event) => {
                                setLocationSearch(
                                    event.target.value
                                );
                                setLocationOpen(true);
                            }}
                            slotProps={{
                                input: {
                                    disableUnderline:
                                        true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PlaceOutlinedIcon
                                                className={
                                                    styles.locationIcon
                                                }
                                            />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                type="button"
                                                size="small"
                                                className={styles.locationToggle}
                                                aria-label={locationOpen ? "Đóng menu địa điểm" : "Mở menu địa điểm"}
                                                aria-expanded={locationOpen}
                                                onMouseDown={(event) => event.preventDefault()}
                                                onClick={() => {
                                                    setCategoryOpen(false);
                                                    if (!locationOpen) {
                                                        setLocationSearch(selectedLocation);
                                                    }
                                                    setLocationOpen((prev) => !prev);
                                                }}
                                            >
                                                <KeyboardArrowDownIcon
                                                    className={
                                                        locationOpen
                                                            ? `${styles.locationArrow} ${styles.locationArrowOpen}`
                                                            : styles.locationArrow
                                                    }
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {locationOpen && (
                            <Box
                                className={
                                    styles.locationDropdown
                                }
                            >
                                <Typography
                                    className={
                                        styles.locationDropdownTitle
                                    }
                                >
                                    Tỉnh / Thành phố
                                </Typography>

                                <Box
                                    className={
                                        styles.locationList
                                    }
                                >
                                    <Box
                                        className={
                                            styles.locationItem
                                        }
                                        onClick={() =>
                                            handleSelectLocation(
                                                ""
                                            )
                                        }
                                    >
                                        <PlaceOutlinedIcon
                                            className={
                                                styles.locationItemIcon
                                            }
                                        />

                                        <Typography
                                            className={
                                                styles.locationItemText
                                            }
                                        >
                                            Tất cả địa điểm
                                        </Typography>
                                    </Box>

                                    {filteredProvinces.map(
                                        (province) => (
                                            <Box
                                                key={
                                                    province
                                                }
                                                className={
                                                    selectedLocation ===
                                                    province
                                                        ? `${styles.locationItem} ${styles.locationItemActive}`
                                                        : styles.locationItem
                                                }
                                                onClick={() =>
                                                    handleSelectLocation(
                                                        province
                                                    )
                                                }
                                            >
                                                <PlaceOutlinedIcon
                                                    className={
                                                        styles.locationItemIcon
                                                    }
                                                />

                                                <Typography
                                                    className={
                                                        styles.locationItemText
                                                    }
                                                >
                                                    {province}
                                                </Typography>
                                            </Box>
                                        )
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        className={
                            styles.searchButton
                        }
                        onClick={
                            handleSearch
                        }
                    >
                        Tìm kiếm
                    </Button>
                </Stack>

                {categoryOpen && (
                    <Box
                        className={
                            styles.categoryDropdown
                        }
                    >
                        <Box
                            className={
                                styles.categoryDropdownGrid
                            }
                        >
                            <CategoryColumn
                                title="NHÓM NGHỀ"
                                items={
                                    CAREER_GROUPS.map(
                                        (group) =>
                                            group.title
                                    )
                                }
                                selected={
                                    selectedCategory
                                }
                                onSelect={
                                    handleSelectCategory
                                }
                            />

                            <CategoryColumn
                                title="NGHỀ"
                                items={
                                    firstJobColumn
                                }
                                selected={
                                    selectedCategory
                                }
                                onSelect={
                                    handleSelectCategory
                                }
                            />

                            <CategoryColumn
                                title="NGHỀ"
                                items={
                                    secondJobColumn
                                }
                                selected={
                                    selectedCategory
                                }
                                onSelect={
                                    handleSelectCategory
                                }
                            />

                            <CategoryColumn
                                title="VỊ TRÍ CHUYÊN MÔN"
                                items={POSITIONS}
                                selected={
                                    selectedCategory
                                }
                                onSelect={
                                    handleSelectCategory
                                }
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

function CategoryColumn({
    title,
    items,
    selected,
    onSelect,
}) {
    return (
        <Box
            className={
                styles.categoryColumn
            }
        >
            <Typography
                className={
                    styles.dropdownTitle
                }
            >
                {title}
            </Typography>

            <Stack>
                {items.map((item) => (
                    <Typography
                        key={item}
                        className={
                            selected === item
                                ? `${styles.dropdownItem} ${styles.dropdownItemActive}`
                                : styles.dropdownItem
                        }
                        onClick={() =>
                            onSelect(item)
                        }
                    >
                        {item}
                    </Typography>
                ))}
            </Stack>
        </Box>
    );
}