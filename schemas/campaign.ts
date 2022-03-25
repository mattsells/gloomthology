import { EventStatus } from '@prisma/client';
import { object, string } from 'yup';

const eventStatus = Object.values(EventStatus);

const CampaignSchema = object().shape({
  name: string().trim().max(200),
  cityEventStatus: string().oneOf(eventStatus),
  roadEventStatus: string().oneOf(eventStatus),
});

export default CampaignSchema;
