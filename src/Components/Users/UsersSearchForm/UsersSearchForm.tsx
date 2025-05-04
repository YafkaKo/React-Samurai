import React, { memo } from "react";
import { Box, Button, Checkbox, FormControlLabel, Input } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useDebounce } from "use-debounce";

// Схема валидации с помощью Yup
const searchFormSchema = yup
  .object({
    searchTerm: yup
      .string()
      .min(3, "Minimum 3 characters")
      .matches(/^[a-zA-Z0-9\s]*$/, "Only letters and numbers allowed")
      .required(),
    friend: yup.boolean().default(false),
  })
  .required();

type SearchFormValues = yup.InferType<typeof searchFormSchema>;

interface UsersSearchFormProps {
  onSearch: (searchTerm: string, friend: boolean) => void;
  debounceTimeout?: number;
}

const UsersSearchForm = memo(
  ({ onSearch, debounceTimeout = 500 }: UsersSearchFormProps) => {
    const {
      control,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm<SearchFormValues>({
      resolver: yupResolver(searchFormSchema),
      defaultValues: {
        searchTerm: "",
        friend: false,
      },
      mode: "onChange",
    });

    const [debouncedSearchTerm] = useDebounce(
      watch("searchTerm"),
      debounceTimeout
    );
    const friendFilter = watch("friend");

    const onSubmit = () => {
      onSearch(debouncedSearchTerm, friendFilter);
    };

    // // Автоматический поиск при изменении
    // React.useEffect(() => {
    //   if (debouncedSearchTerm && debouncedSearchTerm.length >= 3) {
    //     onSearch(debouncedSearchTerm, friendFilter);
    //   }
    // }, [debouncedSearchTerm, friendFilter]); // Добавили friendFilter в зависимости

    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", display: "flex", gap: "15px" }}
      >
        <Controller
          name="searchTerm"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                placeholder="Search users..."
                fullWidth
                error={!!errors.searchTerm}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon
                      color={errors.searchTerm ? "error" : "inherit"}
                    />
                  </InputAdornment>
                }
                sx={{
                  width: "100%",
                  "&:hover:not(.Mui-error)": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused:not(.Mui-error)": {
                    borderColor: "primary.main",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!!errors.searchTerm}
                sx={{ minWidth: "100px" }}
              >
                Search
              </Button>
            </>
          )}
        />

        <Controller
          name="friend"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} color="primary" />
              }
              label="Is Friend?"
              sx={{ whiteSpace: "nowrap" }}
            />
          )}
        />
      </Box>
    );
  }
);

export default UsersSearchForm;
