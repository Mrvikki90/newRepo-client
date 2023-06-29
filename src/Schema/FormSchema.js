import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  profileImg: yup.mixed().required(),
});

export default userSchema;
