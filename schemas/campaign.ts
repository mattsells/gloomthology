import { object, ref, string } from 'yup';

const CampaignSchema = object().shape({
  name: string().trim().required().max(200),
});

export default CampaignSchema;
