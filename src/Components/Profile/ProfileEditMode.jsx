import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
} from "@mui/material";
import { putProfileThunkCreator } from "../../redux/profile-reducer";
import { useDispatch } from "react-redux";

const ProfileEditMode = ({ profile, setEditMode }) => {

  const safeContacts = () => {
    try {
      if (!profile || !profile.contacts) return {};

      // Создаем копию контактов, фильтруя null/undefined
      return Object.entries(profile.contacts).reduce((acc, [key, value]) => {
        if (key) { // Проверяем, что ключ существует
          acc[key] = value || ""; // Заменяем null/undefined на пустую строку
        }
        return acc;
      }, {});
    } catch (error) {
      console.error("Error processing contacts:", error);
      return {};
    }
  };

  const dispatch = useDispatch();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: profile.fullName || "",
      aboutMe: profile.aboutMe || "",
      lookingForAJob: profile.lookingForAJob || false,
      lookingForAJobDescription: profile.lookingForAJobDescription || "",
      contacts: safeContacts(),
    },
  });

  const lookingForAJob = watch("lookingForAJob");

  const onSubmit = async (data)  => {

    const originalProfile = {
      fullName: profile.fullName || "",
      aboutMe: profile.aboutMe || "",
      lookingForAJob: profile.lookingForAJob || false,
      lookingForAJobDescription: profile.lookingForAJobDescription || "",
      contacts: safeContacts(),
    };

    const hasChanges = (obj1, obj2) => {
      const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

      for (const key of keys) {
        const val1 = obj1[key];
        const val2 = obj2[key];

        // Нормализация значений для сравнения
        const normalizedVal1 = typeof val1 === 'string' ? val1.trim() : val1;
        const normalizedVal2 = typeof val2 === 'string' ? val2.trim() : val2;

        if (JSON.stringify(normalizedVal1) !== JSON.stringify(normalizedVal2)) {
          return true;
        }
      }
      return false;
    };
    if (!hasChanges(data, originalProfile)) {
      console.log('Данные не изменились');
      setEditMode(false);
      return;
    }

    try {
      // Ждем завершения dispatch
      await dispatch(putProfileThunkCreator({ ...data, userId: profile.userId }));

      // Только после успешного выполнения
      setEditMode(false);
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
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
            sx={{mb:1 , flex: 1 }}
            placeholder='Full Name'
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
          placeholder='About Me'
          {...field}
          fullWidth
          sx={{flex: 1 }}
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
          placeholder='Job Description'
          {...field}
          fullWidth
          sx={{flex: 1 }}
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
          name={`contacts.${contact}`}
          control={control}
          render={({ field }) => (
            <Input
          placeholder={contact}
          {...field}
          fullWidth
          sx={{flex: 1, mb:1 }}
          inputProps={{
            "aria-label": {contact},
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
