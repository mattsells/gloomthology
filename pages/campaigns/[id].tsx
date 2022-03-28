import { ActivityType, EventStatus } from '@prisma/client';
import { Formik } from 'formik';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useState } from 'react';
import { SWRConfig } from 'swr';

import ActivityTile from '@/components/ActivityTile';
import Button from '@/components/Button';
import EventActions from '@/components/EventActions';
import Modal from '@/components/Modal';
import Panel from '@/components/Panel';
import Select from '@/components/Select';
import Text from '@/components/Text';
import Textbox from '@/components/Textbox';
import VStack from '@/components/VStack';
import db from '@/db';
import useActivities from '@/hooks/useActivities';
import useCampaign from '@/hooks/useCampaign';
import http from '@/lib/http';
import { sessionOptions } from '@/lib/session/config';
import { CampaignWithRelations } from '@/types/campaign';
import { Option } from '@/types/form';
import { Locations } from '@/types/location';
import { titleize } from '@/utils/string';

export const getServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  const { user } = req.session;
  const { id } = query;

  // Need to check if user is logged in
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const campaign = await db.campaign.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      location: true,
      users: true,
    },
  });

  if (!campaign) {
    return {
      notFound: true,
    };
  }

  const campaignUser = campaign.users.find(
    (campaignUser) => campaignUser.userId === user.id
  );

  if (!campaignUser) {
    return {
      props: {
        campaign: null,
      },
    };
  }

  const activities = await db.activity.findMany({
    where: {
      campaignId: {
        equals: Number(id),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
    skip: 0,
  });

  const locations = await db.location.findMany({});
  const locationOptions = locations.map((location) => ({
    label: location.name,
    value: location.id,
  }));

  return {
    props: {
      campaign,
      locationOptions,
      user: req.session.user,
      fallback: {
        [`/activities?campaignId=${id}`]: activities,
        [`/campaigns/${id}`]: campaign,
      },
    },
  };
}, sessionOptions);

type Props = {
  locationOptions: Option[];
  fallback: {
    [k: string]: CampaignWithRelations;
  };
};

const eventFormState = { eventText: '' };
type EventFormState = typeof eventFormState;

const travelFormState = { tag: { value: '', label: '' } };
type TravelFormState = { tag: Option };

