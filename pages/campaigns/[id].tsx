import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next/types';
import { useState } from 'react';

import Button from '@/components/Button';
import EventActions from '@/components/EventActions';
import Modal from '@/components/Modal';
import Panel from '@/components/Panel';
import Text from '@/components/Text';
import Textbox from '@/components/Textbox';
import VStack from '@/components/VStack';
import db from '@/db';
import { sessionOptions } from '@/lib/session/config';
import { CampaignWithRelations } from '@/types/campaign';
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

  return {
    props: {
      campaign,
      user: req.session.user,
    },
  };
}, sessionOptions);

type Props = {
  campaign: CampaignWithRelations;
};

const CampaignShow: NextPage<Props> = ({ campaign }) => {
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);

  // TODO: Make component for this
  if (!campaign) {
    return (
      <Text as="h1" appearance="header" className="mb-4">
        You can&pos;t view with campaign
      </Text>
    );
  }

  // TODO: Make util for this
  const eventType = campaign.location.tag === Locations.Home ? 'city' : 'road';
  const labelText =
    eventType === 'city'
      ? 'While in Gloomhaven...'
      : `On the road to ${campaign.location.name}`;

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
                    <Button className="w-full">Travel</Button>
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
          </Panel>
        </div>
      </div>

      {isEventModalVisible && (
        <Modal onDismiss={() => setIsEventModalVisible(false)}>
          <Text as="h1" appearance="header" className="mb-4">
            {titleize(eventType)} Event
          </Text>

          <Modal.Body>
            <VStack>
              <Text as="label" appearance="subheader" className="mb-2">
                {labelText}
              </Text>

              <Textbox></Textbox>
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <Button
              appearance="primary"
              // disabled={isSubmitting || !isValid || !dirty}
              // onClick={submitForm}
              type="submit"
            >
              Complete Event
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CampaignShow;
