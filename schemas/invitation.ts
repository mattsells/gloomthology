import { object, string } from 'yup';

const InvitationSchema = object().shape({
  email: string().trim().email(),
});

export default InvitationSchema;