const CampaignShow: NextPage<Props> = ({ locationOptions }) => {
  const router = useRouter();
  const { id } = router.query;

  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [isTravelModalVisible, setIsTravelModalVisible] = useState(false);
  const { campaign, setCampaign } = useCampaign(id as string);
  const { activities } = useActivities(id as string);

  // TODO: Make component for this
  if (!campaign) {
    return (
      <Text as="h1" appearance="header" className="mb-4">
        You can't view with campaign
      </Text>
    );
  }

  // TODO: Make util for this
  const eventType = campaign.location.tag === Locations.Home ? 'city' : 'road';
  const labelText =
    eventType === 'city'
      ? 'While in Gloomhaven...'
      : `On the road to ${campaign.location.name}...`;

  const handleSubmitEventForm = async (values: EventFormState) => {
    const data = {
      campaign: {
        [`${eventType}EventStatus`]: EventStatus.Complete,
      },
      activity: {
        type: ActivityType.EventCompleted,
        data: {
          text: values.eventText,
          locationName: campaign.location.name,
          locationTag: campaign.location.tag,
        },
      },
    };

    await setCampaign(
      http.patch(`/campaigns/${id}`, data).then((res) => res.data.campaign)
    );

    setIsEventModalVisible(false);
  };

  const handleSubmitTravelForm = async (values: TravelFormState) => {
    const data = {
      campaign: {
        locationId: values.tag.value,
      },
      activity: {
        type: ActivityType.Traveled,
        data: {
          fromId: campaign.location.id,
          fromName: campaign.location.name,
          toId: values.tag.value,
          toName: values.tag.label,
        },
      },
    };

    // If going to gloomhaven, reset event tags
    if (values.tag.value === Locations.Home) {
      campaign.cityEventStatus = EventStatus.Incomplete;
      campaign.roadEventStatus = EventStatus.Incomplete;
    }

    await setCampaign(
      http.patch(`/campaigns/${id}`, data).then((res) => res.data.campaign)
    );

    setIsTravelModalVisible(false);
  };

  return (
    <>
      <Text as="h1" appearance="header" className="mb-4">
        {campaign.name}
      </Text>

      <div className="grid gap-4 grid-cols-5">
        <div className="col-span-3">
          <Panel>
            <Text as="h2" appearance="subheader" className="mb-4">
              Current Status
            </Text>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-3">
                    <Text appearance="body">Current Location:</Text>
                  </td>
                  <td className="p-3">
                    <Text appearance="body">{campaign.location.name}</Text>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      className="w-full"
                      onClick={() => setIsTravelModalVisible(true)}
                    >
                      Travel
                    </Button>
                  </td>
                </tr>

                <EventActions
                  campaign={campaign}
                  onClickStart={() => setIsEventModalVisible(true)}
                />
              </tbody>
            </table>
          </Panel>
        </div>

        <div className="col-span-2">
          <Panel>
            <Text as="h2" appearance="subheader" className="mb-4">
              Activity
            </Text>

            <div className="grid gap-4 grid-cols-1">
              {activities.map((activity) => (
                <ActivityTile
                  activity={activity}
                  campaign={campaign}
                  key={activity.id}
                />
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {isEventModalVisible && (
        <Formik initialValues={eventFormState} onSubmit={handleSubmitEventForm}>
          {({
            dirty,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            isValid,
            submitForm,
            values,
          }) => (
            <Modal onDismiss={() => setIsEventModalVisible(false)}>
              <Text as="h1" appearance="header" className="mb-4">
                {titleize(eventType)} Event
              </Text>

              <Modal.Body>
                <VStack>
                  <Text as="label" appearance="subheader" className="mb-2">
                    {labelText}
                  </Text>

                  <Textbox
                    error={errors.eventText}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="eventText"
                    rows={6}
                    value={values.eventText}
                  ></Textbox>
                </VStack>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  appearance="secondary"
                  onClick={() => setIsEventModalVisible(false)}
                  type="button"
                >
                  Cancel
                </Button>

                <Button
                  appearance="primary"
                  className="ml-4"
                  disabled={isSubmitting || !isValid || !dirty}
                  onClick={submitForm}
                  type="submit"
                >
                  Complete Event
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Formik>
      )}

      {isTravelModalVisible && (
        <Formik
          initialValues={travelFormState}
          onSubmit={handleSubmitTravelForm}
        >
          {({
            dirty,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            isValid,
            setFieldValue,
            submitForm,
            values,
          }) => (
            <Modal onDismiss={() => setIsTravelModalVisible(false)}>
              <Text as="h1" appearance="header" className="mb-4">
                Travel to...
              </Text>

              <Modal.Body>
                <Select
                  error={errors.tag?.value}
                  getOptionLabel={(option) => (option as Option).label}
                  getOptionValue={(option) => (option as Option).value}
                  onBlur={handleBlur}
                  onChange={(value) => setFieldValue('tag', value)}
                  options={locationOptions}
                  name="tag"
                  value={values.tag}
                ></Select>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  appearance="secondary"
                  onClick={() => setIsTravelModalVisible(false)}
                  type="button"
                >
                  Cancel
                </Button>

                <Button
                  appearance="primary"
                  className="ml-4"
                  disabled={isSubmitting || !isValid || !dirty}
                  onClick={submitForm}
                  type="submit"
                >
                  Travel
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Formik>
      )}
    </>
  );
};

const Wrapper: NextPage<Props> = (props) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <CampaignShow {...props} />
    </SWRConfig>
  );
};

export default Wrapper;
