import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon
  from "@mui/icons-material/FavoriteBorder";

import { useNavigate } from "react-router-dom";

import styles from "./jobCard.module.css";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const handleOpenDetail = () => {
    navigate(`/jobs/${job.slug}`);
  };

  const companyName =
    job.company?.company_name ||
    "Công ty";

  const logoUrl =
    job.company?.logo_url;

  const location =
    job.work_location?.[0]
      ?.city_name || "Toàn quốc";

  const salary =
    job.salary_text ||
    job.salary?.display ||
    "Thỏa thuận";

  return (
    <Box
      className={styles.card}
      onClick={handleOpenDetail}
      sx={{
        p: {
          xs: 1.75,
          sm: 2,
        },

        gap: {
          xs: 1.25,
          sm: 1.5,
        },

        borderRadius: {
          xs: 2,
          sm: 2.5,
        },
      }}
    >
      {/* LOGO */}

      <Box
        className={styles.logo}
        sx={{
          width: {
            xs: 50,
            sm: 56,
          },

          height: {
            xs: 50,
            sm: 56,
          },
        }}
      >
        {logoUrl ? (
          <Box
            component="img"
            src={logoUrl}
            alt={companyName}
          />
        ) : (
          <Typography>
            {companyName
              .slice(0, 2)
              .toUpperCase()}
          </Typography>
        )}
      </Box>

      {/* CONTENT */}

      <Box className={styles.content}>
        <Typography
          className={styles.title}
          sx={{
            fontSize: {
              xs: 13,
              sm: 14,
            },
          }}
        >
          {job.title}
        </Typography>

        <Typography
          className={styles.company}
        >
          {companyName}
        </Typography>

        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          gap={0.75}
        >
          <Chip
            label={salary}
            size="small"
            className={styles.salary}
          />

          <Chip
            label={location}
            size="small"
            className={styles.location}
          />

          {job.is_hot && (
            <Chip
              label="HOT"
              size="small"
              className={styles.hot}
            />
          )}
        </Stack>
      </Box>

      {/* FAVORITE */}

      <IconButton
        className={styles.favorite}
        sx={{
          width: {
            xs: 32,
            sm: 36,
          },

          height: {
            xs: 32,
            sm: 36,
          },

          p: {
            xs: 0.5,
            sm: 0.75,
          },
        }}
        onClick={(event) => {
          event.stopPropagation();

          console.log(
            "SAVE JOB:",
            job.id
          );
        }}
      >
        <FavoriteBorderIcon
          sx={{
            fontSize: {
              xs: 20,
              sm: 22,
            },
          }}
        />
      </IconButton>
    </Box>
  );
}