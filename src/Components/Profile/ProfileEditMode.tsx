import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
} from "@mui/material";
import {
  ProfileDispatch,
  putProfileThunkCreator,
} from "../../redux/profile-reducer.ts";
import { useDispatch } from "react-redux";
import { Dispatch, FC, SetStateAction } from "react";
import { ContactType, ProfileType } from "../../types/types.ts";

type PropsType = {
  profile: ProfileType;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

type FormData = {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: ContactType;
};

const ProfileEditMode: FC<PropsType> = ({ profile, setEditMode }) => {
  const safeContacts = (): ContactType => {

    const defaultContacts: ContactType = {
      github: "",
      vk: "",
      facebook: "",
      instagram: "",
      twitter: "",
      website: "",
      youtube: "",
      mainLink: "",
    };

    // Если у нас нет profile.contacts — возвращаем всё по умолчанию
    if (!profile.contacts) return defaultContacts;

    // Клонируем defaultContacts, потом перезапишем реальными строками или пустыми
    const contacts: ContactType = { ...defaultContacts };

    (Object.keys(defaultContacts) as Array<keyof ContactType>).forEach(
      (key) => {
        const raw = profile.contacts![key];
        // raw может быть string | null | undefined — приводим к string
        contacts[key] = raw ?? "";
      }
    );

    return contacts;
  };

  const dispatch = useDispatch<ProfileDispatch>();

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      fullName: profile.fullName || "",
      aboutMe: profile.aboutMe || "",
      lookingForAJob: profile.lookingForAJob || false,
      lookingForAJobDescription: profile.lookingForAJobDescription || "",
      contacts: safeContacts(),
    },
  });

  const lookingForAJob = watch("lookingForAJob");

  const onSubmit = async (data: FormData) => {
    const originalProfile: FormData = {
      fullName: profile.fullName || "",
      aboutMe: profile.aboutMe || "",
      lookingForAJob: profile.lookingForAJob || false,
      lookingForAJobDescription: profile.lookingForAJobDescription || "",
      contacts: safeContacts(),
    };

    const hasChanges = (obj1:FormData, obj2:FormData):boolean => {
      const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

      for (const key of keys) {
        const val1 = obj1[key];
        const val2 = obj2[key];

        // Нормализация значений для сравнения
        const normalizedVal1 = typeof val1 === "string" ? val1.trim() : val1;
        const normalizedVal2 = typeof val2 === "string" ? val2.trim() : val2;

        if (JSON.stringify(normalizedVal1) !== JSON.stringify(normalizedVal2)) {
          return true;
        }
      }
      return false;
    };
    if (!hasChanges(data, originalProfile)) {
      console.log("Данные не изменились");
      setEditMode(false);
      return;
    }

    try {
      let profileExample: ProfileType = { userId: profile.userId, ...data };
      await dispatch(putProfileThunkCreator(profileExample));

      // Только после успешного выполнения
      setEditMode(false);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      // Можно добавить обработку ошибки (например, показать уведомление)
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            fullWidth
            sx={{ mb: 1, flex: 1 }}
            placeholder="Full Name"
            inputProps={{
              "aria-label": "Full Name",
            }}
          />
        )}
      />

      <Controller
        name="aboutMe"
        control={control}
        render={({ field }) => (
          <Input
            placeholder="About Me"
            {...field}
            fullWidth
            sx={{ flex: 1 }}
            inputProps={{
              "aria-label": "About Me",
            }}
          />
        )}
      />

      <FormControlLabel
        control={
          <Controller
            name="lookingForAJob"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        }
        label="Looking for a job"
      />

      {lookingForAJob && (
        <Controller
          name="lookingForAJobDescription"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Job Description"
              {...field}
              fullWidth
              sx={{ flex: 1 }}
              rows={2}
              inputProps={{
                "aria-label": "Job Description",
              }}
            />
          )}
        />
      )}

      <Typography variant="h6" sx={{ mt: 2 }}>
        Contacts:
      </Typography>
      {Object.keys(profile.contacts || {}).map((contact) => (
        <Controller
          key={contact}
          name={`contacts.${contact}`as `contacts.${keyof ContactType}`}
          control={control}
          render={({ field }) => (
            <Input
              placeholder={contact}
              {...field}
              fullWidth
              sx={{ flex: 1, mb: 1 }}
              inputProps={{
                "aria-label": contact,
              }}
            />
          )}
        />
      ))}

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setEditMode(false)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileEditMode;
